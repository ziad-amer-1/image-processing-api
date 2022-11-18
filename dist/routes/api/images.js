"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const arrayOfImagesName_1 = require("../../utils/arrayOfImagesName");
const imageModifing_1 = require("../../utils/imageModifing");
const sharp_1 = __importDefault(require("sharp"));
const images = express_1.default.Router();
images.get("/", (req, res) => {
    res.redirect("/api/images");
});
images.get("/images", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imgName = req.query.filename;
    const imgWidth = req.query.width;
    const imgHeight = req.query.height;
    const imgLocation = path_1.default.resolve("./") + `/src/full/${imgName}.jpg`;
    const isImageExistedInImages = arrayOfImagesName_1.arrayOfImagesName.includes(imgName);
    // make a path from the new image with in the new width and height
    const newImagePath = (0, imageModifing_1.modifiedImagePath)(imgName, imgWidth, imgHeight);
    // if there is no filename query in the url
    if (imgName === undefined) {
        res.status(400).send("Query Parameter [filename] is required.");
        return;
    }
    // if the image is not from our images folder we will send an arror message
    if (!isImageExistedInImages) {
        res.status(404).send("Image is Not Found Write a valid filename");
        return;
    }
    //if the user enter image only name, we will display it with the default size
    if (!imgWidth && !imgHeight) {
        res.sendFile(imgLocation);
        return;
    }
    // if we have image name in the array of images and the photo doesn't exist
    if (!fs_1.default.existsSync(imgLocation)) {
        res.status(404).send("This Resource is not found");
        return;
    }
    // if width or height is not a number
    if (isNaN(imgWidth) || isNaN(imgHeight)) {
        res.status(400).send("Make Sure Width and Height are numbers");
        return;
    }
    // if we don't have the modified image path we simply create it
    if (!fs_1.default.existsSync(newImagePath)) {
        /*
          if I didn't await that it's gonna work but
          the server will send me the original image without modifing
          then I should refresh again to get my modified image back
          so...
            if I await that it's gonna wait the image to be modified :)
        */
        yield (0, sharp_1.default)(path_1.default.resolve(`./`) + `/src/full/${imgName}.jpg`)
            .resize(Number(imgWidth), Number(imgHeight))
            .toFile(path_1.default.resolve(newImagePath));
    }
    if (fs_1.default.existsSync(newImagePath)) {
        res.sendFile(path_1.default.resolve(newImagePath));
        return;
    }
    res.sendFile(imgLocation);
}));
exports.default = images;
