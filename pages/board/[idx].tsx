import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

const PostDetail = () => {
  const router = useRouter();
  const [page, setPage] = useState<Text>({
    postTitle: "",
    postContent: "",
  });
  const [content, setContent] = useState();

  useEffect(() => {
    fetchPost(1).then((res) => setPage(() => res.result[0]));
    console.log(router.query);
  }, [router]);

  useEffect(() => {
    if (page.postContent !== "") {
      const json = JSON.parse(page.postContent);
      const quillGetHTML = (inputDelta) => {
        const tempQuill = new Quill(document.createElement("div"));
        tempQuill.setContents(inputDelta);
        return tempQuill.root.innerHTML;
      };
      setContent(() => quillGetHTML(json));
    }
  }, [page]);

  return (
    <div>
      <h1>글 상세</h1>
      <div>{page.postTitle}</div>
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      <Link href="/board/edit/1">수정하기</Link>
      <div>삭제하기</div>
    </div>
  );
};

export default PostDetail;
