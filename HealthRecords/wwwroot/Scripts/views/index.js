$(document).ready(function () {
    index = new index();
});

class index extends base {
    constructor() {
        super();
        this.initEvents();
    }
    initEvents() {
        $(document).on("click", ".header-component.registration.main", this.showRegister);
        $(document).on("click", ".header-component.doctor.admin", this.showLogoutdoctor);
        $(document).on("click", ".header-component.patient.admin", this.showLogoutpatient);
        $(document).on("click", ".header-component.login.main", this.showLogin);
        $(document).on("click", ".header-component.registration.patient", this.gotoPatientregistration);
        $(document).on("click", ".header-component.registration.doctor", this.gotoDoctorregistration);
        $(document).on("click", ".header-component.login.patient", this.gotoPatientlogin);
        $(document).on("click", ".header-component.login.doctor", this.gotoDoctorlogin);
        $(document).on("click", ".doctor-login", this.doctorLogin.bind(this));
        $(document).on("click", ".patient-login", this.patientLogin.bind(this));
        $(document).on("click", ".doctor-signup", this.doctorSignup);
        $(document).on("click", ".patient-signup", this.patientSignup);

    }
    showRegister() {
        $('.header-component:nth-child(5)').hide();
        $('.header-component:nth-child(6)').hide();
        $('.header-component.registration.patient').slideToggle();
        $('.header-component.registration.doctor').slideToggle();
    }
    showLogoutdoctor() {
        $('.header-component.doctor.logout').slideToggle();
    }
    showLogoutpatient() {
        $('.header-component.patient.logout').slideToggle();
    }
    showLogin() {
        $('.header-component:nth-child(2)').hide();
        $('.header-component:nth-child(3)').hide();
        $('.header-component.login.patient').slideToggle();
        $('.header-component.login.doctor').slideToggle();
    }
    gotoPatientregistration() {
        //window.location.replace("patientregistration.html");
        window.open("https://localhost:44339/Views/patientregistration.html", "_self");
    }
    gotoDoctorregistration() {
        //window.location.replace("patientregistration.html");
        window.open("https://localhost:44339/Views/doctorregistration.html", "_self");
    }
    gotoPatientlogin() {
        //window.location.replace("patientregistration.html");
        window.open("https://localhost:44339/Views/patientlogin.html", "_self");
    }
    gotoDoctorlogin() {
        //window.location.replace("patientregistration.html");
        window.open("https://localhost:44339/Views/doctorlogin.html", "_self");
    }
    ///**Bác sĩ đăng nhập (17/03/2020) */
    doctorLogin() {
        var me = this;
        var username = $('.doctor-login-username')[0].value;
        var password = $('.doctor-login-password')[0].value;
        $.ajax({
            method: 'GET',
            url: '/doctor/login/' + username + ' /' + password,
            async: false,
            dataType: "json",
            success: function (res) {
                if (res === 1) {
                    $.ajax({
                        method: 'GET',
                        url: '/doctor',
                        async: false,
                        dataType: "json",
                        success: function (res) {
                            if (res) {
                                sessionStorage.setItem("userdoctor", res[0].UserName);
                                sessionStorage.setItem("doctorid", res[0].DoctorId);
                                window.open("https://localhost:44339/Views/doctorhomepage.html", "_self");
                                //$('.header-component.doctor.admin')[0].innerText = localStorage.getItem("user");
                            } else {
                                alert("Fail");
                            }
                        }
                    });
                } else {
                    alert("Tài khoản hoặc mật khẩu sai!")
                }
            }
        });
    }
    /**Hàm đăng ký tài khoản bác sĩ (17/03/2020) */
    doctorSignup() {
        var input = $('.doctor-signup-input');
        var doc = {};
        doc.DoctorName = input[0].value;
        doc.UserName = input[1].value;
        doc.Specialist = input[2].value;
        doc.PhoneNumber = input[3].value;
        doc.Email = input[4].value;
        doc.Born = input[5].value;
        doc.Password = input[6].value;
        $.ajax({
            method: 'POST',
            url: '/doctor/insert',
            contentType: "application/json; charset=utf-8",
            async: false,
            data: JSON.stringify(doc),
        }).done(function () {
            window.open("https://localhost:44339/Views/doctorlogin.html", "_self");
        });
    }
    ///**Bệnh nhân đăng nhập (23/03/2020) */
    patientLogin() {
        var me = this;
        var username = $('.patient-login-username')[0].value;
        var password = $('.patient-login-password')[0].value;
        $.ajax({
            method: 'GET',
            url: '/patient/login/' + username + ' /' + password,
            async: false,
            dataType: "json",
            success: function (res) {
                if (res === 1) {
                    $.ajax({
                        method: 'GET',
                        url: '/patient',
                        async: false,
                        dataType: "json",
                        success: function (res) {
                            if (res) {
                                sessionStorage.setItem("userpatient", res[0].UserName);
                                sessionStorage.setItem("patientid", res[0].PatientId);
                                window.open("https://localhost:44339/Views/patienthomepage.html", "_self");
                                //$('.header-component.doctor.admin')[0].innerText = localStorage.getItem("user");
                            } else {
                                alert("Fail");
                            }
                        }
                    });
                } else {
                    alert("Tài khoản hoặc mật khẩu sai!")
                }
            }
        });
    }
    /**Hàm đăng ký tài khoản bác sĩ (17/03/2020) */
    patientSignup() {
        var input = $('.patient-signup-input');
        var doc = {};
        doc.PatientName = input[0].value;
        doc.Born = input[1].value;
        doc.PhoneNumber = input[2].value;
        doc.Email = input[3].value;
        doc.Sex = input[4].value;
        doc.Address = input[5].value;
        doc.Password = input[7].value;
        doc.UserName = input[6].value;
        debugger
        $.ajax({
            method: 'POST',
            url: '/patient/insert',
            contentType: "application/json; charset=utf-8",
            async: false,
            data: JSON.stringify(doc),
        }).done(function () {
            window.open("https://localhost:44339/Views/patientlogin.html", "_self");
        });
    }
}