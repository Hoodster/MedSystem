using MedSystem.Core.Repositories.PrescriptionRepository;
using MedSystem.Models;
using MedSystem.Models.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace MedSystem.Controllers
{
    [Route("api/prescription")]
    [ApiController]
    public class PrescriptionController : Controller
    {
        private readonly IPrescriptionRepository _prescriptionRepository;
        public PrescriptionController(IPrescriptionRepository prescriptionRepository) 
        {
            _prescriptionRepository = prescriptionRepository;
        }

        [Route("addPrescription")]
        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CreaTePrescriptionAsync([FromBody] PrescriptionDto prescriptionDto)
        {
            await _prescriptionRepository.CreateVisitAsync(prescriptionDto);
            return Ok();
        }

        [Route("getPatientPrescriptions")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IQueryable<Prescription>> GetAllPatientPrescription()
        {
            var prescriptions = await _prescriptionRepository.GetAllPatientPrescription();
            return prescriptions;
        }

        [Route("getDoctorPrescriptionsByPatientPesel")]
        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IQueryable<Prescription>> GetDoctorPrescriptionsByPatientPesel([FromQuery] string patientPesel)
        {
            var prescriptions = await _prescriptionRepository.GetDoctorPrescriptionByPatientPesel(patientPesel);
            return prescriptions;
        }
    }
}
