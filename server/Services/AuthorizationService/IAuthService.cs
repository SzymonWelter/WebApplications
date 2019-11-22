using System.Threading.Tasks;
using server.Models.Domain;

namespace server.Services.AuthorizationService
{
    public interface IAuthService
    {
        Task<AuthenticationResultModel> Authenticate(SignInModel signinModel);
    }
}