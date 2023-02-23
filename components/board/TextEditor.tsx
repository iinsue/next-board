import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef } from "react";
import "react-quill/dist/quill.snow.css";

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

const TextEditor = (props: any) => {
  const quillRef = useRef();
  const setImage = props.setImage;
  const setContent = props.setContent;
  const content = props.content;

  const handleContents = (contents: string) => {
    if (quillRef.current) {
      const quill = quillRef.current as any;
      const delta = quill.unprivilegedEditor.getContents(contents);
      setContent(() => delta);
    }
  };

  const imageHandler = useCallback(() => {
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
        const response = await setImage(formData);
        const { imageUrl } = await response.json();
        const editorRange = quill.getEditorSelection();
        quill.getEditor().insertEmbed(editorRange.index, "image", imageUrl);
        quill.getEditor().setSelection(editorRange.index + 1);
      };
    }
  }, [setImage]);

  useEffect(() => {
    if (content && quillRef.current) {
      const quill = quillRef.current as any;
      quill.editor.clipboard.dangerouslyPasteHTML(content);
    }
  }, [content]);

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
    [imageHandler]
  );
  return (
    <>
      <ReactQuill
        forwardedRef={quillRef}
        formats={formats}
        modules={modules}
        placeholder="내용을 입력하세요..."
        onChange={handleContents}
      />
    </>
  );
};

export default TextEditor;
