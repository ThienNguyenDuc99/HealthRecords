using HeathRecords.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeathRecords.DL
{
    public class PatientDL: RefDL
    {
        public static string user;
        public PatientDL() : base()
        {

        }
        public int PatientLogin(string UserName, string Password)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Patient Where UserName = '" + UserName + "' And Password = '" + Password + "'";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            if (sqlDataReader.HasRows)
            {
                user = UserName;
                sqlConnection.Close();
                return 1;
            }
            else
            {
                sqlConnection.Close();
                return 0;
            }
        }

        /***
         * Lấy tài khoản bệnh nhân đăng nhập
         * NDThien(17/03/2020)
         */
        public List<Patient> GetPatient()
        {
            var Patients = new List<Patient>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Patient Where UserName = '" + user + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var Patient = new Patient();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = Patient.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(Patient, fieldValue);
                    }
                }
                Patients.Add(Patient);
            }

            sqlConnection.Close();
            return Patients;
        }
        /***
       * Hàm đăng xuất tài khoản bác sĩ
       * Người tạo: Thiện (17/03/2020)
       */
        public void PatientLogout()
        {
            user = "";
        }
        /***
         * Lấy danh sách bệnh nhân theo tên bác sĩ
         * NDThien(17/03/2020)
         */
        public List<Patient> GetPatientWithDoc()
        {
            var Patients = new List<Patient>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select DISTINCT Patient.* from Patient INNER JOIN MedicalExamination " +
                "ON Patient.PatientId = MedicalExamination.PatientId" +
                " INNER JOIN Doctor ON Doctor.DoctorId = MedicalExamination.DoctorId And Doctor.UserName = '" + DoctorDL.user + "' Order by Patient.UserName;";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var Patient = new Patient();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = Patient.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(Patient, fieldValue);
                    }
                }
                Patients.Add(Patient);
            }

            sqlConnection.Close();
            return Patients;
        }
        /***
       * Lấy danh sách bệnh nhân theo id
       * NDThien(17/03/2020)
       */
        public List<Patient> GetPatientById(Guid id)
        {
            var Patients = new List<Patient>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Patient Where PatientId = '" + id + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var Patient = new Patient();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = Patient.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(Patient, fieldValue);
                    }
                }
                Patients.Add(Patient);
            }

            sqlConnection.Close();
            return Patients;
        }
        /***
      * Lấy danh sách bệnh nhân theo user
      * NDThien(17/03/2020)
      */
        public List<Patient> GetPatientByUsername(string user)
        {
            var Patients = new List<Patient>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Patient Where UserName = '" + user + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var Patient = new Patient();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = Patient.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(Patient, fieldValue);
                    }
                }
                Patients.Add(Patient);
            }

            sqlConnection.Close();
            return Patients;
        }
        /***
       * Lấy danh sách bệnh nhân theo id
       * NDThien(17/03/2020)
       */
        public List<Patient> GetAllPatient()
        {
            var Patients = new List<Patient>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Patient;";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var Patient = new Patient();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = Patient.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(Patient, fieldValue);
                    }
                }
                Patients.Add(Patient);
            }

            sqlConnection.Close();
            return Patients;
        }
        /***
         * Thêm một bệnh nhân
         * NDthien(17/03/2020)
         */
        public int AddPatient(Patient r)
        {
            //r.PatientId = Guid.NewGuid();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "INSERT INTO Patient(PatientName, UserName, PhoneNumber, Email,Address,Sex,Born, Password ) VALUES (N'" + r.PatientName + "',N'" + r.UserName + "',N'" + r.PhoneNumber + "',N'" + r.Email + "',N'" + r.Address + "',N'" + r.Sex + "',N'" + r.Born + "',N'" + r.Password + "' );";
            var sqlDataReader = sqlCommand.ExecuteNonQuery();
            return sqlDataReader;
        }
        /***
         * Sửa một bệnh nhân
         * NDthien(17/03/2020)
         */
        public int EditPatient(Patient r, Guid id)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "UPDATE Patient SET PatientName = N'" + r.PatientName + "',UserName = N'" + r.UserName + "',PhoneNumber = '" + r.PhoneNumber + "',Email = N'" + r.Email + "', Address = N'" + r.Address + "',Born = N'" + r.Born + "', Sex = '" + r.Sex + "', Password = '" + r.Password + "' WHERE PatientId = '" + id + "'; ";
            var sqlDataReader = sqlCommand.ExecuteNonQuery();
            return sqlDataReader;
        }
    }
}

