import CONTROLLERS_USERS from "../users.controllers"
import { Request, Response } from "express"

describe("User Controller - Register", () => {
  it("should return 201 on successful registration", async () => {
    const mockReq = {
      body: {
        username: "testuser",
        phoneNumber: "+9647501231232",
        password: "password123",
      },
    } as Request

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await CONTROLLERS_USERS.register(mockReq, mockRes)

    expect(mockRes.status).toHaveBeenCalledWith(201)
    expect(mockRes.json).toHaveBeenCalledWith({
      success: true,
      message: "User registered successfully",
    })
  })
})
