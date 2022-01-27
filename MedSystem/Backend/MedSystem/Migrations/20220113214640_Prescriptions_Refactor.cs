using Microsoft.EntityFrameworkCore.Migrations;

namespace MedSystem.Migrations
{
    public partial class Prescriptions_Refactor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "PrescriptionFulfilled",
                table: "Prescriptions",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PrescriptionFulfilled",
                table: "Prescriptions");
        }
    }
}
