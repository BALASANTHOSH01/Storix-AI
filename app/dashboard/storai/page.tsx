"use client";

import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import React, { useState } from 'react';
import { Camera } from 'react-camera-pro';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Use next/navigation for programmatic navigation

const Storai = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const router = useRouter(); // Initialize useRouter

  const handleCapture = (blob: Blob) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result as string);
      // Redirect to another page after capturing the image
      router.push('/dashboard/storai'); // Adjust this route as needed
    };
    reader.readAsDataURL(blob);
    setCameraActive(false);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <h1 className="text-xl font-bold mb-4">Capture or Upload Your Image</h1>
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Camera Capture</h2>
            <button
              onClick={() => setCameraActive((prev) => !prev)}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {cameraActive ? 'Close Camera' : 'Open Camera'}
            </button>
          </div>
          {cameraActive ? (
            <Camera
              onCapture={handleCapture}
              onError={(error) => console.error('Camera error:', error)}
              className="w-full h-60 border border-gray-300 rounded"
              captureButtonText="Take Photo" // Add capture button text if needed
            />
          ) : (
            <div className="relative w-full h-60 border border-gray-300 rounded overflow-hidden">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="Captured"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No image captured
                </div>
              )}
            </div>
          )}
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setImageSrc(null)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Clear Image
            </button>
            {imageSrc && (
              <a
                href={imageSrc}
                download="captured-image.png"
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Download Image
              </a>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Storai;
