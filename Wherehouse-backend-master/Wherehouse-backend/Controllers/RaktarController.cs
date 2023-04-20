using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wherehouse_backend.Models;
using Wherehouse_backend.Repository;

namespace Wherehouse_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class RaktarController : ControllerBase
    {
        private readonly WherehouseRep _context;

        public RaktarController(WherehouseRep context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Raktar>> Get()
        {
            return await _context.GetRaktarak();
        }

        [HttpGet("id")]
        public async Task<Raktar> Get(int id)
        {
            return await _context.GetRaktar(id);
        }
        [HttpGet("cim")]
        public async Task<IEnumerable<object>> GetAddress(string cim)
        {
            return await _context.GetRaktarAddress(cim);
        }

        [HttpPost]
        public async Task<Raktar> Post(Raktar raktar)
        {
            return await _context.AddRaktar(raktar);
        }
        // kikommenteltem
        /*
        [HttpPut]
        public async Task<Raktar> Put(Raktar raktar)
        {
            return await _context.UpdateRaktar(raktar);
        }
        */

        // én raktam bele

        [HttpPut]
        public IActionResult Put(Raktar raktar)
        {
            using (var context = new WherehousedbContext())
            {
                try
                {
                    context.Raktars.Update(raktar);
                    context.SaveChanges();
                    return Ok("Raktár módosítva");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

        



        //kikommenteltem
        /*
        [HttpDelete]
        public async Task<Raktar> Delete(int id)
        {
            return await _context.DeleteRaktar(id);
        }
        */
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            using (var context = new WherehousedbContext())
            {
                try
                {
                    Raktar raktar = new Raktar();
                    raktar.Id = id;
                    context.Raktars.Remove(raktar);
                    context.SaveChanges();
                    return StatusCode(200, "A raktár adatainak törlése megtörtént.");
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }

    }
}
