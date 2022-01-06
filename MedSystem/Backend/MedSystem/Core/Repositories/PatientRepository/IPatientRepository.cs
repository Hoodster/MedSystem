using System;
using System.Threading.Tasks;
using MedSystem.Models;

namespace MedSystem.Core.Repositories.PatientRepository
{
	public interface IPatientRepository
	{
		Task CreatePatientProfileAsync(User user);
	}
}

