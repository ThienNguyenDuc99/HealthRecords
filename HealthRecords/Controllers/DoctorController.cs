using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using HeathRecords.DL;
using HeathRecords.Models;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace HealthRecords.Controllers
{
    public class DoctorController : ControllerBase
    {
        /**
         * Lấy thông tin tài khoản bác sĩ đăng nhập
         */
        [Route("doctor")]
        [HttpGet]
        public IEnumerable<Doctor> GetDoctor()
        {
            var DoctorDL = new DoctorDL();
            return DoctorDL.GetDoctor();
        }
        /**
        * Chức năng đăng nhập
        * Người tạo: NDThien (15/03/2020)
        ***/
        [Route("doctor/login/{UserName}/{Password}")]
        [HttpGet]
        public int DoctorLogin(string UserName, string Password)
        {
            var DoctorDL = new DoctorDL();
            return DoctorDL.DoctorLogin(UserName, Password);
        }
        /**
       * Chức năng đăng xuất
       * Người tạo: NDThien (15/03/2020)
       ***/
        [Route("doctor/logout")]
        [HttpGet]
        public int DoctorLogout()
        {
            var DoctorDL = new DoctorDL();
             DoctorDL.DoctorLogout();
            return 1;
        }

        /**
      * Lấy danh sách bác sĩ 
      * Người tạo: NDThien (23/03/2020)
      ***/
        [Route("doctor/all")]
        [HttpGet]
        public IEnumerable<Doctor> GetAllDoctor()
        {
            var DoctorDL = new DoctorDL();
            return DoctorDL.GetAllDoctor();
        }
        /**
    * Lấy danh sách bác sĩ 
    * Người tạo: NDThien (23/03/2020)
    ***/
        [Route("doctorbyuser/{username}")]
        [HttpGet]
        public IEnumerable<Doctor> GetDoctorByUser(string username)
        {
            var DoctorDL = new DoctorDL();
            return DoctorDL.GetDoctorByUser(username);
        }
        /**
         * Lấy danh sách bác sĩ theo id
         * Người tạo: NDThien (23/03/2020)
         ***/
        [Route("doctorbyid/{id}")]
        [HttpGet]
        public IEnumerable<Doctor> GetDoctorById(Guid id)
        {
            var DoctorDL = new DoctorDL();
            return DoctorDL.GetDoctorById(id);
        }
        /**
     * Lấy danh sách bác sĩ
     * Người tạo: NDThien (23/03/2020)
     ***/
        [Route("doctor/patient")]
        [HttpGet]
        public IEnumerable<Doctor> GetDoctorPat()
        {
            var DoctorDL = new DoctorDL();
            return DoctorDL.GetDoctorPat();
        }
        /**
        /**
         Hàm thêm mới tài khoản bác sĩ
        ***/
        [Route("doctor/insert")]
        [HttpPost]
        public async Task<int> Addoctor([FromBody] Doctor r)
        {
            var DoctorDL = new DoctorDL();
            return DoctorDL.AddDoctor(r);
        }
        /**
        Hàm sửa tài khoản bác sĩ
       ***/
        [Route("doctor/edit/{id}")]
        [HttpPut]
        public async Task<int> EditDoctor([FromBody] Doctor r, Guid id)
        {
            var DoctorDL = new DoctorDL();
            return DoctorDL.EditDoctor(r, id);
        }
    }
}