"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const imageModifing_1 = require("../../utils/imageModifing");
describe("Image Modifing Test", () => {
    it("should return image path", () => {
        expect((0, imageModifing_1.modifiedImagePath)("fjord", 100, 100)).toEqual("src/thumb/fjord_thumb100x100.jpg");
    });
});
