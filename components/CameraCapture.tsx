// CameraCapture.tsx (эсвэл .jsx)
'use client'
import React, { useState, useRef, useEffect } from "react";

// Пропс-ийн интерфэйс тодорхойлох
interface CameraCaptureProps {
  setImage: React.Dispatch<React.SetStateAction<string | null>>;  // Пропс 'setImage'
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ setImage }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        setStream(newStream);
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (error) {
        console.error("Камер ашиглах боломжгүй:", error);
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        setImage(canvasRef.current.toDataURL("image/png"));
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <video ref={videoRef} autoPlay playsInline className="w-full h-auto max-h-[70vh] mb-4" />
      <canvas ref={canvasRef} className="hidden" />
      <button
        onClick={captureImage}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Зураг авах
      </button>
    </div>
  );
};

export default CameraCapture;
