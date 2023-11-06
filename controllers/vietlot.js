const Mega645 = require("../models/mega645");
var request = require("request");
var cheerio = require("cheerio");
var moment = require("moment");
const max3D = require("../models/max3D.js");
const power655 = require("../models/power655");
const max3DPro = require("../models/max3DPro");
const max4D = require("../models/max4D");
const NodeCache = require("node-cache");
const kqxsCache = new NodeCache({ stdTTL: 1800 });

const saveDBMax4D = async (item) => {
  try {
    const result = await max4D.create(item);
  } catch (error) {
    console.log(error);
  }
};

const saveDBPower655 = async (item) => {
  try {
    const result = await power655.create(item);
  } catch (error) {
    console.log(error);
  }
};

const saveDBMax3dPro = async (item) => {
  try {
    const result = await max3DPro.create(item);
    console.log(result);
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const saveDBMax3d = async (item) => {
  if (item.ket_qua != "") {
    try {
      const result = await max3D.findOne({
        dayPrize: item.dayPrize,
        idKy: item.ky_mo_thuong,
      });
      if (result) {
        return;
      } else {
        const newMax3D = await max3D.create(item);
      }
    } catch (error) {
      console.log(error);
      return res.status(500);
    }
  }
};

const saveDBMega = async (item) => {
  if (item.ket_qua != "") {
    var query = item.ket_qua.split(" ");
    Mega645.findOne({ dayPrize: item.dayPrize, idKy: item.ky_mo_thuong }).exec(
      (err, data) => {
        if (err) {
          return false;
        } else {
          if (data) {
            return;
          } else {
            var kq = new Mega645();
            kq.number1 = query[0];
            kq.number2 = query[1];
            kq.number3 = query[2];
            kq.number4 = query[3];
            kq.number5 = query[4];
            kq.number6 = query[5];
            kq.jackpot = item.jackpot;
            kq.jackpotWinner = item.jackpotWinner;
            kq.match5 = item.match5;
            kq.match5Winner = item.match5Winner;
            kq.match4 = item.match4;
            kq.match4Winner = item.match4Winner;
            kq.match3 = item.match3;
            kq.match3Winner = item.match3Winner;
            kq.dayPrize = item.dayPrize;
            kq.idKy = item.idKy;
            kq.save();
          }
        }
      }
    );
  }
};

exports.getMax4D = async function (req, res) {
  var today = req.params.date;
  var result = await getDataMega645(today);
  var data = {
    isSuccessed: false,
    resultObj: [],
  };
  if (result) {
    data = {
      isSuccessed: true,
      resultObj: result,
    };
    return res.status(200).json(data);
  } else {
    // crawlDataMax4D(today);
    setTimeout(async () => {
      var result = await getDataMax4D(today);
      var data = {
        isSuccessed: false,
        resultObj: [],
      };
      if (result) {
        data = {
          isSuccessed: true,
          resultObj: result,
        };
        return res.status(200).json(data);
      } else {
        const altResult = await max4D.findOne({ sort: { created_at: -1 } });
        if (altResult) {
          data = {
            isSuccessed: true,
            resultObj: altResult,
          };
          return res.status(200).json(data);
        } else {
          return res.status(200).json(data);
        }
      }
    }, 2500);
  }
};

exports.getPower655 = async function (req, res) {
  var today = req.params.date;
  var result = await getDataPower655(today);
  var data = {
    isSuccessed: false,
    resultObj: [],
  };
  if (result) {
    data = {
      isSuccessed: true,
      resultObj: result,
    };
    return res.send(data);
  } else {
    crawlDataPower655(today);
    setTimeout(async () => {
      var result = await getDataPower655(today);
      var data = {
        isSuccessed: false,
        resultObj: [],
      };
      if (result) {
        data = {
          isSuccessed: true,
          resultObj: result,
        };
        return res.status(200).json(data);
      } else {
        return res.status(200).json(data);
      }
    }, 2500);
  }
};

//mega645
exports.getMega645 = async function (req, res) {
  var today = req.params.ngay;
  var result = await getDataMega645(today);
  var data = {
    isSuccessed: false,
    resultObj: [],
  };
  if (result) {
    data = {
      isSuccessed: true,
      resultObj: result,
    };
    return res.status(200).json(data);
  } else {
    crawlDataMega645(today);
    setTimeout(async () => {
      var result = await getDataMega645(today);
      console.log(result);
      var data = {
        isSuccessed: false,
        resultObj: [],
      };
      if (result) {
        data = {
          isSuccessed: true,
          resultObj: result,
        };
        return res.status(200).json(data);
      } else {
        return res.status(200).json(data);
      }
    }, 2500);
  }
};

//mega645
exports.getMax3D = async function (req, res) {
  var today = req.params.ngay;
  var result = await getDataMax3D(today);
  var data = {
    isSuccessed: false,
    resultObj: [],
  };
  if (result) {
    data = {
      isSuccessed: true,
      resultObj: result,
    };
    return res.status(200).json(data);
  } else {
    crawlDataMax3D(today);
    setTimeout(async () => {
      var result = await getDataMax3D(today);
      var data = {
        isSuccessed: false,
        resultObj: [],
      };
      if (result) {
        data = {
          isSuccessed: true,
          resultObj: result,
        };
        return res.status(200).json(data);
      } else {
        return res.status(200).json(data);
      }
    }, 2500);
  }
};

exports.getMax3DPro = async function (req, res) {
  var today = req.params.date;
  var result = await getDataMax3DPro(today);
  var data = {
    isSuccessed: false,
    resultObj: [],
  };
  if (result) {
    data = {
      isSuccessed: true,
      resultObj: result,
    };
    return res.status(200).json(data);
  } else {
    crawlDataMax3DPro(today);
    setTimeout(async () => {
      var result = await getDataMax3DPro(today);
      var data = {
        isSuccessed: false,
        resultObj: [],
      };
      if (result) {
        data = {
          isSuccessed: true,
          resultObj: result,
        };
        return res.status(200).json(data);
      } else {
        return res.status(200).json(data);
      }
    }, 2500);
  }
};

async function getDataMega645(date) {
  var result = await Mega645.findOne({ dayPrize: date }).exec();
  return result;
}

async function getDataMax3D(date) {
  const dataMax3D = kqxsCache.get(`max3d-${date}`);
  console.log(dataMax3D);
  if (!dataMax3D) {
    var result = await max3D.findOne({ dayPrize: date }).exec();
    kqxsCache.set(`max3d-${date}`, JSON.stringify(result || "{}"));

    return result;
  }
  return JSON.parse(dataMax3D);
}

async function getDataMax3DPro(date) {
  const dataMax3DPro = kqxsCache.get(`max3dpro-${date}`);
  console.log(dataMax3DPro);
  if (!dataMax3DPro) {
    var result = await max3DPro.findOne({ dayPrize: date }).exec();
    kqxsCache.set(`max3dpro-${date}`, JSON.stringify(result || "{}"));

    return result;
  }
  return JSON.parse(dataMax3DPro);
}

async function getDataPower655(date) {
  const dataPower = kqxsCache.get(`power655-${date}`);
  console.log(dataPower);
  if (!dataPower) {
    var result = await power655.findOne({ dayPrize: date }).exec();
    kqxsCache.set(`power655-${date}`, JSON.stringify(result || "{}"));

    return result;
  }
  return JSON.parse(dataPower);
}

async function getDataMax4D(date) {
  const result = await max4D.findOne({ dayPrize: date }).exec();
  return result;
}

async function crawlDataMax3D(date) {
  var ngayXo = date;
  url = `https://xskt.com.vn/ngay/${ngayXo}.html`;
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, { decodeEntities: false });
      var title = $(".box-ketqua");
      const checkMax3D = title.find("#max3d").attr("id");
      if (checkMax3D == "max3d") {
        const html_ngay_xo = title
          .find("h2 a:nth-child(2)")
          .eq(0)
          .html()
          ?.split(" ");
        const ngay_xo = moment(html_ngay_xo[2], "DD/MM").format("DD-MM-YYYY");
        const max3D = title.find(".max3d");

        const ky_mo_thuong = max3D
          .find("tr")
          .eq(0)
          .find(".kmt")
          .find("a")
          .text();
        const first_prize_1 = max3D
          .find("tr")
          .eq(2)
          .find("td")
          .eq(1)
          .find("b")
          .text()
          .split(" ")[0];
        const first_prize_2 = max3D
          .find("tr")
          .eq(2)
          .find("td")
          .eq(1)
          .find("b")
          .text()
          .split(" ")[1];
        const second_prize_1 = max3D
          .find("tr")
          .eq(3)
          .find("td")
          .eq(1)
          .find("b")
          .eq(0)
          .text()
          .split(" ")[0];
        const second_prize_2 = max3D
          .find("tr")
          .eq(3)
          .find("td")
          .eq(1)
          .find("b")
          .eq(1)
          .text()
          .split(" ")[0];
        const second_prize_3 = max3D
          .find("tr")
          .eq(3)
          .find("td")
          .eq(1)
          .find("b")
          .eq(0)
          .text()
          .split(" ")[1];
        const second_prize_4 = max3D
          .find("tr")
          .eq(3)
          .find("td")
          .eq(1)
          .find("b")
          .eq(1)
          .text()
          .split(" ")[1];
        const third_prize_1 = max3D
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("b")
          .eq(0)
          .text()
          .split(" ")[0];
        const third_prize_2 = max3D
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("b")
          .eq(1)
          .text()
          .split(" ")[0];
        const third_prize_3 = max3D
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("b")
          .eq(2)
          .text()
          .split(" ")[0];
        const third_prize_4 = max3D
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("b")
          .eq(0)
          .text()
          .split(" ")[1];
        const third_prize_5 = max3D
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("b")
          .eq(1)
          .text()
          .split(" ")[1];
        const third_prize_6 = max3D
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("b")
          .eq(2)
          .text()
          .split(" ")[1];
        const resultsConsolation1 = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(0)
          .text()
          .split(" ")[0];
        const resultsConsolation2 = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(1)
          .text()
          .split(" ")[0];
        const resultsConsolation3 = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(2)
          .text()
          .split(" ")[0];
        const resultsConsolation4 = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(3)
          .text()
          .split(" ")[0];
        const resultsConsolation5 = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(0)
          .text()
          .split(" ")[1];
        const resultsConsolation6 = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(1)
          .text()
          .split(" ")[1];
        const resultsConsolation7 = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(2)
          .text()
          .split(" ")[1];
        const resultsConsolation8 = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(3)
          .text()
          .split(" ")[1];
        const firstPrizeWinner = max3D
          .find("tr")
          .eq(2)
          .find("td")
          .eq(0)
          .find("em")
          .text();
        const secondPrizeWinner = max3D
          .find("tr")
          .eq(3)
          .find("td")
          .eq(0)
          .find("em")
          .text();
        const thirdPrizeWinner = max3D
          .find("tr")
          .eq(4)
          .find("td")
          .eq(0)
          .find("em")
          .text();
        const fourthWinner = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(0)
          .find("em")
          .text();
        const firstPrize = max3D
          .find("tr")
          .eq(2)
          .find("td")
          .eq(0)
          .find("span")
          .eq(1)
          .text();
        const secondPrize = max3D
          .find("tr")
          .eq(3)
          .find("td")
          .eq(0)
          .find("span")
          .eq(1)
          .text();
        const thirdPrize = max3D
          .find("tr")
          .eq(4)
          .find("td")
          .eq(0)
          .find("span")
          .eq(1)
          .text();
        const fourthPrize = max3D
          .find("tr")
          .eq(5)
          .find("td")
          .eq(0)
          .find("span")
          .eq(1)
          .text();
        saveDBMax3d({
          idKy: ky_mo_thuong,
          dayPrize: ngay_xo,
          firstPrize1: first_prize_1,
          firstPrize2: first_prize_2,
          secondPrize1: second_prize_1,
          secondPrize2: second_prize_2,
          secondPrize3: second_prize_3,
          secondPrize4: second_prize_4,
          thirdPrize1: third_prize_1,
          thirdPrize2: third_prize_2,
          thirdPrize3: third_prize_3,
          thirdPrize4: third_prize_4,
          thirdPrize5: third_prize_5,
          thirdPrize6: third_prize_6,
          resultsConsolation1: resultsConsolation1,
          resultsConsolation2: resultsConsolation2,
          resultsConsolation3: resultsConsolation3,
          resultsConsolation4: resultsConsolation4,
          resultsConsolation5: resultsConsolation5,
          resultsConsolation6: resultsConsolation6,
          resultsConsolation7: resultsConsolation7,
          resultsConsolation8: resultsConsolation8,
          firstTotalWinners: firstPrizeWinner,
          secondTotalWinners: secondPrizeWinner,
          thirdTotalWinners: thirdPrizeWinner,
          consolationTotalWinners: fourthWinner,
          win1StAmount: firstPrize,
          win2StAmount: secondPrize,
          win3StAmount: thirdPrize,
          winConsolationAmount: fourthPrize,
        });
        return {
          isSuccessed: true,
        };
      }
    }
  });
}

