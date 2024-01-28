import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongooseInstance: typeof mongoose;
const getMongooseInstance = async () => {
  if (!mongooseInstance) {
    let mongoUri = "mongodb://127.0.0.1:27017/";
    try {
      const mongoServer = await MongoMemoryServer.create({
        instance: { port: 27017 },
      });
      mongoUri = mongoServer.getUri();
      console.log("mongoUri", mongoUri);
    } catch (error) {
      console.log("Mongo Memory Server already created!");
    }
    try {
      await mongoose.disconnect();
      mongooseInstance = await mongoose.connect(mongoUri, {
        bufferCommands: false,
        autoCreate: false,
      });
    } catch (error) {
      console.log("mongooseInstance connection error", error);
    }
  }
  return mongooseInstance;
};

export { getMongooseInstance };
