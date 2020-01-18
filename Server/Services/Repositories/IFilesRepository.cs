using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Server.Models.DAL;
using Server.Models.Domain;

namespace Server.Services.Repositories
{
    public interface IFilesRepository
    {
        Task<IEnumerable<UserFileModel>> GetFiles(IEnumerable<string> filesIds);
        Task<string> GetFileName(Guid fileId);
        Task<FileDAL> GetFile(Guid fileId);
    }
}