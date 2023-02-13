import React, { useCallback, useState } from "react";
import axios from "axios";

const IndexPage = () => {
  const [thumb, setThumb] = useState<string[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const onChange = useCallback(
    async (formData: FormData) => {
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event: { loaded: number; total: number }) => {
          setProgress(Math.round((event.loaded * 100) / event.total));
        },
      };
      axios
        .post<any>("/api/photo", formData, config)
        .then((res) => {
          setThumb([...thumb, ...res.data]);
        })
        .catch(function (error) {
          if (
            error.response.data.error ===
            "Sorry something Happened! File too large"
          )
            return alert(
              "한 파일당 1MB 이상 올리 실 수 없습니다. 확인 후 다시 올려주세요"
            );
        });
    },
    [thumb]
  );

  return (
    <>
      <p>
        <span>이미지 업로드</span>
        <span>{progress}</span>
      </p>
      <input type="file" onChange={onChange} />
      <ul>
        {thumb &&
          thumb.map((item: string, i: number) => {
            console.log("item", item);
            return (
              <li key={i}>
                <img src={item} width="300" alt="업로드이미지" />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default IndexPage;
