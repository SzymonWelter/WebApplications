using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Server.Models.Domain;
using Server.Models.DTO;
using Server.Models.Enums;

namespace Server.Services.Mapping
{
    public class MapService : IMapService
    {
        public SignUpModel Map(SignUpModelDTO userDTO)
        {
            var result = new SignUpModel
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
            return result;
        }

        public SignInModel Map(SignInModelDTO signInModel)
        {
            var result = new SignInModel
            {
                Login = signInModel.Login,
                Password = signInModel.Password
            };
            return result;
        }

        public AuthenticationResultDTO Map(AuthenticationResultModel authenticationResult)
        {
            var result = new AuthenticationResultDTO
            {
                IsSuccess = authenticationResult.IsSuccess,
                Message = authenticationResult.Message,
                Token = authenticationResult.Token
            };
            return result;
        }

        public UserFileModel Map(UserFileDTO userFileDTO)
        {
            var userFileModel = new UserFileModel
            {
                File = new MemoryStream()
            };
            userFileDTO.File.CopyTo(userFileModel.File);
            userFileModel.FileName = userFileDTO.File.FileName;
            userFileModel.ContentType = userFileDTO.File.ContentType;
            return userFileModel;
        }
    }
}