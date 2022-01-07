using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedSystem.Models
{
	public class Doctor
	{
		[Key]
		public Guid DoctorId { get; set; }

		[ForeignKey("User")]
		public string UserId { get; set; }
		public virtual User User { get; set; }

		public Doctor()
		{
		}
	}
}

