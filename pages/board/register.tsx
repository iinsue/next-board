import { postContent } from "@/components/board/atom";
import TextEditor from "@/components/board/TextEditor";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";

const registerPost = async (data) => {
  const response = await fetch("/api/board/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
};

const setImage = async (formData: FormData) => {
  const response = await fetch("/api/board/imginsert", {
    method: "POST",
    body: formData,
  });
  return response;
};

const RegisterPost = () => {
  const { register, handleSubmit, setValue } = useForm();
  const setDelta = useSetRecoilState(postContent);
  const postContents = useRecoilValue(postContent);
  const router = useRouter();

  const handleRegister = async (data) => {
    await registerPost(data)
      .then((res) => {
        res.message && router.replace("/");
      })
      .catch((error) => alert(`Error: ${error}`));
  };

  useEffect(() => {
    setValue("postContents", postContents);
  }, [setValue, postContents]);

  return (
    <div>
      <Link href="/board">목록보기</Link>
      <h1>등록페이지</h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        <input
          {...register("postTitle")}
          type="text"
          placeholder="제목을 입력하세요"
        />
        <TextEditor setContent={setDelta} setImage={setImage} />
        <button>등록하기</button>
      </form>
    </div>
  );
};

export default RegisterPost;
