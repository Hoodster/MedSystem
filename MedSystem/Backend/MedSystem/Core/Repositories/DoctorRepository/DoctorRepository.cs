using System;
using System.Threading.Tasks;
using MedSystem.Models;

namespace MedSystem.Core.Repositories.DoctorRepository
{
	public class DoctorRepository : IDoctorRepository
	{
        private readonly ApplicationDbContext _dbContext;

		public DoctorRepository(ApplicationDbContext dbContext)
		{
            _dbContext = dbContext;
		}

        public async Task CreateDoctorProfileAsync(User user)
        {
            var doctor = new Doctor
            {
                UserId = user.Id
            };

            var patientEntry = await _dbContext.Doctors.AddAsync(doctor);
            _dbContext.Entry<User>(user).Entity.DoctorId = patientEntry.Entity.DoctorId;
            await _dbContext.SaveChangesAsync();
        }
    }
}

