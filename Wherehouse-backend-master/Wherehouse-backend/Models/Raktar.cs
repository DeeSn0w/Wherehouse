using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Wherehouse_backend.Models;

public partial class Raktar
{
    public int Id { get; set; }

    public string Cím { get; set; } = null!;

    public string Tipus { get; set; } = null!;

    public int Ar { get; set; }

    public string Meret { get; set; } = null!;

    public string Kepurl { get; set; } = null!;

    public bool Elvittek { get; set; }

    [JsonIgnore]
    public virtual Birtokolt? Birtokolt { get; set; }
}
