using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Models.DTO;
using Server.Services;
using Server.Services.Authorization;
using Server.Services.Mapping;

namespace Server.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IMapService _mapService;
        private readonly IUserService _userService;
        private readonly IAuthService _authService;

        public UserController( IUserService userRepository, IMapService mapService, IAuthService authService)
        {
            _mapService = mapService;
            _userService = userRepository;
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
            await _userService.CreateUser(signUpModel);
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
            var result = await _userService.UserExists(login);
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