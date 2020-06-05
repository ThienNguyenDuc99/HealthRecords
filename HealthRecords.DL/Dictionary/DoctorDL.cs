using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using HeathRecords.Models;
using System.Text;
using System.Threading.Tasks;


namespace HeathRecords.DL
{
    public class DoctorDL: RefDL
    {
        public static string user;
        public DoctorDL() : base()
        {

        }
        /***
         * Hàm đăng nhập tài khoản bác sĩ
         * Người tạo: Thiện (16/03/2020)
         */
        public int DoctorLogin(string UserName, string Password)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Doctor Where UserName = '" + UserName + "' And Password = '" + Password + "'";
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
        * Hàm đăng xuất tài khoản bác sĩ
        * Người tạo: Thiện (17/03/2020)
        */
        public void DoctorLogout()
        {
            user = "";
        }
        /***
         * Hàm lấy dữ liệu bác sĩ đăng nhập
         * Người tạo: Thiện (16/03/2020)
         */
        public List<Doctor> GetDoctor()
        {
            var Doctors = new List<Doctor>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Doctor Where UserName = '" + user + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var doctor = new Doctor();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = doctor.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(doctor, fieldValue);
                    }
                }
                Doctors.Add(doctor);
            }

            sqlConnection.Close();
            return Doctors;
        }
        /***
        * Hàm lấy danh sách bác sĩ
        * Người tạo: Thiện (23/03/2020)
        */
        public List<Doctor> GetAllDoctor()
        {
            var Doctors = new List<Doctor>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Doctor;";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var doctor = new Doctor();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = doctor.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(doctor, fieldValue);
                    }
                }
                Doctors.Add(doctor);
            }

            sqlConnection.Close();
            return Doctors;
        }
        /***
      * Hàm lấy danh sách bác sĩ theo username
      * Người tạo: Thiện (23/03/2020)
      */
        public List<Doctor> GetDoctorByUser(string username)
        {
            var Doctors = new List<Doctor>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Doctor Where UserName = '" + username + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var doctor = new Doctor();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = doctor.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(doctor, fieldValue);
                    }
                }
                Doctors.Add(doctor);
            }

            sqlConnection.Close();
            return Doctors;
        }
        /***
     * Hàm lấy danh sách bác sĩ theo id
     * Người tạo: Thiện (23/03/2020)
     */
        public List<Doctor> GetDoctorById(Guid id)
        {
            var Doctors = new List<Doctor>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from Doctor Where DoctorId = '" + id + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var doctor = new Doctor();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = doctor.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(doctor, fieldValue);
                    }
                }
                Doctors.Add(doctor);
            }

            sqlConnection.Close();
            return Doctors;
        }
        /***
        * Hàm lấy danh sách bác sĩ theo bệnh nhân
        * Người tạo: Thiện (23/03/2020)
        */
        public List<Doctor> GetDoctorPat()
        {
            var Doctors = new List<Doctor>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select DISTINCT Doctor.* from Doctor INNER JOIN MedicalExamination " +
               "ON Doctor.DoctorId = MedicalExamination.DoctorId" +
               " INNER JOIN Patient ON Patient.PatientId = MedicalExamination.PatientId And Patient.UserName = '" + PatientDL.user + "' Order by Doctor.UserName;";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var doctor = new Doctor();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = doctor.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(doctor, fieldValue);
                    }
                }
                Doctors.Add(doctor);
            }

            sqlConnection.Close();
            return Doctors;
        }
        /***
         * Hàm thêm mới tài khoản bác sĩ
         * Người tạo: Thiện (16/03/2020)
         */
        public int AddDoctor(Doctor r)
        {
            //r.DoctorCode = Guid.NewGuid();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "INSERT INTO Doctor(DoctorName, UserName, Specialist, PhoneNumber,Email,Born, Password ) VALUES (N'" + r.DoctorName + "', N'" + r.UserName + "',N'" + r.Specialist + "','" + r.PhoneNumber + "','" + r.Email + "',N'" + r.Born + "',N'" + r.Password + "' );";
            var sqlDataReader = sqlCommand.ExecuteNonQuery();
            return sqlDataReader;
        }
        /***
         * Hàm sửa tài khoản bác sĩ
         * Người tạo: Thiện(16/03/2020)
         */
        public int EditDoctor(Doctor r, Guid id)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "UPDATE Doctor SET DoctorName = N'" + r.DoctorName + "',UserName = N'" + r.UserName + "',Specialist = N'" + r.Specialist + "',PhoneNumber = N'" + r.PhoneNumber + "', Email = N'" + r.Email + "',Born = N'" + r.Born + "', Password = '" + r.Password + "' WHERE DoctorId = '" + id + "'; ";
            var sqlDataReader = sqlCommand.ExecuteNonQuery();
            return sqlDataReader;
        }
    }
}
