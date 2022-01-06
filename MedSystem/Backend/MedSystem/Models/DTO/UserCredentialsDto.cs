﻿using System;
namespace MedSystem.Models.DTO
{
    public class UserCredentialsDto
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public UserCredentialsDto(string email, string password)
        {
            this.Email = email;
            this.Password = password;
        }
    }
}

