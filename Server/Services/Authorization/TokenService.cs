using Microsoft.Extensions.Caching.Distributed;
using Microsoft.IdentityModel.Tokens;
using Server.Services.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Server.Services.Authorization
{
    internal class TokenService : ITokenService
    {

        private readonly IConfigurationService _configurationService;
        private readonly IDistributedCache _distributedCache;

        public TokenService(IConfigurationService configurationService, IDistributedCache distributedCache)
        {
            _configurationService = configurationService;
            _distributedCache = distributedCache;
        }

        public string GetLoginFromToken(string token)
        {
            token = token.Split(" ")[1];
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadToken(token) as JwtSecurityToken;
            var login = decodedToken.Claims.First(claim => claim.Type == "unique_name").Value;
            return login;
        }

        public async Task SaveAsync(string login, string token)
        {
            await _distributedCache.SetAsync(
                login,
                Encoding.UTF8.GetBytes(token),
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpiration = _configurationService.GetTokenExpiration()
                });
        }

        public string GenerateToken(string login)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configurationService.GetSecret());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, login),
                }),
                Expires = _configurationService.GetTokenExpiration(),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task RemoveAsync(string token)
        {
            var login = GetLoginFromToken(token);
            await _distributedCache.RemoveAsync(login);
        }
    }
}
