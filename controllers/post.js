const Post = require("../models/post.js");
const slugHandler = require("../helpers/slugHandler");
const Taxonomy = require("../models/taxonomy.js");
const mongoose = require("mongoose");
const generatePostContent = require("../helpers/generatePostContent.js");
const getProviceXsmn = require("../helpers/getProviceXsmn.js");
const getProvinceXsmt = require("../helpers/getProvinceXsmt.js");
const moment = require("moment");
const convertToSlug = require("../helpers/convertToSlug.js");
const config = require("../config");
const Jimp = require("jimp");
const reverseDate = require("../helpers/reverseDate.js");
const NodeCache = require("node-cache");
const kqxsCache = new NodeCache({ stdTTL: 3600 });

exports.autoCreatePost = async (province = 1) => {
  try {
    const toDay = moment().format("YYYY/MM/DD");
    const toDayDash = moment().format("DD-MM-YYYY");
    const image = await textOverlay(province, toDayDash);

    let post_title = "";
    let post_description = "";
    let post_content = "";
    let post_image = image;
    let post_src_thumb = image;
    let post_tags = []
    let focus_keyword = []

    if (province === 1) {
      post_title = `Soi cầu dự đoán Xổ Số Miền Bắc ngày ${moment().format(
        "DD-MM-YYYY"
      )} - Dự đoán XSMB ${moment().format("DD/MM")}`;
      post_tags = ["xổ số miền Bắc", `Xổ Số Miền Bắc ngày ${moment().format(
        "DD-MM-YYYY"
      )}`]

      focus_keyword = [
        {
          id: 1,
          name: "xổ số miền Bắc"
        },
        {
          id: 2,
          name: `Xổ Số Miền Bắc ngày ${moment().format(
            "DD-MM-YYYY"
          )}`
        }
      ]

      post_description = `Dự đoán XSMB ${moment().format(
        "DD/MM"
      )} - Soi cầu dự đoán xổ số miền Bắc ngày${moment().format(
        "DD-MM-YYYY"
      )} do cao thủ chốt số đưa ra siêu chuẩn, miễn phí ❤️ Dự đoán lô tô, giải đặc biệt MB ngày  ${moment().format(
        "DD/MM"
      )}`;

      post_content = generatePostContent(1, [1]);
    } else if (province == 2) {
      const provincesInDay = getProvinceXsmt(toDay);

      post_title = `Soi cầu dự đoán Xổ Số Miền Trung ngày ${moment().format(
        "DD-MM-YYYY"
      )} - Dự đoán XSMT ${moment().format("DD/MM")}`;

      post_description = `Dự đoán XSMT ${moment().format(
        "DD/MM"
      )} - Soi cầu dự đoán xổ số miền Trung ngày${moment().format(
        "DD-MM-YYYY"
      )} do cao thủ chốt số đưa ra siêu chuẩn, miễn phí ❤️ Dự đoán lô tô, giải đặc biệt MT ngày  ${moment().format(
        "DD/MM"
      )}`;
      post_tags = ["xổ số miền Trung", `Xổ Số Miền Trung ngày ${moment().format(
        "DD-MM-YYYY"
      )}`]

      focus_keyword = [
        {
          id: 1,
          name: "xổ số miền Trung"
        },
        {
          id: 2,
          name: `Xổ Số Miền Trung ngày ${moment().format(
            "DD-MM-YYYY"
          )}`
        }
      ]

      post_content = generatePostContent(2, provincesInDay);
    } else {
      const provincesInDay = getProviceXsmn(toDay);
      post_title = `Soi cầu dự đoán Xổ Số Miền Nam ngày ${moment().format(
        "DD-MM-YYYY"
      )} - Dự đoán XSMN ${moment().format("DD/MM")}`;

      post_description = `Dự đoán XSMN ${moment().format(
        "DD/MM"
      )} - Soi cầu dự đoán xổ số miền Nam ngày${moment().format(
        "DD-MM-YYYY"
      )} do cao thủ chốt số đưa ra siêu chuẩn, miễn phí ❤️ Dự đoán lô tô, giải đặc biệt MN ngày  ${moment().format(
        "DD/MM"
      )}`;

      post_tags = ["xổ số miền Trung", `Xổ Số Miền Trung ngày ${moment().format(
        "DD-MM-YYYY"
      )}`]

      focus_keyword = [
        {
          id: 1,
          name: "xổ số miền Bắc"
        },
        {
          id: 2,
          name: `Xổ Số Miền Bắc ngày ${moment().format(
            "DD-MM-YYYY"
          )}`
        }
      ]

      post_content = generatePostContent(3, provincesInDay);
    }

    const post = await Post.create({
      post_title,
      post_src_thumb,
      post_image,
      post_description,
      post_content,
      post_taxid: ["647ae661bc84c248d38b09b9"],
      post_status: "public",
      post_slug: convertToSlug(post_title),
      focus_keyword,
      post_tags
    });

    console.log("Create Post Success");
  } catch (error) {
    console.log(error);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = kqxsCache.get("home-posts");

    if (!posts) {
      const tax = await Taxonomy.findOne({
        $or: [{ tax_slug: "du-doan" }, { tax_slug: "thong-tin" }],
      });
      const result = await Post.aggregate([
        {
          $match: {
            post_status: "public",
            post_taxid: new mongoose.Types.ObjectId(tax?._id),
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },

        {
          $limit: 5,
        },
        {
          $project: {
            id: 1,
            post_title: 1,
            post_slug: 1,
          },
        },
      ]).allowDiskUse();
      kqxsCache.set("home-posts", JSON.stringify(result));
      return res.status(200).json({ posts: result });
    }

    return res.status(200).json({ posts: JSON.parse(posts) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.getAllPublicPost = async (req, res) => {
  try {
    Post.find({ post_status: "public" })
      .sort({ updatedAt: -1 })
      .select("id post_title post_slug createdAt updatedAt")
      .allowDiskUse(true)
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        return res.json(data);
      });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.getPostByTaxId = async (req, res) => {
  const tax_id = req.query.tax ? req.query.tax : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  var query = { post_taxid: tax_id };
  let exclude = {};

  if (post_id) {
    exclude = {
      _id: {
        $ne: post_id,
      },
    };
  }
  if (tax_id != "undefined" && tax_id) {
    Post.find({ ...query, ...exclude })
      .sort({ updatedAt: -1 })
      .skip(skip * limit)
      .limit(limit)
      .select(
        "id post_type post_title post_image post_slug post_description post_status post_tax"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        Post.countDocuments(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            total: count,
            skip: skip,
            pageSize: data.length,
            datas: data,
          });
        });
      });
  } else {
    return res.json({
      total: 0,
      skip: skip,
      pageSize: 1,
      datas: [],
    });
  }
};
exports.getPostBySlug = async (req, res) => {
  // console.log(`quyquy`);
  const slug = req.params.slug ? req.params.slug : null;
  // console.log(slug);
  if (slug) {
    Post.findOne({ post_slug: slug })
      .select(
        "id post_type post_title post_views post_status post_userid post_image post_content post_slug post_description post_schemaid post_taxid post_tags focus_keyword post_src_thumb "
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        if (data) {
          res.json(data);
        } else {
          data = [];
          return res.json(data);
        }
      });
  } else {
    return res.status(400).json({
      message: "error not slug",
    });
  }
};
exports.getAllSlug = async (req, res) => {
  try {
    const result = await Post.find().select("id post_slug").allowDiskUse(true);
    if (!result) {
      return res.status(200).json({ message: "There is not any posts" });
    }
    let duplicateItem = [];
    let uniqueItem = [];

    for (let i = 0; i < result.length - 1; i++) {
      let flag = false;
      for (let j = i + 1; j < result.length; j++) {
        if (result[i].post_slug == result[j].post_slug) {
          duplicateItem.push(result[i]);
          flag = true;
        }
      }
      if (!flag) {
        uniqueItem.push(result[i]?.post_slug);
      }
    }

    if (duplicateItem.length == 0) {
      const returnData = result.map((item) => item.post_slug);
      return res.status(200).json(returnData);
    }

    let returnDuplicateItem = [];

    await Promise.all(
      duplicateItem.map(async (item) => {
        let newSlug = item.post_slug + "-" + item._id;

        await Post.findByIdAndUpdate(item._id, {
          post_slug: item.post_slug + "-" + item.id,
        });
        returnDuplicateItem.push(newSlug);
      })
    );
    return res.status(200).json(returnDuplicateItem.concat(uniqueItem));
    // return res.status(200).json({message: 'Checked', slug: slug})
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.filterAndUpdateSlug = async (req, res) => {
  try {
    const result = await Post.find()
      .select("id post_slug status")
      .allowDiskUse(true);
    let wrongItem = [];
    let arrayNeedToUpdate = [];
    result.map((item) => {
      if (item.post_slug.includes(item._id)) {
        const slug = item.post_slug.replace(`${item._id}`, "");
        wrongItem.push(slug);
        arrayNeedToUpdate.push({
          post_slug: slug,
          _id: item._id,
        });
      }
    });
    await Post.deleteMany({ status: "draft", post_slug: wrongItem });
    await Promise.all(
      arrayNeedToUpdate.map(async (item) => {
        await Post.findByIdAndUpdate(item._id, {
          post_slug: item.post_slug,
        });
      })
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

exports.create = (req, res) => {
  // console.log(`quyquy`, req.body.post_image);
  const {
    post_type,
    post_title,
    post_taxid,
    post_views,
    post_status,
    post_tags,
    post_userid,
    post_image,
    post_content,
    post_slug,
    post_description,
    post_schemaid,
    keyword,
    post_src_thumb,
  } = req.body;

  // console.log("keyword: ", keyword);
  if (!post_title || !post_title.length) {
    return res.status(400).json({
      error: "Title is required",
    });
  }
  if (!post_content || !post_content.length) {
    return res.status(400).json({
      error: "Content is too short",
    });
  }
  if (!post_taxid || post_taxid.length == 0) {
    return res.status(400).json({
      error: "At least one tax is required",
    });
  }
  if (!post_description || !post_description.length) {
    return res.status(400).json({
      error: "Description is required",
    });
  }
  // if(!post_image || !post_image.length){
  //     dashLogger.error(`Error : Image is required, Request : ${req.originalUrl}`);
  //     return res.status(400).json({
  //         error: 'Image is required'
  //     })
  // }

  let post = new Post();
  post.post_type = post_type;
  post.post_title = post_title;
  post.post_views = post_views ? parseInt(post_views) : 0;
  post.post_status = post_status;
  // post.post_tags = post_tags;
  post.post_content = post_content;
  post.post_description = post_description;
  post.post_image = !post_image || !post_image.length ? "" : post_image;
  post.post_src_thumb = post_src_thumb;

  post.post_userid = post_userid;
  post.focus_keyword = keyword;
  if (!post_slug && !post_slug.length) {
    post.post_slug = slugHandler.slugify(post_title).toLowerCase();
  } else {
    post.post_slug = post_slug.toLowerCase();
  }
  // let arrayOfTax = post_taxid && post_taxid.split(",");
  let arrayOfSchema = post_schemaid && post_schemaid.toString().split(",");
  // let arrayOfTags = post_tags && post_tags.split(",");
  // console.log("arrayOfTags: ", arrayOfTags);
  post.save((err, result) => {
    if (err) {
      console.log(`error`, err);
      return res.status(400).json({
        message: err.message,
      });
    }
    if (keyword) {
      Post.findByIdAndUpdate(
        result._id,
        {
          $push: { keyword: keyword },
        },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
      });
    }
    if (post_tags) {
      Post.findByIdAndUpdate(
        result._id,
        {
          $push: { post_tags: post_tags },
        },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
      });
    }
    if (post_taxid) {
      Post.findByIdAndUpdate(
        result._id,
        {
          $push: { post_taxid: post_taxid },
        },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        } else {
          Post.findByIdAndUpdate(
            result._id,
            {
              $push: { post_schemaid: arrayOfSchema },
            },
            { new: true }
          ).exec((err, result) => {
            res.json(result);
          });
        }
      });
    }
  });
};

exports.update = async (req, res) => {
  // console.log(`quy`, req.body);
  const id = req.params.id ? req.params.id : null;
  // console.log("id: ", id);
  if (id) {
    Post.findById(id).exec((err, oldPost) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

      const {
        post_title,
        post_taxid,
        post_views,
        post_status,
        post_tags,
        post_userid,
        post_image,
        post_content,
        post_slug,
        post_description,
        post_schemaid,
        keyword,
        post_src_thumb,
      } = req.body;

      if (!post_title || !post_title.length) {
        return res.status(400).json({
          error: "Title is required",
        });
      }
      if (!post_content || !post_content.length) {
        return res.status(400).json({
          error: "Content is required",
        });
      }
      if (!post_taxid || post_taxid.length == 0) {
        return res.status(400).json({
          error: "At least one tax is required",
        });
      }
      if (!post_description || !post_description.length) {
        return res.status(400).json({
          error: "Description is required",
        });
      }
      // if(!post_image || !post_image.length){
      //     dashLogger.error(`Error : Image is required, Request : ${req.originalUrl}`);
      //     return res.status(400).json({
      //         error: 'Image is required'
      //     })
      // }
      // oldPost.post_taxid = post_taxid && post_taxid.split(",");
      // oldPost.post_schemaid =
      //   post_schemaid && post_schemaid != "" ? post_schemaid.split(",") : [];
      oldPost.post_taxid = post_taxid;

      oldPost.post_title = post_title;
      oldPost.post_image = !post_image || !post_image.length ? "" : post_image;
      oldPost.post_description = post_description;
      oldPost.post_content = post_content;
      oldPost.post_status = post_status;
      oldPost.post_src_thumb = post_src_thumb;
      oldPost.focus_keyword = keyword;
      oldPost.post_tags = post_tags;
      // oldPost.post_type = post_type || "";
      oldPost.post_userid = post_userid;
      oldPost.post_views = post_views ? parseInt(post_views) : 0;
      if (post_slug && post_slug.length && oldPost.post_slug != post_slug) {
        oldPost.post_slug = post_slug;
      } else {
        oldPost.post_slug = slugHandler.slugify(post_title).toLowerCase();
      }

      oldPost.save((err, result) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        res.json(result);
      });
    });
  } else {
    return res.status(400).json({
      message: "error not id",
    });
  }
};

