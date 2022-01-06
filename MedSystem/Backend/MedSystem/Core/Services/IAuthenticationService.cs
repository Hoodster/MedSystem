using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using MedSystem.Models;

namespace MedSystem.Core.Services
{
    public interface IAuthenticationService
    {
        JwtSecurityToken GenerateJwtToken(string userId, IList<string> roles);
        string GetCurrentUser();
    }
}

