import { atom } from "recoil";

export const boardImage = atom({
  key: "boardImage",
  default: null,
});

export const postContent = atom({
  key: "postContent",
  default: "",
});
