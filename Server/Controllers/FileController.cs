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
    public class FileController : ControllerBase
    {
        private readonly IMapService _mapService;
        private readonly ITokenService _tokenService;
        private readonly IBlobStorageService _blobStorageService;

        public FileController(IMapService mapService, ITokenService tokenService, IBlobStorageService blobStorageService)
        {
            _mapService = mapService;
            _tokenService = tokenService;
            _blobStorageService = blobStorageService;
        }
        [HttpPost]
        public async Task<ActionResult> UploadFile(UserFileDTO userFileDTO)
        {
            var userFile = _mapService.Map(userFileDTO);
            userFile.Login = _tokenService.GetLoginFromToken(Request.Headers["Authorization"].ToString());

            await _blobStorageService.CreateBlob(userFile);
            return Ok();
        }
    }
}