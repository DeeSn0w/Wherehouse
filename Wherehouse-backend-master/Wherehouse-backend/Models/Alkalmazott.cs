using System;
using System.Collections.Generic;

namespace Wherehouse_backend.Models;

public partial class Alkalmazott
{
    public int Id { get; set; }

    public string Nev { get; set; }

    public string Pozicio { get; set; }

    public int Fizetes { get; set; }
}
