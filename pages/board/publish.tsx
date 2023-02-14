import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

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
  const { register, handleSubmit, watch } = useForm();

  const handlePublish = () => {
    console.log(watch());
  };

  const imageHandler = () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    document.body.appendChild(input);

    input.click();

    input.onchange = async () => {
      const [file] = input.files;
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
        handlers: { image: imageHandler },
      },
    }),
    []
  );

  return (
    <div>
      <h1>등록페이지</h1>
      <form onSubmit={handleSubmit(handlePublish)}>
        <div>
          <input type="text" />
          <ReactQuill theme="snow" modules={modules} formats={formats} />
        </div>
        <button>등록</button>
      </form>
    </div>
  );
};

export default PublishPost;
