﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Server.Models.Domain
{
    public class UserFileModel
    {
        public Guid FileId { get; set; }
        public Guid UserId { get; set; }
        public MemoryStream File { get; set; }
        public string FileName { get; set; }
        public string ContentType { get; set; }
    }
}
