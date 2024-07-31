import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

export const uploadImage = async (file: File): Promise<string> => {
  if (!file) {
    console.error("No file provided");
    throw new Error("No file provided");
  }

  try {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `images/${fileName}`);

    console.log("Attempting to upload file:", file);
    console.log("Uploading file to:", storageRef.fullPath);

    const uploadResult = await uploadBytes(storageRef, file);
    console.log("Upload result:", uploadResult);

    const url = await getDownloadURL(storageRef);
    console.log("File uploaded successfully. URL:", url);

    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed.");
  }
};
