import React, { useCallback, useState } from "react";
import axios from "axios";
import { UiFileInputButton } from "../../components/UiFileInputButton";

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
      axios.post<any>("/api/imgupload", formData, config).then((res) => {
        setThumb([...thumb, ...res.data]);
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
      <UiFileInputButton
        label="Upload Single File"
        // allowMultipleFiles 가 false 일경우, 하나씩만 올릴 수 있다.
        allowMultipleFiles={true}
        uploadFileName="file"
        onChange={onChange}
      />
      <ul>
        {thumb &&
          thumb.map((item: string, i: number) => {
            console.log("item", item);
            return (
              <li key={i}>
                <img src={`/uploads/${item}`} width="300" alt="업로드이미지" />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default IndexPage;
