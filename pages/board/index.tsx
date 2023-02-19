import { postContent } from "@/components/atom";
import Editor from "@/components/textEditor";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

const registerPost = async (data) => {
  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return response;
};

const BoardList = () => {
  const { register, setValue, handleSubmit } = useForm();
  const postContents = useRecoilValue(postContent);
  const setSumbitData = async (data) => {
    console.log(typeof data.postContent);
    console.log(JSON.stringify(data.postContent));
    console.log(typeof JSON.stringify(data.postContent));
    await registerPost(data).then((res) => console.log(res.json()));
  };

  useEffect(() => {
    setValue("postContent", postContents);
  }, [postContents, setValue]);

  return (
    <>
      <form onSubmit={handleSubmit(setSumbitData)}>
        <input {...register("postTitle")} />
        <Editor value={null} />
        <button>Click</button>
      </form>
    </>
  );
};

export default BoardList;
