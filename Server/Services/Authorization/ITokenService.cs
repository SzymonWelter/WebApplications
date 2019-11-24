using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services.Authorization
{
    public interface ITokenService
    {
        Task RemoveAsync(string token);
        Task SaveAsync(string login, string token);
        string GenerateToken(string login);
        string GetLoginFromToken(string token);
    }
}
