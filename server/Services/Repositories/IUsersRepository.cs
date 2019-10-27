using server.Models.Domain;
using server.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.Repositories
{
    public interface IUsersRepository
    {
        void Add(User user);
        Task AddAsync(User user);
        bool Exists(Predicate<User> condition);
        Task<bool> ExistsAsync(Predicate<User> condition);
        bool ExistsLogin(string login);
        Task<bool> ExistsLoginAsync(string login);
    }
}
