import { modifiedImagePath } from "../../utils/imageModifing"

describe("Image Modifing Test", () => {
  it("should return image path", () => {
    expect(modifiedImagePath("fjord", 100, 100)).toEqual(
      "src/thumb/fjord_thumb100x100.jpg"
    )
  })
})
