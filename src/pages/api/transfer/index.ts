import type { NextApiRequest, NextApiResponse } from "next";

import { Transfer } from "@/services/models/transfer";
import { Account } from "@/services/models/account";

const validateTransfer = (transfer: TransferData, fromAccount: any) => {
  const { timestamp, from, to, amount, currency } = transfer;
  if (!timestamp) {
    throw new Error("Missing field: timestamp");
  }
  if (!from) {
    throw new Error("Missing field: from");
  }
  if (!to) {
    throw new Error("Missing field: to");
  }
  if (from === to) {
    throw new Error("Cannot transfer to the same account");
  }
  if (!amount) {
    throw new Error("Missing field: amount");
  }
  // check if amount is a number
  if (isNaN(amount)) {
    throw new Error("Wrong field type: amount");
  }
  if (amount <= 0) {
    throw new Error("Amount should be larger than 0");
  }
  if (!fromAccount) {
    throw new Error("No such currency in from account");
  }
  if (fromAccount && amount > fromAccount.balance) {
    throw new Error("Amount should be less than account's available balance");
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
      console.error(error);
      res.status(400).json({ code: -1, message: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const { timestamp, from, to, description, amount, currency }: TransferData = req.body;
      const [fromAccount, toAccount] = await Promise.all([
        Account.findOne({id: from, 'balances.currency': currency }), 
        Account.findOne({id: to})
      ]);
      validateTransfer(req.body, fromAccount);

      const transfer = new Transfer({
        timestamp,
        from,
        to,
        description,
        amount,
        currency,
      });
      // TODO: should wrap this in a Transaction
      await transfer.save();
      await Account.findOneAndUpdate({id: from}, {
        balances: fromAccount.balances.map((balance: {currency: string, amount: number}) => {
          if (balance.currency === currency) {
            balance.amount -= amount;
          }
          return balance;
        })
      })
      if (new Date(timestamp) <= new Date()) {
        const isExistingCurrency = toAccount.balances.find((balance: {currency: string, amount: number}) => balance.currency === currency)
        let newBalances = toAccount.balances;
        if (isExistingCurrency) {
          newBalances = toAccount.balances.map((balance: {currency: string, amount: number}) => {
            if (balance.currency === currency) {
              balance.amount += amount;
            }
            return balance;
          })
        } else {
          newBalances.push({currency, amount});
        }
        await Account.findOneAndUpdate({id: to}, {balances: newBalances});
      }
      
      res.status(200).json({ code: 0, data: transfer });
    } catch (error: any) {
      console.error(error);
      res.status(200).json({ code: -1, message: error.message });
    }
  }
  res.status(400).json({ code: -1, message: "Bad Request" });
}
