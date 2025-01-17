import request from "supertest"
import { app } from "../../ini/config"

describe("E2E Test", () => {
  it("should handle user registration and login", async () => {
    // Register
    const registerRes = await request(app).post("/api/users").send({
      username: "e2eUser",
      email: "e2e@example.com",
      password: "pass1234",
    })
    expect(registerRes.status).toBe(201)

    // Login
    const loginRes = await request(app).post("/api/users/login").send({
      email: "e2e@example.com",
      password: "pass1234",
    })
    expect(loginRes.status).toBe(200)
    expect(loginRes.body.token).toBeDefined()
  })
})
