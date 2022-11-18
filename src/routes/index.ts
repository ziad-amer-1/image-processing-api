import express from "express"
import images from "./api/images"

const routes = express.Router()

routes.use("/", images)

export default routes
