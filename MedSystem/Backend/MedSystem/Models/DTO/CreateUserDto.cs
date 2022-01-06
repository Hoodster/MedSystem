using System;
namespace MedSystem.Models.DTO
{
    public class CreateUserDto
    {
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public DateTimeOffset BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        public string PESEL { get; set; }
        public string Email { get; set; }

        public CreateUserDto()
        {
        }

        public CreateUserDto(string firstName, string secondName, string lastName, string pesel, string email, string password, DateTimeOffset birthDate, string phoneNumber)
        {
            this.FirstName = firstName;
            this.SecondName = secondName;
            this.LastName = lastName;
            this.PESEL = pesel;
            this.Email = email;
            this.Password = password;
            this.BirthDate = birthDate;
            this.PhoneNumber = phoneNumber;
        }
    }
}

