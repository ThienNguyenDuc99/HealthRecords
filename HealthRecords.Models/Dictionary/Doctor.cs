using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeathRecords.Models
{
    public class Doctor
    {
        public Guid DoctorId { get; set; }
        public string UserName { get; set; }
        public string DoctorName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Specialist { get; set; }


        public DateTime Born { get; set; }

        public string Password { get; set; }
    }
}
