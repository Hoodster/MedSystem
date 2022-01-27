using MedSystem.Core.AccountRepository;
using MedSystem.Models;
using MedSystem.Models.DTO;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Core.Repositories.RaportRepository
{
    public class ReportRepository : IReportRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;
        private readonly IAccountRepository _accountRepository;

        public ReportRepository(ApplicationDbContext applicationDbContext, IAccountRepository accountRepository) 
        {
            _accountRepository = accountRepository;
            _applicationDbContext = applicationDbContext;
        }
        public void CreateReport(VisitReportDto reportDto)
        {
            var raportModel = new VisitReport(reportDto);
            _applicationDbContext.VisitReports.Add(raportModel);
            _applicationDbContext.SaveChanges();
        }
        public async Task<IQueryable<Visits>> GetAllDoctorVisitsByDateAsync(DateTimeOffset date)
        {
            var currentDoctor = await _accountRepository.GetCurrentUser();
            var visits = _applicationDbContext.Visits.Where(v => (v.VisitDateStart.Date == date.Date) && (v.DoctorId.Equals(currentDoctor.DoctorId))).Include(p => p.Patient).ThenInclude(u => u.User);
            return visits;
        }

        public async Task<IQueryable<VisitReport>> GetAllPatientReports()
        {
            var currentPatient = await _accountRepository.GetCurrentUser();
            var patientVisitsIds = _applicationDbContext.Visits.Where(v => v.PatientId.Equals(currentPatient.PatientId)).Select(s => s.VisitId).ToList();
            var reports = _applicationDbContext.VisitReports.Where(r => patientVisitsIds.Contains(r.VisitId));

            return reports;
        }

        public async Task<IQueryable<VisitReport>> GetPatientReportByPesel(string pesel)
        {
            var currentDoctor = await _accountRepository.GetCurrentUser();
            var patient = _applicationDbContext.Users.Single(u => u.PESEL == pesel);
            var patientVisitsIds = _applicationDbContext.Visits.Where(v => v.PatientId.Equals(patient.PatientId) & v.DoctorId.Equals(currentDoctor.DoctorId)).Select(s => s.VisitId).ToList();
            var reports = _applicationDbContext.VisitReports.Where(r => patientVisitsIds.Contains(r.VisitId));

            return reports;
        }
    }
}
