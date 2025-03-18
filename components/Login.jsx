import React from "react";
import BGImage from "../assets/pexels-aditya-aiyar-615049-1407305.jpg";
import Image from "next/image";

function Login() {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <Image
        src={BGImage}
        alt="bg"
        layout="fill"
        objectFit="cover"
        className="opacity-60"
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col  z-10  p-8 h-[800px] justify-between">
        <h1 className="text-white text-6xl font-bold pt-12">
          The best <br /> app for <br /> your plan.
        </h1>
        
        <div className="flex flex-col gap-4 mt-10 w-full ">
          <button className="text-white w-full bg-gray-600/30 border border-gray-400/40 py-3 text-lg rounded-xl">
            Нэвтрэх
          </button>
          <button className="text-white py-3 text-base rounded-xl underline">
            Бүртгүүлэх
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
