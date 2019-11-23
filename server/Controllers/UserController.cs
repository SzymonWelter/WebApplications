using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Models.DTO;
using server.Services.AuthorizationService;
using server.Services.MapService;
using server.Services.Repositories;

namespace server.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IMapService _mapService;
        private readonly IUsersRepository _usersRepository;
        private readonly IAuthService _authorizationService;

        public UserController(ILogger<UserController> logger, IUsersRepository usersRepository, IMapService mapService, IAuthService authorizationService)
        {
            _logger = logger;
            _mapService = mapService;
            _usersRepository = usersRepository;
            _authorizationService = authorizationService;
        }

        [HttpPost("signup")]
        public async Task<ActionResult> SignUp([FromForm] SignUpModelDTO signUpModelDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var signUpModel = _mapService.Map(signUpModelDTO);
            await _usersRepository.AddAsync(signUpModel);
            return Ok();
        }

        [HttpPost("authenticate")]
        public async Task<ActionResult<AuthenticationResultDTO>> Authenticate([FromForm] SignInModelDTO signInModelDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var signInModel = _mapService.Map(signInModelDTO);

            var authResult = await _authorizationService.Authenticate(signInModel);

            var authResultDTO = _mapService.Map(authResult);

            return Ok(authResultDTO);
        }

        [HttpGet("login/exists")]
        public async Task<ActionResult> Exists(string login)
        {
            var result = await _usersRepository.ExistsLoginAsync(login);
            return Ok(new { Exists = result });
        }
    }
}