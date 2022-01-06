using System;
using System.IdentityModel.Tokens.Jwt;

namespace MedSystem.Models.DTO
{
	public class JwtSecurityTokenDTO
	{
		public string Token { get; set; }
		public DateTime ExpiresIn { get; set; }

		public JwtSecurityTokenDTO(JwtSecurityToken token)
		{
			this.Token = new JwtSecurityTokenHandler().WriteToken(token);
			this.ExpiresIn = token.ValidTo;
		}
	}
}
