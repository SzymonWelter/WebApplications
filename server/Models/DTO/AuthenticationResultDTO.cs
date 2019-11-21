namespace server.Models.DTO
{
    public class AuthenticationResultDTO
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
    }
}