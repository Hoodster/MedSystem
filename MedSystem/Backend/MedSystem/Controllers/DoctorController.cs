using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedSystem.Core.AccountRepository;
using MedSystem.Core.Repositories.DoctorRepository;
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
        private readonly IDoctorRepository _doctorRepository;

        public DoctorController(IAccountRepository accountRepository, IAuthenticationService accountService, IDoctorRepository doctorRepository)
        {
            _accountRepository = accountRepository;
            _accountService = accountService;
            _doctorRepository = doctorRepository;
        }

        [Route("create")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Administrator")]
        public async Task<IActionResult> CreateAccount([FromBody] CreateUserDto user)
        {
            var result = await _accountRepository.CreateAccount(user, ApplicationRoles.Doctor);
            return Ok(result);
        }

        [Route("doctorslist")]
        [HttpGet]
        public List<Doctor> GetAllDoctors()
        {
            return _doctorRepository.GetAllDoctors();
        }
    } 
}

