using MedSystem.Models.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Models
{
    public class Visits : VisitsDto
    {
        [Key]
        public Guid VisitId { get; set; }
        [ForeignKey("Patient")]
        public Guid PatientId { get; set; }
        public Patient Patient { get; set; }
        [ForeignKey("Doctor")]
        public Guid DoctorId { get; set; }
        public Doctor Doctor { get; set; }
        public DateTimeOffset VisitDateStart { get; set; }
        public TimeSpan VisitTime { get; set; }
        public DateTimeOffset VisitDateFinish { get; set; }

        public Visits(Guid patientId, Guid doctorId, DateTimeOffset visitDateStart): base(visitDateStart, doctorId, patientId)
        {
            
            this.PatientId = patientId;
            this.VisitTime = new TimeSpan(00, 30, 00);
            this.VisitDateFinish = visitDateStart + new TimeSpan(00, 30, 00);
        }
        public Visits(VisitsDto visitsDto) : base(visitsDto)
        {
            this.PatientId = visitsDto.PatientId;
            this.DoctorId = visitsDto.DoctorId;
            this.VisitDateStart = visitsDto.VisitDateStart;
            this.VisitTime = new TimeSpan(00, 30, 00);
            this.VisitDateFinish = visitsDto.VisitDateStart + new TimeSpan(00, 30, 00);
        }
        public Visits()
        {

        }
      
        
    }
}
