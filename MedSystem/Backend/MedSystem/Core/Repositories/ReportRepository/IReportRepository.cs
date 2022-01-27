using MedSystem.Models;
using MedSystem.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Core.Repositories.RaportRepository
{
    public interface IReportRepository
    {
        public void CreateReport(VisitReportDto reportDto);
        public Task<IQueryable<Visits>> GetAllDoctorVisitsByDateAsync(DateTimeOffset dateTime);
        public Task<IQueryable<VisitReport>> GetAllPatientReports();
        public Task<IQueryable<VisitReport>> GetPatientReportByPesel(string pesel);
    }
}
