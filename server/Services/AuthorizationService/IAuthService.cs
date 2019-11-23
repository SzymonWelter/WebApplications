using System.Threading.Tasks;
using Server.Models.Domain;

namespace Server.Services.AuthorizationService
{
    public interface IAuthService
    {
        Task<AuthenticationResultModel> Authenticate(SignInModel signinModel);
    }
}