using System.IO;
using System.Threading.Tasks;
using Server.Models.Domain;

namespace Server.Services.Contexts
{
    public interface IBlobStorageService
    {
        Task CreateFile(UserFileModel userFile);
        Task<string []> GetFilesNames(string login);
        Task RemoveFile(string login, string name);
        Task<MemoryStream> GetFile(string login, string name);
    }
}