using Microsoft.AspNetCore.Http;
using server.Models.Enums;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models.Domain
{
    public class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public DateTime Birthday { get; set; }
        public string Pesel { get; set; }
        public Sex Sex { get; set; }
        public IFormFile Photo { get; set; }

    }
}
