using MedSystem.Models.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Models
{
    public class Prescription: PrescriptionDto
    {
        [Key]
        public Guid PrescriptionId { get; set; }
        [ForeignKey("Patient")]
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        [ForeignKey("Docter")]
        public Guid DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public string PrescriptonReceiptCode { get; set; }
        public string PrescriptonCode { get; set; }
        public string PrescriptionDescription { get; set; }
        public bool PrescriptionFulfilled { get; set; }

        public Prescription(Guid patientId, Guid doctorId, string prescriptonReceiptCode, string prescriptonCode, string prescriptionDescription) :base(patientId, doctorId, prescriptonReceiptCode, prescriptonCode, prescriptionDescription)
        {
            this.PatientId = patientId;
            this.DoctorId = doctorId;
            this.PrescriptonReceiptCode = prescriptonReceiptCode;
            this.PrescriptonCode = prescriptonCode;
            this.PrescriptionDescription = prescriptionDescription;
            this.PrescriptionFulfilled = false;
        }
        public Prescription(PrescriptionDto prescriptionDto) 
        {
            this.PatientId = prescriptionDto.PatientId;
            this.DoctorId = prescriptionDto.DoctorId;
            this.PrescriptonReceiptCode = prescriptionDto.PrescriptonReceiptCode;
            this.PrescriptonCode = prescriptionDto.PrescriptonCode;
            this.PrescriptionDescription = prescriptionDto.PrescriptionDescription;
            this.PrescriptionFulfilled = false;
        }
        public Prescription() 
        {
        }
    }
}
