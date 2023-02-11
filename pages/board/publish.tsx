import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

const QuillWrapper = dynamic(() => import("react-quill"), {
  ssr: false,
});

const PublishPost = () => {
  const [value, setValue] = useState("");
  return (
    <div>
      <h1>등록페이지</h1>
      <form>
        <div>
          <input type="text" />
          <QuillWrapper theme="snow" value={value} onChange={setValue} />
        </div>
      </form>
    </div>
  );
};

export default PublishPost;
