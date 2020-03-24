using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeathRecords.DL
{
    public class RefDL
    {
        protected string connectString = @"Data Source=ADMIN\SQLEXPRESS;Initial Catalog=HealthRecords;Integrated Security=True";
        protected SqlConnection sqlConnection;
        protected SqlCommand sqlCommand;

        public RefDL()
        {
            sqlConnection = new SqlConnection(connectString);
            sqlCommand = sqlConnection.CreateCommand();
            sqlCommand.CommandType = System.Data.CommandType.StoredProcedure;
            sqlConnection.Open();
        }
    }
}
