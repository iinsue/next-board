import AWS from "aws-sdk";

export const imageUpload = async (file) => {
  const BUCKET = "boardtest-ssu";
  const REGION = "ap-northeast-2";

  AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: BUCKET },
    region: REGION,
  });

  return new Promise(async function (resolve, reject) {
    if (file) {
      const params = {
        Body: file,
        Bucket: BUCKET,
        Key: file.name,
      };

      const { Location } = await myBucket.upload(params).promise();
      resolve(Location);
    } else {
      reject("No file");
    }
  });
};
