using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models.Domain;
using server.Models.DTO;

namespace server.Services.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly List<User> users = new List<User>();
        public void Add(User user)
        {
            users.Add(user);
        }

        public async Task AddAsync(User user)
        {
            await Task.Run(() => Add(user));
        }

        public bool Exists(Predicate<User> condition)
        {
            return users.Exists(condition);
        }

        public async Task<bool> ExistsAsync(Predicate<User> condition)
        {
            return await Task.Run(() => Exists(condition));
        }

        public bool ExistsLogin(string login)
        {
            return Exists(x => x.Login == login);
        }

        public async Task<bool> ExistsLoginAsync(string login)
        {
            return await ExistsAsync(x => x.Login == login);
        }
    }
}
