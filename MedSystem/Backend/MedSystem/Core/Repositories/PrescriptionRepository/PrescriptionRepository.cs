using MedSystem.Core.AccountRepository;
using MedSystem.Models;
using MedSystem.Models.DTO;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;

namespace MedSystem.Core.Repositories.PrescriptionRepository
{
    public class PrescriptionRepository: IPrescriptionRepository
    {
        private readonly IAccountRepository _accountRepository;
        private readonly ApplicationDbContext _applicationDbContext;
        public PrescriptionRepository(IAccountRepository accountRepository, ApplicationDbContext aplicationDbContext)
        {
            _accountRepository = accountRepository;
            _applicationDbContext = aplicationDbContext;
        }

        public async Task CreateVisitAsync(PrescriptionDto prescriptionDto)
        {
            var currentDoctor = await _accountRepository.GetCurrentUser();
            prescriptionDto.DoctorId = (Guid)currentDoctor.DoctorId;
            var prescriptionModel = new Prescription(prescriptionDto);
            _applicationDbContext.Prescriptions.Add(prescriptionModel);
            _applicationDbContext.SaveChanges();
        }

        public async Task<IQueryable<Prescription>> GetAllPatientPrescription()
        {
            var currentPatient = await _accountRepository.GetCurrentUser();
            var prescriptions = _applicationDbContext.Prescriptions.Where(p => p.PatientId.Equals(currentPatient.PatientId));
            return prescriptions;
        }

        public async Task<IQueryable<Prescription>> GetDoctorPrescriptionByPatientPesel(string pesel)
        {
            var currentDoctor = await _accountRepository.GetCurrentUser();
            var patient = _applicationDbContext.Users.Single(u => u.PESEL == pesel & u.PatientId != null);
            var prescripions = _applicationDbContext.Prescriptions.Where(p => p.DoctorId.Equals(currentDoctor.DoctorId) & p.PatientId.Equals(patient.PatientId));

            return prescripions;
        }
    }
}
