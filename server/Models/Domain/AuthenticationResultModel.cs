namespace server.Models.Domain
{
    public class AuthenticationResultModel
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
    }
}