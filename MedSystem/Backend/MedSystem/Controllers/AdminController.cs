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
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Annotations;

namespace MedSystem.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly IAccountRepository _accountRepository;
        private readonly IAuthenticationService _accountService;
        private readonly IConfiguration _config;

        public AdminController(IAccountRepository accountRepository, IAuthenticationService accountService, IConfiguration config)
        {
            _accountRepository = accountRepository;
            _accountService = accountService;
            _config = config;
        }

        [Route("initialize")]
        [HttpPost]
        public async Task<IActionResult> CreateAdminAccount()
        {
            var adminData = _config.GetSection("Admin");

            if (!_accountRepository.IsAccountExisiting(adminData["email"]))
            {
                var user = new CreateUserDto("admin", "admin", "admin", adminData["pesel"], adminData["email"], adminData["password"], DateTimeOffset.Now, "");
                var result = await _accountRepository.CreateAccount(user, ApplicationRoles.Admin);
                return Ok(result);
            }

            return BadRequest("Admin account already exists.");
        }
    } 
}

