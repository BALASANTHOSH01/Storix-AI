"use client";

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/config';

export const uploadImage = async (file: File) => {
  const imageRef = ref(storage, `images/${file.name}`);
  
  try {
    await uploadBytes(imageRef, file);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error('Error uploading image: ', error);
    return null;
  }
};
