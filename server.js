const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
dotenv.config();
const cors = require("cors");
const expressFileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const Router = require("./routes/index");
const bodyParser = require("body-parser");
const originAllow = [
  "http://localhost:3039",
  "https://xosookvip.com",
  "https://admin.xosookvip.com",
];

const corsOptions = {
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
  ],
  credentials: true,
  methods: "GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE",
  origin: originAllow,
  preflightContinue: false,
};

const User = require("./models/user");
const Role = require("./models/role");
const bcrypt = require("bcryptjs");
const addingZeroToDate = require("./helpers/addingZeroToDate");

const {
  crawlDataMNV2,
  crawlDataMTV2,
  crawlDataMBV2,
} = require("./controllers/kqxsv2");

const path = require("path");
const cron = require("node-cron");
const { autoCreatePost } = require("./controllers/post");
const { crawlDataFrequencyOfOccurrenceOfTwoNumbers, crawlDataLotDetailCycle } = require("./stores/statisticsOfNorthernLot");

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(expressFileUpload());
app.use(bodyParser.json({ limit: "50mb" }));
app.options(cors());
app.use(express.static(path.join(__dirname, "assets/images")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Router(app);
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log("Database is failed", err);
  });

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
});

User.estimatedDocumentCount((err, count) => {
  if (!err && count == 0) {
    new User({
      firstName: "Test",
      lastName: "Test",
      username: "admin",
      passwordHash: bcrypt.hashSync("123123@", 10),
      role: "Admin",
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }
      console.log("add user admin");
    });
    new User({
      firstName: "Cộng tác viên",
      lastName: "",
      username: "ctvseo123",
      passwordHash: bcrypt.hashSync("123123@", 10),
      role: "Collaborators",
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }
      console.log("add user Collaborators");
    });
    new User({
      firstName: "Biên tập viên",
      lastName: "",
      username: "btvseo123",
      passwordHash: bcrypt.hashSync("123123@", 10),
      role: "Editor",
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }
      console.log("add user Editor");
    });
  }
});

Role.estimatedDocumentCount((err, count) => {
  if (!err && count === 0) {
    new Role({
      name: "Editor", // bien tap vien
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'Editor' to roles collection");
    });

    new Role({
      name: "Collaborators", //cộng tác viên
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'Collaborators' to roles collection");
    });

    new Role({
      name: "Admin",
    }).save((err) => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'Admin' to roles collection");
    });
  }
});

setInterval(() => {
  const dataNow = new Date();
  if (
   dataNow.getHours() == 18 &&
   dataNow.getMinutes() > 5 &&
   dataNow.getMinutes() < 45
  ) {
    crawlDataMBV2(addingZeroToDate(dataNow));
  }

  if (
   dataNow.getHours() == 17 &&
   dataNow.getMinutes() > 5 &&
   dataNow.getMinutes() < 45
  ) {
    crawlDataMTV2(addingZeroToDate(dataNow));
  }

  if (
   dataNow.getHours() == 16 &&
   dataNow.getMinutes() > 5 &&
   dataNow.getMinutes() < 45
  ) {
    crawlDataMNV2(addingZeroToDate(dataNow));
  }
}, 2000);

// cron.schedule("0 0 7 * * *", () => {
//   autoCreatePost(1);
//   autoCreatePost(2);
//   autoCreatePost(3);
// });