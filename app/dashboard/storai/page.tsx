"use client";

import DashboardLayout from '@/components/Dashboard/DashboardLayout';
import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'sonner';
import { useDropzone } from 'react-dropzone';

const Storai = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [pantryItems, setPantryItems] = useState<string[]>([]);
  const router = useRouter();

  const webcamRef = React.useRef<Webcam>(null);

  const capture = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImageSrc(screenshot);
      analyzeImage(screenshot);
    }
    setCameraActive(false);
  };

  const analyzeImage = async (imageBase64: string) => {
    setLoading(true);
    try {
      // Remove the data URL scheme prefix
      const base64Image = imageBase64.split(',')[1];

      const response = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate?key=please_add_your_key_for_result',
        {
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: 'LABEL_DETECTION',
                  maxResults: 10,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Extract labels from the response
      const items = response.data.responses[0].labelAnnotations.map((label: any) => label.description);
      setPantryItems(items);
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast.error('Error analyzing image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImageSrc(base64String);
      analyzeImage(base64String);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Capture or Upload Your Image</h1>
        <p className=' text-slate-500'>To enable this option you need to have Vision AI API Key</p>
        <div className="w-full max-w-md shadow-lg rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Camera Capture</h2>
            <button
              onClick={() => setCameraActive((prev) => !prev)}
              className="bg-purple-500 text-white px-4 py-2 rounded"
            >
              {cameraActive ? 'Close Camera' : 'Open Camera'}
            </button>
          </div>
          {cameraActive ? (
            <div className="w-full relative h-64 border border-gray-500 rounded flex justify-center items-center">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                height="100%"
              />
              <button
                onClick={capture}
                className="absolute bottom-4 right-4 bg-purple-500 text-white px-4 py-2 rounded"
              >
                Capture
              </button>
            </div>
          ) : (
            <div className="relative w-full h-64 border border-gray-300 rounded overflow-hidden">
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
          <div className="mt-4">
            <div
              {...getRootProps({ className: 'dropzone cursor-pointer border-dashed border-2 border-gray-300 p-4 rounded' })}
            >
              <input {...getInputProps()} />
              <p className="text-center text-gray-500">Drag & drop an image here, or click to select one</p>
            </div>
            <div className="mt-4 flex justify-between items-center">
              {imageSrc && (
                <a
                  href={imageSrc}
                  download="captured-image.png"
                  className="bg-purple-700 text-white px-4 py-2 rounded"
                >
                  Download Image
                </a>
              )}
            </div>
            <div className="mt-4">
              {loading ? (
                <p className="text-center text-gray-500">Analyzing image...</p>
              ) : (
                pantryItems.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Detected Pantry Items:</h3>
                    <ul className="list-disc list-inside">
                      {pantryItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )
              )}
              <Toaster richColors />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Storai;
