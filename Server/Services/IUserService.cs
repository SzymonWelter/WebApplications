using System;
using System.IO;
using System.Threading.Tasks;
using Server.Models.Domain;

namespace Server.Services
{
    public interface IUserService
    {
        Task<Guid> CreateUser(SignUpModel signUpModel);
        Task<MemoryStream> GetFbPhoto(string url);
        Task<bool> UserExists(string username);
    }
}