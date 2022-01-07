using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace MedSystem.Models
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public DateTimeOffset BirthDate { get; set; }
        public string PESEL { get; set; }

        [ForeignKey("Patient")]
        public Guid? PatientId { get; set; }
        public virtual Patient Patient { get; set; }

        [ForeignKey("Doctor")]
        public Guid? DoctorId { get; set; }
        public virtual Doctor Doctor { get; set; }

        [ForeignKey("Admin")]
        public Guid? AdminId { get; set; }
        public virtual Admin Admin { get; set; }
        
        public User()
        {
        }

        public User(string firstName, string secondName, string lastName, string email, DateTimeOffset birthDate, string PESEL, string phoneNumber)
        {
            this.FirstName = firstName;
            this.SecondName = secondName;
            this.LastName = lastName;
            this.BirthDate = birthDate;
            this.PESEL = PESEL;
            this.PhoneNumber = phoneNumber;
            this.Email = email;
            this.UserName = PESEL;
        }

    }
}
