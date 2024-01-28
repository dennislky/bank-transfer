import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { MONGO_PORT } from "@/constants";

let mongooseInstance: typeof mongoose;
const getMongooseInstance = async () => {
  if (!mongooseInstance) {
    let mongoUri = `mongodb://127.0.0.1:${MONGO_PORT}/`;
    try {
      await MongoMemoryServer.create({
        instance: { port: MONGO_PORT },
      });
    } catch (error) {
      console.log("Mongo Memory Server already created!");
    }
    try {
      await mongoose.disconnect();
      mongooseInstance = await mongoose.connect(mongoUri);
    } catch (error) {
      console.log("mongooseInstance connection error", error);
    }
  }
  return mongooseInstance;
};

export { getMongooseInstance };
