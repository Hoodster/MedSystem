using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Models.DTO
{
    public class PrescriptionDto
    {
        public Guid PatientId { get; set; }
        public Guid DoctorId { get; set; }
        public string PrescriptonReceiptCode { get; set; }
        public string PrescriptonCode { get; set; }
        public string PrescriptionDescription { get; set; }

        public PrescriptionDto(Guid patientId, Guid doctorId, string prescriptonReceiptCode, string prescriptonCode, string prescriptionDescription) 
        {
            this.PatientId = patientId;
            this.DoctorId = doctorId;
            this.PrescriptionDescription = prescriptionDescription;
            this.PrescriptonCode = prescriptonCode;
            this.PrescriptonReceiptCode = prescriptonReceiptCode;
        }
        public PrescriptionDto(PrescriptionDto prescriptionDto) 
        {
            this.PatientId = prescriptionDto.PatientId;
            this.DoctorId = prescriptionDto.DoctorId;
            this.PrescriptionDescription = prescriptionDto.PrescriptionDescription;
            this.PrescriptonCode = prescriptionDto.PrescriptonCode;
            this.PrescriptonReceiptCode = prescriptionDto.PrescriptonReceiptCode;
        }
        public PrescriptionDto() 
        {
        }
    }
}
