$("#save_btn").hide();
$("#del_btn").hide();
$("#header-addrow").hide();
$("#header-delrow").hide();
$("#excelupload").hide();

grid1.hideColumn("SCELLTP");

$(`#${itmobj1["from_ser"]}`).val(moment().format("YYYY-MM-01"));
$(`#${itmobj1["to_ser"]}`).val(moment().format("YYYY-MM-DD"));

//for printing

$("#cust_btn4").on("click", function (event) {
  const selectedRow = grid1.getCheckedRows();

  if (selectedRow.length === 1) {
    $("#print_btn").trigger("click");
  } else if (selectedRow.length >= 2) {
    msg("Cant print if selected row greater than 1 ");
    return;
  }
  if ($("#msgconfirm").is(":visible")) {
    $("#msgconfirm").dialog("destroy");
  }
});

//handle filter
setAllDefaultValue([itmobj1["from_ser"], itmobj1["to_ser"]]);
$("#search_btn").on("click", function () {
  //from date, to date
  const date_obj = {
    from_ser: $(`#${itmobj1["from_ser"]}`).val(),
    to_ser: $(`#${itmobj1["to_ser"]}`).val(),

    //from_ser: $("#" + itmobj1["from_ser"]).val(),
    //to_ser : $("#" + itmobj1["to_ser"]).val()
  };
  $("#DUMMY15").val(JSON.stringify(date_obj));
});

grid1.on("check uncheck", function () {
  if ($("#DUMMY15").val()) {
    date_obj = JSON.parse($("#DUMMY15").val());
    $(`#${itmobj1["from_ser"]}`).val(date_obj["from_ser"]);
    $(`#${itmobj1["to_ser"]}`).val(date_obj["to_ser"]);
  }
});

$("#search_btn").trigger("click");

$("#reset_btn").on("click", () => {
  $(`#${itmobj1["from_ser"]}`).val(moment().format("YYYY-MM-01"));
  $(`#${itmobj1["to_ser"]}`).val(moment().format("YYYY-MM-DD"));
  $("#search_btn").trigger("click");
});

grid1.on("dblclick", (ev) => {
  if (nvl(ev.rowKey + "", "") != "") {
    const checked = grid1.getCheckedRows();
    if (checked.length == 1) {
      const agency_order_type = checked[0][itmobj1["agency_order_type"]];
      if (agency_order_type == "부산창고출고")
        $("#cust_btn10").trigger("click");
      if (agency_order_type == "전수배") $("#cust_btn9").trigger("click");
      if (agency_order_type == "협력업체직출고")
        $("#cust_btn8").trigger("click");
      $("#DUMMY1").val(checked[0][itmobj1["release_order_no"]]);
      $("#DUMMY2").val(checked[0][itmobj1["release_no"]]);
    }
  }
});

$(window).on("resize", function () {
  var height =
    $(".right-content").height() -
    ($(".ui-widget-header").height() + $(".editer-content1").height() + 100);
  grid1.setHeight(height);
});
