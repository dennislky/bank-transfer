import type { NextApiRequest, NextApiResponse } from "next";

import { Transfer } from "@/services/models/transfer";

type ResponseData = {
  code: number;
  message?: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    const transfer = await Transfer.findOne({ _id: req.query.id });
    res.status(200).json({ code: 0, data: transfer });
  }
  res.status(400).json({ code: -1, message: "Bad Request" });
}