async function crawlDataMax3DPro(date) {
  var ngayXo = date;
  url = `https://xskt.com.vn/xsmax3dpro/ngay-${ngayXo}`;
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, { decodeEntities: false });
      var title = $(".box-ketqua");
      const max3DPro = title.find(".max3d");

      const ky_mo_thuong = max3DPro
        .find("tr")
        .eq(0)
        .find(".kmt")
        .find("a")
        .text();
      if (ky_mo_thuong) {
        const specialPrize = max3DPro
          .find("tr")
          .eq(1)
          .find("td")
          .eq(1)
          .text()
          .split(" ");
        const specialPrizeWinners = max3DPro
          .find("tr")
          .eq(1)
          .find("td")
          .eq(2)
          .text();
        const specialPrize1 = specialPrize[0];
        const specialPrize2 = specialPrize[1];
        const subSpecialPrize = max3DPro
          .find("tr")
          .eq(2)
          .find("td")
          .eq(1)
          .text()
          .split(" ");
        const subSpecialPrizeWinners = max3DPro
          .find("tr")
          .eq(2)
          .find("td")
          .eq(2)
          .text();
        const subSpecialPrize1 = subSpecialPrize[0];
        const subSpecialPrize2 = subSpecialPrize[1];
        const firstPrizeColumn1 = max3DPro
          .find("tr")
          .eq(3)
          .find("td")
          .eq(1)
          .find("b")
          .eq(0)
          .text()
          .split(" ");
        const firstPrizeColumn2 = max3DPro
          .find("tr")
          .eq(3)
          .find("td")
          .eq(1)
          .find("b")
          .eq(1)
          .text()
          .split(" ");
        const firstPrizeWinners = max3DPro
          .find("tr")
          .eq(3)
          .find("td")
          .eq(2)
          .text();
        const firstPrize1 = firstPrizeColumn1[0];
        const firstPrize2 = firstPrizeColumn1[1];
        const firstPrize3 = firstPrizeColumn2[0];
        const firstPrize4 = firstPrizeColumn2[1];
        const secondPrizeColumn1 = max3DPro
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("b")
          .eq(0)
          .text()
          .split(" ");
        const secondPrizeColumn2 = max3DPro
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("b")
          .eq(1)
          .text()
          .split(" ");
        const secondPrizeColumn3 = max3DPro
          .find("tr")
          .eq(4)
          .find("td")
          .eq(1)
          .find("b")
          .eq(2)
          .text()
          .split(" ");
        const secondPrizeWinner = max3DPro
          .find("tr")
          .eq(4)
          .find("td")
          .eq(2)
          .text();
        const secondPrize1 = secondPrizeColumn1[0];
        const secondPrize2 = secondPrizeColumn1[1];
        const secondPrize3 = secondPrizeColumn2[0];
        const secondPrize4 = secondPrizeColumn2[1];
        const secondPrize5 = secondPrizeColumn3[0];
        const secondPrize6 = secondPrizeColumn3[1];
        const thirdPrizeColumn1 = max3DPro
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(0)
          .text()
          .split(" ");
        const thirdPrizeColumn2 = max3DPro
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(1)
          .text()
          .split(" ");
        const thirdPrizeColumn3 = max3DPro
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(2)
          .text()
          .split(" ");
        const thirdPrizeColumn4 = max3DPro
          .find("tr")
          .eq(5)
          .find("td")
          .eq(1)
          .find("b")
          .eq(3)
          .text()
          .split(" ");
        const thirdPrizeWinners = max3DPro
          .find("tr")
          .eq(5)
          .find("td")
          .eq(2)
          .text();
        const thirdPrize1 = thirdPrizeColumn1[0];
        const thirdPrize2 = thirdPrizeColumn1[1];
        const thirdPrize3 = thirdPrizeColumn2[0];
        const thirdPrize4 = thirdPrizeColumn2[1];
        const thirdPrize5 = thirdPrizeColumn3[0];
        const thirdPrize6 = thirdPrizeColumn3[1];
        const thirdPrize7 = thirdPrizeColumn4[0];
        const thirdPrize8 = thirdPrizeColumn4[1];
        const item = {
          dayPrize: ngayXo,
          specialPrizeWinners: specialPrizeWinners,
          specialPrize1: specialPrize1,
          specialPrize2: specialPrize2,
          subSpecialPrizeWinners: subSpecialPrizeWinners,
          subSpecialPrize1: subSpecialPrize1,
          subSpecialPrize2: subSpecialPrize2,
          firstPrizeWinners: firstPrizeWinners,
          firstPrize1: firstPrize1,
          firstPrize2: firstPrize2,
          firstPrize3: firstPrize3,
          firstPrize4: firstPrize4,
          secondPrizeWinners: secondPrizeWinner,
          secondPrize1: secondPrize1,
          secondPrize2: secondPrize2,
          secondPrize3: secondPrize3,
          secondPrize4: secondPrize4,
          secondPrize5: secondPrize5,
          secondPrize6: secondPrize6,
          thirdPrizeWinners: thirdPrizeWinners,
          thirdPrize1: thirdPrize1,
          thirdPrize2: thirdPrize2,
          thirdPrize3: thirdPrize3,
          thirdPrize4: thirdPrize4,
          thirdPrize5: thirdPrize5,
          thirdPrize6: thirdPrize6,
          thirdPrize7: thirdPrize7,
          thirdPrize8: thirdPrize8,
          idKy: ky_mo_thuong,
        };

        saveDBMax3dPro(item);
      }
    }
  });
}

