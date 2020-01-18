using Server.Models.DAL;
using Server.Models.Domain;
using Server.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services.Mapping
{
    public interface IMapService
    {
        SignUpModel Map(SignUpModelDTO userDTO);

        SignInModel Map(SignInModelDTO signInModel);

        AuthenticationResultDTO Map(AuthenticationResultModel authenticationResult);
        UserFileModel Map(UserFileDTO userFileDTO);
        UserDAL Map(SignUpModel signUpModel);
        FileDAL Map(UserFileModel userFile);
        UserFileModel Map(FileDAL fileDAL);
    }
}
