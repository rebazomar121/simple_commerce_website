import express from "express"
const router = express.Router()

import CONTROLLERS from "./users.controllers"
import { USER_MIDDLEWARE } from "./users.middlewares"

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user management
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with username, email, and password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", CONTROLLERS.register)

router.post("/", CONTROLLERS.login)
router.get("/", USER_MIDDLEWARE.authorization, CONTROLLERS.myProfile)
router.post(
  "/verifyPhone/:code",
  USER_MIDDLEWARE.authorization,
  CONTROLLERS.verifyPhone,
)
router.post("/forgotPassword", CONTROLLERS.forgotPassword)
router.post("/verifyForgotPassword/:code", CONTROLLERS.verifyForgotPassword)
router.post("/resetPasswordWithToken", CONTROLLERS.resetPasswordWithToken)

export default router