exports.list = async (req, res) => {
  // console.log(`aaa`, req.query);

  // try {
  //   const resData = await Post.find({});
  //   console.log("resData: ", resData);
  //   return;
  //   return res.status(200).json({ roles: roles });
  // } catch (error) {
  //   console.log(error);
  //   return res.status(500);
  // }

  var limit =
    req.query.limit && req.query.limit !== "undefined"
      ? parseInt(req.query.limit)
      : 10;
  var skip =
    req.query.skip && req.query.skip !== "undefined"
      ? parseInt(req.query.skip)
      : 0;
  var search =
    req.query.search &&
    req.query.search !== "undefined" &&
    req.query.search !== ""
      ? req.query.search
      : null;
  var tax_id =
    req.query.tax_id &&
    req.query.tax_id !== "undefined" &&
    req.query.tax_id !== ""
      ? req.query.tax_id
      : null;
  var status =
    req.query.status &&
    req.query.status !== "undefined" &&
    req.query.status !== ""
      ? req.query.status
      : null;
  var query = {};
  if (search) {
    query.$or = [
      { post_title: { $regex: search, $options: "i" } },
      { post_slug: { $regex: search, $options: "i" } },
      { post_status: { $regex: search, $options: "i" } },
      { post_content: { $regex: search, $options: "i" } },
    ];
  }
  if (tax_id) {
    query.post_taxid = tax_id;
  }
  if (status) {
    query.post_status = status;
  }
  Post.find(query)
    .populate("post_userid")
    .populate("post_taxid")
    .populate("post_schemaid")
    .sort({ updatedAt: -1 })
    .skip(skip * limit)
    .limit(limit)
    .select(
      "id post_type post_title post_views post_status post_userid post_image post_slug post_description post_schemaid post_taxid"
    )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      Post.countDocuments(query).exec((count_error, count) => {
        if (err) {
          return res.json(count_error);
        }
        return res.json({
          total: count,
          skip: skip,
          pageSize: data.length,
          datas: data,
        });
      });
    });
};

