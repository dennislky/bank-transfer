import mongoose from "mongoose";
import { getMongooseInstance } from "../mongoDBService";

await getMongooseInstance();
const schema = new mongoose.Schema({
  timestamp: Date,
  from: String,
  to: String,
  description: String,
  amount: Number,
  currency: String,
});
const Transfer = mongoose.models.Transfer || mongoose.model("Transfer", schema);

export { Transfer };
