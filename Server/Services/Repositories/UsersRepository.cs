using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models.Domain;
using Server.Models.DTO;

namespace Server.Services.Repositories
{
    internal class UsersRepository : IUsersRepository
    {
        private readonly List<SignUpModel> users = new List<SignUpModel>();
        private void Add(SignUpModel user)
        {
            users.Add(user);
        }

        public async Task AddAsync(SignUpModel user)
        {
            await Task.Run(() => Add(user));
        }

        private bool Exists(Predicate<SignUpModel> condition)
        {
            return users.Exists(condition);
        }

        public async Task<bool> ExistsAsync(Predicate<SignUpModel> condition)
        {
            return await Task.Run(() => Exists(condition));
        }

        private bool ExistsLogin(string login)
        {
            return Exists(x => x.Login == login);
        }

        public async Task<bool> ExistsLoginAsync(string login)
        {
            return await ExistsAsync(x => x.Login == login);
        }

        public async Task<string> GetPasswordAsync(string login)
        {
            return await Task.Run(() => GetPassword(login));
        }

        private string GetPassword(string login)
        {
            var user = users.Find(user => user.Login == login);
            return user.Password;
        }
    }
}