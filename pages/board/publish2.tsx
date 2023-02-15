import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { imageUpload } from "@/util/imageUpload";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: IR } = await import("quill-image-resize");
    RQ.Quill.register("modules/ImageResize", IR);
    return function comp({ forwardedRef, ...props }) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const MQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ ...props }) {
      return <RQ {...props} />;
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

const PublishPost = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const quillRef = useRef();

  useEffect(() => {
    register("textContent", { required: true });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue("textContent", editorState);
  };

  const textContent = watch("textContent");

  const handlePublish = (data) => {
    console.log(watch());
    console.log(data);
  };

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    document.body.appendChild(input);

    input.click();

    input.onchange = async () => {
      const [file] = input.files;
      const imageURL = await imageUpload(file);
      console.log(imageURL);
      const range = quillRef.current.getEditorSelection();
      quillRef.current.getEditor().insertEmbed(range.index, "image", imageURL);
      quillRef.current.getEditor().setSelection(range.index + 1);
      document.body.querySelector(":scope > input").remove();
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
        ImageResize: { parchment: MQuill.Quill.import() },
      },
    }),
    []
  );

  return (
    <div>
      <h1>등록페이지</h1>
      <form onSubmit={handleSubmit(handlePublish)}>
        <div>
          <input type="text" {...register("title")} />
          <ReactQuill
            forwardedRef={quillRef}
            modules={modules}
            formats={formats}
            onChange={onEditorStateChange}
            value={textContent}
          />
        </div>
        <button>등록</button>
      </form>
    </div>
  );
};

export default PublishPost;
