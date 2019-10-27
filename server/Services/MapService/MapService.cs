using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models.Domain;
using server.Models.DTO;
using server.Models.Enums;

namespace server.Services.MapService
{
    public class MapService : IMapService
    {
        public User Map(UserDTO userDTO)
        {
            return new User
            {
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Login = userDTO.Login,
                Password = userDTO.Password,
                Birthday = DateTime.Parse(userDTO.Birthday),
                Pesel = userDTO.Pesel,
                Sex = Enum.Parse<Sex>(userDTO.Sex, true),
                Photo = userDTO.Photo
            };
        }
    }
}
