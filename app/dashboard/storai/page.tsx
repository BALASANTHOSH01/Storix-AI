"use client";

import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation'; 

const Storai = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const router = useRouter(); 

  const capture = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImageSrc(screenshot);
      router.push('/dashboard/storai'); 
    }
    setCameraActive(false);
  };

  const webcamRef = React.useRef<Webcam>(null);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-xl font-bold mb-4">Capture or Upload Your Image</h1>
        <div className="w-full max-w-sm shadow-md rounded-lg p-4">
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
            <div className="w-full relative h-60 border border-gray-500 rounded flex justify-center items-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                height="100%"
              />
              <button
                onClick={capture}
                className="absolute bottom-4 right-4 bg-blue-500 text-white px-3 py-1 rounded"
              >
                Capture
              </button>
            </div>
          ) : (
            <div className="relative w-full h-60 border border-gray-300 rounded overflow-hidden">
              {imageSrc ? (
                <img
                  src={imageSrc}
                  alt="Captured"
                  className="object-cover w-full h-full"
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
