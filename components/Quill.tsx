import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo, useRef } from "react";
const ReactQuill = dynamic(
  async () => {
    const { default: Quill } = await import("react-quill");
    return function addprops({ forwardedRef, ...props }) {
      return <Quill ref={forwardedRef} {...props} />;
    };
  },
  {
    ssr: false,
  }
);

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
    const input = document.createElement("input");
    const formData = new FormData();
    let imgUrl = "";

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files;
      console.log(file);
      //const imageURL = await sendImage(file)
      if (file !== null) formData.append("image", file[0]);
      /* console.log(file[0]);

      try {
        const range = quillRef.current.getEditor().getSelection().index;
        if (range !== null && range !== undefined) {
          let quill = quillRef.current?.getEditor();
          quill?.setSelection(range, 1);
          quill?.clipboard.dangerouslyPasteHTML(
            range,
            `<img src=${imgUrl} alt="이미지 태그가 삽입됩니다." />`
          );
        }
        return { success: true };
      } catch (error) {
        console.log(error);
        return { success: false };
      } */
    };
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
      },
      handlers: {
        image: imageHandler,
      },
    }),
    []
  );

  return (
    <ReactQuill forwardedRef={quillRef} formats={formats} modules={modules} />
  );
};

export default Editor;
