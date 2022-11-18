import express from "express"
import routes from "./routes"
const app = express()
const PORT = 3000

app.get("/", (req, res) => {
  res.send("Welcome to Image Processing API")
})
app.use("/api", routes)

app.listen(PORT || process.env.PORT, () =>
  console.log(`server is running on http://localhost:${PORT}`)
)
export default app