async function crawlDataMega645(date) {
  var ngayXo = date;
  url = `https://xskt.com.vn/ngay/${ngayXo}.html`;
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, { decodeEntities: false });
      var title = $(".box-ketqua");
      var html_ngay_xo = title
        .find("h2 a:nth-child(2)")
        .eq(0)
        .html()
        ?.split(" ");
      var ngay_xo = moment(html_ngay_xo[2], "DD/MM").format("DD-MM-YYYY");
      var mega645 = title.find(".result");

      var ky_mo_thuong = mega645.find("tr").eq(12).text().split(": ")[1];
      var ket_qua = mega645.find("tr").eq(13).find("td").eq(1).text();
      var trunggiai = title.find(".trunggiai");
      var jackpot = trunggiai
        .find("tr")
        .eq(2)
        .find("td:last-child")
        .eq(0)
        .html();
      var jackpotWinner = trunggiai
        .find("tr")
        .eq(2)
        .find("td:nth-child(3) b")
        .eq(0)
        .html();
      var match5 = trunggiai
        .find("tr")
        .eq(3)
        .find("td:last-child")
        .eq(0)
        .html();
      var match5Winner = trunggiai
        .find("tr")
        .eq(3)
        .find("td:nth-child(3) b")
        .eq(0)
        .html();
      var match4 = trunggiai
        .find("tr")
        .eq(4)
        .find("td:last-child")
        .eq(0)
        .html();
      var match4Winner = trunggiai
        .find("tr")
        .eq(4)
        .find("td:nth-child(3) b")
        .eq(0)
        .html();
      var match3 = trunggiai
        .find("tr")
        .eq(5)
        .find("td:last-child")
        .eq(0)
        .html();
      var match3Winner = trunggiai
        .find("tr")
        .eq(5)
        .find("td:nth-child(3) b")
        .eq(0)
        .html();
      var dataResult = {
        ket_qua: ket_qua,
        jackpot: jackpot,
        jackpotWinner: jackpotWinner,
        match5: match5,
        match5Winner: match5Winner,
        match4: match4,
        match4Winner: match4Winner,
        match3: match3,
        match3Winner: match3Winner,
        dayPrize: ngay_xo,
        idKy: ky_mo_thuong,
      };

      saveDBMega(dataResult);
      return {
        isSuccessed: true,
      };
    }
  });
}

