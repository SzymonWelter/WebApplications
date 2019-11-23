using Server.Models.Domain;
using Server.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Services.MapService
{
    public interface IMapService
    {
        SignUpModel Map(SignUpModelDTO userDTO);

        SignInModel Map(SignInModelDTO signInModel);

        AuthenticationResultDTO Map(AuthenticationResultModel authenticationResult);
    }
}
