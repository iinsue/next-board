import { postContent } from "@/components/atom";
import Editor from "@/components/textEditor";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";

const BoardList = () => {
  const { register, setValue, handleSubmit } = useForm();
  const postContents = useRecoilValue(postContent);
  const setSumbitData = async (data) => {
    console.log(data);
  };

  useEffect(() => {
    setValue("content", postContents);
  }, [postContents, setValue]);

  return (
    <div>
      <form onSubmit={handleSubmit(setSumbitData)}>
        <input {...register("title")} />
        <Editor />
        <button>Click</button>
      </form>
    </div>
  );
};

export default BoardList;
