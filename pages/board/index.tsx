import Test from "@/components/Test";
import { postList as listatom } from "@/components/board/atom";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

export const fetchList = async () => {
  const response = await fetch("/api/board");
  const json = await response.json();
  return json;
};

function useFetchList(setData) {
  return useQuery({
    queryKey: ["list"],
    queryFn: fetchList,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    staleTime: 1000 * 20,
    onSuccess(data) {
      setData(() => data.postList);
    },
  });
}

const BoardList = () => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const [textList, setTextList] = useRecoilState(listatom);
  const { data } = useFetchList(setTextList);

  const router = useRouter();
  useEffect(() => {
    fetchList().then((res) => setList(() => res.postList));
  }, []);

  const handleSelectAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((li) => `${li.postIdx}`));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log(id, checked);
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const view = () => {
    console.log(isCheck);
    console.log(typeof list[0].postIdx);
  };

  return (
    <div>
      <h1>글 목록</h1>
      <div>
        <Link href="/board/register">등록하기</Link>
        <div onClick={view}>view</div>
      </div>
      {data?.postList.length > 0 ? (
        <div>
          <label style={{ display: "flex" }}>
            <input
              type="checkbox"
              name="selectAll"
              id="selectAll"
              onChange={handleSelectAll}
              checked={isCheckAll}
            />
            <div>전체 선택</div>
          </label>
          {data?.postList.map((item) => (
            <div key={item.postIdx} style={{ display: "flex" }}>
              <input
                type="checkbox"
                id={item.postIdx}
                onChange={handleClick}
                checked={isCheck.includes(`${item.postIdx}`)}
              />
              <div onClick={() => router.replace(`/board/${item.postIdx}`)}>
                {item.postTitle}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <Test />
    </div>
  );
};

export default BoardList;
