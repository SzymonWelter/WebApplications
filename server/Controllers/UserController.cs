using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using server.Models.DTO;
using server.Services.MapService;
using server.Services.Repositories;

namespace server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly IMapService _mapService;
        private readonly IUsersRepository _usersRepository;

        public UserController(ILogger<UserController> logger, IUsersRepository usersRepository, IMapService mapService)
        {
            _logger = logger;
            _mapService = mapService;
            _usersRepository = usersRepository;
        }

        [HttpPost]
        public async Task<ActionResult> SignUp([FromBody]UserDTO userDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var user = _mapService.Map(userDTO);
            await _usersRepository.AddAsync(user);
            return Ok();
        }

        [HttpGet("username/exists")]
        public async Task<ActionResult<bool>> Exists( string login )
        {
            var result = await _usersRepository.ExistsLoginAsync(login);
            return Ok(result);
        }

    }
}
