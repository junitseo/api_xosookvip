const kqxsRouter = require("./kqxs");
const categoriesRouter = require("./categories");
const lotoPredictionRouter = require("./lotoPrediction");
const lotoStatisticRouter = require("./lotoStatistics");
const max4Drouter = require("./max4D");
const mega645router = require("./mega645");
const power655router = require("./power655");
const provinceRouter = require("./provinces");
const vietlottRouter = require("./vietlott");
const max3DRouter = require("./max3d");
const postRouter = require("./posts");
const dreamRouter = require("./dream");
const taxRouter = require("./tax");
const max3dproRouter = require("./max3dPro");
const statisticRouter = require("./statistic");
const userRouter = require("./user");
const rolesRouter = require("./role");
const permissionRouter = require("./permission");
const schemaRouter = require("./schema");
const pageRouter = require("./page");
const homeBannerRouter = require("./homeBanner");
const informationRouter = require("./information");
const seoRouter = require("./seo.router");

module.exports = (app) => {
  app.use("/api/v1/categories", categoriesRouter);
  app.use("/lotoPredictions", lotoPredictionRouter);
  app.use("/LotoStatistics", lotoStatisticRouter);
  app.use("/api/v1/max4d", max4Drouter);
  app.use("/api/v1/mega645", mega645router);
  app.use("/api/v1/power655", power655router);
  app.use("/api/v1/provinces", provinceRouter);
  app.use("/api/v1/vietlott", vietlottRouter);
  app.use("/api/v1/kqxs", kqxsRouter);
  app.use("/api/v1/max3d", max3DRouter);
  app.use("/api/v1/posts", postRouter);
  app.use("/api/v1/dream", dreamRouter);
  app.use("/api/v1/taxonomy", taxRouter);
  app.use("/api/v1/max3dpro", max3dproRouter);
  app.use("/api/v1/max4d", max4Drouter);
  app.use("/api/v1/statistic", statisticRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/roles", rolesRouter);
  app.use("/api/v1/permission", permissionRouter);
  app.use("/api/v1/schemas", schemaRouter);
  app.use("/api/v1/pages", pageRouter);
  app.use("/api/v1/home-banner", homeBannerRouter);
  app.use("/api/v1/information", informationRouter);
  app.use("/api/v1/seo", seoRouter);
};