import client from "@/util/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestData = JSON.parse(req.body);
  const registerData = {
    postTitle: requestData.postTitle as string,
    postContent: JSON.stringify(requestData.postContents),
  };
  console.log(registerData.postContent);
  if (typeof registerData.postContent === "string") {
    await client.board.create({ data: registerData });
    res.status(200).send({ message: "Success" });
  }
}
