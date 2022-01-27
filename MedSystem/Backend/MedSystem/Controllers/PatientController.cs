using MedSystem.Core.Repositories.PatientRepository;
using MedSystem.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Controllers
{
    [Route("api/patient")]
    [ApiController]
    public class PatientController : Controller
    {
        private readonly IPatientRepository _patientRepository;
        public PatientController(IPatientRepository patientRepository)
        {
            _patientRepository = patientRepository;
        }

        [Route("getPatientByPesel")]
        [HttpGet]
        public IQueryable<User> GetPatientIdByPesel([FromQuery] string pesel)
        {
            var patient = _patientRepository.GetPatientByPesel(pesel);

            return patient;
        }
    }
}
