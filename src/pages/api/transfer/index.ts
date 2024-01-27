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
    const transferList = await Transfer.find({});
    res.status(200).json({ code: 0, data: transferList });
  } else if (req.method === "POST") {
    const { from, to, description, amount, currency } = req.body;
    if (!from) {
      res.status(400).json({ code: -1, message: "Missing field: from" });
      return;
    }
    if (!to) {
      res.status(400).json({ code: -1, message: "Missing field: to" });
      return;
    }
    if (!description) {
      res.status(400).json({ code: -1, message: "Missing field: description" });
      return;
    }
    if (!amount) {
      res.status(400).json({ code: -1, message: "Missing field: amount" });
      return;
    }
    // check if amount is a number
    if (isNaN(amount)) {
      res.status(400).json({ code: -1, message: "Wrong field type: amount" });
      return;
    }
    if (!currency) {
      res.status(400).json({ code: -1, message: "Missing field: currency" });
      return;
    }
    const transfer = new Transfer({
      timestamp: new Date(),
      from,
      to,
      description,
      amount,
      currency,
    });
    await transfer.save();
    res.status(200).json({ code: 0, data: transfer });
  }
  res.status(400).json({ code: -1, message: "Bad Request" });
}
