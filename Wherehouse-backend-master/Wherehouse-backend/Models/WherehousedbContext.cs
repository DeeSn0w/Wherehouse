using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Wherehouse_backend.Models;

public partial class WherehousedbContext : DbContext
{
    public WherehousedbContext()
    {
    }

    public WherehousedbContext(DbContextOptions<WherehousedbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Alkalmazott> Alkalmazotts { get; set; }

    public virtual DbSet<Birtokolt> Birtokolts { get; set; }

    public virtual DbSet<Raktar> Raktars { get; set; }

    public virtual DbSet<Tulajdonos> Tulajdonos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;database=wherehousedb;user=root;password=;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Alkalmazott>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("alkalmazott");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Fizetes)
                .HasColumnType("int(11)")
                .HasColumnName("fizetes");
            entity.Property(e => e.Nev)
                .HasMaxLength(50)
                .HasColumnName("nev");
            entity.Property(e => e.Pozicio)
                .HasMaxLength(75)
                .HasColumnName("pozicio");
        });

        modelBuilder.Entity<Birtokolt>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("birtokolt");

            entity.HasIndex(e => e.Raktarid, "raktarid").IsUnique();

            entity.HasIndex(e => e.Tulajid, "tulajid");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Raktarid)
                .HasColumnType("int(11)")
                .HasColumnName("raktarid");
            entity.Property(e => e.Tulajid)
                .HasColumnType("int(11)")
                .HasColumnName("tulajid");

            entity.HasOne(d => d.Raktar).WithOne(p => p.Birtokolt)
                .HasForeignKey<Birtokolt>(d => d.Raktarid)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("birtokolt_ibfk_1");

            entity.HasOne(d => d.Tulaj).WithMany(p => p.Birtokolts)
                .HasForeignKey(d => d.Tulajid)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("birtokolt_ibfk_2");
        });

        modelBuilder.Entity<Raktar>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("raktar");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Ar)
                .HasColumnType("int(20)")
                .HasColumnName("ar");
            entity.Property(e => e.Cím)
                .HasMaxLength(100)
                .HasColumnName("cím");
            entity.Property(e => e.Kepurl)
                .HasMaxLength(255)
                .HasColumnName("kepurl");
            entity.Property(e => e.Meret)
                .HasMaxLength(30)
                .HasColumnName("meret");
            entity.Property(e => e.Tipus)
                .HasMaxLength(50)
                .HasColumnName("tipus");
            entity.Property(e => e.Elvittek)
                .HasColumnName("elvittek");
        });

        modelBuilder.Entity<Tulajdonos>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tulajdonos");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Nev)
                .HasMaxLength(100)
                .HasColumnName("nev");
            entity.Property(e => e.email)
                .HasMaxLength(100)
                .HasColumnName("email");
            entity.Property(e => e.password)
                .HasMaxLength(100)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
