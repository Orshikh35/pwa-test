import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Counter: {count}</h1>
      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setCount(count + 1)}>+1</button>
        <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={() => setCount(count - 1)}>-1</button>
      </div>
    </div>
  );
}
