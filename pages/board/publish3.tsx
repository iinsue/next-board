import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo, useRef } from "react";
const ReactQuill = dynamic(async () => import("react-quill"), { ssr: false });

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const Editor = () => {
  const quillRef = useRef();

  const imageHandler = () => {
    if (quillRef) {
      const input = document.createElement("input");
      const formData = new FormData();
      let imgUrl = "";

      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        const file = input.files;
        console.log(file[0]);
      };
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  return (
    <ReactQuill forwardedRef={quillRef} formats={formats} modules={modules} />
  );
};

export default Editor;
