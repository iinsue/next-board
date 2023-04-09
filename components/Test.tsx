import { useRecoilValue } from "recoil";
import { postList } from "./board/atom";

const Test = () => {
  const list = useRecoilValue(postList);

  return (
    <div>
      <>
        <h1>Test</h1>
        {list.map((item) => (
          <div key={item.postIdx} style={{ display: "flex" }}>
            <input type="checkbox" id={item.postIdx} />
            <div>{item.postTitle}</div>
          </div>
        ))}
      </>
    </div>
  );
};

export default Test;
