using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wherehouse_backend.Models;
using Wherehouse_backend.Repository;

namespace Wherehouse_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AlkalmazottController : ControllerBase
    {
        private readonly WherehouseRep _context;

        public AlkalmazottController(WherehouseRep context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IEnumerable<Alkalmazott>> Get()
        {
            return await _context.GetAlkalmazottak();
        }

        [HttpGet("id")]
        public async Task<Alkalmazott> Get(int id)
        {
            return await _context.GetAlkalmazott(id);
        }

        [HttpGet("name")]
        public async Task<IEnumerable<object>> GetName(string name)
        {
            return await _context.GetAlkalmazottName(name);
        }

        [HttpPost]
        public async Task<Alkalmazott> Post(Alkalmazott alkalmazott)
        {
            return await _context.AddAlkalmazott(alkalmazott);
        }

        [HttpPut]
        public async Task<Alkalmazott> Put(Alkalmazott alkalmazott)
        {
            return await _context.UpdateAlkalmazott(alkalmazott);
        }

        [HttpDelete]
        public async Task<Alkalmazott> Delete(int id)
        {
            return await _context.DeleteAlkalmazott(id);
        }

    }
}
