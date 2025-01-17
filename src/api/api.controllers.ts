import { Request, Response } from "express" // Import Request and Response types from Express
import UserModal from "./users.model"
import { USER_UTILS } from "./api.utils"
import { User } from "./api.types"
import ProductModel from "./products.model"

const register = async (req: Request, res: Response) => {
  try {
    let { name, username, password } = req.body
    // check is username exist
    if (await UserModal.findOne({ username }))
      throw Error("Username Already Exist")


    password = await USER_UTILS.createHashPassword({ password })
    if (!password) throw Error("Please Enter Your Password")

    // create user
    const user: User = await UserModal.create({
      name,
      username,
      password,
    })

    // create token
    let userToken = await USER_UTILS.genToken({
      _id: user._id,
    })

    return res.status(201).send({
      user,
      token: userToken,
      success: true,
      message: "User registered successfully",
    })
  } catch (error: any | undefined) {
    console.log("🚀 ~ register ~ error:", error)
    return res.status(500).send(error?.message)
  }
}


const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    // validate requirement fields
    if (!username || !password) throw Error("please write all filed's")
    // is user exist and active
    const user: User = await UserModal.findOne({
      username,
      isActive: true,
    })
    if (!user) throw new Error("user not found")
    // check password
    const valid = await user?.comparePassword(password)
    if (!valid) throw new Error("password not match")

    // create token and it will create new sessionToken the previous one will be invalid
    const token: any = await USER_UTILS.genToken({
      _id: user._id,
    })

    return res.status(201).send({
      user,
      token,
      success: true,
      message: "User logged in successfully",
    })
  } catch (error: any | undefined) {
    return res.status(500).send(error?.message)
  }
}

const my_profile = async (req: Request | any, res: Response) => {
  try {
    const { user } = req

    return res.status(201).send({
      user,
      success: true,
      message: "User logged in successfully",
    })
  } catch (error: any | undefined) {
    return res.status(500).send(error?.message)
  }
}

const create_product = async (req: Request | any, res: Response) => {
  try {
    const { user } = req
    const { name, price, description } = req.body

    const product = await ProductModel.create({
      name,
      price,
      description,
      user: user._id
    })

    return res.status(201).send({
      product,
      success: true,
      message: "Product created successfully",
    })
  } catch (error: any | undefined) {
    return res.status(500).send(error?.message)
  }
}

const list_products = async (req: Request | any, res: Response) => {
  try {
    const { user } = req

    const products = await ProductModel.find({ user: user._id })

    return res.status(201).send({
      products,
      success: true,
      message: "Product listed successfully",
    })
  } catch (error: any | undefined) {
    return res.status(500).send(error?.message)
  }
}


const CONTROLLERS = {
  register,
  login,
  my_profile,
  create_product,
  list_products
}

export default CONTROLLERS
