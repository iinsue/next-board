import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const fetchList = async () => {
  const response = await fetch("/api/board");
  const json = await response.json();
  return json;
};

const BoardList = () => {
  const [list, setList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchList().then((res) => setList(() => res.postList));
  }, []);

  return (
    <div>
      <h1>글 목록</h1>
      <div>
        <Link href="/board/register">등록하기</Link>
      </div>
      {list.length > 0 ? (
        <div>
          {list.map((item) => (
            <div
              key={item.postIdx}
              onClick={() => router.replace(`/board/${item.postIdx}`)}
            >
              <div>{item.postTitle}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default BoardList;
