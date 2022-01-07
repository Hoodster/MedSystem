using System;
using System.Threading.Tasks;
using MedSystem.Models;

namespace MedSystem.Core.Repositories.AdminRepository
{
	public class AdminRepository : IAdminRepository
	{
        private readonly ApplicationDbContext _dbContext;

		public AdminRepository(ApplicationDbContext dbContext)
		{
            _dbContext = dbContext;
		}

        public async Task CreateAdminProfileAsync(User user)
        {
            var admin = new Admin
            {
                UserId = user.Id
            };

            var patientEntry = await _dbContext.Admins.AddAsync(admin);
            _dbContext.Entry<User>(user).Entity.AdminId = patientEntry.Entity.AdminId;
            await _dbContext.SaveChangesAsync();
        }
    }
}

