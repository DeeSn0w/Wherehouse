using Wherehouse_backend.Repository;
using Wherehouse_backend.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Wherehouse_backend.Service
{
    public class WherehouseService : WherehouseRep
    {
        private readonly WherehousedbContext _context;

        public WherehouseService(WherehousedbContext context)
        {
            _context = context;
        }

        //Alkalmazott
        public async Task<IEnumerable<Alkalmazott>> GetAlkalmazottak()
        {
            return await _context.Alkalmazotts.ToListAsync();
        }
        public async Task<Alkalmazott> GetAlkalmazott(int AlkalmazottId)
        {
            return await _context.Alkalmazotts.FindAsync(AlkalmazottId);
        }

        public async Task<IEnumerable<object>> GetAlkalmazottName(string name)
        {
            var result = from Alkalmazotttable in _context.Alkalmazotts where Alkalmazotttable.Nev.Contains(name) select new { Alkalmazotttable };
            return await result.ToListAsync();
        }
        public async Task<Alkalmazott> AddAlkalmazott(Alkalmazott alkalmazott)
        {
            _context.Alkalmazotts.Add(alkalmazott);
            await _context.SaveChangesAsync();
            return alkalmazott;
        }


        public async Task<Alkalmazott> UpdateAlkalmazott(Alkalmazott alkalmazott)
        {
            _context.Alkalmazotts.Update(alkalmazott);
            await _context.SaveChangesAsync();
            return alkalmazott;
        }

        public async Task<Alkalmazott> DeleteAlkalmazott(int AlkalmazottId)
        {
            Alkalmazott alkalmazott = new Alkalmazott();
            alkalmazott.Id = AlkalmazottId;
            _context.Alkalmazotts.Remove(alkalmazott);
            await _context.SaveChangesAsync();
            return alkalmazott;

        }
        //
        //Raktar
        public async Task<IEnumerable<Raktar>> GetRaktarak()
        {
            return await _context.Raktars.ToListAsync();
        }

        public async Task<Raktar> GetRaktar(int RaktarId)
        {
            return await _context.Raktars.FindAsync(RaktarId);
        }
        public async Task<IEnumerable<object>> GetRaktarAddress(string cim)
        {
            var result = from Raktartable in _context.Raktars where Raktartable.Cím.Contains(cim) select new { Raktartable };
            return await result.ToListAsync();
        }
        public async Task<Raktar> AddRaktar(Raktar raktar)
        {
            _context.Raktars.Add(raktar);
            await _context.SaveChangesAsync();
            return raktar;
        }
        public async Task<Raktar> UpdateRaktar(Raktar raktar)
        {
            _context.Raktars.Update(raktar);
            await _context.SaveChangesAsync();
            return raktar;
        }


        /*
            public async Task<Raktar> ElvittekRaktar(int raktarId,bool elvittek)
            {
                Raktar raktar = new Raktar();
                raktar.Id = raktarId;
                raktar.Elvittek = elvittek;
                _context.Raktars.Update(raktar);
                await _context.SaveChangesAsync();
                return raktar;
            }
        */
        public async Task<Raktar> DeleteRaktar(int RaktarId)
        {
            Raktar raktar = new Raktar();
            raktar.Id = RaktarId;
            _context.Raktars.Remove(raktar);
            await _context.SaveChangesAsync();
            return raktar;
        }


        //
        //Tulajdonos

        public async Task<IEnumerable<Tulajdonos>> GetTulajdonosok()
        {
            return await _context.Tulajdonos.ToListAsync();
        }

        public async Task<Tulajdonos> GetTulajdonos(int tulajId)
        {
            return await _context.Tulajdonos.FindAsync(tulajId);
        }

        public async Task<IEnumerable<object>> GetTulajdonosName(string name)
        {
            var result = from tulajtable in _context.Tulajdonos where tulajtable.Nev.Contains(name) select new { tulajtable };
            return await result.ToListAsync();
        }

        public async Task<Tulajdonos> AddTulajdonos(Tulajdonos tulaj)
        {
            _context.Tulajdonos.Add(tulaj);
            await _context.SaveChangesAsync();
            return tulaj;
        }
        public async Task<Tulajdonos> UpdateTulajdonos(Tulajdonos tulaj)
        {
            _context.Tulajdonos.Update(tulaj);
            await _context.SaveChangesAsync();
            return tulaj;
        }

        public async Task<Tulajdonos> DeleteTulajdonos(int tulajId)
        {
            Tulajdonos tulaj = new Tulajdonos();
            tulaj.Id = tulajId;
            _context.Tulajdonos.Remove(tulaj);
            await _context.SaveChangesAsync();
            return tulaj;
        }
        public async Task<Tulajdonos> GetTulajdonosByEmailAndPassword(string email, string password)
        {
            return await _context.Tulajdonos.FirstOrDefaultAsync(t => t.email == email && t.password == password);
        }
        //
        //birtokolt
        public async Task<IEnumerable<Birtokolt>> GetBirtokoltak()
        {
            return await _context.Birtokolts.ToListAsync();
        }

        public async Task<Birtokolt> GetBirtokolt(int BirtokoltId)
        {
            return await _context.Birtokolts.FindAsync(BirtokoltId);
        }

        public async Task<Birtokolt> AddBirtokolt(int raktarId, int tulajId)
        {
            Birtokolt birtokolt = new Birtokolt();
            birtokolt.Raktarid = raktarId;
            birtokolt.Tulajid = tulajId;
            _context.Birtokolts.Add(birtokolt);
            await _context.SaveChangesAsync();
            return birtokolt;
        }
        public async Task<Birtokolt> UpdateBirtokolt(int id, int raktarId, int tulajId)
        {
            Birtokolt birtokolt = new Birtokolt();
            birtokolt.Id = id;
            birtokolt.Raktarid = raktarId;
            birtokolt.Tulajid = tulajId;
            _context.Birtokolts.Update(birtokolt);
            await _context.SaveChangesAsync();
            return birtokolt;
        }

        public async Task<Birtokolt> DeleteBirtokolt(int BirtokoltId)
        {
            Birtokolt birtokolt = new Birtokolt();
            birtokolt.Id = BirtokoltId;
            _context.Birtokolts.Remove(birtokolt);
            await _context.SaveChangesAsync();
            return birtokolt;
        }
        //én raktam bele
        public async Task<Birtokolt> DeleteBirtokoltByRaktarId(int raktarid)
        {
            var birtokolt = _context.Birtokolts.FirstOrDefault(b => b.Raktarid == raktarid);
            if (birtokolt != null)
            {
                _context.Birtokolts.Remove(birtokolt);
                await _context.SaveChangesAsync();
            }
            return birtokolt;
        }

        //2023-04-12
        public async Task<List<Birtokolt>> DeleteBirtokoltByTulajId(int tulajid)
        {
            var birtokolts = _context.Birtokolts.Where(b => b.Tulajid == tulajid).ToList();
            if (birtokolts.Any())
            {
                _context.Birtokolts.RemoveRange(birtokolts);
                await _context.SaveChangesAsync();
            }
            return birtokolts;
        }
    }
}
