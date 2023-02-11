import Link from "next/link";

const BoardList = () => {
  return (
    <div>
      <h1>Board List</h1>
      <div style={{ display: "grid" }}>
        <Link href="/board/1">1번 글</Link>
        <Link href="/board/publish">등록하기</Link>
      </div>
    </div>
  );
};

export default BoardList;
