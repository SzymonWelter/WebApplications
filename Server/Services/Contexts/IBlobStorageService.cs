using System.IO;
using System.Threading.Tasks;
using Server.Models.Domain;

namespace Server.Services.Contexts
{
    public interface IBlobStorageService
    {
        Task CreateContainer(string userId);
        Task CreateFile(UserFileModel userFile);
        Task<string []> GetFilesIds(string login);
        Task RemoveFile(string login, string name);
        Task<MemoryStream> GetFile(string login, string name);
    }
}