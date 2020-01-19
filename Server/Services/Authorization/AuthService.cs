using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.IdentityModel.Tokens;
using Server.Models.Domain;
using Server.Services.Configuration;
using Server.Services.Repositories;

namespace Server.Services.Authorization {
    internal class AuthService : IAuthService {
        private readonly IConfigurationService _configurationService;
        private readonly IUsersRepository _usersRepository;
        private readonly ITokenService _tokenService;

        public AuthService(IConfigurationService configurationService, IUsersRepository usersRepository, ITokenService tokenService) {
            _configurationService = configurationService;
            _usersRepository = usersRepository;
            _tokenService = tokenService;
        }

        public async Task<AuthenticationResultModel> Authenticate(SignInModel signinModel) {
            if (await UserNotExists(signinModel.Login)) {
                return UserNotExistsResult();
            }

            if (await PasswordIsIncorrect(signinModel)) {
                return WrongPasswordResult();
            }
            var userId = await _usersRepository.GetUserId(signinModel.Login);
            var token = _tokenService.GenerateToken(userId);
            await _tokenService.SaveAsync(userId, token);

            return SignInSuccessResult(token);

        }

        public async Task<AuthenticationResultModel> FacebookAuthenticate(SignInModel signinModel) {
            if (await UserNotExists(signinModel.Login)) {
                return UserNotExistsResult();
            }

            var userId = await _usersRepository.GetUserId(signinModel.Login);
            var token = _tokenService.GenerateToken(userId);
            await _tokenService.SaveAsync(userId, token);

            return SignInSuccessResult(token);

        }

        public async Task Logout(string token) {
            await _tokenService.RemoveAsync(token);
        }

        private async Task<bool> UserNotExists(string login) {
            return !await _usersRepository.ExistsLoginAsync(login);
        }

        private async Task<bool> PasswordIsIncorrect(SignInModel user) {
            return !await _usersRepository.PasswordIsValid(user.Login, user.Password);
        }

        private AuthenticationResultModel SignInSuccessResult(string token) {
            var result = new AuthenticationResultModel {
                IsSuccess = true,
                Message = "Successfully signed in",
                Token = token
            };
            return result;
        }
        private AuthenticationResultModel UserNotExistsResult() {
            var result = new AuthenticationResultModel {
                IsSuccess = false,
                Message = "User with this login not exists",
            };
            return result;
        }

        private AuthenticationResultModel WrongPasswordResult() {
            var result = new AuthenticationResultModel {
                IsSuccess = false,
                Message = "Wrong password"
            };
            return result;
        }
    }
}