using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedSystem.Core.AccountRepository;
using MedSystem.Core.Services;
using MedSystem.Exceptions;
using MedSystem.Models;
using MedSystem.Models.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace MedSystem.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IAuthenticationService _accountService;

        public AccountController(IAccountRepository accountRepository, IAuthenticationService accountService)
        {
            _accountRepository = accountRepository;
            _accountService = accountService;
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] CreateUserDto user)
        {
            var result = await _accountRepository.CreateAccount(user, ApplicationRoles.Patient);
            return Ok(result);
        }

        [Route("signin")]
        [HttpPost]
        public async Task<IActionResult> SignInAccount([FromBody] UserCredentialsDto credentials)
        {
            try
            {
                var authToken = await _accountRepository.SignInAccount(credentials);
                return Ok(authToken);
            }
            catch (InvalidCredentialsException)
            {
                return BadRequest("Invalid credentials");
            }
            catch (AccountNotExistException)
            {
                return BadRequest("Account doesn't exist");
            }
        }

        
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Test()
        {
            return Ok(await _accountRepository.GetCurrentUser());
        }

        [Route("lockUser")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> LockUserAsync([FromQuery] string email)
        {
            await _accountRepository.LockUserAsync(email);
            return Ok();
        }

        [Route("unlockUser")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> UnlockUserAsync([FromQuery] string email)
        {
            await _accountRepository.UnlockUserAsync(email);
            return Ok();
        }

        [Route("getUserByMail")]
        [HttpGet]
        public async Task<IActionResult> GetUserByMailAsync([FromQuery] string email)
        {          
            return Ok(await _accountRepository.GetUserByMailAsync(email));
        }
    } 
}