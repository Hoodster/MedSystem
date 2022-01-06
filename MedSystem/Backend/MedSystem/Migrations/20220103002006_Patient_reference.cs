using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MedSystem.Migrations
{
    public partial class Patient_reference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Patients_HealthQuestionnaires_QuestionnaireID",
                table: "Patients");

            migrationBuilder.DropIndex(
                name: "IX_Patients_QuestionnaireID",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "QuestionnaireID",
                table: "Patients");

            migrationBuilder.AddColumn<Guid>(
                name: "PatientId",
                table: "HealthQuestionnaires",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_HealthQuestionnaires_PatientId",
                table: "HealthQuestionnaires",
                column: "PatientId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_HealthQuestionnaires_Patients_PatientId",
                table: "HealthQuestionnaires",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HealthQuestionnaires_Patients_PatientId",
                table: "HealthQuestionnaires");

            migrationBuilder.DropIndex(
                name: "IX_HealthQuestionnaires_PatientId",
                table: "HealthQuestionnaires");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "HealthQuestionnaires");

            migrationBuilder.AddColumn<Guid>(
                name: "QuestionnaireID",
                table: "Patients",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Patients_QuestionnaireID",
                table: "Patients",
                column: "QuestionnaireID");

            migrationBuilder.AddForeignKey(
                name: "FK_Patients_HealthQuestionnaires_QuestionnaireID",
                table: "Patients",
                column: "QuestionnaireID",
                principalTable: "HealthQuestionnaires",
                principalColumn: "QuestionnaireID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
