using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MedSystem.Migrations
{
    public partial class VisitRaport_Visits : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VisitReports",
                columns: table => new
                {
                    RaportId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VisitId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReportTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReportBody = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReportDate = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VisitReports", x => x.RaportId);
                    table.ForeignKey(
                        name: "FK_VisitReports_Visits_VisitId",
                        column: x => x.VisitId,
                        principalTable: "Visits",
                        principalColumn: "VisitId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_VisitReports_VisitId",
                table: "VisitReports",
                column: "VisitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VisitReports");
        }
    }
}
