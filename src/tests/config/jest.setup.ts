import { disconnectMemoryDB, connectMemoryDB } from "./mongodb-memory-server"
import mongoose from "mongoose"

afterAll(async () => {
  await disconnectMemoryDB()
})

beforeAll(async () => {
  await connectMemoryDB()
  await mongoose.connection.asPromise()
})
