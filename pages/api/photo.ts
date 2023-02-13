import nextConnect from "next-connect";
import multer from "multer";
import path from "path";
import dayjs from "dayjs";
import multerS3 from "multer-s3";
import AWS from "aws-sdk";

const app = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESSKEY,
  region: "ap-northeast-2",
});
var upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "boardtest-ssu",
    key(req, file, cb) {
      const nowDate = dayjs(Date.now()).format("YYMMDDHHMM");
      cb(null, `original/${nowDate}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 }, // 1mb
});

app.post(upload.array("file"), function (req, res) {
  return res.json(req.files.map((v) => v.location));
});

export default app;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
