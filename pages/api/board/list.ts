import client from "@/util/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const list = await client.board.findMany();
    res.status(200).json({ postList: list });
  } catch (error) {
    res.status(400).send({ error: error });
  }
}
