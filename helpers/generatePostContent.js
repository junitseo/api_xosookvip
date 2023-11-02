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

  let content = `<h1 dir="ltr" style="line-height: 1.38; margin-top: 20pt; margin-bottom: 6pt;"><span style="font-size: 20pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Soi cầu XS${provinceKeyCap}  ${
    date[today.getDay()]
  } ${replaceDashFromDate(
    addingZeroToDate(today)
  )} - Dự đo&aacute;n xổ số ${province} ${replaceDashFromDate(
    addingZeroToDate(today)
  )} </span></h1>
  <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Soi cầu xổ số ${province} ${
    date[today.getDay()]
  } ${replaceDashFromDate(
    addingZeroToDate(today)
  )}  với c&aacute;c con số danh gi&aacute; được k&ecirc; khai gồm c&oacute; c&aacute;c nội dung: Giải đặc biệt, L&ocirc; xi&ecirc;n, L&ocirc; gan,... C&aacute;c kết quả được những cao thủ d&agrave;y dặn kinh nghiệm tại </span><a style="text-decoration: none;" href="https://xosoaladin.com"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #1155cc; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: underline; -webkit-text-decoration-skip: none; text-decoration-skip-ink: none; vertical-align: baseline; white-space: pre-wrap;">Xổ số ALADIN</span></a><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;"> thực hiện cho số, khả năng tr&uacute;ng thưởng được đẩy l&ecirc;n cực kỳ cao.</span></p>
  <h2 dir="ltr" style="line-height: 1.38; margin-top: 18pt; margin-bottom: 6pt;"><span style="font-size: 16pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Đ&aacute;nh gi&aacute; lại KQXS ${province} ${replaceDashFromDate(
    addingZeroToDate(today)
  )}  ng&agrave;y ${date[today.getDay()]}</span></h2>
  <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">H&atilde;y c&ugrave;ng nh&igrave;n lại kết quả xổ số ${province} của đợt quay thưởng ${
    date[today.getDay()]
  } kỳ trước của 3 đ&agrave;i thuộc khu vực ${province} gồm: ${provinceInDay
    .map((item) => provinces[item])
    .toString()}</span></p>
  <h2 dir="ltr" style="line-height: 1.38; margin-top: 18pt; margin-bottom: 6pt;"><span style="font-size: 16pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Ph&acirc;n t&iacute;ch kết quả dự đo&aacute;n xổ số ${province} ${replaceDashFromDate(
    addingZeroToDate(today)
  )} </span></h2>
  <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Từ kết quả xổ số ${province} trong nhiều lần ph&aacute;t thưởng trước được thống k&ecirc; theo ng&agrave;y, tuần, th&aacute;ng, năm. XOSOALADIN sẽ mang gi&uacute;p anh em t&igrave;m được c&aacute;c bộ số s&aacute;ng lạn nhất.</span></p>
  <h3 dir="ltr" style="line-height: 1.38; margin-top: 16pt; margin-bottom: 4pt;"><span style="font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #434343; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Ph&acirc;n t&iacute;ch KQ soi cầu đ&agrave;i Hồ Ch&iacute; Minh ${
    date[today.getDay()]
  } ${replaceDashFromDate(addingZeroToDate(today))}</span></h3>
  <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Thảo luận kết quả xổ số Hồ Ch&iacute; Minh ng&agrave;y ${replaceDashFromDate(
    addingZeroToDate(today)
  )}  h&ocirc;m nay sẽ gồm c&oacute; c&aacute;c nội dung: Giải đặc biệt, Giải T&aacute;m, L&ocirc; 2 số,... được c&aacute;c cao thủ ghi lại:</span></p>


  ${provinceInDay.map((item) => {
    return `<h3 dir="ltr" style="line-height: 1.38; margin-top: 16pt; margin-bottom: 4pt;"><span style="font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #434343; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Ph&acirc;n t&iacute;ch KQ soi cầu ${
      provinces[item]
    } ${date[today.getDay()]} ${replaceDashFromDate(
      addingZeroToDate(today)
    )}</span></h3>
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Thảo luận kết quả xổ số ${
      provinces[item]
    } ng&agrave;y ${replaceDashFromDate(
      addingZeroToDate(today)
    )} h&ocirc;m nay sẽ gồm c&oacute; c&aacute;c nội dung: Giải đặc biệt, Giải T&aacute;m, L&ocirc; 2 số,... được c&aacute;c cao thủ ghi lại:</span></p>
    <ul style="margin-top: 0; margin-bottom: 0; padding-inline-start: 48px;">
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">T&igrave;m ra 2 số cuối của giải đặc biệt:${random(
      1,
      99,
      true
    )}</span></p>
    </li>
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Giải T&aacute;m số đẹp:${random(
      1,
      99,
      true
    )}</span></p>
    </li>
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Cặp loto Xi&ecirc;n:${random(
      1,
      99,
      true
    )} - ${random(1, 99, true)}</span></p>
    </li>
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Tham khảo kết quả 2 cặp l&ocirc; chất lượng:${random(
      1,
      99,
      true
    )} - ${random(1, 99, true)}</span></p>
    </li>
    </ul>`;
  })}
  <h2 dir="ltr" style="line-height: 1.38; margin-top: 18pt; margin-bottom: 6pt;"><span style="font-size: 16pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Tổng hợp dự đo&aacute;n XSMN Thứ Hai ${replaceDashFromDate(
    addingZeroToDate(today)
  )} h&ocirc;m nay</span></h2>
<p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">C&ugrave;ng thống k&ecirc; c&aacute;c bộ l&ocirc; của XSMN trước đ&acirc;y sẽ gồm: Giải đặc biệt, Cặp loto xuất hiện nhiều lần, L&ocirc; gan,... &aacute;p dụng chuỗi 10 v&agrave; 30 ng&agrave;y để c&oacute; nền tảng soi cầu ${province} ${
    date[today.getDay()]
  } tốt nhất:</span></p>
  ${provinceInDay.map((item) => {
    return `
    <h3 dir="ltr" style="line-height: 1.38; margin-top: 16pt; margin-bottom: 4pt;"><span style="font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #434343; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Tổng hợp KQXS đ&agrave;i ${
      provinces[item]
    } ng&agrave;y ${replaceDashFromDate(addingZeroToDate(today))} </span></h3>
    <ul style="margin-top: 0; margin-bottom: 0; padding-inline-start: 48px;">
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Ph&acirc;n t&iacute;ch Đầu - Đu&ocirc;i của GĐB:${random(
      1,
      99,
      true
    )}</span></p>
    </li>
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Kết quả giải 8 đ&agrave;i Đồng Th&aacute;p:${random(
      1,
      99,
      true
    )}</span></p>
    </li>
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">C&aacute;c cặp loto gan l&acirc;u chưa xuất hiện:${random(
      1,
      99,
      true
    )} - ${random(1, 99, true)}</span></p>
    </li>
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Cặp bộ l&ocirc; nổ nhiều: ${random(
      1,
      99,
      true
    )} - ${random(1, 99, true)}</span></p>
    </li>
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Cặp xi&ecirc;n VIP:${random(
      1,
      99,
      true
    )} - ${random(1, 99, true)}</span></p>
    </li>
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Tham khảo l&ocirc; Song thủ s&aacute;ng gi&aacute;:${random(
      1,
      99,
      true
    )} - ${random(1, 99, true)}</span></p>
    </li>
    <li dir="ltr" style="list-style-type: disc; font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline;" aria-level="1">
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;" role="presentation"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Những giải T&aacute;m tuyệt đẹp:${random(
      1,
      99,
      true
    )} - ${random(1, 99, true)} - ${random(1, 99, true)}</span></p>
    </li>
    </ul>
    `;
  })}
 
 
  <h2 dir="ltr" style="line-height: 1.38; margin-top: 18pt; margin-bottom: 6pt;"><span style="font-size: 16pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Soi cầu XS${provinceKeyCap} ${replaceDashFromDate(
    addingZeroToDate(today)
  )} ${date[today.getDay()]}</span></h2>
  <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Soi cầu kết quả xổ số tiến h&agrave;nh cho số dựa v&agrave;o kết quả của thuật to&aacute;n ph&acirc;n t&iacute;ch, &aacute;p dụng cho 3 đ&agrave;i quay thưởng của </span><a style="text-decoration: none;" href="https://xosoaladin.com/kqxs/xo-so-mien-nam"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #1155cc; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: underline; -webkit-text-decoration-skip: none; text-decoration-skip-ink: none; vertical-align: baseline; white-space: pre-wrap;">XS${provinceKeyCap} </span></a><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">${
    date[today.getDay()]
  } gồm: ${provinceInDay.map((item) => provinces[item]).toString()}.</span></p>
  ${provinceInDay.map((item) => {
    return `
    <h3 dir="ltr" style="line-height: 1.38; margin-top: 16pt; margin-bottom: 4pt;"><span style="font-size: 13.999999999999998pt; font-family: Arial,sans-serif; color: #434343; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Soi cầu bạch thủ đ&agrave;i ${
      provinces[item]
    } ${date[today.getDay()]} ng&agrave;y ${replaceDashFromDate(
      addingZeroToDate(today)
    )}</span></h3>
    <p dir="ltr" style="line-height: 1.38; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 11pt; font-family: Arial,sans-serif; color: #000000; background-color: transparent; font-weight: 400; font-style: normal; font-variant: normal; text-decoration: none; vertical-align: baseline; white-space: pre-wrap;">Anh em l&ocirc; thủ tham khảo c&aacute;c l&ocirc; bạch thủ được chuy&ecirc;n gia ph&acirc;n t&iacute;ch với cơ sở l&agrave; chuỗi cầu động 3 ng&agrave;y li&ecirc;n tục cho xổ số ${
      provinces[item]
    } ${date[today.getDay()]} h&ocirc;m nay: ${random(1, 99, true)}</span></p>`;
  })}`;

  return content;
};

module.exports = generatePostContent;
