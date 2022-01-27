using MedSystem.Models;
using MedSystem.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Core.Repositories.VisitsRepository
{
    public interface IVisitsRepository
    {
        public Task CreateVisitAsync(VisitsDto visitsDto);
        public IQueryable<Visits> GetAllDoctorVisitsInDay(Guid doctorId, DateTimeOffset date);
        public Task<IQueryable<Visits>> GetAllPatientVisits();
        public Task<IQueryable<Visits>> GetAllDoctorVisits();
    }
}
