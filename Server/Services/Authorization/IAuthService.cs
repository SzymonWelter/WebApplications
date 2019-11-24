using System.Threading.Tasks;
using Server.Models.Domain;

namespace Server.Services.Authorization
{
    public interface IAuthService
    {
        Task<AuthenticationResultModel> Authenticate(SignInModel signinModel);
        Task Logout(string authHeader);
    }
}