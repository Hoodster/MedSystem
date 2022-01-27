using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Models.DTO
{
    public class VisitsDto
    {
        public DateTimeOffset VisitDateStart { get; set; }
        public Guid DoctorId { get; set; }
        public Guid PatientId { get; set; }


        public VisitsDto (DateTimeOffset visitDateStart, Guid doctorId, Guid patientId)
        {
            this.VisitDateStart = visitDateStart;
            this.PatientId = patientId;
            this.DoctorId = doctorId;
        }
        public VisitsDto(VisitsDto visitsDto)
        {
            this.VisitDateStart = visitsDto.VisitDateStart;
            this.DoctorId = visitsDto.DoctorId;
            this.PatientId = visitsDto.PatientId;
        }
        public VisitsDto()
        {
           
        }
    }
}
