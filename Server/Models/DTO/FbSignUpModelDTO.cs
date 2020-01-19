using System.ComponentModel.DataAnnotations;

namespace Server.Models.DTO {
    public class FbSignUpModelDTO {
        [Required]
        public string AccessToken { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PhotoUrl { get; set; }

        [Required]
        public string Sex { get; set; }
    }
}