exports.listSearch = (req, res) => {
  const search =
    req.query.q && req.query.q !== "" && req.query.q !== "undefined"
      ? req.query.q
      : null;
  var limit =
    req.query.limit && req.query.limit !== "undefined"
      ? parseInt(req.query.limit)
      : 10;
  var skip =
    req.query.skip && req.query.limit !== "undefined"
      ? parseInt(req.query.skip)
      : 0;
  if (search) {
    Post.find(
      {
        $or: [
          { post_title: { $regex: search, $options: "i" } },
          { post_slug: { $regex: search, $options: "i" } },
          { post_status: { $regex: search, $options: "i" } },
          { post_content: { $regex: search, $options: "i" } },
        ],
      },
      (err, posts) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        Post.countDocuments({
          $or: [
            { post_title: { $regex: search, $options: "i" } },
            { post_slug: { $regex: search, $options: "i" } },
            { post_status: { $regex: search, $options: "i" } },
            { post_content: { $regex: search, $options: "i" } },
          ],
        }).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            total: count,
            skip: skip,
            pageSize: posts.length,
            datas: posts,
          });
        });
      }
    )
      .populate("post_userid")
      .populate("post_taxid")
      .populate("post_schemaid")
      .sort({ updatedAt: -1 })
      .allowDiskUse(true)
      .skip(skip * limit)
      .limit(limit)
      .select(
        "id post_type post_title post_views post_status post_userid post_image post_slug post_description post_schemaid post_taxid"
      );
  } else {
    var query = {};
    Post.find(query)
      .populate("post_userid")
      .populate("post_taxid")
      .populate("post_schemaid")
      .sort({ updatedAt: -1 })
      .skip(skip * limit)
      .limit(limit)
      .select(
        "id post_type post_title post_views post_status post_userid post_image post_slug post_description post_schemaid post_taxid"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        Post.countDocuments(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            total: count,
            skip: skip,
            pageSize: data.length,
            datas: data,
          });
        });
      });
  }
};
exports.remove = (req, res) => {
  const slug = req.params.slug ? req.params.slug : null;
  try {
    if (slug) {
      Post.findOneAndRemove({ post_slug: slug }).exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        res.json({
          message: "Post deleted successfully",
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

exports.read = (req, res) => {
  const slug = req.params.slug ? req.params.slug : null;
  if (slug) {
    Post.findOne({ post_slug: slug })
      .populate("post_userid")
      .populate("post_taxid")
      .populate("post_schemaid")
      .select(
        "id post_type post_title post_views post_status post_userid post_image post_content post_slug post_description post_schemaid post_taxid"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        if (data) {
          res.json(data);
        } else {
          data = [];
          return res.json(data);
        }
      });
  } else {
    return res.status(400).json({
      message: "error not slug",
    });
  }
};

exports.listRelated = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 4;
  const { id, post_taxid } = req.body;
  if (id && post_taxid) {
    Post.find({ id: { $ne: id }, post_taxid: { $in: post_taxid } })
      .limit(limit)
      .populate("post_userid")
      .populate("post_taxid")
      .populate("post_schemaid")
      .sort({ updatedAt: -1 })
      .select(
        "id post_type post_title post_views post_status post_userid post_image post_slug post_schemaid post_taxid"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        res.json(data);
      });
  } else {
    return res.status(400).json({
      message: "error not id and post id",
    });
  }
};

exports.filterByStatus = (req, res) => {
  const status = req.params.status ? req.params.status : null;
  if (status) {
    Post.findOne({ post_status: status })
      .populate("post_userid")
      .populate("post_taxid")
      .populate("post_schemaid")
      .sort({ updatedAt: -1 })
      .select(
        "id post_type post_title post_views post_status post_userid post_image post_content post_slug post_description post_schemaid post_taxid"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        if (data) {
          res.json(data);
        } else {
          data = [];
          return res.json(data);
        }
      });
  } else {
    return res.status(400).json({
      message: "status not found",
    });
  }
};

exports.filterByStatusAndSlug = (req, res) => {
  const status = req.query.status ? req.query.status : null;
  const slug = req.query.slug ? req.query.slug : null;
  if (status && slug) {
    Post.findOne({ post_status: status, post_slug: slug })
      .populate("post_userid")
      .populate("post_taxid")
      .populate("post_schemaid")
      .sort({ updatedAt: -1 })
      .select(
        "id post_type post_title post_views post_status post_userid post_image post_content post_slug post_description post_schemaid post_taxid createdAt updatedAt"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        if (data) {
          res.json(data);
        } else {
          data = [];
          return res.json(data);
        }
      });
  } else {
    return res.status(400).json({
      message: "status and slug not found",
    });
  }
};

