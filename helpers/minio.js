const minio = require("minio");
const fs = require("fs");
const { extname } = require("path");

var minioClient = new minio.Client({
  endPoint: "cdn.okchoi.com",
  // port: 9000,
  // useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const uploadFile = (file) =>
  new Promise((resolve, reject) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = extname(file.name);
    const filename = `${uniqueSuffix}${ext}`;

    minioClient.putObject(
      "xosoaladin",
      filename,
      file.data,
      function (err, objInfo) {
        if (err) {
          reject(err); // err should be null
        }

        resolve({
          filename,
          objInfo,
        });
      }
    );
  });

module.exports = { uploadFile };
