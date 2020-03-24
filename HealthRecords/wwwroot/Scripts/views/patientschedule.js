$(document).ready(function () {
    patientschedule = new patientschedule();
});

class patientschedule extends patient {
    constructor() {
        super();
        //this.loadDataTableSchedule('.main-table.patient.schedule th[patientschedule]', '.main-table.patient.schedule tbody', 'MedicalExamination',
        //    this.getRef('/meex/patient'), this.getRef('/doctor/all'), 'patientschedule');
        this.loadDataTableSchedule('.main-table.patient.schedule th[patientschedule]', '.main-table.patient.schedule tbody', 'MedicalExamination',
            this.getRef('/meex/patient'), this.getRef('/doctor/patient'), 'patientschedule', 'DoctorId');
        this.loadDataTableData('.dialog.patientschedule.add th[doctor]', '.dialog.patientschedule.add tbody', 'Doctor', this.getRef('/doctor/all'), 'doctor');
        this.loadDataTableData('.dialog.patientschedule.edit th[doctor]', '.dialog.patientschedule.edit tbody', 'Doctor', this.getRef('/doctor/all'), 'doctor');
        this.initEventspatientSchedule();
    }
    initEventspatientSchedule() {
        $(document).on("click", "tr", this.selectTr);
        $(document).on("click", ".header-component.patient.admin", this.showLogoutpatient);
        $(document).on("click", ".dialog.patientschedule.add .input.username, .dialog.patientschedule.edit .input.username", this.showTableDoctor.bind(this));
        $(document).on("click", ".dialog.patientschedule.add .doctor tr, .dialog.patientschedule.edit .doctor tr", this.printDataFromTable);
        $(document).on("click", ".sub-toolbar.patientschedule.delete", this.openPatientscheduleDelete);
        $(document).on("click", ".sub-toolbar.patientschedule.edit", this.bindDataDialog.bind(this));
        $(document).on("click", ".dialog.patientschedule.add .save", this.insertMePat.bind(this));
        $(document).on("click", ".dialog.patientschedule.edit .save", this.editMePat.bind(this));
        $(document).on("click", ".dialog.patientschedule.delete .save", this.deleteMe.bind(this));
    }
    openPatientscheduleDelete() {
        $('.dialog.patientschedule.delete').dialog({
            width: 400,
            height: 250,
        });
    }
    showLogoutpatient() {
        $('.header-component.patient.logout').slideToggle();
    }
    selectTr() {
        $(this).toggleClass("selectTr");
        var x = $('tr.selectTr');
        if (x.length > 1) {
            $('.sub-toolbar.patientschedule.edit').prop("disabled", true);
            $('.sub-toolbar.patientschedule.edit').addClass("color-dis");
        }
        if (x.length == 1) {
            $('.sub-toolbar.patientschedule.edit').prop("disabled", false);
            $('.sub-toolbar.patientschedule.edit').removeClass("color-dis");
        }
    }
    /**Hiện bảng bác sĩ */
    showTableDoctor() {
        $('.dialog.patientschedule.add .doctor').toggleClass('show');
        $('.dialog.patientschedule.add .doctor tr').removeClass('selectTr');
        $('.dialog.patientschedule.edit .doctor').toggleClass('show');
        $('.dialog.patientschedule.edit .doctor tr').removeClass('selectTr');
    }
    /*In thông tin ra ô input**/
    printDataFromTable() {
        var x = $(this).children();
        var y = $('.dialog.patientschedule.add input');
        y[2].value = x[0].innerText;
        y[3].value = x[1].innerText;
        $('.dialog.patientschedule.add .doctor').removeClass('show');

        var y1 = $('.dialog.patientschedule.edit input');
        y1[2].value = x[0].innerText;
        y1[3].value = x[1].innerText;
        $('.dialog.patientschedule.edit .doctor').removeClass('show');
    }
    /**Thêm lịch khám cho bệnh nhân */
    insertMePat() {
        var me = this;
        var input = $('.dialog.patientschedule.add input');
        var doctor = me.getRef('/doctorbyuser/' + input[2].value);
        var medoc = {};
        medoc.MedicalExaminationCode = input[0].value;
        medoc.DoctorId = doctor[0].DoctorId;
        medoc.PatientId = sessionStorage.getItem("patientid");
        medoc.ExaminationDay = input[1].value;
        medoc.Note = $('.dialog.patientschedule.add .input1')[0].value;
        $.ajax({
            method: 'POST',
            url: '/meexadd',
            contentType: "application/json; charset=utf-8",
            //async: false,
            data: JSON.stringify(medoc),
        }).done(function () {
            $('.dialog.patientschedule.add').dialog('close');
            me.loadDataTableSchedule('.main-table.patient.schedule th[patientschedule]', '.main-table.patient.schedule tbody', 'MedicalExamination',
                me.getRef('/meex/patient'), me.getRef('/doctor/patient'), 'patientschedule', 'DoctorId');
        })
    }
    /**Sửa một bản ghi lịch khám (23/03/2021) */
    editMePat() {
        var input = $('.dialog.patientschedule.edit input');
        var id = $('tr.selectTr').data("recordID");
        var me = this;
        var patient = input[2].value;
        var medoc = {};
        medoc.MedicalExaminationCode = input[0].value;
        var doctor = me.getRef('/doctorbyuser/' + input[2].value);
        medoc.DoctorId = doctor[0].DoctorId;
        medoc.PatientId = sessionStorage.getItem("patientid");
        medoc.ExaminationDay = input[1].value;
        medoc.Note = $('.dialog.patientschedule.edit .input1')[0].value;
        $.ajax({
            method: 'PUT',
            url: '/meexedit/' + id,
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(medoc),
        }).done(function () {
            $('.dialog.patientschedule.edit').dialog('close');
            me.loadDataTableSchedule('.main-table.patient.schedule th[patientschedule]', '.main-table.patient.schedule tbody', 'MedicalExamination',
                me.getRef('/meex/patient'), me.getRef('/doctor/patient'), 'patientschedule', 'DoctorId');
        })
    }
    /**Hàm xóa một lịch khám (19/03/2020) */
    deleteMe() {
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
                $('.dialog.patientschedule.delete').dialog('close');
                me.loadDataTableSchedule('.main-table.patient.schedule th[patientschedule]', '.main-table.patient.schedule tbody', 'MedicalExamination',
                    me.getRef('/meex/patient'), me.getRef('/doctor/patient'), 'patientschedule', 'DoctorId');
            },
            error: function () {
                alert('Không xóa được!');
            },
        });
    }
    /**In dữ liệu ra bảng sửa (21/03/2020) */
    bindDataDialog() {
        var me = this;
        var id = $('tr.selectTr').data("recordID");
        //var x = '/meexbyid/' + id;
        var data = me.getRef('/meexbyid/' + id);
        var input = $('.dialog.patientschedule.edit input');
        var doctorid = data[0].DoctorId;
        var dataPatient = me.getRef('/doctorbyid/' + doctorid);
        input[0].value = data[0].MedicalExaminationCode;
        input[1].value = data[0].ExaminationDay;
        input[2].value = dataPatient[0].UserName;
        input[3].value = dataPatient[0].DoctorName;
        $('.dialog.patientschedule.edit .input1')[0].value = data[0].Note;
    }
    
}