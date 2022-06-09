using System;
using System.Collections.Generic;

namespace Music.Models
{
    public partial class Song
    {
        public long Id { get; set; }
        public string Name { get; set; } = null!;
        public long? ArtistId { get; set; }
        public long? AlbumId { get; set; }
        public string? Genre { get; set; }
        public long? LengthInSec { get; set; }

        public virtual Album? Album { get; set; }
        public virtual Artist? Artist { get; set; }
    }
}
