using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Server.DAO;
using Server.Models.DAL;
using Server.Models.Domain;

namespace Server.Services.Repositories
{
    public class FilesRepository : IFilesRepository
    {
        private readonly WebAppContext _context;

        public FilesRepository(WebAppContext context)
        {
            _context = context;
        }

        public async Task<FileDAL> GetFile(Guid fileId)
        {
            return await _context.Files.FindAsync(fileId);
        }


        public async Task<string> GetFileName(Guid fileId)
        {
            var file = await _context.Files.FindAsync(fileId);
            return file.FileName;
        }
        public async Task<IEnumerable<UserFileModel>> GetFiles(IEnumerable<string> filesIds)
        {
            var filesNames = new List<UserFileModel>();
            foreach (var id in filesIds)
            {
                var fileName = await GetFileName(new Guid(id));
                filesNames.Add(new UserFileModel{ FileId = new Guid(id), FileName = fileName});
            }
            return filesNames;
        }
    }
}