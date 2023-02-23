import client from "@/util/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = JSON.parse(req.body);
  const { postId } = data;
  const { postTitle } = data;
  console.log(postId);
  const postContent = JSON.stringify(data.postContent);
  try {
    await client.board.update({
      where: {
        postIdx: postId,
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