exports.getPostByTax = (req, res) => {
  // console.log("quyquy");
  // return res.status(200).json({message: 'test'})
  // const taxSlug = req.query.slug ? req.query.slug : null;
  const post_id = req.query.post_id ? req.query.post_id : null;
  const taxSlug = req.query.slug ? req.query.slug : "giai-ma-giac-mo";
  // const postStatus = req.query.status ? req.query.status : null;
  const postStatus = req.query.status ? req.query.status : "public";
  const limit = req.query.limit ? req.query.limit : 10;
  const skip = req.query.pageIndex ? req.query.pageIndex - 1 : 0;
  let exclude = {};

  if (post_id) {
    exclude = {
      _id: {
        $ne: post_id,
      },
    };
  }
  if (taxSlug && postStatus) {
    Taxonomy.findOne({
      // tax_slug: taxSlug
      tax_slug: taxSlug,
    }).exec((err, tax) => {
      if (err) {
        return res.status(400).json({
          error: "Taxonomy not found",
        });
      }
      if (tax) {
        Post.find({ post_taxid: tax.id, post_status: postStatus, ...exclude })
          .populate("post_userid")
          .populate("post_taxid")
          .populate("post_schemaid")
          .sort({ updatedAt: -1 })
          .skip(skip * limit)
          .limit(limit)
          .select(
            "id post_type post_title post_views post_status post_userid post_image post_slug post_description post_schemaid post_taxid post_src_thumb"
          )
          .exec(async (err, data) => {
            const count = await Post.find({
              post_taxid: tax.id,
              post_status: postStatus,
            }).countDocuments();
            if (err) {
              return res.status(400).json({
                error: "Post not found",
              });
            }
            return res.status(200).json({
              posts: data,
              totalDoc: count,
              pageSize: 10,
              pageIndex: skip + 1,
              totalPage: Math.ceil(count / 10),
            });
          });
      } else {
        return res.status(400).json({
          message: "error tax",
        });
      }
    });
  }
};

