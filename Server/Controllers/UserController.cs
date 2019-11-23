using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.DTO;
using Server.Services.AuthorizationService;
using Server.Services.MapService;
using Server.Services.Repositories;

namespace Server.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMapService _mapService;
        private readonly IUsersRepository _usersRepository;
        private readonly IAuthService _authService;

        public UserController( IUsersRepository usersRepository, IMapService mapService, IAuthService authService)
        {
            _mapService = mapService;
            _usersRepository = usersRepository;
            _authService = authService;
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

            var authResult = await _authService.Authenticate(signInModel);

            var authResultDTO = _mapService.Map(authResult);

            return Ok(authResultDTO);
        }

        [HttpGet("login/exists")]
        public async Task<ActionResult> Exists(string login)
        {
            var result = await _usersRepository.ExistsLoginAsync(login);
            return Ok(new { Exists = result });
        }

        [Authorize]
        [HttpDelete("logout")]
        public async Task<ActionResult> Logout()
        {
            await _authService.Logout(Request.Headers["Authorization"].ToString());
            return Ok();
        }
    }
}