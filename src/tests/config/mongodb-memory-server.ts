import { MongoMemoryServer } from "mongodb-memory-server"
import mongoose from "mongoose"

let mongoServer: MongoMemoryServer

export const connectMemoryDB = async () => {
  mongoServer = await MongoMemoryServer.create()
  const uri = mongoServer.getUri()
  await mongoose.connect(uri)

  // Add a small delay to ensure connection is fully established
  await new Promise((resolve) => setTimeout(resolve, 100))

  console.log("Connection state after connect:", mongoose.connection.readyState)
}
export const disconnectMemoryDB = async () => {
  try {
    await mongoose.connection.dropDatabase()

    await mongoose.connection.close()

    await mongoServer.stop()
  } catch (error) {
    console.error("Error disconnecting from MongoMemoryServer:", error)
  }
}
