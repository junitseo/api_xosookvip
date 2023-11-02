const Seo = require("../models/seo");

const getAllSeo = async (req, res) => {
  try {
    const pageSize = req.query.pageSize || 10;
    const pageIndex = req.query.pageIndex || 1;
    const search = req.query.search || "";

    let searchObj = {};

    if (search) {
      searchObj = {
        title: { $regex: ".*" + search + ".*" },
      };
    }

    let data = await Seo.find(searchObj)
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize)
      .sort({
        createdAt: "desc",
      });

    let count = await Seo.find(searchObj).countDocuments();
    let totalPages = Math.ceil(count / pageSize);

    return res.status(200).json({ status: 1, totalPages, count, data });
  } catch (error) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

const create = async (req, res) => {
  try {
    let seo = new Seo(req.body);

    seo.save((err, result) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const response = { status: 1, result };

      return res.status(200).json(response);
    });
  } catch (error) {
    if (error) return res.status(400).json({ message: error.message });
  }
};

const deleteSeo = (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      Seo.findByIdAndDelete(id).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        res.json({
          message: "Seo deleted successfully",
        });
      });
    } else {
      return res.status(400).json({
        message: "error not slug",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const getSeoByLink = async (req, res) => {
  const { link } = req.query;
  if (link) {
    try {
      let searchObj = {
        link,
      };

      let data = {};

      data = await Seo.findOne(searchObj);
      let response = { status: 0, data };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Lỗi server!" });
    }
  } else {
    let response = { status: 0, message: "Không tìm thấy Id!" };
    res.status(404).json(response);
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      const data = await Seo.findByIdAndUpdate(id, req.body);
      let response = { status: 1, data, success: true };
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ message: "Lỗi server!" });
    }
  } else {
    let response = { status: 0, message: "Không tìm thấy Id!" };
    return res.status(404).json(response);
  }
};

module.exports = {
  create,
  getAllSeo,
  deleteSeo,
  update,
  getSeoByLink,
};
