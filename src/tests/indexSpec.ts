import supertest from "supertest"
import axios from "axios"
import app from ".."
const request = supertest(app)

describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get("/")
    expect(response.ok).toBe(true)
  })
  it("Bad request /api/images", async () => {
    const response = await request.get("/api/images")
    expect(response.ok).toBe(false)
  })
})

describe("Testing Endpoint Responsse", () => {
  it("Testing Image Request", async () => {
    await axios
      .get(
        "http://localhost:3000/api/images?filename=fjord&width=200&height=200"
      )
      .then((response) => {
        expect(response.status).toBe(200)
      })
  })
  it("Entring image name only", async () => {
    await axios
      .get("http://localhost:3000/api/images?filename=fjord")
      .then((response) => {
        expect(response.status).toBe(200)
      })
  })
})
