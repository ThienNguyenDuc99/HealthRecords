$(document).ready(function () {
    base = new base();
});

class base {
    constructor() {
        this.setstatusAcount();
        //$(document).on("click", "tbody tr", this.selectTr);      
    }
    setstatusAcount() {
        var x = sessionStorage.getItem("doctorid");
        var z = "";
    }

    //selectTr() {
    //    $(this).toggleClass("selectTr");
    //}
    /**Hàm lấy dữ liệu
    * Người tạo: Nguyễn Đức Thiện (17/03/2020)
    * */
    getRef() {
        try {
            var url = arguments[0];
            var fakeData = [];
            $.ajax({
                method: 'GET',
                url: url,
                async: false,
                dataType: "json",
                success: function (res) {
                    if (res) {
                        fakeData = res;
                    } else {
                        alert("Fail");
                    }
                }
            });
            return fakeData;
        } catch (e) {
            alert(e.message);
        }
    }
    /*  Hàm load dữ liệu ra bảng lịch sử
    * Người tạo: NDThien
    * 
    * */
    loadDataTableHistory() {
        var meex = arguments[3];
        var patient = arguments[4];
        var meeexde = arguments[5];
        var dataIndex = arguments[6];
        var dataId = arguments[7];
        var fields = arguments[0];
        var target = arguments[1];
        var name = arguments[2];
        $(target).empty();
        var fieldData = $(fields);
        $.each(meeexde, function (index, itemmeexde) {
        $.each(meex, function (index, itemmeex) {
            $.each(patient, function (index, itempatient) {
                if (itemmeexde.MedicalExaminationId == itemmeex.MedicalExaminationId && itemmeex[dataId] == itempatient[dataId]) {
                    var rowHTML = $('<tr></tr>').data("recordID", itemmeexde[name + "Id"])
                    $.each(fieldData, function (fieldIndex, fieldItem) {
                        var fieldName = fieldItem.getAttribute(dataIndex);
                        var meexdeValue = itemmeexde[fieldName];
                        var meexValue = itemmeex[fieldName];
                        var patientValue = itempatient[fieldName];
                        if (fieldName === 'MedicalExaminationDetailId') {
                            meexdeValue != undefined ? rowHTML.append('<td>' + meexdeValue + '</td>') : rowHTML.append('<td></td>');
                        }
                        //if (fieldName === 'MedicalExaminationCode') {
                        //    meexValue != undefined ? rowHTML.append('<td>' + meexValue + '</td>') : rowHTML.append('<td></td>');
                        //}
                        if (fieldName === 'ExaminationDay') {
                            meexValue = new Date(meexValue);
                            meexValue != "Invalid Date" ? rowHTML.append('<td>' + meexValue.ddmmyyyy() + '</td>') : rowHTML.append('<td></td>');
                        }
                        if (fieldName === 'Diagnose') {
                            meexdeValue != undefined ? rowHTML.append('<td>' + meexdeValue + '</td>') : rowHTML.append('<td></td>');
                        }
                        if (fieldName === 'DiagnoseDetail') {
                            meexdeValue != undefined ? rowHTML.append('<td>' + meexdeValue + '</td>') : rowHTML.append('<td></td>');
                        }
                        if (fieldName === 'UserName') {
                            patientValue != undefined ? rowHTML.append('<td>' + patientValue + '</td>') : rowHTML.append('<td></td>');
                        }
                        if (fieldName === 'PatientName') {
                            patientValue != undefined ? rowHTML.append('<td>' + patientValue + '</td>') : rowHTML.append('<td></td>');
                        } 
                        if (fieldName === 'DoctorName') {
                            patientValue != undefined ? rowHTML.append('<td>' + patientValue + '</td>') : rowHTML.append('<td></td>');
                        }
                        if (fieldName === 'Status') {
                            if (meexdeValue === 1) {
                                var x = "khám lần đầu";
                                rowHTML.append('<td>' + x + '</td>');
                            }
                            if (meexdeValue === 2) {
                                var x = "tái khám";
                                rowHTML.append('<td>' + x + '</td>');
                            }
                        } 
                       
                    });
                    $(target).append(rowHTML);
                }
            }); 
        });
        });

    }
    /**Load dữ liệu ra bảng lịch hẹn khám(18/03/2020) */
    loadDataTableSchedule() {
        var meex = arguments[3];
        var dataUser = arguments[4];
        var dataIndex = arguments[5];
        let dataId = arguments[6];
        var fields = arguments[0];
        var target = arguments[1];
        var name = arguments[2];
        $(target).empty();
        var fieldData = $(fields);
            $.each(meex, function (index, itemmeex) {
                $.each(dataUser, function (index, itemuser) {
                    if (itemmeex[dataId] == itemuser[dataId]) {
                        var rowHTML = $('<tr></tr>').data("recordID", itemmeex[name + "Id"])
                        $.each(fieldData, function (fieldIndex, fieldItem) {
                            var fieldName = fieldItem.getAttribute(dataIndex);
                            var meexValue = itemmeex[fieldName];
                            var userValue = itemuser[fieldName];
                            if (fieldName === 'MedicalExaminationCode') {
                                meexValue != undefined ? rowHTML.append('<td>' + meexValue + '</td>') : rowHTML.append('<td></td>');
                            }
                            if (fieldName === 'ExaminationDay') {
                                meexValue = new Date(meexValue);
                                meexValue != "Invalid Date" ? rowHTML.append('<td>' + meexValue.ddmmyyyy() + '</td>') : rowHTML.append('<td></td>');
                            }
                            if (fieldName === 'Note') {
                                meexValue != undefined ? rowHTML.append('<td>' + meexValue + '</td>') : rowHTML.append('<td></td>');
                            }
                            if (fieldName === 'UserName') {
                                userValue != undefined ? rowHTML.append('<td>' + userValue + '</td>') : rowHTML.append('<td></td>');
                            }
                            if (fieldName === 'PatientName') {
                                userValue != undefined ? rowHTML.append('<td>' + userValue + '</td>') : rowHTML.append('<td></td>');
                            }
                            if (fieldName === 'DoctorName') {
                                userValue != undefined ? rowHTML.append('<td>' + userValue + '</td>') : rowHTML.append('<td></td>');
                            }

                        });
                        $(target).append(rowHTML);
                    }
                });
            });
    }
    /**Load danh sách bệnh nhân trong dialog(20/03/2020) */
    loadDataTableData() {
        var data = arguments[3];
        var dataIndex = arguments[4];
        var fields = arguments[0];
        var target = arguments[1];
        var name = arguments[2];
        $(target).empty();
        var fieldData = $(fields);
            $.each(data, function (index, item) {
                var rowHTML = $('<tr></tr>').data("recordID", item[name + "Id"])
                    $.each(fieldData, function (fieldIndex, fieldItem) {
                        var fieldName = fieldItem.getAttribute(dataIndex);
                        var patientValue = item[fieldName];
                        if (fieldName === 'PatientName') {
                            patientValue != undefined ? rowHTML.append('<td>' + patientValue + '</td>') : rowHTML.append('<td></td>');
                        }
                        if (fieldName === 'DoctorName') {
                            patientValue != undefined ? rowHTML.append('<td>' + patientValue + '</td>') : rowHTML.append('<td></td>');
                        }
                        if (fieldName === 'UserName') {
                            patientValue != undefined ? rowHTML.append('<td>' + patientValue + '</td>') : rowHTML.append('<td></td>');
                        }
                        var fieldName1 = fieldItem.getAttribute('medicalexam');
                        var meValue = item[fieldName1];
                        if (fieldName1 === 'MedicalExaminationCode') {
                            meValue != undefined ? rowHTML.append('<td>' + meValue + '</td>') : rowHTML.append('<td></td>');
                        }
                        if (fieldName1 === 'ExaminationDay') {
                            meValue != undefined ? rowHTML.append('<td>' + meValue + '</td>') : rowHTML.append('<td></td>');
                        }
                    });
                    $(target).append(rowHTML);
            });
    }
}