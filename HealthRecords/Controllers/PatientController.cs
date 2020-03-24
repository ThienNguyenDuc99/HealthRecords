using HeathRecords.DL;
using HeathRecords.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthRecords.Controllers
{
    public class PatientController
    {
        /**
       * Chức năng đăng nhập tài khoản bệnh nhân
       * Người tạo: NDThien (16/03/2020)
       ***/
        [Route("patient/login/{Email}/{Password}")]
        [HttpGet]
        public int PatientLogin(string Email, string Password)
        {
            var PatientDL = new PatientDL();
            return PatientDL.PatientLogin(Email, Password);
        }
        /**
         * Lấy dữ liệu bệnh nhân đăng nhập (16/03/2020)
         */
        [Route("patient")]
        [HttpGet]
        public IEnumerable<Patient> GetPatient()
        {
            var patientDL = new PatientDL();
            return patientDL.GetPatient();
        }
        /**
        * Lấy danh sách bệnh nhân theo bác sĩ (17/03/2020)
        */
        [Route("patient/doctor")]
        [HttpGet]
        public IEnumerable<Patient> GetPatientWithDoc()
        {
            var patientDL = new PatientDL();
            return patientDL.GetPatientWithDoc();
        }
        /**
       * Lấy dữ liệu bệnh nhân theo id (21/03/2020)
       */
        [Route("getpatientbyid/{id}")]
        [HttpGet]
        public IEnumerable<Patient> GetPatinetById(Guid id)
        {
            var patientDL = new PatientDL();
            return patientDL.GetPatientById(id);
        }
        /**
    * Lấy dữ liệu bệnh nhân theo id (21/03/2020)
    */
        [Route("getpatientall/")]
        [HttpGet]
        public IEnumerable<Patient> GetPatientAll()
        {
            var patientDL = new PatientDL();
            return patientDL.GetAllPatient();
        }
        /**
        * Lấy dữ liệu bệnh nhân theo username (21/03/2020)
        */
        [Route("getpatientbyuser/{username}")]
        [HttpGet]
        public IEnumerable<Patient> GetPatinetByUsername(string username)
        {
            var patientDL = new PatientDL();
            return patientDL.GetPatientByUsername(username);
        }
        /**
        Hàm thêm mới tài khoản bệnh nhân 
       ***/
        [Route("patient/insert")]
        [HttpPost]
        public async Task<int> AddPatient([FromBody] Patient r)
        {
            var patientDL = new PatientDL();
            return patientDL.AddPatient(r);
        }
        /**
        Hàm sửa tài khoản bác sĩ
       ***/
        [Route("patient/edit/{id}")]
        [HttpPut]
        public async Task<int> EditPatient([FromBody] Patient r, Guid id)
        {
            var patientDL = new PatientDL();
            return patientDL.EditPatient(r, id);
        }
        /**
           Hàm đăng xuất bệnh nhân
          ***/
        [Route("patient/logout")]
        [HttpGet]
        public int PatientLogout()
        {
            var patientDL = new PatientDL();
            patientDL.PatientLogout();
            return 1;
        }
    }
}
