using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;

namespace Server.Services.Authorization
{
    public interface ITokenService
    {
        Task RemoveAsync(string token);
        Task SaveAsync(string login, string token);
        string GenerateToken(string login);
        string GetTokenFromHeader(string header);
        string GetLoginFromHeader(string header);
        string GetLoginFromToken(string token);
        Task<string> RenewToken(string header);
    }
}