exports.getAllByLimit = (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 5;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  Post.find({})
    .limit(limit)
    .skip(skip)
    .populate("post_userid")
    .populate("post_taxid")
    .populate("post_schemaid")
    .sort({ updatedAt: -1 })
    .select(
      "id post_type post_title post_views post_status post_userid post_image post_content post_slug post_schemaid post_taxid post_src_thumb"
    )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      res.json(data);
    });
};

exports.getAllByTax = (req, res) => {
  const tax_id = req.query.tax ? req.query.tax : null;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;
  var query = { post_taxid: tax_id };
  if (tax_id) {
    Post.find(query)
      // .populate('post_userid')
      // .populate('post_taxid')
      // .populate('post_schemaid')
      .sort({ updatedAt: -1 })
      .skip(skip * limit)
      .limit(limit)
      .select(
        "id post_type post_title post_image post_slug post_description post_status"
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        Post.countDocuments(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            total: count,
            skip: skip,
            pageSize: data.length,
            datas: data,
          });
        });
      });
  } else {
    return res.status(400).json({
      message: "Err",
    });
  }
};

exports.getPostByTaxNew = (req, res) => {
  const post_id = req.query.post_id ? req.query.post_id : null;
  const taxSlug = req.query?.slug;
  const postStatus = req.query?.status;
  const limit = req.query.limit ? req.query.limit : 10;
  const skip = req.query.skip ? req.query.skip : 0;

  if (taxSlug && postStatus) {
    Taxonomy.findOne({ tax_slug: taxSlug }).exec((err, tax) => {
      if (err) {
        return res.status(400).json({
          error: "Taxonomy not found",
        });
      }
      if (tax) {
        Post.find({ post_taxid: tax.id, post_status: postStatus })
          .sort({ updatedAt: -1 })
          .skip(skip * limit)
          .limit(limit)
          .select("id post_title post_image post_slug post_description")
          .exec((err, data) => {
            if (err) {
              return res.status(400).json({
                error: "Post not found",
              });
            }

            var query = { post_taxid: tax.id, post_status: postStatus };
            Post.countDocuments(query).exec((count_error, count) => {
              if (err) {
                return res.json(count_error);
              }
              return res.json({
                total: Math.ceil(count / limit),
                skip: skip * limit + 1,
                pageSize: data.length,
                datas: data,
              });
            });
            // var totalPage = 1
            // console.log(data.length);
            // if(data.length == 0 || data.length < limit)
            // {
            //     totalPage = 1;
            // }
            // else if(data.length % limit == 0 && data.pa)
            // {
            //     totalPage = data.length / limit;
            // }else{
            //     totalPage = Math.ceil(data.length / limit) + 1;
            // }

            // return res.json({
            //     total : totalPage,
            //     skip : skip,
            //     pageSize: data.length,
            //     datas : data
            // })
          });
      } else {
        return res.status(400).json({
          message: "error tax",
        });
      }
    });
  } else {
    return res.status(400).json({
      error: "Tax slug or post status not found",
    });
  }
};

