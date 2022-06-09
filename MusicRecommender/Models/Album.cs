using System;
using System.Collections.Generic;

namespace Music.Models
{
    public partial class Album
    {
        public Album()
        {
            Songs = new HashSet<Song>();
        }

        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public long? ArtistId { get; set; }
        public long? ReleaseYear { get; set; }
        public long? LengthInMin { get; set; }
        public string? Genre { get; set; }

        public virtual Artist? Artist { get; set; }
        public virtual ICollection<Song> Songs { get; set; }
    }
}
