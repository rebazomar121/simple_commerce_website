import { app } from "../../ini/config"
import request from "supertest"

describe("Users API", () => {
  it("should register a new user", async () => {
    const response = await request(app).post("/api/users").send({
      username: "integrationTestUser",
      phoneNumber: "+9647501231232",
      password: "securePass123",
    })

    expect(response.status).toBe(201)
    expect(response.body.message).toBe("User registered successfully")
  })
})
