import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongooseInstance: typeof mongoose;
const getMongooseInstance = async () => {
  if (!mongooseInstance) {
    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    mongooseInstance = await mongoose.connect(mongoUri);
  }
  return mongooseInstance;
};
await getMongooseInstance();

export { getMongooseInstance };
