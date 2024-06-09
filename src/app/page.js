import React from "react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-screen h-screen flex justify-center items-center bg-gray-900">
            <div className="text-yellow-400">
                <h1 className="text-5xl text-center mb-10 font-bold">
                    Game Zone
                </h1>
                <div className="grid grid-cols-1 gap-6">
                    <Link
                        href={"typingtest"}
                        className="bg-gradient-to-br to-yellow-400 from-orange-500 p-1 text-white w-full max-w-96 sm:max-w-none  sm:w-96 rounded-lg opacity-80 hover:bg-opacity-100 transition duration-200 hover:duration-200 hover:shadow-[0_0px_12px_rgba(0,0,0,1)]" // Corrected hover class
                    >
                        <div className="w-full text-center bg-gray-800 text-white rounded-md p-2 hover:bg-gradient-to-br hover:to-yellow-400 hover:from-orange-500 transition-all duration-500 ">
                            Typing Test
                        </div>
                    </Link>
                    <Link
                        href={"memorycard"}
                        className="bg-gradient-to-br to-yellow-400 from-orange-500 p-1 text-white w-full max-w-96 sm:max-w-none  sm:w-96 rounded-lg opacity-80 hover:bg-opacity-100 transition duration-200 hover:duration-200 hover:shadow-[0_0px_12px_rgba(0,0,0,1)]" // Corrected hover class
                    >
                        <div className="w-full text-center bg-gray-800 text-white rounded-md p-2 hover:bg-gradient-to-br hover:to-yellow-400 hover:from-orange-500 transition-all duration-500">
                            Memory Card
                        </div>
                    </Link>
                    <Link
                        href={"catchthebox"}
                        className="bg-gradient-to-br to-yellow-400 from-orange-500 p-1 text-white w-full max-w-96 sm:max-w-none  sm:w-96 rounded-lg opacity-80 hover:bg-opacity-100 transition duration-200 hover:duration-200 hover:shadow-[0_0px_12px_rgba(0,0,0,1)]" // Corrected hover class
                    >
                        <div className="w-full text-center bg-gray-800 text-white rounded-md p-2 hover:bg-gradient-to-br hover:to-yellow-400 hover:from-orange-500 transition-all duration-500">
                            Catch The Box
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
