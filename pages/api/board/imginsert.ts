import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";
import multerS3 from "multer-s3";
import dayjs from "dayjs";
import AWS from "aws-sdk";

const app = nextConnect({
  onError(error, req, res: NextApiResponse) {
    res.status(501).json({ error: `Error: ${error.message}` });
  },
  onNoMatch(req, res: NextApiResponse) {
    res.status(405).json({ error: `Method '${req.method}' is Not Allowed` });
  },
});

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "boardtest-ssu",
    key: function (req, file, cb) {
      const nowDate = dayjs(Date.now()).format("YYMMDDHHMM");
      cb(null, `original/${nowDate}_${file.originalname}`);
    },
  }),
  limits: { fileSize: 1024 * 1024 }, // 1MB
});

app.post(upload.array("file"), function (req, res) {
  try {
    const { files } = req as any;
    const image = files.map((s3File) => s3File.location);
    const imageUrl = image[0];
    return res.status(200).send({ imageUrl });
  } catch (error) {
    res.status(200).send({ error: error });
  }
});

export default app;

export const config = {
  api: {
    bodyParser: false,
  },
};
