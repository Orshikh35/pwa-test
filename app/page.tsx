"use client";
import "./globals.css";
import { FaPlus } from "react-icons/fa6";
import { VscSettings } from "react-icons/vsc";
import Footer from "../components/Footer";
import { CiSearch } from "react-icons/ci";
export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col justify-between">
      <main className=" h-full w-full px-4 flex flex-col">
        <div className="w-full flex items-center justify-between ">
          <h1 className="text-white text-[34px] font-semibold">Workouts</h1>
          <div className="flex items-center gap-4">
            <div className="rounded-full h-[50px] w-[50px] text-white bg-slate-300/10 flex items-center justify-center">
              <FaPlus className="w-[24px] h-[24px]"/>
            </div>
            <div className="rounded-full h-[50px] w-[50px] text-white bg-slate-300/10 flex items-center justify-center">
              <VscSettings className="w-[24px] h-[24px]"/>
            </div>
          </div>
        </div>
        <div className="w-full h-[50px] bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10 mt-12 text-white flex items-center justify-between px-4 font-light">
          <input type="text" className="bg-transparent w-[300px] outline-none " placeholder="Хайх...."/>
          <CiSearch className="w-[28px] h-[28px]"/>
        </div>
        <div className="w-full flex items-center justify-between pt-6">
          <div className="w-[190px] h-[200px] bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10">
          <div className="flex gap-1 items-center">
          </div>
          </div>
          <div className="w-[190px] h-[200px] bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10"></div>
        </div>
        <div className="w-full h-[200px] bg-slate-300/10 rounded-[16px] border-[1px] border-gray-400/10 mt-4"></div>
        
      </main>
      <Footer />
    </div>
  );
}
