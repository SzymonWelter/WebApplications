using System;
using System.Threading.Tasks;
using Server.Models.Domain;

namespace Server.Services
{
    public interface IUserService
    {
        Task<Guid> CreateUser(SignUpModel signUpModel);
        Task<bool> UserExists(string username);
    }
}