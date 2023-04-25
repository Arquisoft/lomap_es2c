require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface ImageManager {
  uploadImage: (image: string) => Promise<string>;
}

export class ImageManagerImpl implements ImageManager {
  async uploadImage(image: string): Promise<string> {
    try
    {
      console.log(process.env.CLOUDINARY_CLOUD_NAME)
      const result = await cloudinary.uploader.upload(image);
      
      console.log(result);
      return result.secure_url;;
    } catch (error) {
      console.error(error);
    }
  }
}
