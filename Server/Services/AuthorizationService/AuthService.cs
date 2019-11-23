using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.IdentityModel.Tokens;
using Server.Models.Domain;
using Server.Services.ConfigurationService;
using Server.Services.Repositories;

namespace Server.Services.AuthorizationService
{
    internal class AuthService : IAuthService
    {
        private readonly IConfigurationService _configurationService;
        private readonly IUsersRepository _usersRepository;
        private readonly IDistributedCache _distributedCache;

        public AuthService(IConfigurationService configurationService, IUsersRepository usersRepository, IDistributedCache distributedCache)
        {
            _configurationService = configurationService;
            _usersRepository = usersRepository;
            _distributedCache = distributedCache;
        }

        public async Task<AuthenticationResultModel> Authenticate(SignInModel signinModel)
        {
            if (await UserNotExists(signinModel.Login))
            {
                return UserNotExistsResult();
            }

            if (await PasswordIsIncorrect(signinModel))
            {
                return WrongPasswordResult();
            }

            var token = GenerateToken(signinModel.Login);
            await SaveToken(signinModel.Login, token);

            return SignInSuccessResult(token);

        }

        public async Task Logout(string token)
        {
            var login = GetLoginFromToken(token);
            await _distributedCache.RemoveAsync(login);
        }

        private string GetLoginFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadToken(token) as JwtSecurityToken;
            var login = decodedToken.Claims.First(claim => claim.Type == "unique_name").Value;
            return login;
        }

        private async Task SaveToken(string key, string value)
        {
            await _distributedCache.SetAsync(
                key,
                Encoding.UTF8.GetBytes(value),
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpiration = _configurationService.GetTokenExpiration()
                });
        }

        private string GenerateToken(string login)
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

        private async Task<bool> UserNotExists(string login)
        {
            return !await _usersRepository.ExistsLoginAsync(login);
        }

        private async Task<bool> PasswordIsIncorrect(SignInModel user)
        {
            return user.Password != await _usersRepository.GetPasswordAsync(user.Login);
        }

        private AuthenticationResultModel SignInSuccessResult(string token)
        {
            var result = new AuthenticationResultModel
            {
                IsSuccess = true,
                Message = "Successfully signed in",
                Token = token
            };
            return result;
        }
        private AuthenticationResultModel UserNotExistsResult()
        {
            var result = new AuthenticationResultModel
            {
                IsSuccess = false,
                Message = "User with this login not exists",
            };
            return result;
        }

        private AuthenticationResultModel WrongPasswordResult()
        {
            var result = new AuthenticationResultModel
            {
                IsSuccess = false,
                Message = "Wrong password"
            };
            return result;
        }
    }
}