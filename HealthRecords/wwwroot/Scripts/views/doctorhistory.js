$(document).ready(function () {
    doctorhistory = new doctorhistory();
});

class doctorhistory extends doctor {
    constructor() {
        super();
        this.loadDataTableHistory('th[doctorhistory]', '.main-table.doctor.history tbody', 'MedicalExaminationDetail',
        this.getRef('/meex/doctor'), this.getRef('/patient/doctor'), this.getRef('/meexde'), 'doctorhistory', 'PatientId');
        this.initEventsDoctorHistory();
        this.loadDataTableData('.dialog.doctorhistory.add th[medicalexam]', '.dialog.doctorhistory.add tbody', 'MedicalExamination', this.getRef('/meex/doctor'), 'medicalexam');
        this.loadDataTableData('.dialog.doctorhistory.edit th[medicalexam]', '.dialog.doctorhistory.edit tbody', 'MedicalExamination', this.getRef('/meex/doctor'), 'medicalexam');
    }
    initEventsDoctorHistory() {
        $(document).on("click", ".header-component.doctor.admin", this.showLogoutdoctor);
        $(document).on("click", ".sub-toolbar.doctorhistory.add", this.openDoctorhistoryAdd.bind(this));
        $(document).on("click", ".sub-toolbar.doctorhistory.edit", this.openDoctorhistoryEdit);
        $(document).on("click", ".sub-toolbar.doctorhistory.edit", this.bindDataDialog.bind(this));
        $(document).on("click", ".sub-toolbar.doctorhistory.delete", this.openDoctorhistoryDelete);
        $('tbody').on("click", "tr", this.selectTr);
        $(document).on("click", ".dialog.doctorhistory.add .save", this.insertMedeDoc.bind(this));
        $(document).on("click", ".dialog.doctorhistory.edit .save", this.editMedeDoc.bind(this));
        $(document).on("click", ".dialog.doctorhistory.add .input.mecode, .dialog.doctorhistory.edit .input.mecode", this.showTableMe.bind(this));
        $(document).on("click", ".dialog.doctorhistory.add .medicalexam tr, .dialog.doctorhistory.edit .medicalexam tr", this.printDataFromTable);
        $(document).on("click", ".dialog.doctorhistory.delete .save", this.deleteMedeDoc.bind(this));
        $(document).on("click", ".dialog.doctorhistory.add .input.select, .dialog.doctorhistory.edit .input.select", this.showStatus);
        $(document).on("click", ".dialog.doctorhistory.add .input-select-chil, .dialog.doctorhistory.edit .input-select-chil", this.printStatus);
    }
    printStatus() {
        
        $('.dialog.doctorhistory.add .input.select')[0].innerText = $(this)[0].innerText;
        $('.dialog.doctorhistory.add .input-select').removeClass('show');
        $('.dialog.doctorhistory.edit .input.select')[0].innerText = $(this)[0].innerText;
        $('.dialog.doctorhistory.edit .input-select').removeClass('show');
        debugger
    }
    showStatus() {
        $('.dialog.doctorhistory.add .input-select').toggleClass('show');
        $('.dialog.doctorhistory.edit .input-select').toggleClass('show');
    }
    showLogoutdoctor() {
        $('.header-component.doctor.logout').slideToggle();
    }
    selectTr() {
        $(this).toggleClass("selectTr");
        var x = $('tr.selectTr');
        if (x.length > 1) {
            $('.sub-toolbar.doctorhistory.edit').prop("disabled", true);
            $('.sub-toolbar.doctorhistory.edit').addClass("color-dis");
        }
        if (x.length == 1) {
            $('.sub-toolbar.doctorhistory.edit').prop("disabled", false);
            $('.sub-toolbar.doctorhistory.edit').removeClass("color-dis");
        }
    }
    showTableMe() {
        $('.dialog tr').removeClass("selectTr");
        $('.dialog.doctorhistory.add .medicalexam').toggleClass('show');
        $('.dialog.doctorhistory.edit .medicalexam').toggleClass('show');
    }
    openDoctorhistoryAdd() {
        this.ResetDialog();
        $('.dialog.doctorhistory.add').dialog({
            width: 900,
            height: 600,
        });
    }
    openDoctorhistoryEdit() {
        $('.dialog.doctorhistory.edit').dialog({
            width: 900,
            height: 600,
        });
    }
    openDoctorhistoryDelete() {
        $('.dialog.doctorhistory.delete').dialog({
            width: 400,
            height: 250,
        });
    }
    /**In dữ liệu từ bảng bệnh nhân ra dialog(21/03/2020) */
    printDataFromTable() {
        var x = $(this).children();
        var y = $('.dialog.doctorhistory.add input');
        y[0].value = x[0].innerText;
        y[1].value = x[1].innerText;
        $('.dialog.doctorhistory.add .medicalexam').removeClass('show');
        var a = $('.dialog.doctorhistory.add tr.selectTr').data("recordID");
        sessionStorage.setItem("meexhistory", a);

        var y1 = $('.dialog.doctorhistory.edit input');
        y1[0].value = x[0].innerText;
        y1[1].value = x[1].innerText;
        $('.dialog.doctorhistory.edit .medicalexam').removeClass('show');
    }
    /**Thêm lịch sử (21/03/2020) */
    insertMedeDoc() {
        var me = this;
        var input = $('.dialog.doctorhistory.add .input');
        var input1 = $('.dialog.doctorhistory.add .input1');
        //var input2 = $('.dialog.doctorhistory.add select');
        var medoc = {};
        var username = input[0].value;
        var p = me.getRef('/meexuser/' + username);
        medoc.MedicalExaminationId = p[0].MedicalExaminationId;
        medoc.Diagnose = input[2].value;
        medoc.DiagnoseDetail = input1[0].value;
        medoc.Note = input1[1].value;
        var x2 = input[3].innerText;
        if (x2.length === 12) {
            medoc.Status = 1;
        }
        if (x2.length === 8) {
            medoc.Status = 2;
        }
        $.ajax({
            method: 'POST',
            url: '/meexdeadd/doctor',
            contentType: "application/json; charset=utf-8",
            //async: false,
            data: JSON.stringify(medoc),
        }).done(function () {
            $('.dialog.doctorhistory.add').dialog('close');
            me.loadDataTableHistory('th[doctorhistory]', '.main-table.doctor.history tbody', 'MedicalExaminationDetail',
                me.getRef('/meex/doctor'), me.getRef('/patient/doctor'), me.getRef('/meexde'), 'doctorhistory', 'PatientId');
            $('.dialog tr').removeClass("selectTr");
        })
    }
    /**Hàm xóa một lịch khám chi tiết(21/03/2020) */
    deleteMedeDoc() {
        var listRefID = [];
        $.each($('tr.selectTr'), function (index, item) {
            listRefID.push($(item).data("recordID"));
        });
        var me = this;
        $.ajax({
            method: 'DELETE',
            url: '/meexdedel/doctor',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(listRefID),
            success: function () {
                $('.dialog.doctorhistory.delete').dialog('close');
                me.loadDataTableHistory('th[doctorhistory]', '.main-table.doctor.history tbody', 'MedicalExaminationDetail',
                    me.getRef('/meex/doctor'), me.getRef('/patient/doctor'), me.getRef('/meexde'), 'doctorhistory', 'PatientId');
            },
            error: function () {
                alert('Không xóa được!');
            },
        });
    }     
    /**Sửa lịch sử (22/03/2020) */
    editMedeDoc() {
        var me = this;
        var id = $('tr.selectTr').data("recordID");
        var input = $('.dialog.doctorhistory.edit .input');
        var input1 = $('.dialog.doctorhistory.edit .input1');
        //var input2 = $('.dialog.doctorhistory.edit select');
        var medoc = {};
        var username = input[0].value;
        var p = me.getRef('/meexuser/' + username);
        medoc.MedicalExaminationId = p[0].MedicalExaminationId;
        medoc.Diagnose = input[2].value;
        medoc.DiagnoseDetail = input1[0].value;
        medoc.Note = input1[1].value;
        //var x = "khám lần đầu";
        //var x1 = "tái khám";
        var x2 = input[3].innerText;
        if (x2.length === 12) {
            medoc.Status = 1;
        }
        if (x2.length === 8) {
            medoc.Status = 2;
        }
        $.ajax({
            method: 'PUT',
            url: '/meexdeedit/' + id,
            contentType: "application/json; charset=utf-8",
            //async: false,
            data: JSON.stringify(medoc),
        }).done(function () {
            $('.dialog.doctorhistory.edit').dialog('close');
            me.loadDataTableHistory('th[doctorhistory]', '.main-table.doctor.history tbody', 'MedicalExaminationDetail',
                me.getRef('/meex/doctor'), me.getRef('/patient/doctor'), me.getRef('/meexde'), 'doctorhistory', 'PatientId');
            $('.dialog tr').removeClass("selectTr");
        })
    }
    /**In dữ liệu ra bảng sửa (22/03/2020) */
    bindDataDialog() {
        var me = this;
        var id = $('tr.selectTr').data("recordID");
        var x = '/meexdebyid/' + id;
        var data = me.getRef('/meexdebyid/' + id);
        var input = $('.dialog.doctorhistory.edit .input');
        //var input2 = $('.dialog.doctorhistory.edit select');
        var MedicalExaminationId = data[0].MedicalExaminationId;
        var dataMeex = me.getRef('/meexbyid/' + MedicalExaminationId);
        input[2].value = data[0].Diagnose;
        //input2[3].value = data[0].Status;
        if (data[0].Status === 1) {
            //input[3].value = "khám lần đầu";
            input[3].innerText = "khám lần đầu";
        }
        if (data[0].Status === 2) {
            //input[3].value = "tái khám";
            input[3].innerText = "tái khám";
        }
        input[0].value = dataMeex[0].MedicalExaminationCode;
        input[1].value = dataMeex[0].ExaminationDay;
        $('.dialog.doctorhistory.edit .input1')[0].value = data[0].DiagnoseDetail;
        $('.dialog.doctorhistory.edit .input1')[1].value = data[0].Note;
    }
}