using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models.Domain;
using Server.Models.DTO;

namespace Server.Services.Repositories
{
    public interface IUsersRepository
    {
        Task AddAsync(SignUpModel user);
        Task<bool> ExistsAsync(Predicate<SignUpModel> condition);
        Task<bool> ExistsLoginAsync(string login);
        Task<string> GetPasswordAsync(string login);
    }
}