var $ = require("jquery");
var _ = require("underscore");
var prDetails = [];
window.myData = [];
//toggleText extend
$.fn.extend({
  toggleText: function(a, b) {
    return this.text(this.text() == b ? a : b);
  }
});

// var Expand = document.getElementsByClassName("ExpandAllDetail").item(0);
// Expand.addEventListener("click", function() {
//   var icons = this.querySelectorAll("i.fa-angle-double-down");
//   for (var value of icons.values()) {
//     console.log(`value:${value.outerHTML}`);
//   }

//   // alert(this.parentNode.parentNode.parentNode.parentNode.nodeName);
//   var eAll = document.querySelectorAll(".ExpandAllDetail");
//   for (var value of eAll.values()) {
//     console.log(value);
//   }
// });

//querySelect取得第一個符合的node
var Expand1 = document.querySelector(".ExpandAllDetail");
Expand1.addEventListener("click", function() {
  var icons = this.querySelectorAll("i.fa-angle-double-down");
  for (var value of icons.values()) {
    console.log(`value:${value.outerHTML}`);
  }
});

$(function() {
  //產生明細內容
  $.when($.ajax("template.html"), $.getJSON("src/data.json")).done(function(
    template,
    data
  ) {
    //$.ajax("template.html"), $.getJSON("src/data.json") 取得版型和取得資料，每個回傳結果如下
    //data, statusText, jqXHR
    var prTemplate = $("#prDetail", $(template[0])).html(); //取得版型
    // //版型綁定資料
    // $.getJSON("src/data.json", function(data) {
    myData = data[0];

    for (var i = 0; i < myData.length; i++) {
      $.each(myData[i], function(key, val) {
        Object.defineProperty(myData[i], key, {
          get: function() {
            return val;
          },
          set: function(newValue) {
            console.log(myData[i]);
            console.log(newValue);
          }
        });
      });

      var poTemplate = _.template(prTemplate);
      $("table").append(poTemplate(myData[i]));
    }
  });

  //展開明細
  $(document).on("click", ".ExpandDetail", function() {
    var trChevron = $(this)
      .parents("tr")
      .siblings();
    if ($(this).find("i.fa-angle-down").length > 0) {
      trChevron.show(200);
      trChevron
        .find(".ExpandInnerDetail")
        .parents("tr")
        .nextAll()
        .show();
      trChevron
        .find(".ExpandInnerDetail")
        .parents("tr")
        .next()
        .hide();
      trChevron.find("span").text("收合");
    } else if ($(this).find("i.fa-angle-up").length > 0) {
      trChevron.hide(200);
      $(this)
        .find("span")
        .text("展開");
    }
    $(this)
      .find(".toggleArrow")
      .toggleClass("fa-angle-up fa-angle-down");
  });
  //展開送貨層
  $(document).on("click", ".ExpandInnerDetail", function() {
    if (
      $(this)
        .find("span")
        .text() === "展開"
    ) {
      $(this)
        .parents("tr")
        .nextAll()
        .show();
      $(this)
        .parents("tr")
        .next()
        .hide();
    } else if (
      $(this)
        .find("span")
        .text() === "收合"
    ) {
      $(this)
        .parents("tr")
        .nextAll()
        .hide();
      $(this)
        .parents("tr")
        .next()
        .show();
    }
    $(this)
      .find("span")
      .toggleText("展開", "收合");
  });
  //展開所有明細層
  $(".ExpandAllDetail").click(function() {
    if ($(this).find("i.fa-angle-double-down").length > 0) {
      $(this)
        .parents("table")
        .find("tbody .ExpandDetail")
        .each(function(index, element) {
          if ($(element).find("i.fa-angle-down").length > 0) {
            $(element).trigger("click");
          }
        });
      $(this)
        .parents("table")
        .find("tbody .ExpandInnerDetail")
        .each(function(index, element) {
          if (
            $(element)
              .find("span")
              .text() === "展開"
          ) {
            $(element).trigger("click");
          }
        });
    } else if ($(this).find("i.fa-angle-double-up").length > 0) {
      $(this)
        .parents("table")
        .find("tbody .ExpandDetail")
        .each(function(index, element) {
          if ($(element).find("i.fa-angle-up").length > 0) {
            $(element).trigger("click");
          }
        });
    }
    $(this)
      .find(".toggleArrow")
      .toggleClass("fa-angle-double-down fa-angle-double-up");
  });
});