exports.updateView = (req, res) => {
  let id = req.params.id ? req.params.id : null;
  try {
    if (id) {
      Post.findByIdAndUpdate(id, { $inc: { post_views: 1 } }).exec(
        (err, data) => {
          if (err) {
            return res.status(400).json({
              error: err.message,
            });
          }
          if (data) {
            return res.json({ message: "+1 view" });
          }
        }
      );
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.getPostXML = (req, res) => {
  try {
    Post.find({ post_status: "public" })
      .sort({ updatedAt: -1 })
      .select("id post_title post_slug createdAt updatedAt")
      .allowDiskUse(true)
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        return res.json(data);
      });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
exports.getListView = (req, res) => {
  try {
    var taxId = req.query.taxId ? req.query.taxId : null;
    var limit =
      req.query.limit && req.query.limit !== "undefined"
        ? parseInt(req.query.limit)
        : 10;
    var skip =
      req.query.skip && req.query.limit !== "undefined"
        ? parseInt(req.query.skip)
        : 0;
    if (taxId) {
      Post.find({ post_taxid: mongoose.Types.ObjectId(taxId) })
        .populate("post_userid")
        .populate("post_taxid")
        .populate("post_schemaid")
        .sort({ post_views: -1 })
        .skip(skip * limit)
        .limit(limit)
        .select(
          "id post_type post_title post_views post_status post_userid post_image post_slug post_description post_schemaid post_taxid"
        )
        .exec((err, data) => {
          if (err) {
            return res.status(400).json({
              message: err.message,
            });
          }
          return res.json(data);
        });
    } else {
      return res.status(400).json({
        message: "TaxId not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
exports.getAllByTaxDate = (req, res) => {
  var tax_id = req.query.tax ? req.query.tax : null;
  var start = req.query.start ? new Date(req.query.start) : new Date();
  var end = req.query.end ? new Date(req.query.end) : new Date();
  end.setDate(end.getDate() + 1);

  var query = {
    post_taxid: tax_id,
    createdAt: {
      $gte: start,
      $lt: end,
    },
  };
  if (tax_id) {
    Post.find({
      post_taxid: tax_id,
      createdAt: {
        $gte: start,
        $lt: end,
      },
    })
      .sort({ updatedAt: -1 })
      .select(
        "id post_type post_title post_image post_slug post_description post_status "
      )
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            message: err.message,
          });
        }
        Post.countDocuments(query).exec((count_error, count) => {
          if (err) {
            return res.json(count_error);
          }
          return res.json({
            total: count,
            // skip : skip,
            pageSize: data.length,
            datas: data,
          });
        });
      });
  } else {
    return res.status(400).json({
      message: err.message,
    });
  }
};

exports.getAllByDate = (req, res) => {
  var start = req.query.start ? new Date(req.query.start) : new Date();
  var end = req.query.end ? new Date(req.query.end) : new Date();
  end.setDate(end.getDate() + 1);
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var skip = req.query.skip ? parseInt(req.query.skip) : 0;
  var query = {
    createdAt: {
      $gte: start,
      $lt: end,
    },
  };
  Post.find({
    createdAt: {
      $gte: start,
      $lt: end,
    },
  })
    .sort({ updatedAt: -1 })
    .skip(skip * limit)
    .limit(limit)
    .select(
      "id post_type post_title post_image post_slug post_description post_status "
    )
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          message: err.message,
        });
      }
      Post.countDocuments(query).exec((count_error, count) => {
        if (err) {
          return res.json(count_error);
        }
        return res.json({
          total: count,
          pageSize: data.length,
          datas: data,
        });
      });
    });
};

