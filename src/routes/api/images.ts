import express from "express"
import path from "path"
import fs from "fs"
import { arrayOfImagesName } from "../../utils/arrayOfImagesName"
import { modifiedImagePath } from "../../utils/imageModifing"
import sharp from "sharp"
const images = express.Router()

images.get("/", (req, res) => {
  res.redirect("/api/images")
})

images.get(
  "/images",
  async (req: express.Request, res: express.Response): Promise<void> => {
    const imgName = req.query.filename as string
    const imgWidth = req.query.width as unknown as number
    const imgHeight = req.query.height as unknown as number
    const imgLocation = path.resolve("./") + `/src/full/${imgName}.jpg`
    const isImageExistedInImages = arrayOfImagesName.includes(imgName)
    // make a path from the new image with in the new width and height
    const newImagePath = modifiedImagePath(imgName, imgWidth, imgHeight)

    // if there is no filename query in the url
    if (imgName === undefined) {
      res.status(400).send("Query Parameter [filename] is required.")
      return
    }

    // if the image is not from our images folder we will send an arror message
    if (!isImageExistedInImages) {
      res.status(404).send("Image is Not Found Write a valid filename")
      return
    }

    //if the user enter image only name, we will display it with the default size
    if (!imgWidth && !imgHeight) {
      res.sendFile(imgLocation)
      return
    }

    // if we have image name in the array of images and the photo doesn't exist
    if (!fs.existsSync(imgLocation)) {
      res.status(404).send("This Resource is not found")
      return
    }

    // if width or height is not a number
    if (isNaN(imgWidth) || isNaN(imgHeight)) {
      res.status(400).send("Make Sure Width and Height are numbers")
      return
    }

    // if we don't have the modified image path we simply create it
    if (!fs.existsSync(newImagePath)) {
      /*
        if I didn't await that it's gonna work but 
        the server will send me the original image without modifing
        then I should refresh again to get my modified image back
        so...
          if I await that it's gonna wait the image to be modified :)
      */
      await sharp(path.resolve(`./`) + `/src/full/${imgName}.jpg`)
        .resize(Number(imgWidth), Number(imgHeight))
        .toFile(path.resolve(newImagePath))
    }

    if (fs.existsSync(newImagePath)) {
      res.sendFile(path.resolve(newImagePath))
      return
    }

    res.sendFile(imgLocation)
  }
)

export default images
