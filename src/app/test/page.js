"use client";

import React, { useEffect, useState } from "react";

export default function Page() {
    const [boxinleftside, setboxinleftc] = useState([]);
    useEffect(() => {
        let box = [
            {
                height: 200,
                top: 0,
                margintop: 50,
            },
        ];
        setboxinleftc(box, ...boxinleftside);
    }, []);

    // move this box down one pixel every second
    useEffect(() => {
        const interval = setInterval(() => {
            setboxinleftc((prev) =>
                prev.map((box) => ({
                    ...box,
                    top: box.top + 1,
                }))
            );
        }, 10);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setboxinleftc((prev) => [
                ...prev,
                {
                    height: 200,
                    top: 0,
                    margintop: 50,
                },
            ]);
        }, 5000);
        return () => clearInterval(interval);
    }, []);



    return (
        <div className="w-screen h-full">
            <div className="w-1/3 relative bg-green-500 h-screen">
                {boxinleftside.map((box, i) => {
                    return (
                        <div
                            key={i}
                            className="absolute w-4/5 bg-red-500 mx-auto"
                            style={{
                                height: box.height,
                                top: box.top,
                                marginTop: box.margintop,
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
