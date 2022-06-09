using System;
using System.Collections.Generic;

namespace Music.Models
{
    public partial class Artist
    {
        public Artist()
        {
            Albums = new HashSet<Album>();
            Songs = new HashSet<Song>();
        }

        public long Id { get; set; }
        public string StageName { get; set; } = null!;
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public long? Age { get; set; }
        public string? Lable { get; set; }
        public string? Genre { get; set; }

        public virtual ICollection<Album> Albums { get; set; }
        public virtual ICollection<Song> Songs { get; set; }
    }
}
