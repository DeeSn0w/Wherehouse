using Microsoft.EntityFrameworkCore.Migrations;
using MySql.EntityFrameworkCore.Metadata;

#nullable disable

namespace Wherehouse_backend.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "alkalmazott",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    nev = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    pozicio = table.Column<string>(type: "varchar(75)", maxLength: 75, nullable: false),
                    fizetes = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "raktar",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    cím = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    tipus = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    ar = table.Column<int>(type: "int(20)", nullable: false),
                    meret = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false),
                    kepurl = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: false),
                    elvittek = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "tulajdonos",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    nev = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    email = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    password = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "birtokolt",
                columns: table => new
                {
                    id = table.Column<int>(type: "int(11)", nullable: false)
                        .Annotation("MySQL:ValueGenerationStrategy", MySQLValueGenerationStrategy.IdentityColumn),
                    raktarid = table.Column<int>(type: "int(11)", nullable: false),
                    tulajid = table.Column<int>(type: "int(11)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.id);
                    table.ForeignKey(
                        name: "birtokolt_ibfk_1",
                        column: x => x.raktarid,
                        principalTable: "raktar",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "birtokolt_ibfk_2",
                        column: x => x.tulajid,
                        principalTable: "tulajdonos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "raktarid",
                table: "birtokolt",
                column: "raktarid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "tulajid",
                table: "birtokolt",
                column: "tulajid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "alkalmazott");

            migrationBuilder.DropTable(
                name: "birtokolt");

            migrationBuilder.DropTable(
                name: "raktar");

            migrationBuilder.DropTable(
                name: "tulajdonos");
        }
    }
}
