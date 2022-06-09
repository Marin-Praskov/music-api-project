﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Music.Data;
using Music.Models;

namespace MusicRecommendor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArtistsController : ControllerBase
    {
        private readonly MusicContext _context;

        public ArtistsController(MusicContext context)
        {
            _context = context;
        }

        // GET: api/Artists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Artist>>> GetArtists()
        {
          if (_context.Artists == null)
          {
              return NotFound();
          }
            return await _context.Artists.ToListAsync();
        }

        // GET: api/Artists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Artist>> GetArtist(long id)
        {
          if (_context.Artists == null)
          {
              return NotFound();
          }
            var artist = await _context.Artists.FindAsync(id);

            if (artist == null)
            {
                return NotFound();
            }

            return artist;
        }

        // PUT: api/Artists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutArtist(long id, Artist artist)
        {
            if (id != artist.Id)
            {
                return BadRequest();
            }

            _context.Entry(artist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ArtistExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Artists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Artist>> PostArtist(Artist artist)
        {
          if (_context.Artists == null)
          {
              return Problem("Entity set 'MusicContext.Artists'  is null.");
          }
            _context.Artists.Add(artist);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetArtist", new { id = artist.Id }, artist);
        }

        // DELETE: api/Artists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteArtist(long id)
        {
            if (_context.Artists == null)
            {
                return NotFound();
            }
            var artist = await _context.Artists.FindAsync(id);
            if (artist == null)
            {
                return NotFound();
            }

            _context.Artists.Remove(artist);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ArtistExists(long id)
        {
            return (_context.Artists?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        [HttpGet("GetArtistByName")]
        public async Task<IEnumerable<Artist>> GetArtistByName(String name)
        {
            return await _context.Artists.Where(a => a.StageName == name).ToListAsync();
        }
    }
}
