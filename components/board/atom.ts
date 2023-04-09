import { atom, selector } from "recoil";

export const fetchList = async () => {
  const response = await fetch("/api/board");
  const json = await response.json();
  return json;
};

export const postContent = atom({
  key: "postContent",
  default: "",
});

/* export const textlist = selector({
  key: "textlist",
  get: async () => {
    const list = await fetchList();
    return list;
  },
}); */

export const postList = atom({
  key: "postList",
  default: [],
});
