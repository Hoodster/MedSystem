using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MedSystem.Migrations
{
    public partial class Questionnaire_and_Patient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PatientId",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "UserForeignKey",
                table: "AspNetUsers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "HealthQuestionnaires",
                columns: table => new
                {
                    QuestionnaireID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HeartDiseases = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BloodDiseases = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LungDiseases = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RheumaticDiseases = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OphthalmicDiseases = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cancers = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KidneyDisease = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LiverDisease = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Stroke = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Epilepsy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Osteoporosis = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Aids = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Diabetes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AllergyToAnesthetics = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DrugAllergy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AllergyToDentalMaterials = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConditionsNotMentioned = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TakeMedications = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SurgicalProcedures = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CytostaticDrugs = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    OrganTransplant = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HealthQuestionnaires", x => x.QuestionnaireID);
                });

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    PatientId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuestionnaireID = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patients", x => x.PatientId);
                    table.ForeignKey(
                        name: "FK_Patients_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Patients_HealthQuestionnaires_QuestionnaireID",
                        column: x => x.QuestionnaireID,
                        principalTable: "HealthQuestionnaires",
                        principalColumn: "QuestionnaireID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Patients_QuestionnaireID",
                table: "Patients",
                column: "QuestionnaireID");

            migrationBuilder.CreateIndex(
                name: "IX_Patients_UserId",
                table: "Patients",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.DropTable(
                name: "HealthQuestionnaires");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "UserForeignKey",
                table: "AspNetUsers");
        }
    }
}
