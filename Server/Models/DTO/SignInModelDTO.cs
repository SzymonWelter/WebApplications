using System.ComponentModel.DataAnnotations;

namespace Server.Models.DTO
{
    public class SignInModelDTO
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
    }
}