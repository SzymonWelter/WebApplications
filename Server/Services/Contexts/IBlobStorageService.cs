using System.Threading.Tasks;
using Server.Models.Domain;

namespace Server.Services.Contexts
{
    public interface IBlobStorageService
    {
        Task CreateBlob(UserFileModel userFile);
        Task<string []> GetFilesNames(string login);
    }
}