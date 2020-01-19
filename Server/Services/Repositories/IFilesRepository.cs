using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models.DAL;
using Server.Models.Domain;

namespace Server.Services.Repositories
{
    public interface IFilesRepository
    {
        Task<IEnumerable<UserFileModel>> GetFiles(Guid userId);
        Task<FileDAL> GetFile(Guid fileId);

        Task CreateFile(UserFileModel userFileModel);
    }
}