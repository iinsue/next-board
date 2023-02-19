import { postContent } from "@/components/atom";
import Editor from "@/components/textEditor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
const Quill = typeof window === "object" ? require("quill") : () => false;

interface Text {
  postTitle: string;
  postContent: string;
}

const fetchPost = async (idx) => {
  const response = await fetch(`/api/detail/${idx}`);
  const json = await response.json();
  return json;
};

const EditPost = () => {
  const router = useRouter();
  const [content, setContent] = useState();
  const [page, setPage] = useState<Text>({
    postTitle: "",
    postContent: "",
  });
  const editContent = useRecoilValue(postContent);

  const { register, setValue, handleSubmit } = useForm();

  useEffect(() => {
    fetchPost(1).then((res) => setPage(() => res.result[0]));
    console.log(router.query);
  }, [router]);

  useEffect(() => {
    if (page.postContent !== "") {
      const json = JSON.parse(page.postContent);
      const quillGetHTML = (inputDelta) => {
        const quill = new Quill(document.createElement("div"));
        quill.setContents(inputDelta);
        return quill.root.innerHTML;
      };
      setContent(() => quillGetHTML(json));
      setValue("postTitle", page.postTitle);
    }
  }, [page, setValue]);

  useEffect(() => {
    if (editContent) {
      setValue("postContent", editContent);
    } else {
      setValue("postContent", content);
    }
  }, [editContent, setValue, content]);

  const handleEdit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h1>글 상세</h1>
      <form onSubmit={handleSubmit(handleEdit)}>
        <input {...register("postTitle")} type="text" />
        <Editor value={content} />
        <button>수정하기</button>
      </form>
    </div>
  );
};

export default EditPost;
