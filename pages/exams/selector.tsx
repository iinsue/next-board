import { useRecoilValueLoadable } from "recoil";
import { postSelector } from "../../components/atom";

const PostList = (props) => {
  const { data } = props;
  console.log(data);
  return (
    <>
      {data.map((item) => (
        <div key={item.postIdx}>
          <div>{item.postTitle}</div>
        </div>
      ))}
    </>
  );
};

export const TestSelector = () => {
  const selectedPost = useRecoilValueLoadable(postSelector);

  switch (selectedPost.state) {
    case "hasValue":
      return <PostList data={selectedPost.contents.postList} />;
    case "loading":
      return <div>Loading...</div>;
    case "hasError":
      throw selectedPost.contents;
  }
};

export default TestSelector;
