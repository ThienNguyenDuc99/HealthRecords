using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeathRecords.Models
{
    public class Admin
    {
        public Guid AdminId { get; set; }

        public string AdminName { get; set; }
        public string Password { get; set; }
    }
}
