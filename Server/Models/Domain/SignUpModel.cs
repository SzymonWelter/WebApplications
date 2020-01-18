using Microsoft.AspNetCore.Http;
using Server.Models.Enums;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Domain
{
    public class SignUpModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public DateTime Birthday { get; set; }
        public string Pesel { get; set; }
        public Sex Sex { get; set; }
        public UserFileModel Photo { get; set; }

    }
}
