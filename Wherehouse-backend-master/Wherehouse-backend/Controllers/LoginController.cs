using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Wherehouse_backend.Models;
using Wherehouse_backend.Repository;

namespace Wherehouse_backend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly WherehousedbContext _context;

        public LoginController(WherehousedbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult Login(string name, string password)
        {
            var tulajdonos = _context.Tulajdonos.FirstOrDefault(t => t.Nev == name && t.password == password);

            if (tulajdonos == null)
            {
                return BadRequest("Hibás felhasználónév vagy jelszó");
            }

            return Ok(tulajdonos);
        }
    }
}
