var request = require("request");
var cheerio = require("cheerio");
const KQXS = require("../models/kqxs");
const Province = require("../models/province");
const SerialDB = require("../models/serialDB");
var moment = require("moment");
const addingZeroToDate = require("../helpers/addingZeroToDate");
const reverseDate = require("../helpers/reverseDate");
const isNumeric = require("../helpers/isNumeric");

const saveDB = async (
  item,
  provinceId,
  date,
  prizeId,
  prizeColumn,
  region,
  code,
  isRunning = false
) => {
  var query = item.split("");
  KQXS.findOne({
    dayPrize: date,
    prizeId: prizeId,
    provinceId: provinceId,
    prizeColumn: prizeColumn,
    region: region,
  }).exec(async (err, data) => {
    if (err) {
      return false;
    } else {
      if (data) {
        const result = await KQXS.findOneAndUpdate(
          {
            provinceId: provinceId,
            dayPrize: date,
            prizeColumn: prizeColumn,
            prizeId: prizeId,
            region: region,
          },
          {
            dayPrize: date,
            number: item,
            loto: query.slice(-2).toString().replace(/,/g, ""),
            firstNumber: query
              .slice(-2)
              .toString()
              .replace(/,/g, "")
              ?.split("")[0],
            lastNumber: query
              .slice(-2)
              .toString()
              .replace(/,/g, "")
              ?.split("")[1],
            thirdDigit: query[2] ? query[2] : "",
            fourthDigit: query[3] ? query[3] : "",
            fifthDigit: query[4] ? query[4] : "",
            sixthDigit: query[5] ? query[5] : "",
            provinceId: provinceId,
            prizeId: prizeId,
            prizeColumn: prizeColumn,
            region: region,
            isRunning: isRunning,
            code: code,
          }
        );
      } else {
        var kqxs = new KQXS();
        kqxs.dayPrize = date;
        kqxs.number = item;
        kqxs.loto = query.slice(-2).toString().replace(/,/g, "");
        kqxs.firstNumber = kqxs.loto.split("")[0];
        kqxs.lastNumber = kqxs.loto.split("")[1];
        kqxs.thirdDigit = query[2] ? query[2] : "";
        kqxs.fourthDigit = query[3] ? query[3] : "";
        kqxs.fifthDigit = query[4] ? query[4] : "";
        kqxs.sixthDigit = query[5] ? query[5] : "";
        kqxs.provinceId = provinceId;
        kqxs.prizeId = prizeId;
        kqxs.prizeColumn = prizeColumn;
        kqxs.region = region;
        kqxs.isRunning = isRunning;
        kqxs.code = code;
        kqxs.save();
      }
    }
  });
};

