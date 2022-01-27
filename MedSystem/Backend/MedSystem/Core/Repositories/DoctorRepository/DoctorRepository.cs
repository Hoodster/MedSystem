using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MedSystem.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MedSystem.Core.Repositories.DoctorRepository
{
	public class DoctorRepository : IDoctorRepository
	{
        private readonly ApplicationDbContext _dbContext;
        private UserManager<User> _userManager;
        public DoctorRepository(ApplicationDbContext dbContext, UserManager<User> userManager)
		{
            _dbContext = dbContext;
            _userManager = userManager;
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

        public List<Doctor> GetAllDoctors()
        {
            var doctors = _dbContext.Doctors.Include(d => d.User).ToList();

            return doctors;
        }
    }
}

