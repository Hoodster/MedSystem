using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MedSystem.Models.DTO
{
    public class VisitReportDto
    {
        public string ReportTitle { get; set; }
        public string ReportBody { get; set; }
        public DateTimeOffset ReportDate { get; set; }
        public Guid VisitId { get; set; }

        public VisitReportDto(string reportTitle, string reportBody, DateTimeOffset reportDate, Guid visitId)
        {
            this.ReportTitle = reportTitle;
            this.ReportBody = reportBody;
            this.ReportDate = reportDate;
            this.VisitId = visitId;
        }

        public VisitReportDto(VisitReportDto visitReportDto)
        {
            this.ReportTitle = visitReportDto.ReportTitle;
            this.ReportBody = visitReportDto.ReportBody;
            this.ReportDate = visitReportDto.ReportDate;
            this.VisitId = visitReportDto.VisitId;
        }        
        
        public VisitReportDto() 
        { 
        }
    }
}
