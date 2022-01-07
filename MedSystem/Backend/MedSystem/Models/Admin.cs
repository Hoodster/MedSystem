using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MedSystem.Models
{
	public class Admin
	{
		[Key]
		public Guid AdminId { get; set; }

		[ForeignKey("User")]
		public string UserId { get; set; }
		public virtual User User { get; set; }
		public Admin()
		{
		}
	}
}

