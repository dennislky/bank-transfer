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
    try {
      const transfer = await Transfer.findOne({ _id: req.query.id });
      res.status(200).json({ code: 0, data: transfer });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ code: -1, message: error.message });
    }
  }
  res.status(400).json({ code: -1, message: "Bad Request" });
}
