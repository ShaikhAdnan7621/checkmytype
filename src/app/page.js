import React from "react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="w-screen h-screen flex justify-center items-center">
            <div className="">
                <div className="h-20">
                    <Link className="" href={"typingtest"}>
                        <div className="text-center border w-52 box-border py-3 hover:bg-gray-300 px-12 rounded-lg">
                            Typing Test
                        </div>
                    </Link>
                </div>
                <div className="h-20">
                    <Link className="" href={"/game"}>
                        <div className="text-center border w-52 box-border py-3 hover:bg-gray-300 px-12 rounded-lg">
                            play Game
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}
