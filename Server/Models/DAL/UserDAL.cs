using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models.DAL
{
    public class UserDAL
    {
        public Guid UserId { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public Guid PersonId { get; set; }
        public PersonDAL Person { get; set; }
        public ICollection<FileDAL> Writings { get; set; }
    }
}