async function crawlDataPower655(date) {
  var ngayXo = date;
  url = `https://xskt.com.vn/xspower/ngay-${ngayXo}`;
  request(url, function (error, response, html) {
    if (!error) {
      var $ = cheerio.load(html, { decodeEntities: false });
      var title = $(".box-ketqua");
      const ky_mo_thuong = title.find(".kmt").text();
      if (ky_mo_thuong) {
        const result = title
          .find(".result")
          .find(".megaresult")
          .eq(0)
          .text()
          .split(" ");
        const jp2Number = title
          .find(".result")
          .find(".megaresult")
          .eq(1)
          .text();
        const number1 = result[0];
        const number2 = result[1];
        const number3 = result[2];
        const number4 = result[3];
        const number5 = result[4];
        const number6 = result[5];
        const number7 = jp2Number;
        const winPrice = title.find(".trunggiai");
        const jp = winPrice.find("tr").eq(2).find("td").eq(3).text();
        const jpWinner = winPrice.find("tr").eq(2).find("td").eq(2).text();
        const jp2 = winPrice.find("tr").eq(3).find("td").eq(3).text();
        const jp2Winner = winPrice.find("tr").eq(3).find("td").eq(2).text();
        const g1 = winPrice.find("tr").eq(4).find("td").eq(3).text();
        const g1Winner = winPrice.find("tr").eq(4).find("td").eq(2).text();
        const g2 = winPrice.find("tr").eq(5).find("td").eq(3).text();
        const g2Winner = winPrice.find("tr").eq(5).find("td").eq(2).text();
        const g3 = winPrice.find("tr").eq(6).find("td").eq(3).text();
        const g3Winner = winPrice.find("tr").eq(6).find("td").eq(2).text();

        const item = {
          dayPrize: ngayXo,
          number1: number1,
          number2: number2,
          number3: number3,
          number4: number4,
          number5: number5,
          number6: number6,
          number7: number7,
          jackpot1: jp,
          jackpot2: jp2,
          match3: g1,
          match4: g2,
          match5: g3,
          jackpotWinner: jpWinner,
          jackpot2Winner: jp2Winner,
          match3Winner: g1Winner,
          match4Winner: g2Winner,
          match5Winner: g3Winner,
          idKy: ky_mo_thuong,
        };

        saveDBPower655(item);
      }
    }
  });
}
