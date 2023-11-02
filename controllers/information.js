const informationModel = require("../models/information");

class Information {
  async updateInformation(req, res) {
    try {
      const webName = req.body.webName;
      const address = req.body.address;
      const facebook = req.body.facebook;
      const youtube = req.body.youtube;
      const companyName = req.body.companyName;
      const email = req.body.email;
      const contact = req.body.contact;
      const information = req.body.information;
      const webUrl = req.body.webUrl;
      const linkedin = req.body.linkedin;
      const zalo = req.body.zalo;
      const twitter = req.body.twitter;
      const skype = req.body.skype;
      const telegram = req.body.telegram;
      const tiktok = req.body.tiktok;

      const checkExist = await informationModel.findOne({
        key: "information",
      });

      if (!checkExist) {
        const createInformation = await informationModel.create({
          webName,
          address,
          facebook,
          youtube,
          companyName,
          email,
          contact,
          information,
          webUrl,
          zalo,
          twitter,
          skype,
          telegram,
          linkedin,
          tiktok,
        });

        return res.status(200).json({ information: createInformation });
      }

      const updateInformation = await informationModel.updateOne(
        { key: "information" },
        {
          webName,
          address,
          facebook,
          youtube,
          companyName,
          email,
          contact,
          information,
          webUrl,
          zalo,
          twitter,
          skype,
          telegram,
          linkedin,
          tiktok,
        },
        { new: true }
      );

      return res.status(200).json({ information: updateInformation });
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async getInformation(req, res) {
    try {
      const information = await informationModel.findOne({
        key: "information",
      });

      return res.status(200).json({ information });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

module.exports = new Information();
