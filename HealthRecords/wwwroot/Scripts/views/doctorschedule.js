$(document).ready(function () {
    doctorschedule = new doctorschedule();
});

class doctorschedule extends doctor {
    constructor() {
        super();
        this.loadDataTableSchedule('.main-table.doctor.schedule th[doctorschedule]', '.main-table.doctor.schedule tbody', 'MedicalExamination',
        this.getRef('/meex/doctor'), this.getRef('/patient/doctor'), 'doctorschedule', 'PatientId');
        this.initEventsDoctorSchedule();
        this.loadDataTableData('.dialog.doctorschedule.add th[patient]', '.dialog.doctorschedule.add tbody', 'Patient', this.getRef('/getpatientall'), 'patient');
        this.loadDataTableData('.dialog.doctorschedule.edit th[patient]', '.dialog.doctorschedule.edit tbody', 'Patient', this.getRef('/getpatientall'), 'patient');
        //this.ResetDialog();
    }
    initEventsDoctorSchedule() {
        $(document).on("click", ".header-component.doctor.admin", this.showLogoutdoctor);
        $(document).on("click", ".sub-toolbar.doctorschedule.add", this.openDoctorscheduleAdd.bind(this));
        $(document).on("click", ".sub-toolbar.doctorschedule.edit", this.bindDataDialog.bind(this));
        $(document).on("click", ".sub-toolbar.doctorschedule.edit", this.openDoctorscheduleEdit.bind(this));
        $(document).on("click", ".sub-toolbar.doctorschedule.delete", this.openDoctorscheduleDelete);
        $(document).on("click", ".dialog.doctorschedule.add .save", this.insertMeDoc.bind(this));
        $(document).on("click", ".dialog.doctorschedule.edit .save", this.editMeDoc.bind(this));
        $(document).on("click", ".dialog.doctorschedule.delete .save", this.deleteMeDoc.bind(this));
        $(document).on("click", "tr", this.selectTr);
        $(document).on("click", ".dialog.doctorschedule.add .input.username, .dialog.doctorschedule.edit .input.username", this.showTablePatient.bind(this));
        //$(document).on("click", ".dialog.doctorschedule.edit .input.username", this.showTablePatient1.bind(this)); 
        $(document).on("click", ".dialog.doctorschedule.add .patient tr, .dialog.doctorschedule.edit .patient tr", this.printDataFromTable);
    }
    
