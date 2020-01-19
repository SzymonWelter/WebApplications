using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Server.Models.DTO;
using Server.Services;
using Server.Services.Authorization;
using Server.Services.Configuration;
using Server.Services.Contexts;
using Server.Services.Mapping;
using Server.Services.Repositories;

namespace Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IMapService _mapService;
        private readonly ITokenService _tokenService;
        private readonly IFilesService _filesService;

        public FilesController(IMapService mapService, ITokenService tokenService, IBlobStorageService blobStorageService, IFilesService filesService)
        {
            _mapService = mapService;
            _tokenService = tokenService;
            _filesService = filesService;
        }

        [HttpPost]
        public async Task<ActionResult> UploadFile([FromForm] UserFileDTO userFileDTO)
        {
            var userFile = _mapService.Map(userFileDTO);
            var userId = _tokenService.GetUserIdFromHeader(Request.Headers["Authorization"].ToString());
            userFile.UserId = new Guid(userId);
            await _filesService.CreateFile(userFile);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult> GetFiles()
        {
            var userId = _tokenService.GetUserIdFromHeader(Request.Headers["Authorization"].ToString());
            var files = await _filesService.GetFiles(userId);
            var serializerSettings = new JsonSerializerSettings();
            serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            return Ok(JsonConvert.SerializeObject(new { Files = files }, serializerSettings));
        }

        [HttpGet("download/{fileId}")]
        public async Task<ActionResult> Download(string fileId)
        {
            var userId = _tokenService.GetUserIdFromHeader(Request.Headers["Authorization"].ToString());
            var file = await _filesService.GetFile(userId, fileId);

            return File(file.File, file.ContentType, file.FileName);
        }

        [HttpDelete("{name}")]
        public async Task<ActionResult> DeleteFile(string name)
        {
            string userId = _tokenService.GetUserIdFromHeader(Request.Headers["Authorization"].ToString());
            await _filesService.RemoveFile(userId, name);
            return Ok();
        }
    }
}