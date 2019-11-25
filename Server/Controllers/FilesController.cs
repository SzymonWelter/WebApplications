using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.DTO;
using Server.Services.Authorization;
using Server.Services.Configuration;
using Server.Services.Contexts;
using Server.Services.Mapping;

namespace Server.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IMapService _mapService;
        private readonly ITokenService _tokenService;
        private readonly IBlobStorageService _blobStorageService;

        public FilesController(IMapService mapService, ITokenService tokenService, IBlobStorageService blobStorageService)
        {
            _mapService = mapService;
            _tokenService = tokenService;
            _blobStorageService = blobStorageService;
        }
        [HttpPost]
        public async Task<ActionResult> UploadFile([FromForm]UserFileDTO userFileDTO)
        {
            var userFile = _mapService.Map(userFileDTO);
            userFile.Login = _tokenService.GetLoginFromHeader(Request.Headers["Authorization"].ToString());

            await _blobStorageService.CreateFile(userFile);

            return Ok();
        }

        [HttpGet]
        public async Task<ActionResult<string []>> GetFilesNames(){
            string login = _tokenService.GetLoginFromHeader(Request.Headers["Authorization"].ToString());
            var filesNames = await _blobStorageService.GetFilesNames(login);
            return Ok(filesNames);
        }

        [HttpGet("download/{name}")]
        public async Task<ActionResult> Download(string name)
        {
            var login = _tokenService.GetLoginFromHeader(Request.Headers["Authorization"].ToString());
            var file = await _blobStorageService.GetFile(login, name);
            
            return File(file, "application/octet-stream");
        }

        [HttpDelete("{name}")]
        public async Task<ActionResult> DeleteFile(string name)
        {
            string login = _tokenService.GetLoginFromHeader(Request.Headers["Authorization"].ToString());
            await _blobStorageService.RemoveFile(login, name);
            return Ok();
        }
    }
}