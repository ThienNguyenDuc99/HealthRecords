$(document).ready(function () {
    patient = new patient();
});

class patient extends base {
    constructor() {
        super();
        this.acountPatient();
        this.initEvents();
    }
    initEvents() {
       
        //$(document).on("click", ".header-component.registration.patient", this.gotoPatientregistration);
        //$(document).on("click", ".header-component.login.patient", this.gotoPatientlogin);
        $(document).on("click", ".sub-main-menu.patient.homepage", this.gotoPatienthomepage);
        $(document).on("click", ".sub-main-menu.patient.history", this.gotoPatienthistory);
        $(document).on("click", ".sub-main-menu.patient.schedule", this.gotoPatientschedule);
        $(document).on("click", ".sub-toolbar.patientschedule.add", this.openPatientscheduleAdd);
        $(document).on("click", ".sub-toolbar.patientschedule.edit", this.openPatientscheduleEdit);
        $(document).on("click", ".header-component.patient.logout", this.patientLogout);
    }
    showLogoutpatient() {
        $('.header-component.patient.logout').slideToggle();
    }
  
    /**Tài khoản bệnh nhân */
    acountPatient() {
        let data = this.getRef('/patient');
        if (data.length != 0) {
            $('.header-component.patient.admin')[0].innerHTML = data[0].UserName;
        }
        else {
            window.open("https://localhost:44339/Views/index.html", "_self");
        }
    }
    //gotoPatientregistration() {
    //    window.location.replace("patientregistration.html");
    //    window.open("https://localhost:44339/Views/patientregistration.html", "_self");
    //}
    //gotoPatientlogin() {
    //    //window.location.replace("patientregistration.html");
    //    window.open("https://localhost:44339/Views/patientlogin.html", "_self");
    //}
    gotoPatienthomepage() {
        window.open("https://localhost:44339/Views/patienthomepage.html", "_self");
    }
    gotoPatientschedule() {
        window.open("https://localhost:44339/Views/patientschedule.html", "_self");
    }
    gotoPatienthistory() {
        window.open("https://localhost:44339/Views/patienthistory.html", "_self");
    }
    openPatientscheduleAdd() {
        $('.dialog.patientschedule.add').dialog({
            width: 700,
            height: 400,
            //autoOpen: true,
            //autoResize: true,
        });
    }
    openPatientscheduleEdit() {
        $('.dialog.patientschedule.edit').dialog({
            width: 700,
            height: 400,
        });
    }
    /**Hàm đăng xuất tài khoản bệnh nhân (23/03/2020)*/
    patientLogout() {
        $.ajax({
            method: 'GET',
            url: '/patient/logout',
            async: false,
            dataType: "json",
            success: function (res) {
                sessionStorage.clear();
                window.location.replace("index.html");
            }
        });
    }
    ResetDialog() {
        $('.dialog.patienthistory.add .input-select').removeClass('show');
        $('.dialog.patienthistory.add .patient').removeClass('show');
        $('.dialog.patienthistory.edit .patient').removeClass('show');
        $('.dialog tr').removeClass("selectTr");
        var x = $('.dialog input');
        $.each(x, function (index, item) {
            item.value = "";
        });
    }
}