async function crawlDataMNV2(date) {
  let plus = 0;
  let ngayXo = date;
  var getProvince = await Province.find().exec();
  url = `https://www.minhngoc.net.vn/ket-qua-xo-so/mien-nam/${ngayXo}.html`;
  if (
    new Date().getHours() == 16 &&
    new Date().getMinutes() >= 5 &&
    new Date().getHours() <= 45 &&
    ngayXo == addingZeroToDate(new Date())
  ) {
    url = "https://www.minhngoc.net.vn/xo-so-truc-tiep/mien-nam.html";
  }
  var data;
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, { decodeEntities: false });
      data = $(".box_kqxs").eq(0);
      let ngay_xo = data
        .find(".title")
        .find("a")
        .eq(1)
        .text()
        ?.replaceAll("/", "-");
      if (
        new Date().getHours() == 16 &&
        new Date().getMinutes() >= 5 &&
        new Date().getHours() <= 45 &&
        ngayXo == addingZeroToDate(new Date())
      ) {
        ngay_xo = addingZeroToDate(new Date());
      }
      var listDai = data.find(".tinh");
      if (ngay_xo == date) {
        //ten dai
        var dai1 = "";
        var dai2 = "";
        var dai3 = "";
        var dai4 = "";

        dai1 = listDai.eq(0).text().trim();
        dai2 = listDai.eq(1).text().trim();
        dai3 = listDai.eq(2).text().trim();
        dai4 = listDai.eq(3).text().trim();

        var idDai1 = getProvince.filter((x) => x.name == dai1)[0]?._id;
        var idDai2 = getProvince.filter((x) => x.name == dai2)[0]?._id;
        var idDai3 = getProvince.filter((x) => x.name == dai3)[0]?._id;
        var idDai4 = getProvince.filter((x) => x.name == dai4)[0]?._id;

        const maTinh1 = data.find(".matinh").eq(0).text();
        const maTinh2 = data.find(".matinh").eq(1).text();
        const maTinh3 = data.find(".matinh").eq(2).text();
        let maTinh4 = "";
        if (idDai4) {
          maTinh4 = data.find(".matinh").eq(3).text();
        }

        //giai 8
        var g8_1 = data.find(".giai8").eq(1).find("div");
        if (!g8_1.find(".runLoto").text())
          saveDB(g8_1.text(), idDai1, date, 9, 1, 3, maTinh1);
        else saveDB("", idDai1, date, 9, 1, 3, maTinh1, true);
        var g8_2 = data.find(".giai8").eq(2).find("div");
        if (!g8_2.find(".runLoto").text())
          saveDB(g8_2.text(), idDai2, date, 9, 2, 3, maTinh2);
        else saveDB("", idDai2, date, 9, 2, 3, maTinh2, true);
        var g8_3 = data.find(".giai8").eq(3).find("div");
        if (!g8_3.find(".runLoto").text())
          saveDB(g8_3.text(), idDai3, date, 9, 3, 3, maTinh3);
        else saveDB("", idDai3, date, 9, 3, 3, maTinh3, true);
        var g8_4 = data.find(".giai8").eq(4).find("div");
        if (idDai4) {
          if (!g8_4.find(".runLoto").text())
            saveDB(g8_4.text(), idDai4, date, 9, 4, 3, maTinh4);
          else saveDB("", idDai4, date, 9, 4, 3, maTinh4, true);
        }

        //giai 7
        var g7_1 = data.find(".giai7").eq(1).find("div");
        if (!g7_1.find(".runLoto").text())
          saveDB(g7_1.text(), idDai1, date, 8, 1, 3, maTinh1);
        else saveDB("", idDai1, date, 8, 1, 3, maTinh1, true);
        var g7_2 = data.find(".giai7").eq(2).find("div");
        if (!g7_2.find(".runLoto").text())
          saveDB(g7_2.text(), idDai2, date, 8, 2, 3, maTinh2);
        else saveDB("", idDai2, date, 8, 2, 3, maTinh2, true);
        var g7_3 = data.find(".giai7").eq(3).find("div");
        if (!g7_3.find(".runLoto").text())
          saveDB(g7_3.text(), idDai3, date, 8, 3, 3, maTinh3);
        else saveDB("", idDai3, date, 8, 3, 3, maTinh3, true);
        var g7_4 = data.find(".giai7").eq(4).find("div");
        if (idDai4) {
          if (!g7_4.find(".runLoto").text())
            saveDB(g7_4.text(), idDai4, date, 8, 4, 3, maTinh4);
          else saveDB("", idDai4, date, 8, 4, 3, maTinh4, true);
        }

        //giai 6
        var g6_1 = data.find(".giai6").eq(1).find("div");
        var giai6Dai1Array = g6_1;
        for (let index = 0; index < giai6Dai1Array.length; index++) {
          const element = giai6Dai1Array.eq(index).text();
          var prizeId = 7;
          if (!g6_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, date, prizeId, 1 + index, 3, maTinh1);
          else saveDB("", idDai1, date, prizeId, 1 + index, 3, maTinh1, true);
        }

        var g6_2 = data.find(".giai6").eq(2).find("div");
        var giai6Dai2Array = g6_2;
        for (let index = 0; index < giai6Dai2Array.length; index++) {
          const element = giai6Dai2Array.eq(index).text();
          var prizeId = 7;
          if (!g6_2.eq(index).find(".runLoto").text())
            saveDB(element, idDai2, date, prizeId, 1 * 3 + index, 3, maTinh2);
          else
            saveDB("", idDai2, date, prizeId, 1 * 3 + index, 3, maTinh2, true);
        }

        var g6_3 = data.find(".giai6").eq(3).find("div");
        var giai6Dai3Array = g6_3;
        for (let index = 0; index < giai6Dai3Array.length; index++) {
          const element = giai6Dai3Array.eq(index).text();
          var prizeId = 7;
          if (!g6_3.eq(index).find(".runLoto").text())
            saveDB(element, idDai3, date, prizeId, 2 * 3 + index, 3, maTinh3);
          else
            saveDB("", idDai3, date, prizeId, 2 * 3 + index, 3, maTinh3, true);
        }

        var g6_4 = data.find(".giai6").eq(4).find("div");
        if (idDai4) {
          var giai6Dai4Array = g6_4;
          for (let index = 0; index < giai6Dai4Array.length; index++) {
            const element = giai6Dai4Array.eq(0).text();
            var prizeId = 7;
            if (!g6_4.eq(index).find(".runLoto").text())
              saveDB(element, idDai4, date, prizeId, 3 * 3 + index, 3, maTinh4);
            else
              saveDB(
                "",
                idDai4,
                date,
                prizeId,
                3 * 3 + index,
                3,
                maTinh4,
                true
              );
          }
        }

        //giai 5
        var g5_1 = data.find(".giai5").eq(1).find("div");
        if (!g5_1.find(".runLoto").text())
          saveDB(g5_1.text(), idDai1, date, 6, 1, 3, maTinh1);
        else saveDB("", idDai1, date, 6, 1, 3, maTinh1, true);
        var g5_2 = data.find(".giai5").eq(2).find("div");
        if (!g5_2.find(".runLoto").text())
          saveDB(g5_2.text(), idDai2, date, 6, 2, 3, maTinh2);
        else saveDB("", idDai2, date, 6, 2, 3, maTinh2, true);
        var g5_3 = data.find(".giai5").eq(3).find("div");
        if (!g5_3.find(".runLoto").text())
          saveDB(g5_3.text(), idDai3, date, 6, 3, 3, maTinh3);
        else saveDB("", idDai3, date, 6, 3, 3, maTinh3, true);
        var g5_4 = data.find(".giai5").eq(4).find("div");
        if (idDai4) {
          if (!g5_4.find(".runLoto").text())
            saveDB(g5_4.text(), idDai4, date, 6, 4, 3, maTinh4);
          else saveDB("", idDai4, date, 6, 4, 3, maTinh4, true);
        }
        //giai 4
        var g4_1 = data.find(".giai4").eq(1).find("div");
        var giai4Dai1Array = g4_1;
        for (let index = 0; index < giai4Dai1Array.length; index++) {
          const element = giai4Dai1Array.eq(index).text();
          var prizeId = 5;
          if (!g4_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, date, prizeId, 1 + index, 3, maTinh1);
          else saveDB("", idDai1, date, prizeId, 1 + index, 3, maTinh1, true);
        }

        var g4_2 = data.find(".giai4").eq(2).find("div");
        var giai4Dai2Array = g4_2;
        for (let index = 0; index < giai4Dai2Array.length; index++) {
          const element = giai4Dai2Array.eq(index).text();
          var prizeId = 5;
          if (!g4_2.eq(index).find(".runLoto").text())
            saveDB(element, idDai2, date, prizeId, 1 * 3 + index, 3, maTinh2);
          else
            saveDB("", idDai2, date, prizeId, 1 * 3 + index, 3, maTinh2, true);
        }

        var g4_3 = data.find(".giai4").eq(3).find("div");
        var giai4Dai3Array = g4_3;
        for (let index = 0; index < giai4Dai3Array.length; index++) {
          const element = giai4Dai3Array.eq(index).text();
          var prizeId = 5;
          if (!g4_3.eq(index).find(".runLoto").text())
            saveDB(element, idDai3, date, prizeId, 2 * 3 + index, 3, maTinh3);
          else
            saveDB("", idDai3, date, prizeId, 2 * 3 + index, 3, maTinh3, true);
        }

        var g4_4 = data.find(".giai4").eq(4).find("div");
        if (idDai4) {
          var giai4Dai4Array = g4_4;
          for (let index = 0; index < giai4Dai4Array.length; index++) {
            const element = giai4Dai4Array.eq(index).text();
            var prizeId = 5;
            if (!g4_4.eq(index).find(".runLoto").text())
              saveDB(element, idDai4, date, prizeId, 3 * 3 + index, 3, maTinh4);
            else
              saveDB(
                "",
                idDai4,
                date,
                prizeId,
                3 * 3 + index,
                3,
                maTinh4,
                true
              );
          }
        }
        //giai 3
        var g3_1 = data.find(".giai3").eq(1).find("div");
        var giai3Dai1Array = g3_1;
        for (let index = 0; index < giai3Dai1Array.length; index++) {
          const element = giai3Dai1Array.eq(index).text();
          var prizeId = 4;
          if (!g3_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, date, prizeId, 1 + index, 3, maTinh1);
          else saveDB("", idDai1, date, prizeId, 1 + index, 3, maTinh1, true);
        }

        var g3_2 = data.find(".giai3").eq(2).find("div");
        var giai3Dai2Array = g3_2;
        for (let index = 0; index < giai3Dai2Array.length; index++) {
          const element = giai3Dai2Array.eq(index).text();
          var prizeId = 4;
          if (!g3_2.eq(index).find(".runLoto").text())
            saveDB(element, idDai2, date, prizeId, 1 * 3 + index, 3, maTinh2);
          else
            saveDB("", idDai2, date, prizeId, 1 * 3 + index, 3, maTinh2, true);
        }

        var g3_3 = data.find(".giai3").eq(3).find("div");
        var giai3Dai3Array = g3_3;
        for (let index = 0; index < giai3Dai3Array.length; index++) {
          const element = giai3Dai3Array.eq(index).text();
          var prizeId = 4;
          if (!g3_3.eq(index).find(".runLoto").text())
            saveDB(element, idDai3, date, prizeId, 2 * 3 + index, 3, maTinh3);
          else
            saveDB("", idDai3, date, prizeId, 2 * 3 + index, 3, maTinh3, true);
        }

        var g3_4 = data.find(".giai3").eq(4).find("div");
        if (idDai4) {
          var giai3Dai4Array = g3_4;
          for (let index = 0; index < giai3Dai4Array.length; index++) {
            const element = giai3Dai4Array.eq(index).text();
            var prizeId = 4;
            if (!g3_4.eq(index).find(".runLoto").text())
              saveDB(element, idDai4, date, prizeId, 3 * 3 + index, 3, maTinh4);
            else
              saveDB(
                "",
                idDai4,
                date,
                prizeId,
                3 * 3 + index,
                3,
                maTinh4,
                true
              );
          }
        }
        //giai 2
        var g2_1 = data.find(".giai2").eq(1).find("div");
        if (!g2_1.find(".runLoto").text())
          saveDB(g2_1.text(), idDai1, ngay_xo, 3, 1, 3, maTinh1);
        else saveDB("", idDai1, ngay_xo, 3, 1, 3, maTinh1, true);
        var g2_2 = data.find(".giai2").eq(2, 3).find("div");
        if (!g2_2.find(".runLoto").text())
          saveDB(g2_2.text(), idDai2, ngay_xo, 3, 2, 3, maTinh2);
        else saveDB("", idDai2, ngay_xo, 3, 2, 3, maTinh2, true);
        var g2_3 = data.find(".giai2").eq(3).find("div");
        if (!g2_3.find(".runLoto").text())
          saveDB(g2_3.text(), idDai3, ngay_xo, 3, 3, 3, maTinh3);
        else saveDB("", idDai3, ngay_xo, 3, 3, 3, maTinh3, true);
        var g2_4 = data.find(".giai2").eq(4).find("div");
        if (idDai4) {
          if (!g2_4.find(".runLoto").text())
            saveDB(g2_4.text(), idDai4, date, 3, 4, 3, maTinh4);
          else saveDB("", idDai4, date, 3, 4, 3, maTinh4, true);
        }

        //giai 1
        var g1_1 = data.find(".giai1").eq(1).find("div");
        if (!g1_1.find(".runLoto").text())
          saveDB(g1_1.text(), idDai1, date, 2, 1, 3, maTinh1);
        else saveDB("", idDai1, date, 2, 1, 3, maTinh1, true);
        var g1_2 = data.find(".giai1").eq(2).find("div");
        if (!g1_2.find(".runLoto").text())
          saveDB(g1_2.text(), idDai2, date, 2, 2, 3, maTinh2);
        else saveDB("", idDai2, date, 2, 2, 3, maTinh2, true);
        var g1_3 = data.find(".giai1").eq(3).find("div");
        if (!g1_3.find(".runLoto").text())
          saveDB(g1_3.text(), idDai3, date, 2, 3, 3, maTinh3);
        else saveDB("", idDai3, date, 2, 3, 3, maTinh3, true);
        var g1_4 = data.find(".giai1").eq(4).find("div");
        if (idDai4) {
          if (!g1_4.find(".runLoto").text())
            saveDB(g1_4.text(), idDai4, date, 2, 4, 3, maTinh4);
          else saveDB("", idDai4, date, 2, 4, 3, maTinh4, true);
        }

        //dac biet
        var db_1 = data.find(".giaidb").eq(1).find("div");
        if (!db_1.find(".runLoto").text())
          saveDB(db_1.text(), idDai1, date, 1, 1, 3, maTinh1);
        else saveDB("", idDai1, date, 1, 1, 3, maTinh1, true);
        var db_2 = data.find(".giaidb").eq(2).find("div");
        if (!db_2.find(".runLoto").text())
          saveDB(db_2.text(), idDai2, date, 1, 2, 3, maTinh2);
        else saveDB("", idDai2, date, 1, 2, 3, maTinh2, true);
        var db_3 = data.find(".giaidb").eq(3).find("div");
        if (!db_3.find(".runLoto").text())
          saveDB(db_3.text(), idDai3, date, 1, 3, 3, maTinh3);
        else saveDB("", idDai3, date, 1, 3, 3, maTinh3, true);
        var db_4 = data.find(".giaidb").eq(4).find("div");
        if (idDai4) {
          if (!db_4.find(".runLoto").text())
            saveDB(db_4.text(), idDai4, date, 1, 4, 3, maTinh4);
          else saveDB("", idDai4, date, 1, 4, 3, maTinh4, true);
        }
        return {
          isSuccessed: true,
        };
      }
    }
  });
}
exports.crawlDataMNV2 = crawlDataMNV2;

