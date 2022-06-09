using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Music.Models;

namespace Music.Data
{
    public partial class MusicContext : DbContext
    {
        public MusicContext()
        {
        }

        public MusicContext(DbContextOptions<MusicContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Album> Albums { get; set; } = null!;
        public virtual DbSet<Artist> Artists { get; set; } = null!;
        public virtual DbSet<Song> Songs { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Album>(entity =>
            {
                entity.Property(e => e.ArtistId).HasColumnName("Artist_Id");

                entity.Property(e => e.Genre).HasColumnType("TEXT(32)");

                entity.Property(e => e.LengthInMin).HasColumnName("Length_in_Min");

                entity.Property(e => e.Name).HasColumnType("TEXT(64)");

                entity.Property(e => e.ReleaseYear).HasColumnName("Release_Year");

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Albums)
                    .HasForeignKey(d => d.ArtistId);
            });

            modelBuilder.Entity<Artist>(entity =>
            {
                entity.Property(e => e.FirstName)
                    .HasColumnType("TEXT(32)")
                    .HasColumnName("First_Name");

                entity.Property(e => e.Genre).HasColumnType("TEXT(32)");

                entity.Property(e => e.Lable).HasColumnType("TEXT(32)");

                entity.Property(e => e.LastName)
                    .HasColumnType("TEXT(32)")
                    .HasColumnName("Last_Name");

                entity.Property(e => e.StageName)
                    .HasColumnType("TEXT(64)")
                    .HasColumnName("Stage_Name");
            });

            modelBuilder.Entity<Song>(entity =>
            {
                entity.Property(e => e.AlbumId).HasColumnName("Album_Id");

                entity.Property(e => e.ArtistId).HasColumnName("Artist_Id");

                entity.Property(e => e.Genre).HasColumnType("TEXT(32)");

                entity.Property(e => e.LengthInSec).HasColumnName("Length_in_Sec");

                entity.Property(e => e.Name).HasColumnType("TEXT(64)");

                entity.HasOne(d => d.Album)
                    .WithMany(p => p.Songs)
                    .HasForeignKey(d => d.AlbumId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(d => d.Artist)
                    .WithMany(p => p.Songs)
                    .HasForeignKey(d => d.ArtistId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
