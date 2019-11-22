using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models.Domain;
using server.Models.DTO;

namespace server.Services.Repositories
{
    public interface IUsersRepository
    {
        Task AddAsync(SignUpModel user);
        Task<bool> ExistsAsync(Predicate<SignUpModel> condition);
        Task<bool> ExistsLoginAsync(string login);
        Task<string> GetPasswordAsync(string login);
    }
}