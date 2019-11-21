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
        SignUpModel Map(SignUpModelDTO userDTO);

        SignInModel Map(SignInModelDTO signInModel);

        AuthenticationResultDTO Map(AuthenticationResultModel authenticationResult);
    }
}
