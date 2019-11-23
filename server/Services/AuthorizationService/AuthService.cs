using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using Server.Models.Domain;
using Server.Services.ConfigurationService;
using Server.Services.Repositories;

namespace Server.Services.AuthorizationService
{
    internal class AuthService : IAuthService
    {
        private readonly IConfigurationService configurationService;
        private readonly IUsersRepository usersRepository;

        public AuthService(IConfigurationService configurationService, IUsersRepository usersRepository)
        {
            this.configurationService = configurationService;
            this.usersRepository = usersRepository;
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

            return SignInSuccessResult(token);

        }

        private string GenerateToken(string login)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.configurationService.GetSecret());
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, login),
                }),
                Expires = this.configurationService.GetTokenExpiration(),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private async Task<bool> UserNotExists(string login)
        {
            return !await usersRepository.ExistsLoginAsync(login);
        }

        private async Task<bool> PasswordIsIncorrect(SignInModel user)
        {
            return user.Password != await usersRepository.GetPasswordAsync(user.Login);
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