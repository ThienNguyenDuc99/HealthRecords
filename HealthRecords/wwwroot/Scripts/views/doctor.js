$(document).ready(function () {
    doctor = new doctor();
});

class doctor extends base {
    constructor() {
        super();
        //this.loadDataTable(this.getRef('/meex/doctor'), this.getRef('/patient/doctor'),'th[doctorschedule]', '.main-table.doctor.schedule tbody');
        this.initEventsDoctor();
        this.acountDoctor();
        this.ResetDialog();
    }
    initEventsDoctor() {
        //$(document).on("click", ".header-component.doctor.admin", this.showLogoutdoctor);
        $(document).on("click", ".sub-main-menu.doctor.homepage", this.gotoDoctorhomepage);
        $(document).on("click", ".sub-main-menu.doctor.history", this.gotoDoctorhistory);
        $(document).on("click", ".sub-main-menu.doctor.schedule", this.gotoDoctorschedule);
        $(document).on("click", ".header-component.doctor.logout", this.doctorLogout);
    }
    ResetDialog() {
        $('.dialog.doctorhistory.add .input-select').removeClass('show');
        $('.dialog.doctorschedule.add .patient').removeClass('show');
        $('.dialog.doctorschedule.edit .patient').removeClass('show');
        $('.dialog tr').removeClass("selectTr");
        var x = $('.dialog input');
        var y = $('.dialog .input1');
        $.each(x, function (index, item) {
            item.value = "";
        });
        $.each(y, function (index, item) {
            item.value = "";
        });
    }
    acountDoctor() {
        let data = this.getRef('/doctor');
        if (data.length != 0) {
            $('.header-component.doctor.admin')[0].innerHTML = data[0].UserName;
        }
        else {
            window.open("https://localhost:44339/Views/index.html", "_self");
        }
    }
    gotoDoctorhomepage() {
        window.open("https://localhost:44339/Views/doctorhomepage.html", "_self");
    }
    gotoDoctorschedule() {
        window.open("https://localhost:44339/Views/doctorschedule.html", "_self");
    }
    gotoDoctorhistory() {
        window.open("https://localhost:44339/Views/doctorhistory.html", "_self");
    }
    /**Hàm đăng xuất tài khoản bác sĩ (17/03/2020)*/
    doctorLogout() {
        $.ajax({
            method: 'GET',
            url: '/doctor/logout',
            async: false,
            dataType: "json",
            success: function (res) {
                sessionStorage.clear();
                window.location.replace("index.html");
            }
        }); 
    }
}