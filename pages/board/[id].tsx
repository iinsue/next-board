import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const PostDetail = () => {
  const router = useRouter();
  useEffect(() => {
    console.log(router.query);
  }, [router]);
  return (
    <div>
      <h1>글 상세</h1>
      <Link href="/board/edit/1">수정하기</Link>
      <div>삭제하기</div>
    </div>
  );
};

export default PostDetail;
