using HeathRecords.DL;
using HeathRecords.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthRecords.Controllers
{
    
    public class MedicalExaminationController : ControllerBase
    {
        /*Lấy lịch hẹn theo bác sĩ*/
        [Route("meex/doctor")]
        [HttpGet]
        public IEnumerable<MedicalExamination> GetMedicalExamination()
        {
            var MedicalExaminationDL = new MedicalExaminationDL();
            return MedicalExaminationDL.GetMEDoc();
        }

        /*Lấy lịch hẹn theo bệnh nhân(23/03/2020)*/
        [Route("meex/patient")]
        [HttpGet]
        public IEnumerable<MedicalExamination> GetMedicalExamination1()
        {
            var MedicalExaminationDL = new MedicalExaminationDL();
            return MedicalExaminationDL.GetMEPat();
        }

        /**Lấy lịch hẹn theo id*/
        [Route("meexbyid/{id}")]
        [HttpGet]
        public IEnumerable<MedicalExamination> GetMEById(Guid id)
        {
            var MedicalExaminationDL = new MedicalExaminationDL();
            return MedicalExaminationDL.GetMEById(id);
        }

        /**Lấy lịch hẹn theo username*/
        [Route("meexuser/{username}")]
        [HttpGet]
        public IEnumerable<MedicalExamination> GetMEByUsername(string username)
        {
            var MedicalExaminationDL = new MedicalExaminationDL();
            return MedicalExaminationDL.GetMEByCode(username);
        }

        ///*Thêm lịch hẹn cho bác sĩ*/
        [Route("meexadd")]
        [HttpPost]
        public async Task<int> AddMedicalExamination([FromBody] MedicalExamination r)
        {
            var MedicalExaminationDL = new MedicalExaminationDL();
            return MedicalExaminationDL.AddMEDoc(r);
        }
        /**Xóa một lịch hẹn cho bác sĩ*/
        [Route("meexdel")]
        [HttpDelete]
        public void DeleteMeDoc([FromBody]List<Guid> ids)
        {
            foreach (Guid id in ids)
            {
                var MedicalExaminationDL = new MedicalExaminationDL();
                MedicalExaminationDL.DelMEDoc(id);
            }
        }
        ///*Sửa lịch hẹn*/
        [Route("meexedit/{id}")]
        [HttpPut]
        public async Task<int> EditME([FromBody] MedicalExamination r, Guid id)
        {
            var MedicalExaminationDL = new MedicalExaminationDL();
            return MedicalExaminationDL.EditME(r, id);
        }
    }
}