exports.getMax = (req, res) => {
  Post.aggregate([
    {
      $project: {
        createdAt: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
      },
    },
    { $group: { _id: { createdAt: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $project: { _id: 0, createdAt: "$_id.createdAt", count: 1 } },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    return res.json({
      max: data[0]?.count,
      date: data[0]?.createdAt,
    });
  });
};

exports.getMin = (req, res) => {
  Post.aggregate([
    {
      $project: {
        createdAt: {
          $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
        },
      },
    },
    { $group: { _id: { createdAt: "$createdAt" }, count: { $sum: 1 } } },
    { $sort: { count: 1 } },
    { $project: { _id: 0, createdAt: "$_id.createdAt", count: 1 } },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    return res.json({
      min: data[0]?.count,
      date: data[0]?.createdAt,
    });
  });
};

exports.getMinUser = async (req, res) => {
  await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "post_userid",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $group: {
        _id: {
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          post_userid: "$post_userid",
        },
        createdAt: {
          $first: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
        count: { $sum: 1 },
        username: { $first: "$user.username" },
      },
    },
    {
      $sort: { count: 1 },
    },
    {
      $project: {
        _id: 1,
        count: 1,
        createdAt: 1,
        username: 1,
      },
    },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    return res.json({
      min: data[0]?.count,
      date: data[0]?.createdAt,
      username: data[0]?.username,
    });
  });
};

