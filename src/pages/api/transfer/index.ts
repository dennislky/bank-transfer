import type { NextApiRequest, NextApiResponse } from "next";

import { Transfer } from "@/services/models/transfer";

const validateTransfer = (transfer: TransferData) => {
  const { from, to, description, amount, currency } = transfer;
  let code = -1;
  if (!from) {
    throw new Error("Missing field: from");
  }
  if (!to) {
    throw new Error("Missing field: to");
  }
  if (!description) {
    throw new Error("Missing field: description");
  }
  if (!amount) {
    throw new Error("Missing field: amount");
  }
  // check if amount is a number
  if (isNaN(amount)) {
    throw new Error("Wrong field type: amount");
  }
  if (!currency) {
    throw new Error("Missing field: currency");
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const transferList = await Transfer.find({});
      res.status(200).json({
        code: 0,
        data: transferList.map((transfer) => {
          return {
            ...transfer._doc,
            id: transfer._id,
          };
        }),
      });
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ code: -1, message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { from, to, description, amount, currency } = req.body;
      validateTransfer(req.body);
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
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ code: -1, message: error.message });
    }
  }
  res.status(400).json({ code: -1, message: "Bad Request" });
}
