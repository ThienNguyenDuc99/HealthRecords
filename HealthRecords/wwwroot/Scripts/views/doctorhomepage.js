$(document).ready(function () {
    doctorhomepage = new doctorhomepage();
});

class doctorhomepage extends doctor {
    constructor() {
        super();
        // this.getUser('/doctor'); //lấy dữ liệu tài khoản bác sĩ đăng nhập
        //this.getRef('/patient/doctor'); //lấy bệnh nhân theo bác sĩ
        //this.loadDataTable(this.getRef('/meex/doctor'), this.getRef('/patient/doctor'),'th[doctorschedule]', '.main-table.doctor.schedule tbody');
        this.initEvents();
        this.showInfoDoctor();
    }
    initEvents() {
        //$(document).on("click", ".header-component.doctor.admin", this.showLogoutdoctor);
        //$(document).on("click", ".header-component.doctor.logout", this.doctorLogout);

    }
    //showLogoutdoctor() {
    //    $('.header-component.doctor.logout').slideToggle();
    //}
    ///**In ra thông tin bác sĩ */
    showInfoDoctor() {
        let data = this.getRef('/doctor');
        $('.doctor-info')[2].value = data[0].Specialist;
        $('.doctor-info')[0].value = data[0].DoctorName;
        $('.doctor-info')[1].value = data[0].UserName;
        $('.doctor-info')[3].value = data[0].PhoneNumber;
        $('.doctor-info')[4].value = data[0].Email;
        $('.doctor-info')[5].value = data[0].Born;
    }
}