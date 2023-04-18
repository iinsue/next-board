import { useRecoilValueLoadable } from "recoil";
import { postSelector } from "../../components/atom";
import { Suspense, useEffect, useState } from "react";

const PostList = (props) => {
  const { data } = props;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedPost) {
      selectedPost.state === "hasValue" && setIsLoading(false);
    }
  }, [selectedPost]);

  if (isLoading === false) {
    switch (selectedPost.state) {
      case "hasValue":
        return (
          <Suspense fallback={""}>
            <PostList data={selectedPost.contents.postList} />
          </Suspense>
        );
      case "loading":
        return <div>Loading...</div>;
      case "hasError":
        throw selectedPost.contents;
    }
  } else {
    return <div></div>;
  }
};

export default TestSelector;
