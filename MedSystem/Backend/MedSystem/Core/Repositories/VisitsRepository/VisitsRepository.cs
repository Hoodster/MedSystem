using MedSystem.Core.AccountRepository;
using MedSystem.Core.Repositories.DoctorRepository;
using MedSystem.Models;
using MedSystem.Models.DTO;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Core.Repositories.VisitsRepository
{
    public class VisitsRepository : IVisitsRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IAccountRepository _accountRepository;
        private readonly IDoctorRepository _doctorRepository; 
        public VisitsRepository(ApplicationDbContext applicationDbContext, IAccountRepository accountRepository, IDoctorRepository doctorRepository)
        {
            this._applicationDbContext = applicationDbContext;
            this._accountRepository = accountRepository;
            this._doctorRepository = doctorRepository;
        }
        public async Task CreateVisitAsync(VisitsDto visitsDto)
        {
            var currentUser = await _accountRepository.GetCurrentUser();
            visitsDto.PatientId = (Guid)currentUser.PatientId;
            var visitsModel = new Visits(visitsDto);
            _applicationDbContext.Visits.Add(visitsModel);
            _applicationDbContext.SaveChanges();
        }

        public async Task<IQueryable<Visits>> GetAllDoctorVisits()
        {
            var currentUser = await _accountRepository.GetCurrentUser();
            var doctorId = currentUser.DoctorId;

            return _applicationDbContext.Visits.Where(v => v.DoctorId.Equals(doctorId)).Include(v => v.Patient).ThenInclude(p => p.User);
        }

        public IQueryable<Visits> GetAllDoctorVisitsInDay(Guid doctorId, DateTimeOffset date)
        {
            var visits = _applicationDbContext.Visits.Where(v => v.DoctorId.Equals(doctorId)).Where(v => v.VisitDateStart.Date == date.Date).OrderBy(x => x.VisitDateStart).Take(15);
           
            return visits;
        }

        public async Task<IQueryable<Visits>> GetAllPatientVisits()
        {
            var currentUser = await _accountRepository.GetCurrentUser();
            var patientId = currentUser.PatientId;
           
            return _applicationDbContext.Visits.Where(v => v.PatientId.Equals(patientId)).Include(v => v.Doctor).ThenInclude(d => d.User).OrderBy(x => x.VisitDateStart).Take(15);
        }
    }
}
