const addingZeroToDate = require("./addingZeroToDate");
const provinces = require("./provinces");
const random = require("./randomNumber");
const moment = require("moment");
const replaceDashFromDate = require("./replceDashFromDate");

const date = {
  0: "Chủ Nhật",
  1: "Thứ Hai",
  2: "Thứ Ba",
  3: "Thứ Tư",
  4: "Thứ Năm",
  5: "Thứ Sáu",
  6: "Thứ Bảy",
};

const generatePostContent = (provinceId = 1, provinceInDay = []) => {
  const today = new Date();
  let province = "miền Bắc";
  let provinceKey = "mb";
  let provinceKeyCap = "MB";

  if (provinceId == 2) {
    province = "miền Trung";
    provinceKey = "mt";
    provinceKeyCap = "MT";
  } else if (provinceId == 3) {
    province = "miền Nam";
    provinceKey = "mn";
    provinceKeyCap = "MN";
  }
  let content = `
  <h2 style="box-sizing: border-box; font-weight: 400; vertical-align: baseline; overflow-wrap: break-word; margin: 0px; font-size: 18px; color: rgb(29, 112, 196); font-family: Arial, sans-serif, Tahoma, Helvetica;"><strong style="box-sizing: border-box;">1. Chốt số dự đoán XS${provinceKeyCap} ${addingZeroToDate(today)}</strong></h2>

  <p style="box-sizing: border-box; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 15.4px;">Hãy cùng chuyên gia <span style="color: rgb(53, 152, 219);" data-mce-style="color: #3598db;">dự đoán XS${provinceKeyCap} ${
    date[today.getDay()]
  } ${replaceDashFromDate(
    addingZeroToDate(today)
  )}</span>&nbsp;hôm nay siêu chuẩn với các kết quả dự đoán giải đặt biệt đầu đuôi, giải lô tô 2 số, lô xiên chính xác nhất.</p>
  <p style="box-sizing: border-box; font-family: &quot;Helvetica Neue&quot;, Helvetica, Arial, sans-serif; font-size: 15.4px;">Để kết quả dự đoán được chính xác. Bạn nên tham khảo lại kết quả Xổ Số Miền Bắc các kỳ trước để có cơ sở so sánh và đưa ra quyết định chọn con số phù hợp, có cơ hội trúng giải cao nhất.</p>

  <h3 style="box-sizing: border-box; font-weight: 400; vertical-align: baseline; overflow-wrap: break-word; margin: 0px; color: rgb(51, 51, 51); font-family: Arial, sans-serif, Tahoma, Helvetica;"><strong style="box-sizing: border-box;">Chốt số ${province} ngày ${addingZeroToDate(today)}</strong></h3>

  <p style="box-sizing: border-box; vertical-align: baseline; overflow-wrap: break-word; line-height: 24px; margin: 5px; color: rgb(51, 51, 51); font-family: Arial, sans-serif, Tahoma, Helvetica; font-size: 15px;">Giờ vàng chốt số , dự đoán đầu đuôi, xỉu chủ, soi cầu , cặp lô đẹp hôm nay ngày ${addingZeroToDate(today)} mời các bạn cùng tham khảo:</p>

  <p style="box-sizing: border-box; vertical-align: baseline; overflow-wrap: break-word; line-height: 24px; margin: 5px; color: rgb(51, 51, 51); font-family: Arial, sans-serif, Tahoma, Helvetica; font-size: 15px;">🌟 Soi cầu bạch thủ giải đặc biệt đầu, đuôi:&nbsp;<span style="box-sizing: border-box; vertical-align: baseline; overflow-wrap: break-word; color: rgb(255, 0, 0);"><strong style="box-sizing: border-box;">${random(1,99,true)}</strong></span></p>

  <p style="box-sizing: border-box; vertical-align: baseline; overflow-wrap: break-word; line-height: 24px; margin: 5px; color: rgb(51, 51, 51); font-family: Arial, sans-serif, Tahoma, Helvetica; font-size: 15px;">🌟 Lô xiên bao lô 2 số:&nbsp;<span style="box-sizing: border-box; vertical-align: baseline; overflow-wrap: break-word; color: rgb(255, 0, 0);"><strong style="box-sizing: border-box;">${random(1,99,true)} - ${random(1,99,true)} - ${random(1,99,true)}</strong></span></p>

  <p style="box-sizing: border-box; vertical-align: baseline; overflow-wrap: break-word; line-height: 24px; margin: 5px; color: rgb(51, 51, 51); font-family: Arial, sans-serif, Tahoma, Helvetica; font-size: 15px;">🌟 Soi cầu 3 càng ${province} vip bao trúng:&nbsp;<span style="box-sizing: border-box; vertical-align: baseline; overflow-wrap: break-word; color: rgb(255, 0, 0);"><strong style="box-sizing: border-box;">${random(100,999,true)} - ${random(100,999,true)}</strong></span></p>

  <p style="box-sizing: border-box; vertical-align: baseline; overflow-wrap: break-word; line-height: 24px; margin: 5px; color: rgb(51, 51, 51); font-family: Arial, sans-serif, Tahoma, Helvetica; font-size: 15px;">🌟 Soi cầu lô kép ngon:&nbsp;<span style="box-sizing: border-box; vertical-align: baseline; overflow-wrap: break-word; color: rgb(255, 0, 0);"><strong style="box-sizing: border-box;">${random(1,99,true)} - ${random(1,99,true)}</strong></span></p>

  <p style="box-sizing: border-box; margin: 0px 0px 10px; line-height: 22px;  margin: 5px; padding: 0px; text-align: justify; color: rgb(51, 51, 51); font-family: roboto, sans-serif; font-size: 14px;">🌟 Hai số cuối giải Đặc Biệt :&nbsp;<span style="box-sizing: border-box; color: rgb(255, 0, 0); line-height: 24px;"><span style="box-sizing: border-box; font-weight: 700;">${random(1,99,true)} – ${random(1,99,true)}</span></span></p>

  <p style="box-sizing: border-box; margin: 0px 0px 10px; line-height: 22px;  margin: 5px; padding: 0px; text-align: justify; color: rgb(51, 51, 51); font-family: roboto, sans-serif; font-size: 14px;">🌟 Lô bạch thủ :&nbsp;<span style="box-sizing: border-box; color: rgb(255, 0, 0); line-height: 24px;"><span style="box-sizing: border-box; font-weight: 700;">${random(1,99,true)}</span></span></p>

  <p style="box-sizing: border-box; margin: 0px 0px 10px; line-height: 22px;  margin: 5px; padding: 0px; text-align: justify; color: rgb(51, 51, 51); font-family: roboto, sans-serif; font-size: 14px;">🌟 Lô 2 số dễ ra :&nbsp;<span style="box-sizing: border-box; color: rgb(255, 0, 0); line-height: 24px;"><span style="box-sizing: border-box; font-weight: 700;">${random(1,99,true)} – ${random(1,99,true)} – ${random(1,99,true)}</span></span></p>

  <p style="box-sizing: border-box; margin: 0px 0px 10px; line-height: 22px;  margin: 5px; padding: 0px; text-align: justify; color: rgb(51, 51, 51); font-family: roboto, sans-serif; font-size: 14px;">🌟 Lô song thủ VIP:&nbsp;<span style="box-sizing: border-box; color: rgb(255, 0, 0); line-height: 24px;"><span style="box-sizing: border-box; font-weight: 700;">${random(1,99,true)} – ${random(1,99,true)} ; ${random(1,99,true)} – ${random(1,99,true)}</span></span></p>
  `
  return content;
};

module.exports = generatePostContent;
