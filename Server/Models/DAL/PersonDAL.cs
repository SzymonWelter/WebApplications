using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models.DAL
{
    public class PersonDAL
    {
        public Guid PersonId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime? Birthday { get; set; }
        public string Pesel { get; set; }
        public Guid PhotoId { get; set; }
        public FileDAL Photo { get; set; }
        public char Sex {get;set;}
        public ICollection<FileDAL> Writings { get; set; }
        public UserDAL User { get; set; }
    }
}