import client from "@/util/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const textIdx = parseInt(req.query.idx as string);
  try {
    const data = await client.board.findMany({
      where: {
        postIdx: textIdx,
      },
    });
    res.status(200).send({ result: data });
  } catch (error) {
    res.status(200).send({ error: error });
  }
}
