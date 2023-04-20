using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Wherehouse_backend.Models;

public partial class Birtokolt
{
    public int Id { get; set; }

    public int Raktarid { get; set; }

    public int Tulajid { get; set; }

    public virtual Raktar Raktar { get; set; } = null!;

    public virtual Tulajdonos Tulaj { get; set; } = null!;
}
