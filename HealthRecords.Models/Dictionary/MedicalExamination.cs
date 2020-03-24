using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeathRecords.Models
{
    public class MedicalExamination
    {

        public Guid MedicalExaminationId { get; set; }
        public string MedicalExaminationCode { get; set; }
        public Guid PatientId { get; set; }
        //public string PatientName { get; set; }
        public Guid DoctorId { get; set; }
        public DateTime ExaminationDay { get; set; }
        public string Note { get; set; }

    }
}
