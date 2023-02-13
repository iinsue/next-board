import dynamic from "next/dynamic";
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

  return (
    <div>
      <h1>등록페이지</h1>
      <form onSubmit={handleSubmit(handlePublish)}>
        <div>
          <input type="text" />
          <ReactQuill theme="snow" onChange={(e) => console.log(e)} />
        </div>
        <button>등록</button>
      </form>
    </div>
  );
};

export default PublishPost;
