using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeathRecords.Models
{
    public class Patient
    {
        public Guid PatientId { get; set; }
        public string UserName { get; set; }

        public string PatientName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }

        public int Sex { get; set; }
        public DateTime Born { get; set; }

        public string Password { get; set; }
    }
}
