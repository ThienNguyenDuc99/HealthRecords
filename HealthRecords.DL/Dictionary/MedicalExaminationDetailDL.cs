using HeathRecords.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HeathRecords.DL
{
    public class MedicalExaminationDetailDL : RefDL
    {
        public MedicalExaminationDetailDL() : base()
        {

        }
        /*lấy danh sách lịch sử khám cho tiết theo bác sĩ*/
        public List<MedicalExaminationDetail> GetMEDDoc()
        {
            var MedicalExaminationDetails = new List<MedicalExaminationDetail>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select MedicalExaminationDetail.* " +
                                      "FROM MedicalExamination " +
                                      "INNER JOIN MedicalExaminationDetail ON MedicalExaminationDetail.MedicalExaminationId = MedicalExamination.MedicalExaminationId " +
                                      "INNER JOIN Patient ON MedicalExamination.PatientId = Patient.PatientId " +
                                       "INNER JOIN Doctor ON MedicalExamination.DoctorId = Doctor.DoctorId AND Doctor.UserName = '" + DoctorDL.user + "'; ";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var MedicalExaminationDetail = new MedicalExaminationDetail();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = MedicalExaminationDetail.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(MedicalExaminationDetail, fieldValue);
                    }
                }
                MedicalExaminationDetails.Add(MedicalExaminationDetail);
            }

            sqlConnection.Close();
            return MedicalExaminationDetails;
        }
        /** Lấy dánh sách lịch sử khám chi tiết cho bệnh nhân
         */
        public List<MedicalExaminationDetail> GetMEDPat()
        {
            var MedicalExaminationDetails = new List<MedicalExaminationDetail>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select MedicalExaminationDetail.* " +
                                      "FROM MedicalExamination " +
                                      "INNER JOIN MedicalExaminationDetail ON MedicalExaminationDetail.MedicalExaminationId = MedicalExamination.MedicalExaminationId " +
                                      "INNER JOIN Doctor ON MedicalExamination.DoctorId = Doctor.DoctorId " +
                                       "INNER JOIN Patient ON MedicalExamination.PatientId = Patient.PatientId AND Patient.UserName = '" + PatientDL.user + "'; ";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var MedicalExaminationDetail = new MedicalExaminationDetail();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = MedicalExaminationDetail.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(MedicalExaminationDetail, fieldValue);
                    }
                }
                MedicalExaminationDetails.Add(MedicalExaminationDetail);
            }

            sqlConnection.Close();
            return MedicalExaminationDetails;
        }
        /*Hàm lấy danh sách lịch khám chi tiết theo id của nó (22/03/2020)**/
        public List<MedicalExaminationDetail> GetMedeById(int id)
        {
            var MedicalExaminationDetails = new List<MedicalExaminationDetail>();
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "Select * from MedicalExaminationDetail Where MedicalExaminationDetailId = '" + id + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            while (sqlDataReader.Read())
            {
                var MedicalExaminationDetail = new MedicalExaminationDetail();
                for (int i = 0; i < sqlDataReader.FieldCount; i++)
                {
                    var fiedName = sqlDataReader.GetName(i);
                    var fieldValue = sqlDataReader.GetValue(i);
                    var property = MedicalExaminationDetail.GetType().GetProperty(fiedName);
                    if (property != null && fieldValue != DBNull.Value)
                    {
                        property.SetValue(MedicalExaminationDetail, fieldValue);
                    }
                }
                MedicalExaminationDetails.Add(MedicalExaminationDetail);
            }

            sqlConnection.Close();
            return MedicalExaminationDetails;
        }
        /***
       * Hàm thêm một lịch khám chi tiết 
       * Người tạo: Thiện (21/03/2020)
       */
        public int AddMeexDoc(MedicalExaminationDetail r)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "INSERT INTO MedicalExaminationDetail(MedicalExaminationId, Diagnose, DiagnoseDetail, Note, Status ) VALUES (N'" + r.MedicalExaminationId + "',N'" + r.Diagnose + "',N'" + r.DiagnoseDetail + "',N'" + r.Note + "',N'" + r.Status + "'  );";
            var sqlDataReader = sqlCommand.ExecuteNonQuery();
            sqlConnection.Close();
            return sqlDataReader;
        }
        /***
        * Hàm xóa lịch khám chi tiết
        * Người tạo: Thiện(21/03/2020)
        */
        public void DelMedeDoc(int id)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "DELETE FROM MedicalExaminationDetail WHERE MedicalExaminationDetailId  = '" + id + "';";
            SqlDataReader sqlDataReader = sqlCommand.ExecuteReader();
            sqlConnection.Close();
        }
        /***
       * Hàm sửa lịch khám chi tiết
       * Người tạo: Thiện(22/03/2020)
       */
        public int EditMede(MedicalExaminationDetail r, int id)
        {
            sqlCommand.CommandType = System.Data.CommandType.Text;
            sqlCommand.CommandText = "UPDATE MedicalExaminationDetail SET MedicalExaminationId = '" + r.MedicalExaminationId + "',Diagnose = N'" + r.Diagnose + "',DiagnoseDetail = N'" + r.DiagnoseDetail + "', Note = N'" + r.Note + "',Status = N'" + r.Status + "'  Where MedicalExaminationDetailId = '" + id + "'; ";
            var sqlDataReader = sqlCommand.ExecuteNonQuery();
            return sqlDataReader;
        }
    }
}
