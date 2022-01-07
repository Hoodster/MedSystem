using System;
using System.Threading.Tasks;
using MedSystem.Core.AccountRepository;
using MedSystem.Core.Services;
using MedSystem.Exceptions;
using MedSystem.Models;
using MedSystem.Models.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace MedSystem.Controllers
{
    [Route("api/doctor")]
    [ApiController]
    public class DoctorController : Controller
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IAuthenticationService _accountService;

        public DoctorController(IAccountRepository accountRepository, IAuthenticationService accountService)
        {
            _accountRepository = accountRepository;
            _accountService = accountService;
        }

        [Route("create")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> CreateAccount([FromBody] CreateUserDto user)
        {
            var result = await _accountRepository.CreateAccount(user, ApplicationRoles.Doctor);
            return Ok(result);
        }
    } 
}

