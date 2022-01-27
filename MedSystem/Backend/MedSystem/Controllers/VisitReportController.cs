using MedSystem.Core.Repositories.RaportRepository;
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
    [Route("api/reports")]
    [ApiController]
    public class VisitReportController : Controller
    {
        private readonly IReportRepository _raportRepository;
        private readonly ApplicationDbContext _aplicationDbContext;
        public VisitReportController(IReportRepository raportRepository, ApplicationDbContext aplicationDbContext)
        {
            this._raportRepository = raportRepository;
            this._aplicationDbContext = aplicationDbContext;
        }
        [Route("addRaport")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Doctor")]
        public IActionResult CreateVisitRaport([FromBody] VisitReportDto reportDto)
        {
            _raportRepository.CreateReport(reportDto);
            return Ok();
        }

        [Route("getDoctorVisits")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Doctor")]
        public async Task<IActionResult> GetAllDoctorVisitsByDateAsync([FromQuery] DateTimeOffset date)
        {
            var test = await _raportRepository.GetAllDoctorVisitsByDateAsync(date);
            return Ok(test);
        }

        [Route("getAllPatientReports")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Patient")]
        public async Task<IActionResult> GetAllPatientReports()
        {
            var reports = await _raportRepository.GetAllPatientReports();
            return Ok(reports);
        }

        [Route("getPatientReportByPesel")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Doctor")]
        public async Task<IActionResult> GetPatientReportByPesel([FromQuery] string pesel)
        {
            var reports = await _raportRepository.GetPatientReportByPesel(pesel);
            return Ok(reports);
        }
    }
}