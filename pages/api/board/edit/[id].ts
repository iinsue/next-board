import client from "@/util/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body);
  const { postIdx } = data;
  const { postTitle } = data;
  const postContent = JSON.stringify(data.postContent);
  try {
    await client.board.update({
      where: {
        postIdx: postIdx,
      },
      data: {
        postTitle: postTitle,
        postContent: postContent,
      },
    });
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(400).send({ error: error });
  }
}
