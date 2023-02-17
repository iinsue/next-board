import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { imageUpload } from "@/util/imageUpload";
import { useRouter } from "next/router";

const DynamicQuill = dynamic(() => import("react-quill"), { ssr: false });
const QuillResize = dynamic(() => import("quill-image-resize"), { ssr: false });

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    const { default: IR } = await import("quill-image-resize");
    const { Quill } = RQ;
    Quill.register("modules/ImageResize", IR);
    return function comp({ forwardedRef, ...props }) {
      const modules = {
        toolbar: [
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

        ImageResize: {
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      };
      return <RQ ref={forwardedRef} modules={modules} {...props} />;
    };
  },
  { ssr: false }
);

const ImageResize = dynamic(
  async () => {
    const { default: IR } = await import("quill-image-resize");
    return IR;
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
  "video",
];

const PublishPost = () => {
  const quillRef = useRef();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    register("textContent", { required: true });
  }, [register]);

  const onEditorStateChange = (editorState) => {
    setValue("textContent", editorState);
  };

  const textContent = watch("textContent");

  const imageHandler = () => {
    if (quillRef) {
      const input = document.createElement("input");
      const quill = quillRef.current || undefined;
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      document.body.appendChild(input);

      input.click();

      input.onchange = async () => {
        const [file] = input.files;
        const imageURL = await imageUpload(file);
        console.log(imageURL);
        const range = quill.getEditorSelection();
        quill.getEditor().insertEmbed(range.index, "image", imageURL);
        quill.getEditor().setSelection(range.index + 1);
        document.body.querySelector(":scope > input").remove();
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
        ImageResize: {
          modules: ["Resize", "DisplaySize", "Toolbar"],
        },
      },
    }),
    []
  );

  const handlePublish = async (data) => {};

  return (
    <div>
      <h1>등록페이지</h1>
      <form onSubmit={handleSubmit(handlePublish)}>
        <div>
          <input type="text" {...register("title")} />
          <ReactQuill
            forwardedRef={quillRef}
            formats={formats}
            onChange={onEditorStateChange}
            value={textContent}
          />
          <DynamicQuill />
        </div>
        <button>등록</button>
      </form>
    </div>
  );
};

export default PublishPost;
