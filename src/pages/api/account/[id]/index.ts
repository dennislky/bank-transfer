import type { NextApiRequest, NextApiResponse } from "next";

import { Account } from "@/services/models/account";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method === "GET") {
    try {
      const accountList = await Account.find({}, null, { limit: 3 });
      res.status(200).json({
        code: 0,
        data: accountList.map((account) => {
          return {
            label: account.name,
            value: account.id,
            availableBalance: account.balances,
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
