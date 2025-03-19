"use client";
import React from "react";
import { useRouter } from "next/navigation";
import BGImage from "../../assets/pexels-aditya-aiyar-615049-1407305.jpg";
import Image from "next/image";

function page() {
  const router = useRouter();

  return (
    <div className="relative h-screen w-full">
      <Image
        src={BGImage}
        alt="bg"
        layout="fill"
        objectFit="cover"
        className="opacity-60"
      />
      <div className="absolute inset-0 flex flex-col z-10 p-8 h-[800px] justify-between">
        <h1 className="text-white text-6xl font-bold pt-12">
          The best <br /> app for <br /> your plan.
        </h1>

        <div className="flex flex-col gap-4 mt-10 w-full">
          <button className="text-white w-full bg-gray-600/30 border border-gray-400/40 py-3 text-lg rounded-xl"
          onClick={() => router.push("/signup")}>
            Нэвтрэх
          </button>
          <button
            className="text-white py-3 text-base rounded-xl underline"
            onClick={() => router.push("/register")}
          >
            Бүртгүүлэх
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
