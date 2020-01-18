using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Server.Models.Domain;
namespace Server.Services
{
    public interface IFilesService
    {
        Task CreateFile(UserFileModel userFile);
        Task<UserFileModel> GetFile(string userId, string fileId);
        Task<IEnumerable<UserFileModel>> GetFiles(string userId);
        Task RemoveFile(string userId, string name);
    }
}