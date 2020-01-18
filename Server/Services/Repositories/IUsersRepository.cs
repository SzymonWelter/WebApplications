using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models.DAL;

namespace Server.Services.Repositories
{
    public interface IUsersRepository
    {
        Task AddAsync(UserDAL user, FileDAL photo);
        Task<bool> ExistsAsync(Func<UserDAL,bool> condition);
        Task<string> GetUserId(string username);
        Task<bool> ExistsLoginAsync(string login);
        Task<bool> PasswordIsValid(string username, string password );
    }
}