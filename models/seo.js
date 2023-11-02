const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const seoSchema = new mongoose.Schema(
  {
    domain: {
      type: ObjectId,
      ref: "Domain",
    },
    link: {
      type: String,
      required: true,
    },
    tags: [
      {
        id: {
          type: String,
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Seo = mongoose.model("Seo", seoSchema);

module.exports = Seo;
