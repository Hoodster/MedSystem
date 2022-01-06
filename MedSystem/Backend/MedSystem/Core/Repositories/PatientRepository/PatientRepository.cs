using System;
using System.Threading.Tasks;
using MedSystem.Models;

namespace MedSystem.Core.Repositories.PatientRepository
{
	public class PatientRepository : IPatientRepository
	{
        private readonly ApplicationDbContext _dbContext;

		public PatientRepository(ApplicationDbContext dbContext)
		{
            _dbContext = dbContext;
		}

        public async Task CreatePatientProfileAsync(User user)
        {
            var patient = new Patient
            {
                UserId = user.Id
            };

            var patientEntry = await _dbContext.Patients.AddAsync(patient);
            _dbContext.Entry<User>(user).Entity.PatientId = patientEntry.Entity.PatientId;
            await _dbContext.SaveChangesAsync();
        }
    }
}

