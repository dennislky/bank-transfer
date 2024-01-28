import mongoose from "mongoose";
import { getMongooseInstance } from "../mongoDBService";

await getMongooseInstance();
const schema = new mongoose.Schema({
  id: String,
  name: String,
  balance: Number,
});
let Account = mongoose.models.Account;
if (!Account) {
  Account = mongoose.model("Account", schema);
  const mockAccount1 = new Account({
    id: "11111111",
    name: "test account 1",
    balance: 11111111,
  });
  await mockAccount1.save();
  const mockAccount2 = new Account({
    id: "22222222",
    name: "test account 2",
    balance: 22222222,
  });
  await mockAccount2.save();
  const mockAccount3 = new Account({
    id: "33333333",
    name: "test account 3",
    balance: 33333333,
  });
  await mockAccount3.save();
  const mockAccount4 = new Account({
    id: "44444444",
    name: "test account 4",
    balance: 44444444,
  });
  await mockAccount4.save();
  const mockAccount5 = new Account({
    id: "55555555",
    name: "test account 5",
    balance: 55555555,
  });
  await mockAccount5.save();
}

export { Account };
