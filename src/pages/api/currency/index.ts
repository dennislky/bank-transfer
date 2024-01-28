import type { NextApiRequest, NextApiResponse } from "next";

import { Currency } from "@/services/models/currency";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const currencyList = await Currency.find({});
      res.status(200).json({
        code: 0,
        data: currencyList.map((currency) => {
          return {
            label: currency.symbol,
            value: currency.name,
          };
        }),
      });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({ code: -1, message: error.message });
    }
  }
  res.status(400).json({ code: -1, message: "Bad Request" });
}
