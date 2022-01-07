using System;
using System.Threading.Tasks;
using MedSystem.Models;

namespace MedSystem.Core.Repositories.DoctorRepository
{
	public interface IDoctorRepository
	{
		Task CreateDoctorProfileAsync(User user);
	}
}

