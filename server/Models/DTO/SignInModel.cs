namespace server.Models.DTO
{
    public class SignInModelDTO
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public bool RememberMe { get; set; }
    }
}