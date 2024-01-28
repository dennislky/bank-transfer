import mongoose from "mongoose";
import { getMongooseInstance } from "../mongoDBService";

await getMongooseInstance();
const CurrencyBalance = new mongoose.Schema({
  currency: String,
  amount: Number,
});
const schema = new mongoose.Schema({
  id: String,
  name: String,
  balances: [CurrencyBalance],
});
let Account = mongoose.models.Account;
if (!Account) {
  Account = mongoose.model("Account", schema);
  const mockAccount1 = new Account({
    id: "11111111",
    name: "test account 1",
    balances: [{
      currency: "USD",
      amount: 1,
    }],
  });
  await mockAccount1.save();
  const mockAccount2 = new Account({
    id: "22222222",
    name: "test account 2",
    balances: [{
      currency: "EUR",
      amount: 2,
    }],
  });
  await mockAccount2.save();
  const mockAccount3 = new Account({
    id: "33333333",
    name: "test account 3",
    balances: [{
      currency: "JPY",
      amount: 3,
    }],
  });
  await mockAccount3.save();
  const mockAccount4 = new Account({
    id: "44444444",
    name: "test account 4",
    balances: [{
      currency: "BTC",
      amount: 4,
    }],
  });
  await mockAccount4.save();
  const mockAccount5 = new Account({
    id: "55555555",
    name: "test account 5",
    balances: [{
      currency: "USD",
      amount: 5,
    }, {
      currency: "EUR",
      amount: 5,
    }],
  });
  await mockAccount5.save();
}

export { Account };
