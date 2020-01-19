using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.DAO;
using Server.Models.DAL;
using Server.Models.Domain;
using Server.Services.Mapping;

namespace Server.Services.Repositories {
    public class FilesRepository : IFilesRepository {
        private readonly WebAppContext _context;
        private readonly IMapService _mapService;

        public FilesRepository(WebAppContext context, IMapService mapService) {
            _context = context;
            _mapService = mapService;
        }

        public async Task CreateFile(UserFileModel userFileModel)
        {
            var fileDTO = _mapService.Map(userFileModel);
            await _context.Files.AddAsync(fileDTO);
            await _context.SaveChangesAsync();
        }

        public async Task<FileDAL> GetFile(Guid fileId) {
            return await _context.Files.FindAsync(fileId);
        }
        public async Task<IEnumerable<UserFileModel>> GetFiles(Guid userId) {
            return await Task.Run(() => {

                var userFiles = _context.Files.Where(f => f.PublisherId == userId && f.ContentType == "application/pdf");
                var filesNames = new List<UserFileModel>();

                foreach (var uf in userFiles) {
                    var userFileModel = _mapService.Map(uf);
                    filesNames.Add(userFileModel);
                }
                
                return filesNames;
            });
        }
    }
}