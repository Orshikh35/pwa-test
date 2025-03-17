"use client";
import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="h-screen w-screen">
      <main className="bg-gray-400 h-full w-full flex flex-col items-center justify-center">
        <h1 className="text-white text-[30px]">Сайн байна уу!</h1>
        <p>Энэ бол PWA апп юм.</p>

        <div className="flex items-center gap-4 mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setCount(count - 1)}
          >
            -
          </button>
          <span className="text-white text-2xl">{count}</span>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={() => setCount(count + 1)}
          >
            +
          </button>
        </div>
      </main>
    </div>
  );
}
