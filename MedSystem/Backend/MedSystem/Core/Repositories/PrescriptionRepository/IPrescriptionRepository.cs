using MedSystem.Models;
using MedSystem.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Core.Repositories.PrescriptionRepository
{
    public interface IPrescriptionRepository
    {
        public Task CreateVisitAsync(PrescriptionDto prescriptionDto);
        public Task<IQueryable<Prescription>> GetAllPatientPrescription();
        Task<IQueryable<Prescription>> GetDoctorPrescriptionByPatientPesel(string pesel);
    }
}
