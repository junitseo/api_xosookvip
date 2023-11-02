const { uploadFile } = require("../helpers/minio");
const HomeBanner = require("../models/HomeBanner");

class HomeBannerController {
  async uploadBanner(req, res) {
    console.log(req.files);
    try {
      if (req.files?.bannerLeft) {
        const uploadBannerLeft = await uploadFile(req.files.bannerLeft);
        req.body.bannerLeft = uploadBannerLeft.filename;
      }

      if (req.files?.bannerRight1) {
        const uploadBannerRight1 = await uploadFile(req.files.bannerRight1);
        console.log(uploadBannerRight1);
        req.body.bannerRight1 = uploadBannerRight1.filename;
      }

      if (req.files?.bannerTopCenter) {
        const uploadBannerRight2 = await uploadFile(req.files.bannerTopCenter);
        req.body.bannerTopCenter = uploadBannerRight2.filename;
      }

      if (req.files?.bannerBottomCenter) {
        const uploadBannerRight2 = await uploadFile(
          req.files.bannerBottomCenter
        );
        req.body.bannerBottomCenter = uploadBannerRight2.filename;
      }

      const bannerLeft =
        req.body.bannerLeft != "undefined" ? req.body.bannerLeft : "";
      const bannerRight1 =
        req.body.bannerRight1 != "undefined" ? req.body.bannerRight1 : "";
      const bannerRight2 =
        req.body.bannerRight2 != "undefined" ? req.body.bannerRight2 : "";
      const bannerTopCenter =
        req.body.bannerTopCenter != "undefined" ? req.body.bannerTopCenter : "";
      const bannerBottomCenter =
        req.body.bannerBottomCenter != "undefined"
          ? req.body.bannerBottomCenter
          : "";
      const linkBannerLeft = req.body.linkBannerLeft;
      const linkBannerRight1 = req.body.linkBannerRight1;
      const linkBannerRight2 = req.body.linkBannerRight2;
      const linkBannerTopCenter = req.body.linkBannerTopCenter;
      const linkBannerBottomCenter = req.body.linkBannerBottomCenter;

      const banner = await HomeBanner.find({});

      if (banner.length > 0) {
        const update = await HomeBanner.findByIdAndUpdate(banner[0]?._id, {
          bannerLeft: bannerLeft,
          bannerRight1: bannerRight1,
          bannerRight2: bannerRight2,
          bannerTopCenter,
          bannerBottomCenter,
          linkBannerRight1,
          linkBannerRight2,
          linkBannerLeft,
          linkBannerTopCenter,
          linkBannerBottomCenter,
        });

        return res.status(200).json({ status: 1, message: "Success" });
      }

      const newBanner = await HomeBanner.create({
        bannerLeft: bannerLeft,
        bannerRight1: bannerRight1,
        bannerRight2: bannerRight2,
        bannerTopCenter,
        bannerBottomCenter,
        linkBannerRight1,
        linkBannerRight2,
        linkBannerLeft,
        linkBannerTopCenter,
        linkBannerBottomCenter,
      });

      return res.status(200).json({ message: "Success", status: 1 });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Upload Failed", status: -1 });
    }
  }

  async getBanner(req, res) {
    try {
      const banner = await HomeBanner.find();
      console.log(banner);

      if (banner)
        return res
          .status(200)
          .json({ message: "Success", status: 1, banner: banner[0] });
      else
        return res
          .status(200)
          .json({ message: "Success", status: 1, banner: {} });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error", status: -1 });
    }
  }
}

module.exports = new HomeBannerController();
