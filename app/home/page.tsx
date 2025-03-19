"use client";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { useRef, useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { IoIosClose } from "react-icons/io";
import Image from "next/image";

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Камерийг хаах функц
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };

  // Зураг авах функц
  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        // Видеоны өндөр өргөнийг авах
        canvasRef.current.width = videoRef.current.videoWidth || 640;
        canvasRef.current.height = videoRef.current.videoHeight || 480;

        // Видеоны дүрсийг канвас руу зурах
        context.drawImage(videoRef.current, 0, 0);

        // Canvas-г зураг болгон хадгалах
        const imageData = canvasRef.current.toDataURL("image/png");
        setCapturedImage(imageData);
        stopCamera(); // Зураг авсны дараа камерыг хаах
      }
    }
  };

  // Компонент устах үед камерыг хаах
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Шинэ камер товчны функц - Camera app руу шилжих
  const openNativeCamera = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "environment"; // Энэ шинж чанар нь төхөөрөмжийн камер нээх

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setCapturedImage(event.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  const handleCloseImage = () => {
    setCapturedImage(null); // Clear the captured image
    setIsCameraActive(false); // Optionally stop the camera
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-between bg-black">
      <main className="h-full w-full px-4 flex flex-col">
        <div className="w-full flex items-center justify-between pt-6">
          <h1 className="text-white text-[34px] font-semibold">Дасгалууд</h1>
          <div className="flex items-center gap-4">
            <div className="rounded-full h-[50px] w-[50px] text-white bg-slate-300/10 flex items-center justify-center">
              <FaPlus className="w-[24px] h-[24px]" />
            </div>
            <div
              className="rounded-full h-[50px] w-[50px] text-white bg-slate-300/10 flex items-center justify-center"
              onClick={openNativeCamera} // Камер-ийн товч дээр дарахад утасны апп нээж авна
            >
              <CiCamera className="w-[24px] h-[24px]" />
            </div>
          </div>
        </div>

        <div className="w-full h-[50px] bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10 mt-12 text-white flex items-center justify-between px-4 font-light">
          <input
            type="text"
            className="bg-transparent w-[300px] outline-none"
            placeholder="Хайх...."
          />
          <CiSearch className="w-[28px] h-[28px]" />
        </div>

        <div className="w-full flex flex-col items-center justify-center mt-8">
          {/* Web камерын харагдах хэсэг - Нэмэлт боломжоор */}
          {isCameraActive && (
            <div className="w-full max-w-md relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-auto rounded-[16px] border-2 border-blue-500"
                style={{ minHeight: "300px", objectFit: "cover" }}
              />
              <button
                onClick={captureImage}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-blue-500 text-white rounded-full"
              >
                Зураг авах
              </button>
              <button
                onClick={stopCamera}
                className="absolute top-4 right-4 px-4 py-1 bg-red-500 text-white rounded-full text-sm"
              >
                Хаах
              </button>
            </div>
          )}

          {capturedImage && !isCameraActive && (
            <div className="w-full max-w-md relative">
              <button
              onClick={handleCloseImage}
                className="absolute w-[40px] h-[40px] bg-slate-400/50  right-0 flex items-center justify-center mt-2 mr-3 text-white rounded-full"
              >
               <IoIosClose className="w-[28px] h-[28px]"/>
              </button>
              <Image
                src={capturedImage}
                alt="Авсан зураг"
                className="w-full h-auto rounded-[16px] "
                style={{ minHeight: "300px", objectFit: "contain" }}
              />
              <button
                onClick={openNativeCamera}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gray-300/50 text-white rounded-full"
              >
                Дахин зураг авах
              </button>
            </div>
          )}
          {capturedImage && !isCameraActive && (
            <div onClick={handleCloseImage} className="px-8 rounded-md py-2 flex items-center justify-center bg-slate-300/10 border-[1px] border-slate-400/10 text-white mt-8">
              Илгээх
            </div>
          )}
          {/* Камер идэвхгүй, зураг аваагүй үед харагдах хэсэг */}
          {!isCameraActive && !capturedImage && (
            <div
              className="w-full max-w-md h-64 bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10 flex items-center justify-center cursor-pointer"
              onClick={openNativeCamera}
            >
              <div className="text-center text-white">
                <CiCamera className="w-16 h-16 mx-auto opacity-50" />
                <p className="mt-2">Камер нээх</p>
              </div>
            </div>
          )}

          {/* Canvas элемент - зураг боловсруулахад ашиглана */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
