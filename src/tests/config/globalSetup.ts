import { connectMemoryDB } from "./mongodb-memory-server"

export default async () => {
  await connectMemoryDB()
}