async function crawlDataMTV2(date) {
  let plus = 0;
  let ngayXo = date;
  var getProvince = await Province.find().exec();
  url = `https://www.minhngoc.net/ket-qua-xo-so/mien-trung/${ngayXo}.html`;
  if (
    new Date().getHours() == 17 &&
    new Date().getMinutes() >= 5 &&
    new Date().getHours() <= 45 &&
    ngayXo == addingZeroToDate(new Date())
  ) {
    url = "https://www.minhngoc.net/xo-so-truc-tiep/mien-trung.html";
  }
  var data;
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, { decodeEntities: false });
      data = $(".box_kqxs").eq(0);
      let ngay_xo = data
        .find(".title")
        .find("a")
        .eq(1)
        .text()
        ?.replaceAll("/", "-");
      var listDai = data.find(".tinh");
      if (
        new Date().getHours() == 17 &&
        new Date().getMinutes() >= 5 &&
        new Date().getHours() <= 45 &&
        ngayXo == addingZeroToDate(new Date())
      ) {
        ngay_xo = addingZeroToDate(new Date());
      }
      if (ngay_xo == date) {
        //ten dai
        var dai1 = "";
        var dai2 = "";
        var dai3 = "";

        dai1 = listDai.eq(0).text().trim();
        dai2 = listDai.eq(1).text().trim();
        dai3 = listDai.eq(2).text().trim();

        var idDai1 = getProvince.filter((x) => x.name == dai1)[0]?._id;
        var idDai2 = getProvince.filter((x) => x.name == dai2)[0]?._id;
        var idDai3 = getProvince.filter((x) => x.name == dai3)[0]?._id;

        const maTinh1 = data.find(".matinh").eq(0).text();
        const maTinh2 = data.find(".matinh").eq(1).text();
        let maTinh3 = "";
        if (idDai3) {
          maTinh3 = data.find(".matinh").eq(2).text();
        }

        //giai 8
        var g8_1 = data.find(".giai8").eq(1);
        if (!g8_1.find(".runLoto").text())
          saveDB(g8_1.text(), idDai1, date, 9, 1, 2, maTinh1);
        else saveDB("", idDai1, date, 9, 1, 2, maTinh1, true);
        var g8_2 = data.find(".giai8").eq(2);
        if (!g8_2.find(".runLoto").text())
          saveDB(g8_2.text(), idDai2, date, 9, 2, 2, maTinh2);
        else saveDB("", idDai2, date, 9, 2, 2, maTinh2, true);
        if (idDai3) {
          var g8_3 = data.find(".giai8").eq(3);
          if (!g8_3.find(".runLoto").text())
            saveDB(g8_3.text(), idDai3, date, 9, 3, 2, maTinh3);
          else saveDB("", idDai3, date, 9, 3, 2, maTinh3, true);
        }

        //giai 7
        var g7_1 = data.find(".giai7").eq(1);
        if (!g7_1.find(".runLoto").text())
          saveDB(g7_1.text(), idDai1, date, 8, 1, 2, maTinh1);
        else saveDB("", idDai1, date, 8, 1, 2, maTinh1, true);
        var g7_2 = data.find(".giai7").eq(2);
        if (!g7_2.find(".runLoto").text())
          saveDB(g7_2.text(), idDai2, date, 8, 2, 2, maTinh2);
        else saveDB("", idDai2, date, 8, 2, 2, maTinh2, true);
        var g7_3 = data.find(".giai7").eq(3);
        if (idDai3) {
          if (!g7_3.find(".runLoto").text())
            saveDB(g7_3.text(), idDai3, date, 8, 3, 2, maTinh3);
          else saveDB("", idDai3, date, 8, 3, 2, maTinh3, true);
        }

        //giai 6
        var g6_1 = data.find(".giai6").eq(1).find("div");
        var giai6Dai1Array = g6_1;
        for (let index = 0; index < giai6Dai1Array.length; index++) {
          const element = giai6Dai1Array.eq(index).text();
          var prizeId = 7;
          if (!g6_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, date, prizeId, 1 + index, 2, maTinh1);
          else saveDB("", idDai1, date, prizeId, 1 + index, 2, maTinh1, true);
        }

        var g6_2 = data.find(".giai6").eq(2).find("div");
        var giai6Dai2Array = g6_2;
        for (let index = 0; index < giai6Dai2Array.length; index++) {
          const element = giai6Dai2Array.eq(index).text();
          var prizeId = 7;
          if (!g6_2.eq(index).find(".runLoto").text())
            saveDB(element, idDai2, date, prizeId, 1 * 3 + index, 2, maTinh2);
          else
            saveDB("", idDai2, date, prizeId, 1 * 3 + index, 2, maTinh2, true);
        }

        var g6_3 = data.find(".giai6").eq(3).find("div");
        var giai6Dai3Array = g6_3;
        if (idDai3) {
          for (let index = 0; index < giai6Dai3Array.length; index++) {
            const element = giai6Dai3Array.eq(index).text();
            var prizeId = 7;
            if (!g6_3.eq(index).find(".runLoto").text())
              saveDB(element, idDai3, date, prizeId, 2 * 3 + index, 2, maTinh3);
            else
              saveDB(
                "",
                idDai3,
                date,
                prizeId,
                2 * 3 + index,
                2,
                maTinh3,
                true
              );
          }
        }

        //giai 5
        var g5_1 = data.find(".giai5").eq(1);
        if (!g5_1.find(".runLoto").text())
          saveDB(g5_1.text(), idDai1, date, 6, 1, 2, maTinh1);
        else saveDB("", idDai1, date, 6, 1, 2, maTinh1, true);
        var g5_2 = data.find(".giai5").eq(2);
        if (!g5_2.find(".runLoto").text())
          saveDB(g5_2.text(), idDai2, date, 6, 2, 2, maTinh2);
        else saveDB("", idDai2, date, 6, 2, 2, maTinh2, true);
        if (idDai3) {
          var g5_3 = data.find(".giai5").eq(3);
          if (!g5_3.find(".runLoto").text())
            saveDB(g5_3.text(), idDai3, date, 6, 3, 2, maTinh3);
          else saveDB("", idDai3, date, 6, 3, 2, maTinh3, true);
        }

        //giai 4
        var g4_1 = data.find(".giai4").eq(1).find("div");
        var giai4Dai1Array = g4_1;
        for (let index = 0; index < giai4Dai1Array.length; index++) {
          const element = giai4Dai1Array.eq(index).text();
          var prizeId = 5;
          if (!g4_1.eq(index).find(".runLoto").text()) {
            saveDB(element, idDai1, date, prizeId, 1 + index, 2, maTinh1);
          } else saveDB("", idDai1, date, prizeId, 1 + index, 2, maTinh1, true);
        }

        var g4_2 = data.find(".giai4").eq(2).find("div");
        var giai4Dai2Array = g4_2;
        for (let index = 0; index < giai4Dai2Array.length; index++) {
          const element = giai4Dai2Array.eq(index).text();
          var prizeId = 5;
          if (!g4_2.eq(index).find(".runLoto").text())
            saveDB(element, idDai2, date, prizeId, 1 * 3 + index, 2, maTinh2);
          else
            saveDB("", idDai2, date, prizeId, 1 * 3 + index, 2, maTinh2, true);
        }

        var g4_3 = data.find(".giai4").eq(3).find("div");
        var giai4Dai3Array = g4_3;
        if (idDai3) {
          for (let index = 0; index < giai4Dai3Array.length; index++) {
            const element = giai4Dai3Array.eq(index).text();
            var prizeId = 5;
            if (!g4_3.eq(index).find(".runLoto").text()) {
              saveDB(element, idDai3, date, prizeId, 2 * 3 + index, 2, maTinh3);
            } else
              saveDB(
                "",
                idDai3,
                date,
                prizeId,
                2 * 3 + index,
                2,
                maTinh3,
                true
              );
          }
        }

        //giai 3
        var g3_1 = data.find(".giai3").eq(1).find("div");
        var giai3Dai1Array = g3_1;
        for (let index = 0; index < giai3Dai1Array.length; index++) {
          const element = giai3Dai1Array.eq(index).text();
          var prizeId = 4;
          if (!g3_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, date, prizeId, 1 + index, 2, maTinh1);
          else saveDB("", idDai1, date, prizeId, 1 + index, 2, maTinh1, true);
        }

        var g3_2 = data.find(".giai3").eq(2).find("div");
        var giai3Dai2Array = g3_2;
        for (let index = 0; index < giai3Dai2Array.length; index++) {
          const element = giai3Dai2Array.eq(index).text();
          var prizeId = 4;
          if (!g3_2.eq(index).find(".runLoto").text())
            saveDB(element, idDai2, date, prizeId, 1 * 3 + index, 2, maTinh2);
          else
            saveDB("", idDai2, date, prizeId, 1 * 3 + index, 2, maTinh2, true);
        }

        var g3_3 = data.find(".giai3").eq(3).find("div");
        var giai3Dai3Array = g3_3;
        if (idDai3) {
          for (let index = 0; index < giai3Dai3Array.length; index++) {
            const element = giai3Dai3Array.eq(index).text();
            var prizeId = 4;
            if (!g3_3.eq(index).find(".runLoto").text())
              saveDB(element, idDai3, date, prizeId, 2 * 3 + index, 2, maTinh3);
            else
              saveDB(
                "",
                idDai3,
                date,
                prizeId,
                2 * 3 + index,
                2,
                true,
                maTinh3
              );
          }
        }

        //giai 2
        var g2_1 = data.find(".giai2").eq(1);
        if (!g2_1.find(".runLoto").text())
          saveDB(g2_1.text(), idDai1, ngay_xo, 3, 1, 2, maTinh1);
        else saveDB("", idDai1, ngay_xo, 3, 1, 2, maTinh1, true);
        var g2_2 = data.find(".giai2").eq(2);
        if (!g2_2.find(".runLoto").text())
          saveDB(g2_2.text(), idDai2, ngay_xo, 3, 2, 2, maTinh2);
        else saveDB("", idDai2, ngay_xo, 3, 2, 2, maTinh2, true);
        var g2_3 = data.find(".giai2").eq(3);
        if (idDai3) {
          if (!g2_3.find(".runLoto").text())
            saveDB(g2_3.text(), idDai3, ngay_xo, 3, 3, 2, maTinh3);
          else saveDB("", idDai3, ngay_xo, 3, 3, 2, maTinh3, true);
        }

        //giai 1
        var g1_1 = data.find(".giai1").eq(1);
        if (!g1_1.find(".runLoto").text())
          saveDB(g1_1.text(), idDai1, date, 2, 1, 2, maTinh1);
        else saveDB("", idDai1, date, 2, 1, 2, maTinh1, true);
        var g1_2 = data.find(".giai1").eq(2);
        if (!g1_2.find(".runLoto").text())
          saveDB(g1_2.text(), idDai2, date, 2, 2, 2, maTinh2);
        else saveDB("", idDai2, date, 2, 2, 2, maTinh2, true);
        var g1_3 = data.find(".giai1").eq(3);
        if (idDai3) {
          if (!g1_3.find(".runLoto").text())
            saveDB(g1_3.text(), idDai3, date, 2, 3, 2, maTinh3);
          else saveDB("", idDai3, date, 2, 3, 2, maTinh3, true);
        }

        //dac biet
        var db_1 = data.find(".giaidb").eq(1);
        if (!db_1.find(".runLoto").text())
          saveDB(db_1.text(), idDai1, date, 1, 1, 2, maTinh1);
        else saveDB("", idDai1, date, 1, 1, 2, maTinh1, true);
        var db_2 = data.find(".giaidb").eq(2);
        if (!db_2.find(".runLoto").text())
          saveDB(db_2.text(), idDai2, date, 1, 2, 2, maTinh2);
        else saveDB("", idDai2, date, 1, 2, 2, maTinh2, true);
        var db_3 = data.find(".giaidb").eq(3);
        if (idDai3) {
          if (!db_3.find(".runLoto").text())
            saveDB(db_3.text(), idDai3, date, 1, 3, 2, maTinh3);
          else saveDB("", idDai3, date, 1, 3, 2, maTinh3, true);
        }

        return {
          isSuccessed: true,
        };
      }
    }
  });
}

