using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeathRecords.Models
{
    public class MedicalExaminationDetail
    {
        public int MedicalExaminationDetailId { get; set; }

        public Guid MedicalExaminationId { get; set; }
        public string Diagnose { get; set; }
        public string DiagnoseDetail { get; set; }
        public string Note { get; set; }
        public int Status { get; set; }

    }
}
