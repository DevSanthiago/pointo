using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PointO.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "registros_ponto",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    empresa = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    cnpj = table.Column<string>(type: "character varying(18)", maxLength: 18, nullable: false),
                    local = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    nome_funcionario = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    data_ponto = table.Column<DateOnly>(type: "date", nullable: false),
                    horario_ponto = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    imagem_url = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    imagem_path = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    status = table.Column<int>(type: "integer", nullable: false),
                    criado_em = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    atualizado_em = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_registros_ponto", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_registros_ponto_data",
                table: "registros_ponto",
                column: "data_ponto");

            migrationBuilder.CreateIndex(
                name: "ix_registros_ponto_empresa",
                table: "registros_ponto",
                column: "empresa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "registros_ponto");
        }
    }
}
