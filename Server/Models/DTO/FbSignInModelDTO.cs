using System.ComponentModel.DataAnnotations;

namespace Server.Models.DTO {
    public class FbSignInModelDTO {
        [Required]
        public string Email { get; set; }

        [Required]
        public string AccessToken { get; set; }
    }
}