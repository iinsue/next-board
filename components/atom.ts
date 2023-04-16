import { atom, selector } from "recoil";

const fetchList = async () => {
  const response = await fetch("http://localhost:3000/api/board");
  const json = await response.json();
  return json;
};

export const postSelector = selector({
  key: "categoryState",
  get: async () => {
    const fetchFunc = await fetchList();
    return fetchFunc;
  },
});
