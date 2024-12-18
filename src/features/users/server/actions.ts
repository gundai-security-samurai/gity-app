import { v2 as cloudinary } from "cloudinary";
import { extractPublicId } from "cloudinary-build-url";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const createCloudImage = async (base64Image: string) => {
  const imageResponse = await cloudinary.uploader.upload(base64Image, {
    resource_type: "image",
    folder: "gity-app",
  });
  return imageResponse.secure_url;
};

export const deleteCloudImage = async (imageURL: string) => {
  const publicId = extractPublicId(imageURL);
  await cloudinary.uploader.destroy(publicId);
};