exports.crawlDataMTV2 = crawlDataMTV2;

async function crawlDataMBV2(date) {
  let ngayXo = date;
  const dateNow = new Date();
  url = `https://www.minhngoc.net.vn/ket-qua-xo-so/mien-bac/${ngayXo}.html`;
  if (
    dateNow.getHours() == 18 &&
    dateNow.getMinutes() >= 5 &&
    dateNow.getHours() <= 45 &&
    ngayXo == addingZeroToDate(dateNow)
  ) {
    url = "https://www.minhngoc.net.vn/xo-so-truc-tiep/mien-bac.html";
  }
  var data;
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, { decodeEntities: false });
      data = $(".box_kqxs").eq(0);
      let ngay_xo = data
        .find(".title")
        .find("a")
        .eq(1)
        .text()
        ?.replaceAll("/", "-");
      if (
        dateNow.getHours() == 18 &&
        dateNow.getMinutes() >= 5 &&
        dateNow.getHours() <= 45 &&
        ngayXo == addingZeroToDate(dateNow)
      ) {
        ngay_xo = addingZeroToDate(dateNow);
      }
      if (ngay_xo == date) {
        var idDai1 = 1;
        const maTinh_1 = data.find(".loai_ve").eq(0).text();
        const maTinh_duphong = data.find(".loai_ves").eq(0).text();

        const maTinh =
          maTinh_duphong.replace("Ký hiệu trúng Đặc Biệt:", "") ||
          maTinh_1.replace("Ký hiệu trúng Đặc Biệt:", "");

        //giai 7
        var g7_1 = data.find(".giai7").find("div");
        for (let index = 0; index < g7_1.length; index++) {
          const element = g7_1.eq(index).text();
          if (!g7_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, ngay_xo, 8, index + 1, 1, maTinh);
          else saveDB("", idDai1, ngay_xo, 8, index + 1, 1, maTinh, true);
        }

        var g6_1 = data.find(".giai6").find("div");
        for (let index = 0; index < g6_1.length; index++) {
          const element = g6_1.eq(index).text();
          if (!g6_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, ngay_xo, 7, index + 1, 1, maTinh);
          else saveDB("", idDai1, ngay_xo, 7, index + 1, 1, maTinh, true);
        }

        //giai 5
        var g5_1 = data.find(".giai5").find("div");
        for (let index = 0; index < g5_1.length; index++) {
          const element = g5_1.eq(index).text();
          if (!g5_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, ngay_xo, 6, index + 1, 1, maTinh);
          else saveDB("", idDai1, ngay_xo, 6, index + 1, 1, maTinh, true);
        }

        //giai 4
        var g4_1 = data.find(".giai4").find("div");
        for (let index = 0; index < g4_1.length; index++) {
          const element = g4_1.eq(index).text();
          if (!g4_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, ngay_xo, 5, index + 1, 1, maTinh);
          else saveDB("", idDai1, ngay_xo, 5, index + 1, 1, maTinh, true);
        }

        //giai 3
        var g3_1 = data.find(".giai3").find("div");
        for (let index = 0; index < g3_1.length; index++) {
          const element = g3_1.eq(index).text();
          if (!g3_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, ngay_xo, 4, index + 1, 1, maTinh);
          else saveDB("", idDai1, ngay_xo, 4, index + 1, 1, maTinh, true);
        }

        //giai 2
        var g2_1 = data.find(".giai2").find("div");
        for (let index = 0; index < g2_1.length; index++) {
          const element = g2_1.eq(index).text();
          if (!g2_1.eq(index).find(".runLoto").text())
            saveDB(element, idDai1, ngay_xo, 3, index + 1, 1, maTinh);
          else saveDB("", idDai1, ngay_xo, 3, index + 1, 1, maTinh, true);
        }

        //giai 1
        var g1_1 = data.find(".giai1");
        if (!g1_1.find(".runLoto").text())
          saveDB(g1_1.text(), idDai1, date, 2, 2, 1, maTinh);
        else saveDB("", idDai1, date, 2, 2, 1, maTinh, true);
        //dac biet
        var db_1 = data.find(".giaidb");
        if (!db_1.find(".runLoto").text())
          saveDB(db_1.text(), idDai1, date, 1, 1, 1, maTinh);
        else saveDB("", idDai1, date, 1, 1, 1, maTinh, true);
        return {
          isSuccessed: true,
        };
      }
    }
  });
}

exports.crawlDataMBV2 = crawlDataMBV2;

const recursiveCheck = async (number, date, province) => {
  try {
    const check = await KQXS.findOne({
      number: number,
      dayPrize: date,
      provinceId: province,
    });
    if (number?.length < 2) {
      return {};
    } else if (check) {
      return check;
    }
    return await recursiveCheck(
      number.substr(1, number.length),
      date,
      province
    );
  } catch (error) {
    console.log(error);
  }
};

const checkKqxs = async (req, res) => {
  if (!req.body.number || req.body.number?.length > 6) {
    return res.status(200).json({ kqxs: {} });
  }
  try {
    const check = await recursiveCheck(
      req.body.number,
      req.body.date,
      req.body.province
    );
    console.log(check);
    return res.status(200).json({ kqxs: check });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.checkKqxs = checkKqxs;

