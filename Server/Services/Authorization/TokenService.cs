using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using Server.Services.Configuration;

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

        public string GetUserIdFromHeader(string header)
        {
            try
            {
                string token = GetTokenFromHeader(header);
                return GetUserIdFromToken(token);
            }
            catch
            {
                return "";
            }
        }

        public string GetTokenFromHeader(string header)
        {
            return header.Split(" ") [1];
        }

        public async Task SaveAsync(string userId, string token)
        {
            await _distributedCache.SetAsync(
                userId,
                Encoding.UTF8.GetBytes(token),
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpiration = _configurationService.GetTokenExpiration()
                });
        }

        public string GenerateToken(string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configurationService.GetSecret());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.Name, userId),
                }),
                Expires = _configurationService.GetTokenExpiration(),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public async Task<string> RenewToken(string header)
        {
            var userId = GetUserIdFromHeader(header);
            var token = GenerateToken(userId);
            await SaveAsync(userId, token);
            return token;
        }

        public async Task RemoveAsync(string token)
        {
            var userId = GetUserIdFromHeader(token);
            await _distributedCache.RemoveAsync(userId);
        }

        public string GetUserIdFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadToken(token) as JwtSecurityToken;
            var userId = decodedToken.Claims.First(claim => claim.Type == "unique_name").Value;
            return userId;
        }
    }
}