exports.getMaxUser = async (req, res) => {
  await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "post_userid",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $group: {
        _id: {
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          post_userid: "$post_userid",
        },
        createdAt: {
          $first: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
        count: { $sum: 1 },
        username: { $first: "$user.username" },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $project: {
        _id: 1,
        count: 1,
        createdAt: 1,
        username: 1,
      },
    },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    return res.json({
      max: data[0]?.count,
      date: data[0]?.createdAt,
      username: data[0]?.username,
    });
  });
};

exports.statisticsStaff = async (req, res) => {
  var start = req.query.start ? new Date(req.query.start) : new Date();
  var end = req.query.end ? new Date(req.query.end) : new Date();
  end.setDate(end.getDate() + 1);
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var skip = req.query.skip ? parseInt(req.query.skip) : 1;
  var userName = req.query.q && req.query.q != "undefined" ? req.query.q : null;
  await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "post_userid",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $group: {
        _id: {
          createdAt: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          post_userid: "$post_userid",
        },
        createdAt: {
          $first: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
        },
        count: { $sum: 1 },
        username: { $first: "$user.username" },
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $project: {
        _id: 1,
        count: 1,
        createdAt: 1,
        username: 1,
      },
    },
  ]).exec((err, data) => {
    if (err) {
      return res.status(400).json({
        message: err.message,
      });
    }
    var listResult = [];
    data.filter((x) => {
      var date = new Date(x.createdAt);
      if (start <= date && date <= end) {
        listResult.push(x);
      }
    });
    if (listResult && listResult.length > 0) {
      let result = listResult.slice(skip * limit).slice(0, limit);
      if (userName && userName.length > 0) {
        result = result.filter((x) => x.username == userName);
        return res.json({
          total: result.length,
          skip: skip,
          pageSize: limit,
          datas: result,
        });
      }
      return res.json({
        total: listResult.length,
        skip: skip,
        pageSize: limit,
        datas: result,
      });
    } else {
      return res.json({
        total: listResult.length,
        skip: skip,
        pageSize: limit,
        datas: listResult,
      });
    }
  });
};

exports.updateUser = (req, res) => {
  var id = mongoose.Types.ObjectId("62c2a7c3b0e9386a7f640125");
  var limit = req.query.limit ? parseInt(req.query.limit) : 10;
  var skip = req.query.skip ? parseInt(req.query.skip) : 1;
  Post.updateMany(
    { post_userid: { $exists: false } },
    {
      $set: {
        post_userid: id,
      },
    },
    { multi: true }
  ).exec((err, data) => {
    return res.json(data);
  });
};

const textOverlay = async (provinceId, date) => {
  try {
    // Reading image
    let imageUrl = "";
    let returnImageUrl = "";
    let imageName = "";
    if (provinceId == 1) {
      imageUrl = "assets/images/kqxs-mb.png";
      returnImageUrl = `assets/images/xoso/kqxs-mb-${date}.png`;
      imageName = `${config.BASE_URL}/xoso/kqxs-mb-${date}.png`;
    } else if (provinceId == 2) {
      imageUrl = "assets/images/kqxs-mt.png";
      returnImageUrl = `assets/images/xoso/kqxs-mt-${date}.png`;
      imageName = `${config.BASE_URL}/xoso/kqxs-mt-${date}.png`;
    } else {
      imageUrl = "assets/images/kqxs-mn.png";
      returnImageUrl = `assets/images/xoso/kqxs-mn-${date}.png`;
      imageName = `${config.BASE_URL}/xoso/kqxs-mn-${date}.png`;
    }
    const image = await Jimp.read(imageUrl);
    // Defining the text font
    const font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    image.print(font, 430, 880, `${date}`);
    // Writing image after processing
    await image.writeAsync(returnImageUrl);
    return imageName;
  } catch (error) {
    throw error;
  }
};
