using Microsoft.AspNetCore.Http;
using Server.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.DTO
{
    public class UserFileDTO
    {
        [Required]
        [AllowedExtensions( new [] {".pdf"})]
        public IFormFile File { get; set; }
    }
}
