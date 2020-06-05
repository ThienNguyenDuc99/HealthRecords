$(document).ready(function () {
    patienthistory = new patienthistory();
});

class patienthistory extends patient {
    constructor() {
        super();
        //this.loadDataTableSchedule('.main-table.patient.schedule th[patientschedule]', '.main-table.patient.schedule tbody', 'MedicalExamination',
        //    this.getRef('/meex/patient'), this.getRef('/doctor/all'), 'patientschedule');
        this.loadDataTableHistory('th[patienthistory]', '.main-table.patient.history tbody', 'MedicalExaminationDetail',
        this.getRef('/meex/patient'), this.getRef('/doctor/patient'), this.getRef('/meexde/patient'), 'patienthistory', 'DoctorId');
        // this.loadDataTableData('.dialog.patientschedule.add th[patient]', '.dialog.patientschedule.add tbody', 'Patient', this.getRef('/patient/patient'), 'patient');
        //this.loadDataTableData('.dialog.patientschedule.edit th[patient]', '.dialog.patientschedule.edit tbody', 'Patient', this.getRef('/patient/patient'), 'patient');
        this.initEventspatientHistory();

    }
    initEventspatientHistory() {
        $(document).on("click", ".sub-toolbar.patienthistory.view", this.openDialogView);
        $(document).on("click", ".sub-toolbar.patienthistory.view", this.ViewHistory.bind(this));

        $(document).on("click", ".header-component.patient.admin", this.showLogoutpatient);
        $(document).on("click", "tbody tr", this.selectTr);
    }
    showLogoutpatient() {
        $('.header-component.patient.logout').slideToggle();

    }
    selectTr() {
        $(this).toggleClass("selectTr");
        var x = $('tr.selectTr');
        if (x.length > 1) {
            $('.sub-toolbar.patienthistory.view').prop("disabled", true);
            $('.sub-toolbar.patienthistory.view').addClass("color-dis");
        }
        if (x.length == 1) {
            $('.sub-toolbar.patienthistory.view').prop("disabled", false);
            $('.sub-toolbar.patienthistory.view').removeClass("color-dis");
        }
    }
    openDialogView() {
        $('.dialog.patienthistory.view').dialog({
            width: 800,
            height: 500,
        });
    }
    /**Xem lịch sử */
    ViewHistory() {
        var me = this;
        var id = $('tr.selectTr').data("recordID");
        var data = me.getRef('/meexdebyid/' + id);
        var input = $('.dialog.patienthistory.view .input');
        var MedicalExaminationId = data[0].MedicalExaminationId;
        var dataMeex = me.getRef('/meexbyid/' + MedicalExaminationId);
        var DoctorId = dataMeex[0].DoctorId;
        var dataDoc = me.getRef('/doctorbyid/' + DoctorId);
        input[0].value = dataMeex[0].MedicalExaminationCode;
        input[1].value = dataMeex[0].ExaminationDay;
        input[2].value = dataDoc[0].UserName;
        input[3].value = dataDoc[0].DoctorName;
        input[4].value = data[0].Diagnose;
        if (data[0].Status === 1) {
            //input[3].value = "khám lần đầu";
            input[5].value = "khám lần đầu";
        }
        if (data[0].Status === 2) {
            //input[3].value = "tái khám";
            input[5].value = "tái khám";
        }
        input[0].value = dataMeex[0].MedicalExaminationCode;
        input[1].value = dataMeex[0].ExaminationDay;
        $('.dialog.patienthistory.view .input1')[0].value = data[0].DiagnoseDetail;
        $('.dialog.patienthistory.view .input1')[1].value = data[0].Note;
    }
}