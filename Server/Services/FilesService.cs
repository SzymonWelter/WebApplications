using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Server.Models.Domain;
using Server.Models.DTO;
using Server.Services.Contexts;
using Server.Services.Mapping;
using Server.Services.Repositories;

namespace Server.Services
{
    public class FilesService : IFilesService
    {
        private readonly IBlobStorageService _blobStorageService;
        private readonly IFilesRepository _filesRepository;
        private readonly IMapService _mapService;

        public FilesService(IBlobStorageService blobStorageService, IFilesRepository filesRepository, IMapService mapService)
        {
            _blobStorageService = blobStorageService;
            _filesRepository = filesRepository;
            _mapService = mapService;
        }
        public async Task CreateFile(UserFileModel userFile)
        {
            userFile.FileId = Guid.NewGuid();
            await _blobStorageService.CreateFile(userFile);
            await _filesRepository.CreateFile(userFile);
        }

        public async Task<UserFileModel> GetFile(string userId, string fileId)
        {
            var fileStream = await _blobStorageService.GetFile(userId, fileId);
            var fileMetadata = await _filesRepository.GetFile(new Guid(fileId));
            UserFileModel file = _mapService.Map(fileMetadata);
            file.File = fileStream;
            return file;
        }

        public async Task<IEnumerable<UserFileModel>> GetFiles(string userId)
        {
            return await _filesRepository.GetFiles(new Guid(userId));
        }

        public async Task RemoveFile(string userId, string name)
        {
            await _blobStorageService.RemoveFile(userId, name);
        }
    }
}