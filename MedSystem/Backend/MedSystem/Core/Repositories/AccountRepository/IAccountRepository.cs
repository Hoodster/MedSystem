using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using MedSystem.Models;
using MedSystem.Models.DTO;

namespace MedSystem.Core.AccountRepository
{
    public interface IAccountRepository
    {
        Task<string> CreateAccount(CreateUserDto user, string role);
        Task<JwtSecurityTokenDTO> SignInAccount(UserCredentialsDto credentials);
        Task<User> GetCurrentUser();
        bool IsAccountExisiting(string email);
        Task LockUserAsync(string email);
        Task UnlockUserAsync(string email);
        Task<User> GetUserByMailAsync(string email);
    }
}

