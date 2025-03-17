"use client";
import "./globals.css";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { useRef, useState } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Function to open the camera using getUserMedia
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // This opens the rear camera on most devices
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error("Could not access camera", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      setIsCameraActive(false);
    }
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        const imageData = canvasRef.current.toDataURL("image/png");
        console.log("Captured image data:", imageData);
      }
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-between">
      <main className="h-full w-full px-4 flex flex-col">
        <div className="w-full flex items-center justify-between ">
          <h1 className="text-white text-[34px] font-semibold">Workouts</h1>
          <div className="flex items-center gap-4">
            <div className="rounded-full h-[50px] w-[50px] text-white bg-slate-300/10 flex items-center justify-center">
              <FaPlus className="w-[24px] h-[24px]" />
            </div>
            <div
              className="rounded-full h-[50px] w-[50px] text-white bg-slate-300/10 flex items-center justify-center"
              onClick={startCamera}
            >
              <CiCamera className="w-[24px] h-[24px]" />
            </div>
          </div>
        </div>
        <div className="w-full h-[50px] bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10 mt-12 text-white flex items-center justify-between px-4 font-light">
          <input type="text" className="bg-transparent w-[300px] outline-none" placeholder="Хайх...." />
          <CiSearch className="w-[28px] h-[28px]" />
        </div>
        <div className="w-full flex items-center justify-between pt-6">
          <div className="w-[190px] h-[200px] bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10">
            {isCameraActive && (
              <video ref={videoRef} autoPlay playsInline className="w-full h-auto rounded-[16px]" />
            )}
          </div>
          <div className="w-[190px] h-[200px] bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10">
            <canvas ref={canvasRef} className="hidden" />
            <button onClick={captureImage} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
              Зураг авах
            </button>
            <button onClick={stopCamera} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">
              Камер унтраах
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
