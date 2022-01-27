using MedSystem.Core.AccountRepository;
using MedSystem.Core.Repositories.VisitsRepository;
using MedSystem.Models;
using MedSystem.Models.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Controllers
{
    [Route("api/visits")]
    [ApiController]
    public class VisitsController : Controller
    {
        private readonly IVisitsRepository _visitsRepository;
       
        public VisitsController(IVisitsRepository _visitsRepository)
        {
            this._visitsRepository = _visitsRepository;
        }

        [Route("addVisit")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreateVisitAsync([FromBody] VisitsDto visitsDto)
        {
            await _visitsRepository.CreateVisitAsync(visitsDto);
            return Ok();
        }

        [Route("getAllDoctorVisitsInDay")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public IActionResult GetAllDoctorVisitsInDay([FromQuery] Guid doctorId, DateTimeOffset date)
        {
            var visits = _visitsRepository.GetAllDoctorVisitsInDay(doctorId, date);
            return Ok(visits);
        }

        [Route("getAllDoctorVisits")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllDoctorVisitsAsync()
        {
            var visits = await _visitsRepository.GetAllDoctorVisits();
            return Ok(visits);
        }

        [Route("getAllPatientVisits")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllPatientVisitsAsync()
        {
            var visits = await _visitsRepository.GetAllPatientVisits();
            return Ok(visits);
        }

    }
}
