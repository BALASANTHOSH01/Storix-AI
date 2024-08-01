'use client'
import { useState, FC } from 'react';
import { useDropzone } from 'react-dropzone';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { auth, storage } from '@/firebase/config';
import { toast, Toaster } from 'sonner';

const ProfileImageUpload: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
  });

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const storageRef = ref(storage, `profileImages/${auth.currentUser?.uid}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      () => {},
      (error) => {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file");
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateProfile(auth.currentUser!, { photoURL: downloadURL });
        toast.success("Profile image uploaded successfully!");
        setUploading(false);
        window.location.reload(); // Reload the page
      }
    );
  };

  return (
    <div className="flex flex-col items-center border border-slate-300 p-6 rounded-lg shadow-md">
      <div
        {...getRootProps()}
        className={`w-full h-40 flex items-center justify-center border-2 border-dashed rounded-lg p-4 transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
        } hover:bg-gray-100`}
      >
        <input {...getInputProps()} className="hidden" />
        {isDragActive ? (
          <p className="text-blue-500 font-medium">Drop the files here ...</p>
        ) : (
          <p className="text-gray-500 font-medium">Drag & drop an image here, or click to select one</p>
        )}
      </div>
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="mt-6 py-2 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Profile Image"}
      </button>
      {file && (
        <div className="mt-4 text-sm text-gray-700">
          <p>Selected file: {file.name}</p>
        </div>
      )}
      <Toaster richColors position="top-center" />
    </div>
  );
};

export default ProfileImageUpload;
