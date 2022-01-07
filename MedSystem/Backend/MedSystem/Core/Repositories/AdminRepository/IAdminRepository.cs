using System;
using System.Threading.Tasks;
using MedSystem.Models;

namespace MedSystem.Core.Repositories.AdminRepository
{
	public interface IAdminRepository
	{
		Task CreateAdminProfileAsync(User user);
	}
}

