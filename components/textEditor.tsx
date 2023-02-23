import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useMemo, useRef } from "react";
import { useSetRecoilState } from "recoil";
import { postContent } from "./atom";

const ReactQuill = dynamic(
  async () => {
    const { default: Quill } = await import("react-quill");
    return function setProps({ forwardedRef, ...props }: any) {
      return <Quill ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
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
];

/**
 * 게시글에 삽입될 이미지 URL 을 요청하는 API
 */
const registImage = async (formData: FormData) => {
  const response = await fetch("/api/images", {
    method: "POST",
    body: formData,
  });
  return response;
};

const Editor = ({ value }) => {
  const quillRef = useRef();
  const setContent = useSetRecoilState(postContent);

  const handleContent = (content: string) => {
    if (quillRef.current) {
      const quill = quillRef.current as any;
      const delta = quill.unprivilegedEditor.getContents(content);
      setContent(() => delta);
    }
  };

  const imageHandler = () => {
    if (quillRef.current) {
      const quill = quillRef.current as any;
      const input = document.createElement("input");

      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.click();
      input.onchange = async () => {
        const formData = new FormData();
        const file = input.files;
        formData.append("file", file[0]);
        const response = await registImage(formData);
        const { imageUrl } = await response.json();
        const range = quill.getEditorSelection();
        quill.getEditor().insertEmbed(range.index, "image", imageUrl);
        quill.getEditor().setSelection(range.index + 1);
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
    <>
      {value ? (
        <ReactQuill
          forwardedRef={quillRef}
          formats={formats}
          modules={modules}
          placeholder="내용을 입력하세요..."
          onChange={handleContent}
          value={value}
        />
      ) : (
        <ReactQuill
          forwardedRef={quillRef}
          formats={formats}
          modules={modules}
          placeholder="내용을 입력하세요..."
          onChange={handleContent}
        />
      )}
    </>
  );
};

export default Editor;
