using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Server.Models.DAL;
using Server.Models.Domain;
using Server.Models.DTO;

namespace Server.Services.Mapping {
    public interface IMapService {
        SignUpModel Map (SignUpModelDTO userDTO);
        SignUpModel Map (FbSignUpModelDTO userDTO);
        SignInModel Map (SignInModelDTO signInModel);
        AuthenticationResultDTO Map (AuthenticationResultModel authenticationResult);
        UserFileModel Map (UserFileDTO userFileDTO);
        UserDAL Map (SignUpModel signUpModel);
        FileDAL Map (UserFileModel userFile);
        UserFileModel Map (FileDAL fileDAL);
        SignInModel Map(FbSignInModelDTO fbSignInModelDTO);
    }
}