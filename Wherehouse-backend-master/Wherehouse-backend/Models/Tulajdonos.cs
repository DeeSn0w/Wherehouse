using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Wherehouse_backend.Models;

public partial class Tulajdonos
{
    public int Id { get; set; }

    public string Nev { get; set; } = null!;

    public string email { get; set; } = null!;

    public string password { get; set; } = null!;

    public virtual ICollection<Birtokolt> Birtokolts { get; } = new List<Birtokolt>();
}
