using HeathRecords.DL;
using HeathRecords.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthRecords.Controllers
{
    public class MedicalExaminationDetailController
    {
        /**Lấy danh sách lịch sử khám chi tiết theo bác sĩ*/
        [Route("meexde")]
        [HttpGet]
        public IEnumerable<MedicalExaminationDetail> GetMedicalExaminationDetail()
        {
            var MedicalExaminationDetailDL = new MedicalExaminationDetailDL();
            return MedicalExaminationDetailDL.GetMEDDoc();
        }
        /**Lấy danh sách lịch sử khám chi tiết theo bệnh nhân*/
        [Route("meexde/patient")]
        [HttpGet]
        public IEnumerable<MedicalExaminationDetail> GetMedicalExaminationDetail1()
        {
            var MedicalExaminationDetailDL = new MedicalExaminationDetailDL();
            return MedicalExaminationDetailDL.GetMEDPat();
        }
        /**Thêm một lịch khám chi tiết**/
        [Route("meexdeadd/doctor")]
        [HttpPost]
        public async Task<int> AddMedeDoc([FromBody] MedicalExaminationDetail r)
        {
            var MedicalExaminationDL = new MedicalExaminationDetailDL();
            return MedicalExaminationDL.AddMeexDoc(r);
        }
        /**Lấy lịch khám chi tiết theo id*/
        [Route("meexdebyid/{id}")]
        [HttpGet]
        public IEnumerable<MedicalExaminationDetail> GetMedeById(int id)
        {
            var MedicalExaminationDetailDL = new MedicalExaminationDetailDL();
            return MedicalExaminationDetailDL.GetMedeById(id);
        }
        /**Xóa một lịch hẹn cho bác sĩ (21/03/2020)*/
        [Route("meexdedel/doctor")]
        [HttpDelete]
        public void DeleteMedeDoc([FromBody]List<int> ids)
        {
            foreach (int id in ids)
            {
                var MedicalExaminationDetailDL = new MedicalExaminationDetailDL();
                MedicalExaminationDetailDL.DelMedeDoc(id);
            }
        }
        ///*Sửa lịch hẹn chi tiết*/
        [Route("meexdeedit/{id}")]
        [HttpPut]
        public async Task<int> EditMede([FromBody] MedicalExaminationDetail r, int id)
        {
            var MedicalExaminationDetailDL = new MedicalExaminationDetailDL();
            return MedicalExaminationDetailDL.EditMede(r, id);
        }
    }
}
