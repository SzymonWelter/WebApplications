using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.DTO
{
    public class SignUpModelDTO
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Birthday { get; set; }
        [Required]
        public string Pesel { get; set; }
        [Required]
        public string Sex { get; set; }
        [Required]
        public IFormFile Photo { get; set; }
    }
}
