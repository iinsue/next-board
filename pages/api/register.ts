import client from "@/util/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestData = JSON.parse(req.body);
  console.log(requestData);
  const registerData = {
    postTitle: requestData.postTitle as string,
    postContent: JSON.stringify(requestData.postContent),
  };
  try {
    await client.board.create({ data: registerData });
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(200).send({ error: error });
  }
  res.status(200).send({ message: "Success" });
}
