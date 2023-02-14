import Link from "next/link";
import AWS from "aws-sdk";
import { useState } from "react";
import { imageUpload } from "@/util/imageUpload";
import { useRecoilState } from "recoil";
import { boardImage } from "@/components/atom";

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

const BoardList = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSeletedFile] = useState(null);
  const [imageUrl, setImageUrl] = useRecoilState(boardImage);

  const handleFileInput = (e) => {
    setSeletedFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    await imageUpload(selectedFile).then((res) => console.log(res));
  };

  return (
    <div>
      <h1>Board List</h1>
      <div style={{ display: "grid" }}>
        <Link href="/board/1">1번 글</Link>
        <Link href="/board/publish">등록하기</Link>
        <div style={{ marginTop: "150px" }}>
          <h1>Test Image Upload</h1>
          <input type="file" onChange={handleFileInput} />
          {selectedFile && <button onClick={uploadFile}>Upload </button>}
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="uploaded" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardList;
