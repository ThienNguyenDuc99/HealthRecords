using HeathRecords.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeathRecords.DL
{
    public class MedicalExaminationDL: RefDL
    {
        public MedicalExaminationDL() : base()
        {

        }
        /*Hàm lấy danh sách lịch khám theo bác sĩ (19/03/2020)**/
        public List<MedicalExamination> GetMEDoc()
        {
            var MedicalExaminations = new List<MedicalExamination>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from MedicalExamination INNER JOIN Doctor " +
               "ON Doctor.DoctorId = MedicalExamination.DoctorId And UserName = '" + DoctorDL.user + "' Order by MedicalExaminationCode;";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var MedicalExamination = new MedicalExamination();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = MedicalExamination.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(MedicalExamination, fieldValue);
                    }
                }
                MedicalExaminations.Add(MedicalExamination);
            }

            sqlConnection.Close();
            return MedicalExaminations;
        }
        /*Hàm lấy danh sách lịch khám theo bệnh nhân (23/03/2020)**/
        public List<MedicalExamination> GetMEPat()
        {
            var MedicalExaminations = new List<MedicalExamination>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from MedicalExamination INNER JOIN Patient " +
               "ON Patient.PatientId = MedicalExamination.PatientId And UserName = '" + PatientDL.user + "' Order by MedicalExaminationCode;";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var MedicalExamination = new MedicalExamination();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = MedicalExamination.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(MedicalExamination, fieldValue);
                    }
                }
                MedicalExaminations.Add(MedicalExamination);
            }

            sqlConnection.Close();
            return MedicalExaminations;
        }
        /*Hàm lấy danh sách lịch khám theo id của nó (21/03/2020)**/
        public List<MedicalExamination> GetMEById(Guid id)
        {
            var MedicalExaminations = new List<MedicalExamination>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from MedicalExamination Where MedicalExamination.MedicalExaminationId = '"+ id +"';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var MedicalExamination = new MedicalExamination();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = MedicalExamination.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(MedicalExamination, fieldValue);
                    }
                }
                MedicalExaminations.Add(MedicalExamination);
            }

            sqlConnection.Close();
            return MedicalExaminations;
        }
        /*Hàm lấy danh sách lịch khám theo code của nó (21/03/2020)**/
        public List<MedicalExamination> GetMEByCode(string code)
        {
            var MedicalExaminations = new List<MedicalExamination>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from MedicalExamination Where MedicalExamination.MedicalExaminationCode = '" + code + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var MedicalExamination = new MedicalExamination();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = MedicalExamination.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(MedicalExamination, fieldValue);
                    }
                }
                MedicalExaminations.Add(MedicalExamination);
            }

            sqlConnection.Close();
            return MedicalExaminations;
        }
        /***
        * Hàm thêm một lượt hẹn khám cho bác sĩ
        * Người tạo: Thiện (16/03/2020)
        */
        public int AddMEDoc( MedicalExamination r)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "INSERT INTO MedicalExamination(MedicalExaminationCode, DoctorId, PatientId, ExaminationDay, Note ) VALUES (N'" + r.MedicalExaminationCode + "','" + r.DoctorId + "','" + r.PatientId + "','" + r.ExaminationDay + "',N'" + r.Note + "'  );";
            var sqlDataReader = sqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return sqlDataReader;
        }
        /***
         * Hàm xóa lịch khám
         * Người tạo: Thiện(19/03/2020)
         */
        public void DelMEDoc(Guid id)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "DELETE FROM MedicalExamination WHERE MedicalExaminationId  = '" + id + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            sqlConnection.Close();
        }
        /***
        * Hàm sửa lịch khám
        * Người tạo: Thiện(16/03/2020)
        */
        public int EditME(MedicalExamination r, Guid id)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "UPDATE MedicalExamination SET MedicalExaminationCode = '" + r.MedicalExaminationCode + "',PatientId = '" + r.PatientId + "',DoctorId = N'" + r.DoctorId + "', Note = N'" + r.Note + "' Where MedicalExaminationId = '" + id + "'; ";
            var sqlDataReader = sqlCommand.ExecuteNonQuery();
            return sqlDataReader;
        }
    }
}
