import mongoose from "mongoose";
import { getMongooseInstance } from "../mongoDBService";

await getMongooseInstance();
const schema = new mongoose.Schema({
  symbol: String,
  name: String,
});
let Currency = mongoose.models.Currency;
if (!Currency) {
  Currency = mongoose.model("Currency", schema);
  const mockCurrency1 = new Currency({
    symbol: "$",
    name: "USD",
  });
  await mockCurrency1.save();
  const mockCurrency2 = new Currency({
    symbol: "€",
    name: "EUR",
  });
  await mockCurrency2.save();
  const mockCurrency3 = new Currency({
    symbol: "¥",
    name: "JPY",
  });
  await mockCurrency3.save();
  const mockCurrency4 = new Currency({
    symbol: "฿",
    name: "BTC",
  });
  await mockCurrency4.save();
}

export { Currency };
