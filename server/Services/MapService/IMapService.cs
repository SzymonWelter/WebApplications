using server.Models.Domain;
using server.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.MapService
{
    public interface IMapService
    {
        User Map(UserDTO userDTO);
    }
}
