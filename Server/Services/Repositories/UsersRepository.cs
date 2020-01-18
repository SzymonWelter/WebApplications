using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using Server.DAO;
using Server.Models.DAL;
using Server.Models.Domain;
using Server.Models.DTO;

namespace Server.Services.Repositories
{
    internal class UsersRepository : IUsersRepository
    {
        private readonly WebAppContext _context;

        public UsersRepository(WebAppContext webAppContext)
        {
            _context = webAppContext;
        }
        public async Task AddAsync(UserDAL user, FileDAL photo)
        {
            await _context.Files.AddAsync(photo);
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();

            photo = await _context.Files.FindAsync(photo.FileId);
            photo.PublisherId = user.UserId;
            photo.AuthorId = user.PersonId;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> ExistsAsync(Func<UserDAL, bool> condition)
        {
            return await Task.Run(() =>
            {
                var users = _context.Users.Where(condition);
                return users.Count() != 0;
            });
        }

        public async Task<string> GetUserId(string username)
        {
            return await Task.Run(() =>
            {
                var userId = _context.Users.Where( user => user.Login == username).First().UserId;
                return userId.ToString();
            });
        }

        public async Task<bool> ExistsLoginAsync(string login)
        {
            return await ExistsAsync(user => user.Login == login);
        }

        public async Task<bool> PasswordIsValid(string username, string password)
        {
            return await Task.Run(() =>
            {
                var user = _context.Users.Where(user => user.Login == username && user.Password == password);
                var result = user.Count() != 0;
                return result;
            });
        }
    }
}