using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using MedSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace MedSystem.Core.Services
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly byte[] symmetricKey;
        IHttpContextAccessor _httpContextAccessor;

        public AuthenticationService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            symmetricKey = Encoding.UTF8.GetBytes("bQeThVmYq3t6w9z$C&F)J@NcRfUjXnZr");
        }

        public JwtSecurityToken GenerateJwtToken(string userId, IList<string> roles)
        {
            var key = new SymmetricSecurityKey(symmetricKey);
            var expirationTime = DateTime.Now.AddMonths(1);

            return new JwtSecurityToken(     
                claims: GetTokenClaims(userId, roles, expirationTime),
                expires: expirationTime,
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256),
                notBefore: DateTime.Now
                );
        }

        public string GetCurrentUser()
        {
            var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return userId;
        }

        private IEnumerable<Claim> GetTokenClaims(string userId, IList<string> roles, DateTime expirationTime)
        {
            var claimsList =  new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds().ToString()),
                new Claim(JwtRegisteredClaimNames.Exp, expirationTime.ToString()),
                
            };

            foreach(var role in roles)
            {
                claimsList.Add(new Claim(ClaimTypes.Role, role));
            }

            return claimsList;
        }
    }
}

