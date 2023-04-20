using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wherehouse_backend.Models;
using Wherehouse_backend.Repository;

namespace Wherehouse_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TulajdonosController : ControllerBase
    {
        private readonly WherehouseRep _context;

        public TulajdonosController(WherehouseRep context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Tulajdonos>> Get()
        {
            return await _context.GetTulajdonosok();
        }

        [HttpGet("id")]
        public async Task<Tulajdonos> Get(int id)
        {
            return await _context.GetTulajdonos(id);
        }

        [HttpGet("name")]
        public async Task<IEnumerable<object>> GetName(string name)
        {
            return await _context.GetTulajdonosName(name);
        }

        [HttpPost]
        public async Task<Tulajdonos> Post(Tulajdonos tulaj)
        {
            return await _context.AddTulajdonos(tulaj);
        }

        [HttpPut]
        public async Task<Tulajdonos> Put(Tulajdonos tulaj)
        {
            return await _context.UpdateTulajdonos(tulaj);
        }

        [HttpDelete]
        public async Task<Tulajdonos> Delete(int id)
        {
            return await _context.DeleteTulajdonos(id);
        }

    }
}
