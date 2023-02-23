import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Quill = typeof window === "object" ? require("quill") : () => false;

interface Text {
  postTitle: string;
  postContent: string;
}

const fetchPost = async (id) => {
  const response = await fetch(`/api/board/${id}`);
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
    if (router) {
      const id = parseInt(router.query.id as string);
      fetchPost(id)
        .then(async (res) => {
          res.result && setPage(() => res.result[0]);
        })
        .catch((error) => {
          alert(`Error: ${error}`);
          router.replace("/");
        });
    }
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
    }
  }, [page]);

  return (
    <div>
      <Link href="/board">목록보기</Link>
      <h1>글 상세</h1>
      <div>{page.postTitle}</div>
      {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      <Link href={`/board/edit/${router.query.id}`}>수정하기</Link>
      <div>삭제하기</div>
    </div>
  );
};

export default PostDetail;
