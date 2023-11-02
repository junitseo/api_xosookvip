const mongoose = require("mongoose");

const Information = mongoose.Schema({
  webName: {
    type: String,
  },
  webUrl: {
    type: String,
  },
  address: {
    type: String,
  },
  facebook: {
    type: String,
  },
  youtube: {
    type: String,
  },
  telegram: {
    type: String,
  },
  skype: {
    type: String,
  },
  twitter: {
    type: String,
  },
  tiktok: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  zalo: {
    type: String,
  },
  companyName: {
    type: String,
  },
  email: {
    type: String,
  },
  contact: {
    type: String,
  },
  information: {
    type: String,
  },
  key: {
    type: String,
    default: "information",
  },
});

module.exports = mongoose.model("informations", Information);
