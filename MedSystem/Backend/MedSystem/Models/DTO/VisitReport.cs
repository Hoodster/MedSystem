using MedSystem.Models.DTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Models
{
    public class VisitReport: VisitReportDto
    {
        [Key]
        public Guid RaportId { get; set; }
        [ForeignKey("Visits")]
        public Guid VisitId { get; set; }
        public Visits Visit { get; set; }

        public VisitReport(Guid visitId, string reportBody, string reportTitle, DateTimeOffset reportDate ) : base(reportTitle,reportBody,reportDate,visitId)
        {
            this.VisitId = visitId;

        }
        public VisitReport(VisitReportDto visitReportDto):base(visitReportDto)
        {
            this.VisitId = visitReportDto.VisitId;
        }
        public VisitReport () 
        { 
        }
    }
}
