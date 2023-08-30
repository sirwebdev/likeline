import fs from "fs"
import path from "path";

export const getImageFile = () => {
  const imagePath = path.join(__dirname, '../temp/image.test');
  const imageFile = fs.createReadStream(imagePath)

  return imageFile
}
