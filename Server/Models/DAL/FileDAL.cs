using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Server.Models.DAL
{
    public class FileDAL
    {
        public Guid FileId { get; set; }
        public string FileName { get; set; }
        public Guid? AuthorId { get; set; }
        public PersonDAL Author { get; set; }
        public Guid? PublisherId { get; set; }
        public UserDAL Publisher { get; set; }
        public string ContentType { get; set; }
    }
}