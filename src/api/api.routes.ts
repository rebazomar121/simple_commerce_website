import express from "express"
const router = express.Router()

import CONTROLLERS from "./api.controllers"
import { USER_MIDDLEWARE } from "./api.middlewares"


router.post("/users", CONTROLLERS.register)
router.post("/users", CONTROLLERS.login)
router.get("/users", USER_MIDDLEWARE.authorization, CONTROLLERS.my_profile)


// TODO this route should be protected with admin authorization
router.post("/products", CONTROLLERS.create_product)
router.get("/products", CONTROLLERS.list_products)





export default router
