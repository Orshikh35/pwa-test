"use client";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";
import Google from "../../assets/image copy 2.png";
import Facebook from "../../assets/image.png";
import Apple from "../../assets/image copy.png";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  return (
    <div className="flex flex-col p-8">
      <button
        className="w-[50px] h-[50px] rounded-full bg-gray-400/10 flex justify-center items-center"
        onClick={() => router.push("/login")}
      >
        <IoIosArrowBack className="text-white" />
      </button>
      <div className="flex flex-col gap-2 text-white text-center mt-12">
        <h1 className="text-[48px] font-semibold">Register</h1>
        <p className="tracking-wider">Create your new account</p>
      </div>
      <div className="flex flex-col gap-4 w-full mt-8">
        <div className="text-white w-full  flex gap-3 items-center bg-gray-600/30 border border-gray-400/40 py-2 px-3 text-lg rounded-xl">
          <IoPerson className="" />
          <input type="text" className="w-full bg-transparent outline-none" />
        </div>
        <div className="text-white w-full  flex gap-3 items-center bg-gray-600/30 border border-gray-400/40 py-2 px-3 text-lg rounded-xl">
          <IoIosMail />
          <input type="text" className="w-full bg-transparent outline-none" />
        </div>
        <div className="text-white w-full  flex gap-3 items-center bg-gray-600/30 border border-gray-400/40 py-2 px-3 text-lg rounded-xl">
          <TbLockPassword />
          <input
            type="password"
            className="w-full bg-transparent outline-none"
          />
        </div>
        <button className="text-white w-full py-2 rounded-xl bg-blue-600 mt-6"
          onClick={() => router.push("/home")}>
          Login
        </button>
      </div>
      <div className="flex w-full gap-2 items-center justify-around mt-12">
        <p className="h-[0.5px] w-[100px]  bg-gray-400"></p>
        <p className="text-white/50 text-[12px]">Or continue with</p>
        <p className="h-[0.5px] w-[100px]  bg-gray-400"></p>
      </div>
      <div className="w-full flex justify-around  items-center mt-12">
        <img src={Facebook.src} alt="" className="w-[30px] h-[30px]" />
        <img src={Google.src} alt="" className="w-[30px] h-[30px]" />
        <img src={Apple.src} alt="" className="w-[30px] h-[30px]" />
      </div>
      <div className="flex items-center gap-2 justify-center mt-12">
        <p className="text-white/50 text-[12px]">Already have an account?</p>
        <p className="text-blue-600 text-[12px] underline">Sign up</p>
      </div>
    </div>
  );
}

export default page;
