import { Document, SchemaTimestampsConfig } from "mongoose"

interface MongooseDoc extends Document, SchemaTimestampsConfig { }

type Otp = {
  code: string
  expireAt: Date
}

type Phone = {
  number: string
  isVerified: boolean
}

interface User extends MongooseDoc {
  _id: Object
  name: string
  username: string
  password: string
  isActive: boolean
  sessionToken: string
  comparePassword: (password: string) => Promise<boolean>
}


interface Product extends MongooseDoc {
  _id: Object
  name: string
  price: number
  description: string
  image: string
}

type GenTokenProps = {
  _id: string | Object
}