    selectTr() {
        $(this).toggleClass("selectTr");
        var x = $('tr.selectTr');
        if (x.length > 1) {
            $('.sub-toolbar.doctorschedule.edit').prop("disabled", true);
            //$('.sub-toolbar.doctorschedule.delete').prop("disabled", true);
            $('.sub-toolbar.doctorschedule.edit').addClass('color-dis');
            //$('.sub-toolbar.doctorschedule.delete').addClass('color-dis');
        }
        if (x.length == 1) {
            $('.sub-toolbar.doctorschedule.edit').prop("disabled", false);
            //$('.sub-toolbar.doctorschedule.delete').prop("disabled", false);
            $('.sub-toolbar.doctorschedule.edit').removeClass('color-dis');
            //$('.sub-toolbar.doctorschedule.delete').removeClass('color-dis');
        }
    }
    showTablePatient() {
        $('.dialog.doctorschedule.add .patient').toggleClass('show');
        $('.dialog.doctorschedule.edit .patient').toggleClass('show');
        $('.dialog tr').removeClass("selectTr");
    }
    showLogoutdoctor() {
        $('.header-component.doctor.logout').slideToggle();
    }
    /**Hàm đăng lịch khám cho bác sĩ(19/03/2020) */
    insertMeDoc() {
       
        var me = this;
        var patient = sessionStorage.getItem("patientschedule");
        var input = $('.dialog.doctorschedule.add input');
        var medoc = {};
        medoc.MedicalExaminationCode = input[0].value;
        medoc.PatientId = patient;
        medoc.DoctorId = sessionStorage.getItem("doctorid");
        medoc.ExaminationDay = input[1].value;
        medoc.Note = $('.dialog.doctorschedule.add .input1')[0].value;
        $.ajax({
            method: 'POST',
            url: '/meexadd',
            contentType: "application/json; charset=utf-8",
            //async: false,
            data: JSON.stringify(medoc),
        }).done(function () {
            $('.dialog.doctorschedule.add').dialog('close');
            me.loadDataTableSchedule('.main-table.doctor.schedule th[doctorschedule]', '.main-table.doctor.schedule tbody', 'MedicalExamination',
                me.getRef('/meex/doctor'), me.getRef('/patient/doctor'), 'doctorschedule', 'PatientId');
            $('.dialog tr').removeClass("selectTr");
        })

    }
    /**Sửa một bản khi lịch khám (21/03/2021) */
    editMeDoc() {
        var input = $('.dialog.doctorschedule.edit input');
        var id = $('tr.selectTr').data("recordID");
        var me = this;
        var patient = input[2].value;
        var medoc = {};
        medoc.MedicalExaminationCode = input[0].value;
        var p = me.getRef('/getpatientbyuser/' + patient);
        medoc.PatientId = p[0].PatientId;
        medoc.DoctorId = sessionStorage.getItem("doctorid");
        medoc.ExaminationDay = input[1].value;
        medoc.Note = $('.dialog.doctorschedule.edit .input1')[0].value;
        $.ajax({
            method: 'PUT',
            url: '/meexedit/' + id,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(medoc),
        }).done(function () {
            $('.dialog.doctorschedule.edit').dialog('close');
            me.loadDataTableSchedule('.main-table.doctor.schedule th[doctorschedule]', '.main-table.doctor.schedule tbody', 'MedicalExamination',
                me.getRef('/meex/doctor'), me.getRef('/patient/doctor'), 'doctorschedule', 'PatientId');
            $('.dialog tr').removeClass("selectTr");
        })
    }
    openDoctorscheduleAdd() {
        this.ResetDialog();
        $('.dialog.doctorschedule.add').dialog({
            width: 700,
            height: 410,
        });
    }
    openDoctorscheduleEdit() {
        $('.dialog.doctorschedule.edit .patient').removeClass('show');
        $('.dialog tr').removeClass("selectTr");
        $('.dialog.doctorschedule.edit').dialog({
            width: 700,
            height: 410,
        });
    }
    openDoctorscheduleDelete() {
        $('.dialog.doctorschedule.delete').dialog({
            width: 400,
            height: 250,
        });
    }
    /**Hàm xóa một lịch khám (19/03/2020) */
    deleteMeDoc() {
        var listRefID = [];
        $.each($('tr.selectTr'), function (index, item) {
            listRefID.push($(item).data("recordID"));
        });
        var me = this;
        $.ajax({
            method: 'DELETE',
            url: '/meexdel',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(listRefID),
            success: function () {
                $('.dialog.doctorschedule.delete').dialog('close');
                me.loadDataTableSchedule('.main-table.doctor.schedule th[doctorschedule]', '.main-table.doctor.schedule tbody', 'MedicalExamination',
                    me.getRef('/meex/doctor'), me.getRef('/patient/doctor'), 'doctorschedule', 'PatientId');
            },
            error: function () {
                alert('Không xóa được!');
            },
        });
    }     
    /**In dữ liệu từ bảng bệnh nhân ra dialog(21/03/2020) */
    printDataFromTable() {
        var x = $(this).children();
        var y = $('.dialog.doctorschedule.add input');
        y[2].value = x[0].innerText;
        y[3].value = x[1].innerText;
        $('.dialog.doctorschedule.add .patient').removeClass('show');
        var a = $('.dialog.doctorschedule.add tr.selectTr').data("recordID");
        sessionStorage.setItem("patientschedule", a);

        var y1 = $('.dialog.doctorschedule.edit input');  
        y1[2].value = x[0].innerText;
        y1[3].value = x[1].innerText;
        $('.dialog.doctorschedule.edit .patient').removeClass('show');
    }
    /**In dữ liệu ra bảng sửa (21/03/2020) */
    bindDataDialog() {
        var me = this;
        var id = $('tr.selectTr').data("recordID");
        //var x = '/meexbyid/' + id;
        var data = me.getRef('/meexbyid/' + id);
        var input = $('.dialog.doctorschedule.edit input');
        var patientId = data[0].PatientId;
        var dataPatient = me.getRef('/getpatientbyid/' + patientId);
        input[0].value = data[0].MedicalExaminationCode;
        input[1].value = data[0].ExaminationDay;
        input[2].value = dataPatient[0].UserName;
        input[3].value = dataPatient[0].PatientName;
        $('.dialog.doctorschedule.edit .input1')[0].value = data[0].Note;
    }
}
