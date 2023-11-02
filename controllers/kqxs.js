var request = require("request");
var cheerio = require("cheerio");
const KQXS = require("../models/kqxs");
const Province = require("../models/province");
const SerialDB = require("../models/serialDB");
var moment = require("moment");
const addingZeroToDate = require("../helpers/addingZeroToDate");
const reverseDate = require("../helpers/reverseDate");
const isNumeric = require("../helpers/isNumeric");
const { crawlDataMNV2, crawlDataMTV2, crawlDataMBV2 } = require("./kqxsv2");

exports.getAllSpecialLotoMb = async (req, res) => {
  const arrayDate = [];
  for (let i = 1; i <= 30; i++) {
    arrayDate.push(
      addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
    );
  }
  try {
    const result = await KQXS.aggregate([
      {
        $match: {
          $and: [
            {
              dayPrize: {
                $in: arrayDate,
              },
              prizeId: 1,
              region: 1,
            },
          ],
        },
      },
      {
        $group: {
          _id: "$loto",
          total: {
            $sum: 1,
          },
        },
      },
    ]).sort({ total: -1 });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

exports.getAllSpecialLotoMbReverse = async (req, res) => {
  const arrayDate = [];
  for (let i = 1; i <= 30; i++) {
    arrayDate.push(
      addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
    );
  }
  try {
    const result = await KQXS.aggregate([
      {
        $match: {
          $and: [
            {
              dayPrize: {
                $in: arrayDate,
              },
              prizeId: 1,
              region: 1,
            },
          ],
        },
      },
      {
        $group: {
          _id: "$loto",
          total: {
            $sum: 1,
          },
        },
      },
    ]).sort({ total: 1 });
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
};

exports.getAllByTail = async (req, res) => {
  const region = parseInt(req.params.region) || 1;
  const arrayDate = [];
  for (let i = 1; i <= 30; i++) {
    arrayDate.push(
      addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
    );
  }
  try {
    const result = await KQXS.aggregate([
      {
        $match: {
          $and: [
            {
              dayPrize: {
                $in: arrayDate,
              },
            },
            {
              region: region,
            },
          ],
        },
      },
      {
        $group: {
          _id: "$lastNumber",
          total: {
            $sum: 1,
          },
        },
      },
    ]).sort({ total: -1 });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getAllByHead = async (req, res) => {
  const region = parseInt(req.params.region) || 1;
  const arrayDate = [];
  for (let i = 1; i <= 30; i++) {
    arrayDate.push(
      addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
    );
  }
  try {
    const result = await KQXS.aggregate([
      {
        $match: {
          $and: [
            {
              dayPrize: {
                $in: arrayDate,
              },
            },
            {
              region: region,
            },
          ],
        },
      },
      {
        $group: {
          _id: "$firstNumber",
          total: {
            $sum: 1,
          },
        },
      },
    ]).sort({ total: -1 });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getTopByRegion = async (req, res) => {
  const region = parseInt(req.params.region) || 1;
  const arrayDate = [];
  for (let i = 1; i <= 30; i++) {
    arrayDate.push(
      addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
    );
  }
  try {
    const result = await KQXS.aggregate([
      {
        $match: {
          $and: [
            {
              dayPrize: {
                $in: arrayDate,
              },
            },
            {
              region: region,
            },
            {
              loto: {
                $ne: "",
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: "$loto",
          total: {
            $sum: 1,
          },
        },
      },
    ])
      .sort({ total: -1 })
      .limit(10);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getAllByTailProvince = async (req, res) => {
  const provinceId = parseInt(req.params.provinceId) || 1;
  const arrayDate = [];
  for (let i = 1; i <= 30; i++) {
    arrayDate.push(
      addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
    );
  }
  try {
    const result = await KQXS.aggregate([
      {
        $match: {
          $and: [
            {
              dayPrize: {
                $in: arrayDate,
              },
            },
            {
              provinceId: Number(provinceId),
            },
          ],
        },
      },
      {
        $group: {
          _id: "$lastNumber",
          total: {
            $sum: 1,
          },
        },
      },
    ]).sort({ total: -1 });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getAllByHeadProvince = async (req, res) => {
  const provinceId = parseInt(req.params.provinceId) || 1;
  const arrayDate = [];
  for (let i = 1; i <= 30; i++) {
    arrayDate.push(
      addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
    );
  }
  try {
    const result = await KQXS.aggregate([
      {
        $match: {
          $and: [
            {
              dayPrize: {
                $in: arrayDate,
              },
            },
            {
              provinceId: Number(provinceId),
            },
          ],
        },
      },
      {
        $group: {
          _id: "$firstNumber",
          total: {
            $sum: 1,
          },
        },
      },
    ]).sort({ total: -1 });
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getTopByProvince = async (req, res) => {
  const provinceId = parseInt(req.params.provinceId) || 1;
  const arrayDate = [];
  for (let i = 1; i <= 30; i++) {
    arrayDate.push(
      addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
    );
  }
  try {
    const result = await KQXS.aggregate([
      {
        $match: {
          $and: [
            {
              dayPrize: {
                $in: arrayDate,
              },
            },
            {
              provinceId: provinceId,
            },
            {
              loto: {
                $ne: "",
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: "$loto",
          total: {
            $sum: 1,
          },
        },
      },
    ])
      .sort({ total: -1 })
      .limit(10);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.addRegion = async (req, res) => {
  try {
    const listProvinceMn = [
      32, 28, 37, 26, 33, 22, 36, 18, 17, 23, 30, 25, 16, 21, 31, 19, 35, 34,
      29, 27, 20,
    ];
    const listProvinceMt = [9, 8, 7, 11, 4, 13, 8, 2, 12, 15, 6, 10, 14, 3];
    const listProvinceMb = [1];
    await KQXS.updateMany({ provinceId: listProvinceMn }, { region: 3 });
    await KQXS.updateMany({ provinceId: listProvinceMt }, { region: 2 });
    await KQXS.updateMany({ provinceId: listProvinceMb }, { region: 1 });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getAllSpecialMt = async (req, res) => {
  try {
    const arrayDate = [];
    for (let i = 1; i <= 7; i++) {
      arrayDate.push(
        addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
      );
    }
    const province = (await Province.find({ region: 2 })).map(
      (item) => item._id
    );
    const result = await KQXS.find({
      dayPrize: arrayDate,
      provinceId: province,
      prizeId: 1,
    });
    return res
      .status(200)
      .json({ arrayDate: arrayDate, specialStatistic: result });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getAllSpecialMn = async (req, res) => {
  try {
    const arrayDate = [];
    for (let i = 1; i <= 7; i++) {
      arrayDate.push(
        addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
      );
    }
    const province = (await Province.find({ region: 3 })).map(
      (item) => item._id
    );
    const result = await KQXS.find({
      dayPrize: arrayDate,
      provinceId: province,
      prizeId: 1,
    });
    return res
      .status(200)
      .json({ arrayDate: arrayDate, specialStatistic: result });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getAllSpecialMb = async (req, res) => {
  try {
    const arrayDate = [];
    for (let i = 1; i <= 30; i++) {
      arrayDate.push(
        addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
      );
    }
    const result = await KQXS.find({
      dayPrize: arrayDate,
      provinceId: 1,
      prizeId: 1,
    });
    return res
      .status(200)
      .json({ arrayDate: arrayDate, specialStatistic: result });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getAllSpecialProvince = async (req, res) => {
  const province = req.params.province;
  try {
    const arrayDate = [];
    for (let i = 1; i <= 30; i++) {
      arrayDate.push(
        addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
      );
    }
    const result = await KQXS.find({
      dayPrize: arrayDate,
      provinceId: province,
      prizeId: 1,
    });
    return res
      .status(200)
      .json({ arrayDate: arrayDate, specialStatistic: result });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getStatistic = async (req, res) => {
  try {
    const arrayOfDate = [];
    const date = new Date(reverseDate(req.body.lastDate));
    const numberOfDate = req.body.numberOfDate?.match(/^[0-9]+$/)
      ? req.body.numberOfDate
      : 10;
    const coupleOfNumber = req.body.coupleOfNumber?.match(/^[0-9]+$/)
      ? req.body.coupleOfNumber
      : 0;
    const option = req.body.option;

    for (let i = 1; i <= numberOfDate; i++) {
      arrayOfDate.push(
        addingZeroToDate(new Date(new Date(date).setDate(date.getDate() - i)))
      );
    }
    let query = {};
    if (option == "db") {
      query.prizeId = 1;
    }
    const returnResult = [];

    if (coupleOfNumber != 0) {
      query.loto = coupleOfNumber;
      query = { ...query, dayPrize: arrayOfDate, provinceId: 1 };
      const result = await KQXS.find(query);
      returnResult.push(result);
      return res
        .status(200)
        .json({ statistic: returnResult, arrayDate: arrayOfDate });
    }
    for (let i = 0; i <= 99; i++) {
      let lotoNumber = "";
      if (i < 10) {
        lotoNumber = `0${i}`;
      } else {
        lotoNumber = `${i}`;
      }
      query = {
        ...query,
        dayPrize: arrayOfDate,
        provinceId: 1,
        loto: lotoNumber,
      };
      const result = await KQXS.find(query);
      returnResult.push(result);
    }
    return res
      .status(200)
      .json({ statistic: returnResult, arrayDate: arrayOfDate });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const deleteOne = async (req, res) => {
  try {
    const result = await KQXS.deleteMany({
      dayPrize: req.body.dayPrize,
      provinceId: req.body.provinceId,
    });
    return res.status(200);
  } catch (error) {
    console.log(error);
  }
};

const deleteByIdAndDayPrize = async (dayPrize, id) => {
  try {
    const result = await KQXS.deleteMany({
      dayPrize: dayPrize,
      provinceId: id,
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteOne = deleteOne;

const checkIsSuccessCrawl = (xoso) => {
  let flag = true;
  xoso?.map((xs) => {
    xs.listXSTT?.forEach((item) => {
      if (!isNumeric(item.number)) {
        flag = false;
      }
    });
  });
  return flag;
};

const saveDB = async (item, provinceId, date, prizeId, prizeColumn, region) => {
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
            firstNumber: kqxs?.loto?.split("")[0],
            lastNumber: kqxs?.loto?.split("")[1],
            thirdDigit: query[2] ? query[2] : "",
            fourthDigit: query[3] ? query[3] : "",
            fifthDigit: query[4] ? query[4] : "",
            sixthDigit: query[5] ? query[5] : "",
            provinceId: provinceId,
            prizeId: prizeId,
            prizeColumn: prizeColumn,
            region: region,
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
        kqxs.save();
      }
    }
  });
};

exports.saveDB = saveDB;

exports.getKqxsTinhIframe = async function (req, res) {
  const province = req.query.provinceId;
  // const limit = req.query.limit ? req.query.limit : 10
  const date = req.query.date;
  if (province && date != "undefined" && date && province != "undefined") {
    try {
      const result = await getKQXSTinh(date, province);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  } else {
    try {
      const result = await getKQXSTinh(addingZeroToDate(new Date()), province);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
};

exports.getKqXsTinh = async function (req, res) {
  const province = req.query.provinceId;
  // const limit = req.query.limit ? req.query.limit : 10
  const date = req.query.date;
  if (province && date != "undefined" && date && province != "undefined") {
    try {
      const result = await getKQXSTinh(date, province);
      if (!result.length > 0) {
        const xsByProvince = await KQXS.find({ provinceId: province });
        if (xsByProvince.length > 0) {
          let daySpace =
            new Date(reverseDate(date)) -
            new Date(reverseDate(xsByProvince[0].dayPrize));
          let thisDate = xsByProvince[0].dayPrize;
          xsByProvince.map((item) => {
            if (
              new Date(reverseDate(date)) -
                new Date(reverseDate(item.dayPrize)) <
              daySpace
            ) {
              daySpace =
                new Date(reverseDate(date)) -
                new Date(reverseDate(item.dayPrize));
              thisDate = item.dayPrize;
            }
          });
          const kqxs = await getKQXSTinh(thisDate, province);
          return res.status(200).json(kqxs);
        } else {
          return res.status(200).json({ message: "Dont have data" });
        }
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  } else if (province) {
    try {
      let newDate = addingZeroToDate(new Date());
      const result = await getKQXSTinh(province);
      if (!result.length > 0) {
        const xsByProvince = await KQXS.find({ provinceId: province });
        if (xsByProvince.length > 0) {
          let daySpace =
            new Date(reverseDate(newDate)) -
            new Date(reverseDate(xsByProvince[0].dayPrize));
          let thisDate = xsByProvince[0].dayPrize;
          xsByProvince.map((item) => {
            if (
              new Date(reverseDate(newDate)) -
                new Date(reverseDate(item.dayPrize)) <
              daySpace
            ) {
              daySpace =
                new Date(reverseDate(newDate)) -
                new Date(reverseDate(item.dayPrize));
              thisDate = item.dayPrize;
            }
          });
          const kqxs = await getKQXSTinh(thisDate, province);
          return res.status(200).json(kqxs);
        } else {
          return res.status(200).json({ message: "Dont have data" });
        }
      }
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  } else {
    return res.status(500).json({ message: "Dont have province or date" });
  }
};

// xsmb
exports.getXSMB = async function (req, res) {
  //var currentDate = new Date();
  // var currentHour = currentDate.getHours();
  // var currentMin = currentDate.getMinutes();
  // var timeZone = currentDate.toLocaleTimeString();
  var today = req.params.ngay;
  //var today = moment(currentDate.toLocaleDateString, 'DD/MM/YYYY').format("DD-MM-YYYY");
  var region = 1;
  var result = await getKQXS(today, region);
  var data = {
    isSuccessed: false,
    resultObj: [],
  };
  if (result.length > 0) {
    data = {
      isSuccessed: true,
      resultObj: result,
    };
    return res.status(200).json(data);
  } else {
    // await deleteByIdAndDayPrize(today,1)
    crawlDataMBV2(today);
    setTimeout(async () => {
      var result = await getKQXS(today, region);
      var data = {
        isSuccessed: false,
        resultObj: [],
      };
      if (result.length > 0) {
        data = {
          isSuccessed: true,
          resultObj: result,
        };
        return res.status(200).json(data);
      } else {
        return res.status(200).json(data);
      }
    }, 2000);
  }
};

// xsmn
exports.getXSMN = async function (req, res) {
  var today = req.params.ngay;
  var region = 3;
  var result = await getKQXS(today, region);
  var data = {
    isSuccessed: false,
    resultObj: [],
  };
  if (result.length > 0) {
    data = {
      isSuccessed: true,
      resultObj: result,
    };
    return res.status(200).json(data);
  } else {
    const listProvince = getProvinceByDay(today);
    // await Promise.all(listProvince.map(item => deleteByIdAndDayPrize(today,item)))
    crawlDataMNV2(today).then((data) => {
      setTimeout(async () => {
        var result = await getKQXS(today, region);
        var data = {
          isSuccessed: false,
          resultObj: [],
        };
        if (result.length > 0) {
          data = {
            isSuccessed: true,
            resultObj: result,
          };
          return res.status(200).json(data);
        } else {
          return res.status(200).json(data);
        }
      }, 2000);
    });
  }
};

//xsmt
exports.getXSMT = async function (req, res) {
  var today = req.params.ngay;
  var region = 2;
  var result = await getKQXS(today, region);
  var data = {
    isSuccessed: false,
    resultObj: [],
  };
  if (result.length > 0) {
    data = {
      isSuccessed: true,
      resultObj: result,
    };
    return res.send(data);
  } else {
    const listProvince = getProvinceByDay(today);
    crawlDataMTV2(today);
    setTimeout(async () => {
      var result = await getKQXS(today, region);
      var data = {
        isSuccessed: false,
        resultObj: [],
      };
      if (result.length > 0) {
        data = {
          isSuccessed: true,
          resultObj: result,
        };
        return res.status(200).json(data);
      } else {
        return res.status(200).json(data);
      }
    }, 2000);
  }
};

async function crawlDataMN(date) {
  let plus = 0;
  let ngayXo = date;
  var getProvince = await Province.find().exec();
  url = `https://xskt.com.vn/ngay/${ngayXo}`;
  if (
    new Date().getHours() == 16 &&
    new Date().getMinutes() >= 5 &&
    new Date().getMinutes() <= 45 &&
    ngayXo == addingZeroToDate(new Date())
  ) {
    url = `https://xskt.com.vn/xsmn/ngay/${ngayXo}`;
  }
  var data;
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, { decodeEntities: false });
      data = $("#MN0");
      if (
        new Date().getHours() == 16 &&
        new Date().getMinutes() >= 5 &&
        new Date().getMinutes() <= 30 &&
        ngayXo == addingZeroToDate(new Date())
      ) {
        data = $("#rmn");
      }
      var listDai = data.find("tr").eq(0);
      var html_thu_xo = listDai?.find("th")?.eq(0).html()?.split("<br>");
      if (html_thu_xo) {
        var thu_xo = html_thu_xo[0];
        thu_xo = thu_xo.replace(/<[^>]*>?/gm, "");
        var ngay_xo = moment(html_thu_xo[1], "DD/MM").format("DD-MM-YYYY");
        var thu_ngay_xo = thu_xo + " " + ngay_xo;

        //ten dai
        var dai1 = "";
        var dai2 = "";
        var dai3 = "";
        var dai4 = "";
        if (
          listDai.find("th").eq(1).text() != "(Tự động cập nhật)" &&
          listDai.find("th").eq(1).text() != "(Đã quay xong!)"
        ) {
          listDai = data.find("tr").eq(0);
        } else {
          plus = 1;
          listDai = data.find("tr").eq(1);
        }
        dai1 = listDai
          .find("th")
          .eq(1 - plus)
          .text();
        dai2 = listDai
          .find("th")
          .eq(2 - plus)
          .text();
        dai3 = listDai
          .find("th")
          .eq(3 - plus)
          .text();
        dai4 = listDai
          .find("th")
          .eq(4 - plus)
          .text();

        var idDai1 = getProvince.filter((x) => x.name == dai1)[0]?._id;
        var idDai2 = getProvince.filter((x) => x.name == dai2)[0]?._id;
        var idDai3 = getProvince.filter((x) => x.name == dai3)[0]?._id;
        var idDai4 = getProvince.filter((x) => x.name == dai4)[0]?._id;

        //giai 8
        var g8_1 = data
          .find("tr")
          .eq(1 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g8_1, idDai1, date, 9, 1, 3);
        var g8_2 = data
          .find("tr")
          .eq(1 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g8_2, idDai2, date, 9, 2, 3);
        var g8_3 = data
          .find("tr")
          .eq(1 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g8_3, idDai3, date, 9, 3, 3);
        var g8_4 = data
          .find("tr")
          .eq(1 + plus)
          .find("td")
          .eq(4)
          .text();
        if (idDai4) {
          saveDB(g8_4, idDai4, date, 9, 4, 3);
        }

        //giai 7
        var g7_1 = data
          .find("tr")
          .eq(2 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g7_1, idDai1, date, 8, 1, 3);
        var g7_2 = data
          .find("tr")
          .eq(2 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g7_2, idDai2, date, 8, 2, 3);
        var g7_3 = data
          .find("tr")
          .eq(2 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g7_3, idDai3, date, 8, 3, 3);
        var g7_4 = data
          .find("tr")
          .eq(2 + plus)
          .find("td")
          .eq(4)
          .text();
        if (idDai4) {
          saveDB(g7_4, idDai4, date, 8, 4, 3);
        }

        //giai 6
        var g6_1 = data
          .find("tr")
          .eq(3 + plus)
          .find("td")
          .eq(1)
          .html()
          .split("<br>");
        for (let i = 0; g6_1.length < 3; i++) {
          g6_1.push("");
        }
        var giai6Dai1Array = g6_1;
        if (giai6Dai1Array[0] != "") {
          for (let index = 0; index < giai6Dai1Array.length; index++) {
            const element = giai6Dai1Array[index];
            var prizeId = 7;
            saveDB(element, idDai1, date, prizeId, 1 + index, 3);
          }
        }

        var g6_2 = data
          .find("tr")
          .eq(3 + plus)
          .find("td")
          .eq(2)
          .html()
          .split("<br>");
        for (let i = 0; g6_2.length < 3; i++) {
          g6_2.push("");
        }
        var giai6Dai2Array = g6_2;
        for (let index = 0; index < giai6Dai2Array.length; index++) {
          const element = giai6Dai2Array[index];
          var prizeId = 7;
          saveDB(element, idDai2, date, prizeId, 1 * 3 + index, 3);
        }

        var g6_3 = data
          .find("tr")
          .eq(3 + plus)
          .find("td")
          .eq(3)
          .html()
          .split("<br>");
        for (let i = 0; g6_3.length < 3; i++) {
          g6_3.push("");
        }
        var giai6Dai3Array = g6_3;
        for (let index = 0; index < giai6Dai3Array.length; index++) {
          const element = giai6Dai3Array[index];
          var prizeId = 7;
          saveDB(element, idDai3, date, prizeId, 2 * 3 + index, 3);
        }

        var g6_4 = data
          .find("tr")
          .eq(3 + plus)
          .find("td")
          .eq(4)
          .html();
        if (g6_4 !== null) {
          g6_4 = data
            .find("tr")
            .eq(3 + plus)
            .find("td")
            .eq(4)
            .html()
            .split("<br>");
          for (let i = 0; g6_4.length < 3; i++) {
            g6_4.push("");
          }
          var giai6Dai4Array = g6_4;
          for (let index = 0; index < giai6Dai4Array.length; index++) {
            const element = giai6Dai4Array[index];
            var prizeId = 7;
            saveDB(element, idDai4, date, prizeId, 3 * 3 + index, 3);
          }
        }

        //giai 5
        var g5_1 = data
          .find("tr")
          .eq(4 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g5_1, idDai1, date, 6, 1);
        var g5_2 = data
          .find("tr")
          .eq(4 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g5_2, idDai2, date, 6, 2);
        var g5_3 = data
          .find("tr")
          .eq(4 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g5_3, idDai3, date, 6, 3);
        var g5_4 = data
          .find("tr")
          .eq(4 + plus)
          .find("td")
          .eq(4)
          .text();
        if (g5_4 != "") {
          saveDB(g5_4, idDai4, date, 6, 4, 3);
        }
        //giai 4
        var g4_1 = data
          .find("tr")
          .eq(5 + plus)
          .find("td")
          .eq(1)
          .html()
          .split("<br>");
        for (let i = 0; g4_1.length < 7; i++) {
          g4_1.push("");
        }
        var giai4Dai1Array = g4_1;

        for (let index = 0; index < giai4Dai1Array.length; index++) {
          const element = giai4Dai1Array[index];
          var prizeId = 5;
          saveDB(element, idDai1, date, prizeId, 1 + index, 3);
        }

        var g4_2 = data
          .find("tr")
          .eq(5 + plus)
          .find("td")
          .eq(2)
          .html()
          .split("<br>");
        for (let i = 0; g4_2.length < 7; i++) {
          g4_2.push("");
        }
        var giai4Dai2Array = g4_2;
        for (let index = 0; index < giai4Dai2Array.length; index++) {
          const element = giai4Dai2Array[index];
          var prizeId = 5;
          saveDB(element, idDai2, date, prizeId, 1 * 3 + index, 3);
        }

        var g4_3 = data
          .find("tr")
          .eq(5 + plus)
          .find("td")
          .eq(3)
          .html()
          .split("<br>");
        for (let i = 0; g4_3.length < 7; i++) {
          g4_3.push("");
        }
        var giai4Dai3Array = g4_3;
        for (let index = 0; index < giai4Dai3Array.length; index++) {
          const element = giai4Dai3Array[index];
          var prizeId = 5;
          saveDB(element, idDai3, date, prizeId, 2 * 3 + index, 3);
        }

        var g4_4 = data
          .find("tr")
          .eq(5 + plus)
          .find("td")
          .eq(4)
          .html();
        if (g4_4 !== null) {
          g4_4 = data
            .find("tr")
            .eq(5 + plus)
            .find("td")
            .eq(4)
            .html()
            .split("<br>");
          for (let i = 0; g4_4.length < 7; i++) {
            g4_4.push("");
          }
          var giai4Dai4Array = g4_4;
          for (let index = 0; index < giai4Dai4Array.length; index++) {
            const element = giai4Dai4Array[index];
            var prizeId = 5;
            saveDB(element, idDai4, date, prizeId, 3 * 3 + index, 3);
          }
        }
        //giai 3
        var g3_1 = data
          .find("tr")
          .eq(6 + plus)
          .find("td")
          .eq(1)
          .html()
          .split("<br>");
        for (let i = 0; g3_1.length < 2; i++) {
          g3_1.push("");
        }
        var giai3Dai1Array = g3_1;
        for (let index = 0; index < giai3Dai1Array.length; index++) {
          const element = giai3Dai1Array[index];
          var prizeId = 4;
          saveDB(element, idDai1, date, prizeId, 1 + index, 3);
        }

        var g3_2 = data
          .find("tr")
          .eq(6 + plus)
          .find("td")
          .eq(2)
          .html()
          .split("<br>");
        for (let i = 0; g3_2.length < 2; i++) {
          g3_2.push("");
        }
        var giai3Dai2Array = g3_2;
        for (let index = 0; index < giai3Dai2Array.length; index++) {
          const element = giai3Dai2Array[index];
          var prizeId = 4;
          saveDB(element, idDai2, date, prizeId, 1 * 3 + index, 3);
        }

        var g3_3 = data
          .find("tr")
          .eq(6 + plus)
          .find("td")
          .eq(3)
          .html()
          .split("<br>");
        for (let i = 0; g3_3.length < 2; i++) {
          g3_3.push("");
        }
        var giai3Dai3Array = g3_3;
        for (let index = 0; index < giai3Dai3Array.length; index++) {
          const element = giai3Dai3Array[index];
          var prizeId = 4;
          saveDB(element, idDai3, date, prizeId, 2 * 3 + index, 3);
        }

        var g3_4 = data
          .find("tr")
          .eq(6 + plus)
          .find("td")
          .eq(4)
          .html();
        if (g3_4 !== null) {
          g3_4 = data
            .find("tr")
            .eq(6 + plus)
            .find("td")
            .eq(4)
            .html()
            .split("<br>");
          for (let i = 0; g3_4.length < 2; i++) {
            g3_4.push("");
          }
          var giai3Dai4Array = g3_4;
          for (let index = 0; index < giai3Dai4Array.length; index++) {
            const element = giai3Dai4Array[index];
            var prizeId = 4;
            saveDB(element, idDai4, date, prizeId, 3 * 3 + index, 3);
          }
        }
        //giai 2
        var g2_1 = data
          .find("tr")
          .eq(7 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g2_1, idDai1, ngay_xo, 3, 1);
        var g2_2 = data
          .find("tr")
          .eq(7 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g2_2, idDai2, ngay_xo, 3, 2);
        var g2_3 = data
          .find("tr")
          .eq(7 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g2_3, idDai3, ngay_xo, 3, 3);
        var g2_4 = data
          .find("tr")
          .eq(7 + plus)
          .find("td")
          .eq(4)
          .text();
        if (g2_4 != "") {
          saveDB(g2_4, idDai4, date, 3, 4, 3);
        }

        //giai 1
        var g1_1 = data
          .find("tr")
          .eq(8 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g1_1, idDai1, date, 2, 1);
        var g1_2 = data
          .find("tr")
          .eq(8 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g1_2, idDai2, date, 2, 2);
        var g1_3 = data
          .find("tr")
          .eq(8 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g1_3, idDai3, date, 2, 3);
        var g1_4 = data
          .find("tr")
          .eq(8 + plus)
          .find("td")
          .eq(4)
          .text();
        if (g1_4 != "") {
          saveDB(g1_4, idDai4, date, 2, 4, 3);
        }

        //dac biet
        var db_1 = data
          .find("tr")
          .eq(9 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(db_1, idDai1, date, 1, 1);
        var db_2 = data
          .find("tr")
          .eq(9 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(db_2, idDai2, date, 1, 2);
        var db_3 = data
          .find("tr")
          .eq(9 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(db_3, idDai3, date, 1, 3);
        var db_4 = data
          .find("tr")
          .eq(9 + plus)
          .find("td")
          .eq(4)
          .text();
        if (db_4 != "") {
          saveDB(db_4, idDai4, date, 1, 4, 3);
        }

        return {
          isSuccessed: true,
        };
      }
    }
  });
}
exports.crawlDataMN = crawlDataMN;

async function crawlDataMB(date) {
  var ngayXo = date; //DD-MM-YYYYdate

  var ngay_xo = "";
  url = `https://xskt.com.vn/ngay/${date}.html`;
  if (
    new Date().getHours() == 18 &&
    new Date().getMinutes() >= 5 &&
    new Date().getMinutes() <= 45 &&
    ngayXo == addingZeroToDate(new Date())
  ) {
    url = `https://xskt.com.vn/xsmb/ngay/${date}`;
  }
  request(url, function (error, response, html) {
    if (!error) {
      var provinceId = 1;
      var $ = cheerio.load(html, { decodeEntities: false });
      var title = $(".box-ketqua").eq(0);

      var listDai = title.find("#MB0");
      if (
        new Date().getHours() == 18 &&
        new Date().getMinutes() >= 5 &&
        new Date().getMinutes() <= 30 &&
        ngayXo == addingZeroToDate(new Date())
      ) {
        listDai = title.find("#rmb");
      }
      var html_thu_xo = title.find("h2 a:last-child").eq(0).html();
      var html_ngay_xo = title
        .find("h2 a:nth-child(2)")
        .eq(0)
        .html()
        ?.split(" ");
      if (html_ngay_xo) {
        ngay_xo = moment(html_ngay_xo[2], "DD/MM").format("DD-MM-YYYY");
      } else {
        ngay_xo = date;
      }
      var db = listDai.find("tr").eq(1).find("td").eq(1).text();
      let db_text = listDai.find("tr").eq(1).find("td").eq(0).text();
      if (db_text) {
        if (db) {
          var prizeId = 1;
          saveDB(db, provinceId, date, prizeId, 1, 1);
        } else {
          var prizeId = 1;
          saveDB("", provinceId, date, prizeId, 1, 1);
        }
        //giai 1
        var g1 = listDai.find("tr").eq(2).find("td").eq(1).text();
        if (g1) {
          var prizeId = 2;
          saveDB(g1, provinceId, date, prizeId, 2, 1);
        } else {
          var prizeId = 2;
          saveDB("", provinceId, date, prizeId, 2, 1);
        }

        //giai 2
        var g2 = listDai.find("tr").eq(3).find("td").eq(1).text();
        var lsG2 = g2.split(" ");
        if (lsG2[0] != "") {
          for (let index = 0; index < lsG2.length; index++) {
            const element = lsG2[index];
            var prizeId = 3;
            saveDB(element, provinceId, date, prizeId, index + 1, 1);
          }
        } else {
          var prizeId = 3;
          saveDB("", provinceId, date, prizeId, 1, 1);
          saveDB("", provinceId, date, prizeId, 2, 1);
        }

        // //giai 3
        var g3 = listDai
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("p")
          .html()
          ?.split("<br>");
        if (g3) {
          var g3_1 = g3[0].split(" ");
          if (g3_1) {
            for (let index = 0; index < g3_1?.length; index++) {
              const element = g3_1[index];
              var prizeId = 4;
              saveDB(element, provinceId, date, prizeId, index + 1, 1);
            }
          } else {
            var prizeId = 4;
            saveDB("", provinceId, date, prizeId, 1, 1);
            saveDB("", provinceId, date, prizeId, 2, 1);
            saveDB("", provinceId, date, prizeId, 3, 1);
          }
          var g3_2 = g3[1]?.split(" ");
          if (g3_2) {
            for (let index = 0; index < g3_2?.length; index++) {
              const element = g3_2[index];
              var prizeId = 4;
              saveDB(element, provinceId, date, prizeId, index + 4);
            }
          } else {
            var prizeId = 4;
            saveDB("", provinceId, date, prizeId, 4, 1);
            saveDB("", provinceId, date, prizeId, 5, 1);
            saveDB("", provinceId, date, prizeId, 6, 1);
          }
        } else {
          var prizeId = 4;
          saveDB("", provinceId, date, prizeId, 1, 1);
          saveDB("", provinceId, date, prizeId, 2, 1);
          saveDB("", provinceId, date, prizeId, 3, 1);
          saveDB("", provinceId, date, prizeId, 4, 1);
          saveDB("", provinceId, date, prizeId, 5, 1);
          saveDB("", provinceId, date, prizeId, 6, 1);
        }

        // //giai 4
        var g4 = listDai.find("tr").eq(6).find("td").eq(1).text();
        var lsG4 = g4.split(" ");
        if (lsG4[0] != "") {
          for (let index = 0; index < lsG4.length; index++) {
            const element = lsG4[index];
            var prizeId = 5;
            saveDB(element, provinceId, date, prizeId, index + 1, 1);
          }
        } else {
          var prizeId = 5;
          saveDB("", provinceId, date, prizeId, 1, 1);
          saveDB("", provinceId, date, prizeId, 2, 1);
          saveDB("", provinceId, date, prizeId, 3, 1);
          saveDB("", provinceId, date, prizeId, 4, 1);
        }

        // //giai 5
        var g5 = listDai
          .find("tr")
          .eq(7)
          .find("td")
          .eq(1)
          .html()
          ?.split("<br>");
        if (g5) {
          var g5_1 = g5[0]?.split("<p>")[1]?.split(" ");
          if (g5_1) {
            for (let index = 0; index < g5_1.length; index++) {
              const element = g5_1[index];
              var prizeId = 6;
              saveDB(element, provinceId, ngay_xo, prizeId, index + 1, 1);
            }
          } else {
            var prizeId = 6;
            saveDB("", provinceId, date, prizeId, 1, 1);
            saveDB("", provinceId, date, prizeId, 2, 1);
            saveDB("", provinceId, date, prizeId, 3, 1);
          }
          var g5_2 = g5[1]?.split("</p>")[0].split(" ");
          if (g5_2) {
            for (let index = 0; index < g5_2?.length; index++) {
              const element = g5_2[index];
              var prizeId = 6;
              saveDB(element, provinceId, date, prizeId, index + 4, 1);
            }
          } else {
            var prizeId = 6;
            saveDB("", provinceId, date, prizeId, 4, 1);
            saveDB("", provinceId, date, prizeId, 5, 1);
            saveDB("", provinceId, date, prizeId, 6, 1);
          }
        } else {
          var prizeId = 6;
          saveDB("", provinceId, date, prizeId, 1, 1);
          saveDB("", provinceId, date, prizeId, 2, 1);
          saveDB("", provinceId, date, prizeId, 3, 1);
          saveDB("", provinceId, date, prizeId, 4, 1);
          saveDB("", provinceId, date, prizeId, 5, 1);
          saveDB("", provinceId, date, prizeId, 6, 1);
        }

        // //giai 6
        var g6 = listDai.find("tr").eq(9).find("td").eq(1).text();
        var lsG6 = g6.split(" ");
        if (lsG6[0] != "") {
          for (let index = 0; index < lsG6.length; index++) {
            const element = lsG6[index];
            var prizeId = 7;
            saveDB(element, provinceId, date, prizeId, index + 1);
          }
        } else {
          var prizeId = 7;
          saveDB("", provinceId, date, prizeId, 1, 1);
          saveDB("", provinceId, date, prizeId, 2, 1);
          saveDB("", provinceId, date, prizeId, 3, 1);
        }

        //giai 7
        var g7 = listDai.find("tr").eq(10).find("td").eq(1).text();
        var lsG7 = g7.split(" ");
        if (lsG7[0] != "") {
          for (let index = 0; index < lsG7.length; index++) {
            const element = lsG7[index];
            var prizeId = 8;
            saveDB(element, provinceId, date, prizeId, index + 1, 1);
          }
        } else {
          var prizeId = 8;
          saveDB("", provinceId, date, prizeId, 1, 1);
          saveDB("", provinceId, date, prizeId, 2, 1);
          saveDB("", provinceId, date, prizeId, 3, 1);
          saveDB("", provinceId, date, prizeId, 4, 1);
        }

        return {
          isSuccessed: true,
        };
      }
    }
  });
}

exports.crawlDataMB = crawlDataMB;

async function crawlDataMT(date) {
  let plus = 0;
  let ngayXo = date;
  var data;
  var getProvince = await Province.find().exec();
  url = `https://xskt.com.vn/ngay/${ngayXo}`;
  if (
    new Date().getHours() == 17 &&
    new Date().getMinutes() >= 5 &&
    new Date().getMinutes() <= 45 &&
    ngayXo == addingZeroToDate(new Date())
  ) {
    url = `https://xskt.com.vn/xsmt/ngay/${ngayXo}`;
  }
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, { decodeEntities: false });
      data = $("#MT0");
      if (
        new Date().getHours() == 17 &&
        new Date().getMinutes() >= 5 &&
        new Date().getMinutes() <= 30 &&
        ngayXo == addingZeroToDate(new Date())
      ) {
        data = $("#rmt");
      }
      var listDai = data.find("tr").eq(0);
      var html_thu_xo = listDai.find("th").eq(0).html()?.split("<br>");
      if (html_thu_xo) {
        var thu_xo = html_thu_xo[0];
        thu_xo = thu_xo.replace(/<[^>]*>?/gm, "");
        var ngay_xo = moment(html_thu_xo[1], "DD/MM").format("DD-MM-YYYY");
        var thu_ngay_xo = thu_xo + " " + ngay_xo;
        //ten dai
        if (
          listDai.find("th").eq(1).text() != "(Tự động cập nhật)" &&
          listDai.find("th").eq(1).text() != "(Đã quay xong!)"
        ) {
          listDai = data.find("tr").eq(0);
        } else {
          plus = 1;
          listDai = data.find("tr").eq(1);
        }
        var dai1 = listDai
          .find("th")
          .eq(1 - plus)
          .text();
        var dai2 = listDai
          .find("th")
          .eq(2 - plus)
          .text();
        var dai3 = listDai
          .find("th")
          .eq(3 - plus)
          .text();

        var idDai1 = getProvince.filter((x) => x.name == dai1)[0]?._id;
        var idDai2 = getProvince.filter((x) => x.name == dai2)[0]?._id;
        var idDai3 = getProvince.filter((x) => x.name == dai3)[0]?._id;

        // //giai 8
        var g8_1 = data
          .find("tr")
          .eq(1 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g8_1, idDai1, ngay_xo, 9, 1, 2);
        var g8_2 = data
          .find("tr")
          .eq(1 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g8_2, idDai2, ngay_xo, 9, 2, 2);
        var g8_3 = data
          .find("tr")
          .eq(1 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g8_3, idDai3, ngay_xo, 9, 3, 2);

        //giai 7
        var g7_1 = data
          .find("tr")
          .eq(2 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g7_1, idDai1, ngay_xo, 8, 1, 2);
        var g7_2 = data
          .find("tr")
          .eq(2 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g7_2, idDai2, ngay_xo, 8, 2, 2);
        var g7_3 = data
          .find("tr")
          .eq(2 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g7_3, idDai3, ngay_xo, 8, 3, 2);

        //giai 6
        var g6_1 = data
          .find("tr")
          .eq(3 + plus)
          .find("td")
          .eq(1)
          .html()
          ?.split("<br>");
        for (let i = 0; g6_1.length < 3; i++) {
          g6_1.push("");
        }
        var giai6Dai1Array = g6_1;
        for (let index = 0; index < giai6Dai1Array.length; index++) {
          const element = giai6Dai1Array[index];
          var prizeId = 7;
          saveDB(element, idDai1, ngay_xo, prizeId, index + 1, 2);
        }

        var g6_2 = data
          .find("tr")
          .eq(3 + plus)
          .find("td")
          .eq(2)
          .html()
          ?.split("<br>");
        for (let i = 0; g6_2.length < 3; i++) {
          g6_2.push("");
        }
        var giai6Dai2Array = g6_2;
        for (let index = 0; index < giai6Dai2Array.length; index++) {
          const element = giai6Dai2Array[index];
          var prizeId = 7;
          saveDB(element, idDai2, ngay_xo, prizeId, index + 2 * 3, 2);
        }

        var g6_3 = data
          .find("tr")
          .eq(3 + plus)
          .find("td")
          .eq(3)
          .html();
        g6_3 = data
          .find("tr")
          .eq(3 + plus)
          .find("td")
          .eq(3)
          .html()
          ?.split("<br>");
        for (let i = 0; g6_3?.length < 3; i++) {
          g6_3.push("");
        }
        var giai6Dai3Array = g6_3;
        for (let index = 0; index < giai6Dai3Array?.length; index++) {
          const element = giai6Dai3Array[index];
          var prizeId = 7;
          saveDB(element, idDai3, ngay_xo, prizeId, index + 3 * 3, 2);
        }

        //giai 5
        var g5_1 = data
          .find("tr")
          .eq(4 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g5_1, idDai1, ngay_xo, 6, 1, 2);
        var g5_2 = data
          .find("tr")
          .eq(4 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g5_2, idDai2, ngay_xo, 6, 2, 2);
        var g5_3 = data
          .find("tr")
          .eq(4 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g5_3, idDai3, ngay_xo, 6, 3, 2);

        //giai 4
        var g4_1 = data
          .find("tr")
          .eq(5 + plus)
          .find("td")
          .eq(1)
          .html()
          ?.split("<br>");
        for (let i = 0; g4_1.length < 7; i++) {
          g4_1.push("");
        }
        var giai4Dai1Array = g4_1;

        for (let index = 0; index < giai4Dai1Array.length; index++) {
          const element = giai4Dai1Array[index];
          var prizeId = 5;
          saveDB(element, idDai1, ngay_xo, prizeId, index + 1, 2);
        }

        var g4_2 = data
          .find("tr")
          .eq(5 + plus)
          .find("td")
          .eq(2)
          .html()
          ?.split("<br>");
        for (let i = 0; g4_2.length < 7; i++) {
          g4_2.push("");
        }
        var giai4Dai2Array = g4_2;
        for (let index = 0; index < giai4Dai2Array.length; index++) {
          const element = giai4Dai2Array[index];
          var prizeId = 5;
          saveDB(element, idDai2, ngay_xo, prizeId, index + 2 * 3, 2);
        }
        var g4_3 = data
          .find("tr")
          .eq(5 + plus)
          .find("td")
          .eq(3)
          .html();
        g4_3 = data
          .find("tr")
          .eq(5 + plus)
          .find("td")
          .eq(3)
          .html()
          ?.split("<br>");
        for (let i = 0; g4_3?.length < 7; i++) {
          g4_3.push("");
        }
        var giai4Dai3Array = g4_3;
        for (let index = 0; index < giai4Dai3Array?.length; index++) {
          const element = giai4Dai3Array[index];
          var prizeId = 5;
          saveDB(element, idDai3, ngay_xo, prizeId, index + 3 * 3, 2);
        }

        //giai 3
        var g3_1 = data
          .find("tr")
          .eq(6 + plus)
          .find("td")
          .eq(1)
          .html()
          ?.split("<br>");
        for (let i = 0; g3_1.length < 2; i++) {
          g3_1.push("");
        }
        var giai3Dai1Array = g3_1;
        for (let index = 0; index < giai3Dai1Array.length; index++) {
          const element = giai3Dai1Array[index];
          var prizeId = 4;
          saveDB(element, idDai1, ngay_xo, prizeId, index + 1, 2);
        }

        var g3_2 = data
          .find("tr")
          .eq(6 + plus)
          .find("td")
          .eq(2)
          .html()
          ?.split("<br>");
        for (let i = 0; g3_2.length < 2; i++) {
          g3_2.push("");
        }
        var giai3Dai2Array = g3_2;
        for (let index = 0; index < giai3Dai2Array.length; index++) {
          const element = giai3Dai2Array[index];
          var prizeId = 4;
          saveDB(element, idDai2, ngay_xo, prizeId, index + 2 * 3, 2);
        }

        var g3_3 = data
          .find("tr")
          .eq(6 + plus)
          .find("td")
          .eq(3)
          .html();
        g3_3 = data
          .find("tr")
          .eq(6 + plus)
          .find("td")
          .eq(3)
          .html()
          ?.split("<br>");
        for (let i = 0; g3_3?.length < 2; i++) {
          g3_3.push("");
        }
        var giai3Dai3Array = g3_3;
        for (let index = 0; index < giai3Dai3Array?.length; index++) {
          const element = giai3Dai3Array[index];
          var prizeId = 4;
          saveDB(element, idDai3, ngay_xo, prizeId, index + 3 * 3, 2);
        }

        //giai 2
        var g2_1 = data
          .find("tr")
          .eq(7 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g2_1, idDai1, ngay_xo, 3, 1, 2);
        var g2_2 = data
          .find("tr")
          .eq(7 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g2_2, idDai2, ngay_xo, 3, 2, 2);
        var g2_3 = data
          .find("tr")
          .eq(7 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g2_3, idDai3, ngay_xo, 3, 3, 2);

        //giai 1
        var g1_1 = data
          .find("tr")
          .eq(8 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(g1_1, idDai1, ngay_xo, 2, 1, 2);
        var g1_2 = data
          .find("tr")
          .eq(8 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(g1_2, idDai2, ngay_xo, 2, 2, 2);
        var g1_3 = data
          .find("tr")
          .eq(8 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(g1_3, idDai3, ngay_xo, 2, 3, 2);

        //dac biet
        var db_1 = data
          .find("tr")
          .eq(9 + plus)
          .find("td")
          .eq(1)
          .text();
        saveDB(db_1, idDai1, ngay_xo, 1, 1, 2);
        var db_2 = data
          .find("tr")
          .eq(9 + plus)
          .find("td")
          .eq(2)
          .text();
        saveDB(db_2, idDai2, ngay_xo, 1, 2, 2);
        var db_3 = data
          .find("tr")
          .eq(9 + plus)
          .find("td")
          .eq(3)
          .text();
        saveDB(db_3, idDai3, ngay_xo, 1, 3, 2);
        return {
          isSuccessed: true,
        };
      }
    } else {
      return {
        isSuccessed: false,
      };
    }
  });
}

exports.crawlDataMT = crawlDataMT;

function getProvinceByDay(date) {
  var listProvince = [];
  if (date) {
    let dateParts = date.split("-");
    const dayOfWeek = new Date(
      +dateParts[2],
      dateParts[1] - 1,
      +dateParts[0]
    ).getDay();
    switch (dayOfWeek) {
      case 0: //sunday
        listProvince.push(1);
        listProvince.push(9); //Kom Tum
        listProvince.push(7); //Huế
        listProvince.push(8); //Khánh Hoà
        listProvince.push(32); //Tiền Giang
        listProvince.push(28); //Kiên Giang
        listProvince.push(37); //Đà Lạt
        break;
      case 1: //monday
        listProvince.push(1);
        listProvince.push(7); //Huế
        listProvince.push(11); //Phú Yên
        listProvince.push(26); //Đồng Tháp
        listProvince.push(33); //HCM
        listProvince.push(22); //Cà Mau
        break;
      case 2: //Tuesday
        listProvince.push(1);
        listProvince.push(4); //Đắk Lắk
        listProvince.push(13); //Quảng Nam
        listProvince.push(36); //Vũng Tàu
        listProvince.push(18); //Bến Tre
        listProvince.push(17); //Bạc Liêu
        break;
      case 3: //Wednesday
        listProvince.push(1);
        listProvince.push(8); //Khánh Hoà
        listProvince.push(3); //Đà Nẵng
        listProvince.push(23); //Cần thơ
        listProvince.push(30); //Sóc Trăng
        listProvince.push(25); //Đồng Nai
        break;
      case 4: //Thursday
        listProvince.push(1);
        listProvince.push(2); //Bình Định
        listProvince.push(12); //Quảng Bình
        listProvince.push(15); //Quảng Trị
        listProvince.push(16); //An Giang
        listProvince.push(31); //Tây Ninh
        listProvince.push(21); //Bình Thuận
        break;
      case 5: //Friday
        listProvince.push(1);
        listProvince.push(6); //Gia Lai
        listProvince.push(10); //Ninh Thuận
        listProvince.push(35); //Vĩnh Long
        listProvince.push(19); //Bình Dương
        listProvince.push(34); //Trà Vinh
        break;
      case 6: //Saturday
        listProvince.push(1);
        listProvince.push(14); //Quảng Ngãi
        listProvince.push(5); //Đắk Nông
        listProvince.push(3); //Đà Nẵng
        listProvince.push(29); //Long An
        listProvince.push(20); //Bình Phước
        listProvince.push(27); //Hậu Giang
        listProvince.push(33); //HCM
        break;
      default:
        break;
    }
  }

  return listProvince;
}

async function getKQXS(date, region) {
  var provinceIds = getProvinceByDay(date);
  var listProvinces = await Province.find({
    region: region,
    _id: { $in: provinceIds },
  }).exec();
  var listResult = [];
  if (listProvinces.lenght != 0) {
    for await (const el of listProvinces) {
      var checkKQ = await KQXS.find({
        provinceId: el._id,
        dayPrize: date,
        region: region,
      }).exec();
      var resKQXS = {
        serialDB: {},
        listXSTT: [],
        resultHead: {},
        resultEnd: {},
      };

      if (checkKQ.length != 0) {
        var serialData = await SerialDB.findOne({
          dayPrize: date,
          provinceId: el._id,
        }).exec();
        if (serialData) {
          serialData.provinceName = el.name;
        }
        var resultHead = await checkKQ.reduce(function (r, a) {
          r[a.firstNumber] = r[a.firstNumber] || [];
          r[a.firstNumber].push({ loto: a.loto, prizeId: a.prizeId });
          return r;
        }, Object.create(null));
        var resultEnd = await checkKQ.reduce(function (r, a) {
          r[a.lastNumber] = r[a.lastNumber] || [];
          r[a.lastNumber].push({ loto: a.loto, prizeId: a.prizeId });
          return r;
        }, Object.create(null));
        resKQXS.serialDB = serialData;
        resKQXS.listXSTT = checkKQ;
        resKQXS.resultHead = resultHead;
        resKQXS.resultEnd = resultEnd;
        resKQXS.provinceName = el.name;
        resKQXS.provinceRegion = el.region;
        resKQXS.provinceNameNoSign = el.nameNoSign;
        listResult.push(resKQXS);
      }
    }
  }
  return listResult;
}

async function getKQXSTinh(date, provinceId) {
  var listResult = [];
  var checkKQ = await KQXS.find({
    provinceId: provinceId,
    dayPrize: date,
  }).exec();
  var resKQXS = {
    serialDB: {},
    listXSTT: [],
    resultHead: {},
    resultEnd: {},
  };

  if (checkKQ.length != 0) {
    var thisProvince = await Province.findOne({ _id: provinceId });
    var serialData = await SerialDB.findOne({
      dayPrize: date,
      provinceId: provinceId,
    }).exec();
    if (serialData) {
      serialData.provinceName = el.name;
    }
    var resultHead = await checkKQ.reduce(function (r, a) {
      r[a.firstNumber] = r[a.firstNumber] || [];
      r[a.firstNumber].push({ loto: a.loto, prizeId: a.prizeId });
      return r;
    }, Object.create(null));
    var resultEnd = await checkKQ.reduce(function (r, a) {
      r[a.lastNumber] = r[a.lastNumber] || [];
      r[a.lastNumber].push({ loto: a.loto, prizeId: a.prizeId });
      return r;
    }, Object.create(null));
    resKQXS.serialDB = serialData;
    resKQXS.listXSTT = checkKQ;
    resKQXS.resultHead = resultHead;
    resKQXS.resultEnd = resultEnd;
    resKQXS.provinceName = thisProvince.name;
    resKQXS.provinceRegion = thisProvince.region;
    resKQXS.provinceNameNoSign = thisProvince.nameNoSign;
    listResult.push(resKQXS);
  }
  return listResult;
}

exports.getResultFormLo = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || "province";
    const province = req.query.province;
    const region = req.query.region;
    const startDate = req.query.startDate;
    let endDate = req.query.endDate;
    const number = req.query.number;

    let searchQuery = {};
    let arrayDate = [];

    if (!endDate) {
      endDate = reverseDate(addingZeroToDate(new Date()));
    }
    if (startDate) {
      const diffDate = moment(endDate).diff(moment(startDate), "days");
      for (let i = 0; i < diffDate; i++) {
        arrayDate.push(
          moment(
            new Date(
              new Date(startDate).setDate(new Date(startDate).getDate() + i)
            )
          ).format("DD-MM-YYYY")
        );
      }

      searchQuery = {
        ...searchQuery,
        dayPrize: arrayDate,
      };
    }

    searchQuery = {
      ...searchQuery,
      number: {
        $regex: `.*${number}$`,
      },
    };

    if (sortBy == "province") {
      searchQuery = {
        ...searchQuery,
        provinceId: province,
      };
    } else if (sortBy == "region") {
      searchQuery = {
        ...searchQuery,
        region,
      };
    }
    const result = await KQXS.find(searchQuery);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getResultFormGan = async (req, res) => {
  const sortBy = req.query.sortBy || "province";
  const province = req.query.province;
  const region = req.query.region;
  const number = req.query.number;
  const searchType = req.query.searchType;
  let searchQuery = {};

  if (searchType == "headTail") {
    searchQuery = {
      ...searchQuery,
      number: {
        $regex: `.*${number}$`,
      },
    };
  } else {
    searchQuery = {
      ...searchQuery,
      number,
      prizeId: 1,
    };
  }

  if (sortBy == "province") {
    searchQuery = {
      ...searchQuery,
      provinceId: province,
    };
  } else if (sortBy == "region") {
    searchQuery = {
      ...searchQuery,
      region,
    };
  }

  try {
    const result = await KQXS.find(searchQuery);
    if (result.length > 0)
      return res.status(200).json(result[result.length - 1]);
    else return res.status(200).json({});
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.getResultTanSuat = async (req, res) => {
  const region = Number(req.query.region);
  const province = Number(req.query.province);
  const number = req.query.number ? Number(req.query.number) : 0;
  const searchType = req.query.searchType;
  const sortBy = req.query.sortBy;
  const arrayDate = [];
  let searchQuery = {
    loto: {
      $ne: "",
    },
  };

  for (let i = 1; i <= number; i++) {
    arrayDate.push(
      addingZeroToDate(new Date(new Date().setDate(new Date().getDate() - i)))
    );
  }
  searchQuery = {
    ...searchQuery,
    dayPrize: {
      $in: arrayDate,
    },
  };
  if (sortBy == "region") {
    searchQuery = {
      ...searchQuery,
      region,
    };
  } else if (sortBy == "province") {
    searchQuery = {
      ...searchQuery,
      provinceId: province,
    };
  }

  if (searchType == "special") {
    searchQuery = {
      ...searchQuery,
      prizeId: 1,
    };
  }
  console.log(searchQuery);
  try {
    const topByRegion = await KQXS.aggregate([
      {
        $match: searchQuery,
      },
      {
        $group: {
          _id: "$loto",
          total: {
            $sum: 1,
          },
        },
      },
    ])
      .sort({ total: -1 })
      .limit(10);

    const allByHead = await KQXS.aggregate([
      {
        $match: searchQuery,
      },
      {
        $group: {
          _id: "$firstNumber",
          total: {
            $sum: 1,
          },
        },
      },
    ]).sort({ total: -1 });

    const allByTail = await KQXS.aggregate([
      {
        $match: searchQuery,
      },
      {
        $group: {
          _id: "$firstNumber",
          total: {
            $sum: 1,
          },
        },
      },
    ]).sort({ total: -1 });
    return res.status(200).json({ topByRegion, allByHead, allByTail });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};
