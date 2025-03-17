"use client";
import "./globals.css";
import { FaPlus } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { CiCamera } from "react-icons/ci";
import { useRef, useState, useEffect } from "react";
import Footer from "../components/Footer";

export default function Home() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Камерийг нээх функц
  const startCamera = async () => {
    try {
      setCameraReady(false); // Камер ачаалагдаж дуустал бэлэн биш
      
      // Камераас видео стрим авах
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: "environment",  // Арын камерыг нээх
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }, 
        audio: false
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Видео ачаалагдаж бэлэн болсон үед
        videoRef.current.onloadeddata = () => {
          setCameraReady(true);
          console.log("Камер бэлэн болсон");
        };
        
        // Видеог тоглуулах
        try {
          await videoRef.current.play();
        } catch (err) {
          console.error("Видео тоглуулахад алдаа гарлаа:", err);
        }
        
        setIsCameraActive(true);
        setCapturedImage(null); // Шинээр камер нээхэд өмнөх зургийг арилгах
      }
    } catch (error) {
      console.error("Камер нээх боломжгүй байна", error);
      alert("Камер нээх боломжгүй байна. Та камерын зөвшөөрлийг шалгана уу.");
    }
  };

  // Камерийг хаах функц
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
      setCameraReady(false);
    }
  };

  // Зураг авах функц
  const captureImage = () => {
    // Камер бэлэн биш бол
    if (!cameraReady) {
      console.log("Камер бэлэн биш байна, түр хүлээнэ үү.");
      return;
    }
    
    if (canvasRef.current && videoRef.current) {
      try {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          // Видеоны өндөр өргөнийг авах
          const width = videoRef.current.videoWidth || 640;
          const height = videoRef.current.videoHeight || 480;
          
          canvasRef.current.width = width;
          canvasRef.current.height = height;
          
          console.log(`Зураг авч байна: ${width}x${height}`);
          
          // Видеоны дүрсийг канвас руу зурах
          context.drawImage(videoRef.current, 0, 0, width, height);
          
          // Canvas-г зураг болгон хадгалах
          const imageData = canvasRef.current.toDataURL("image/jpeg", 0.8);
          console.log("Зураг амжилттай авлаа");
          
          setCapturedImage(imageData);
          stopCamera(); // Зураг авсны дараа камерыг хаах
        }
      } catch (error) {
        console.error("Зураг авахад алдаа гарлаа:", error);
        alert("Зураг авахад алдаа гарлаа. Дахин оролдоно уу.");
      }
    }
  };


  // Утасны камераас авсан зургийг боловсруулах
  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Компонент устах үед камерыг хаах
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Камерын зөвшөөрлийг урьдчилан авах
  useEffect(() => {
    // Хуудас ачаалагдахад нэг удаа камерын зөвшөөрөл авах
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(stream => {
        // Зөвшөөрөл авсан бол стримийг хаах
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        console.log("Камерын зөвшөөрөл амжилттай авлаа");
      })
      .catch(err => {
        console.error("Камерын зөвшөөрөл авахад алдаа гарлаа:", err);
      });
  }, []);

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
              onClick={isCameraActive ? captureImage : startCamera} // Камераар авах аргыг ашиглах
            >
              <CiCamera className="w-[24px] h-[24px]" />
            </div>
          </div>
        </div>
        
        <div className="w-full h-[50px] bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10 mt-12 text-white flex items-center justify-between px-4 font-light">
          <input type="text" className="bg-transparent w-[300px] outline-none" placeholder="Хайх...." />
          <CiSearch className="w-[28px] h-[28px]" />
        </div>
        
        <div className="w-full flex flex-col items-center justify-center mt-8">
          {/* Web камерын харагдах хэсэг */}
          {isCameraActive && (
            <div className="w-full max-w-md relative">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted
                className="w-full h-auto rounded-[16px] border-2 border-blue-500" 
                style={{ minHeight: '300px', objectFit: 'cover' }}
              />
              <button 
                onClick={captureImage} 
                className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 ${cameraReady ? 'bg-blue-500' : 'bg-gray-500'} text-white rounded-full`}
                disabled={!cameraReady}
              >
                {cameraReady ? 'Зураг авах' : 'Ачааллаж байна...'}
              </button>
              <button 
                onClick={stopCamera} 
                className="absolute top-4 right-4 px-4 py-1 bg-red-500 text-white rounded-full text-sm"
              >
                Хаах
              </button>
            </div>
          )}
          
          {/* Авсан зургийн харагдах хэсэг */}
          {capturedImage && !isCameraActive && (
            <div className="w-full max-w-md relative">
              <img 
                src={capturedImage} 
                alt="Авсан зураг" 
                className="w-full h-auto rounded-[16px] border-2 border-green-500"
                style={{ minHeight: '300px', objectFit: 'contain' }} 
              />
              <button 
                onClick={startCamera} 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-blue-500 text-white rounded-full"
              >
                Дахин зураг авах
              </button>
            </div>
          )}
          
          {/* Камер идэвхгүй, зураг аваагүй үед харагдах хэсэг */}
          {!isCameraActive && !capturedImage && (
            <div 
              className="w-full max-w-md h-64 bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10 flex items-center justify-center cursor-pointer"
              onClick={startCamera}
            >
              <div className="text-center text-white">
                <CiCamera className="w-16 h-16 mx-auto opacity-50" />
                <p className="mt-2">Камер нээх</p>
              </div>
            </div>
          )}
          
          {/* Утасны камер ашиглах боломж */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            capture="environment"
            onChange={handleImageCapture}
          />
          
          {/* Canvas элемент - зураг боловсруулахад ашиглана */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </main>
      <Footer />
    </div>
  );
}