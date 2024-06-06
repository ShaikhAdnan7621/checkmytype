"use client";
import React, { useEffect, useRef, useState } from "react";
import Keyboard from "./Keyboard";
import TestResults from "./TestResults";
import Link from "next/link";
const keyTypeEffectsrc = "/keyTypeEffect.mp3";
const wrongKeyTypeEffectsrc = "wrongKeyTypeEffect.mp3";

const Testbord = ({ para: initialPara }) => {
    const [inputText, setInput] = useState("");
    const [finalParagraph, setFinalParagraph] = useState([]);
    const [para, setPara] = useState(initialPara);
    const [isTestActive, setIsTestActive] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [activeKey, setActiveKey] = useState("");
    const [completedWords, setCompletedWords] = useState("");

    const startTest = () => {
        setIsTestActive(true);
        setCountdown(60);
        setTimeout(() => {
            setIsTestActive(false);
            setCompleted(true);
        }, 60000);
    };
    const animatekey = (key) => {
        console.log(key);
        setActiveKey(key);
        setTimeout(() => {
            setActiveKey("");
        }, 100);
    };

    useEffect(() => {
        if (isTestActive) {
            const keydownHandler = ({ key }) => {
                animatekey(key);
                if (key === "Backspace") {
                    setInput(inputText.slice(0, -1));
                } else if (key === " ") {
                    const [firstWord, ...remainingWords] = para.split(" ");
                    setCompletedWords(completedWords + " " + firstWord);
                    setPara(remainingWords.join(" "));
                    setFinalParagraph([
                        ...finalParagraph,
                        { word: inputText, isCorrect: inputText === firstWord },
                    ]);
                    setInput("");
                } else if (
                    // prettier-ignore
                    !["Enter",  "Shift",  "Control",  "Alt",  "Tab",  "CapsLock",  "Meta",  "Escape",  "ArrowRight",  "ArrowLeft",  "AltGraph",  "ArrowUp",  "ArrowDown", "Unidentified",  "AudioVolumeMute",
          "AudioVolumeUp",  "AudioVolumeDown",  "MediaTrackPrevious",  "MediaPlayPause",  "MediaTrackNext",  "Delete",  "Home",  "End",  "PageUp",  "PageDown",  "NumLock",  "Clear"].includes(key)
                ) {
                    setInput(inputText + key);
                    // prettier-ignore
                    const expectedText = para.split(" ")[0].slice(0, (inputText + key).length);
                    // prettier-ignore
                    const audioSrc = inputText + key === expectedText ? keyTypeEffectsrc : wrongKeyTypeEffectsrc;
                    const audio = new Audio(audioSrc);
                    audio.play();
                }
            };
            document.addEventListener("keydown", keydownHandler);
            return () =>
                document.removeEventListener("keydown", keydownHandler);
        }
    }, [inputText, para, finalParagraph, isTestActive]);

    useEffect(() => {
        if (countdown > 0) {
            const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timerId);
        }
    }, [countdown]);

    return (
        <div className="items-center justify-between h-screen pt-10">
            <div className="hidden sm:block"> 
                <Links />
            </div>
            <h1 className="h-10 text-xl text-center">
                {isTestActive && <span>Remaning Time {countdown}</span>}
            </h1>
            <div className="flex">
                <div className="w-1/2 h-14">
                    <h1 className="text-4xl font-normal text-nowrap font-sans flex justify-end gap-3 w-full overflow-hidden">
                        {completedWords.split(" ").map((word, index) => (
                            <span key={index} className="opacity-40 h-14">
                                {word}
                            </span>
                        ))}
                    </h1>
                </div>
                <div className="w-1/2 h-14">
                    <h1 className="text-4xl font-normal pl-3 text-nowrap font-sans flex gap-3 w-full overflow-hidden">
                        {para.split(" ").map((word, index) => (
                            <span
                                key={index}
                                className={`h-14 ${
                                    index === 0
                                        ? "opacity-100 font-semibold "
                                        : "opacity-40"
                                }`}
                            >
                                {word}
                            </span>
                        ))}
                    </h1>
                </div>
            </div>

            <div className="flex justify-start items-center">
                <div className="w-1/2 h-14">
                    <h1 className="text-4xl font-normal text-nowrap font-sans overflow-hidden gap-3 flex justify-end">
                        {finalParagraph.map(({ word, isCorrect }, index) => (
                            <span
                                key={index}
                                className={
                                    isCorrect
                                        ? "text-green-500"
                                        : "text-red-500"
                                }
                            >
                                {word}
                            </span>
                        ))}
                    </h1>
                </div>
                <div className="min-w-8 h-14">
                    <h1
                        className={`text-4xl rounded-lg h-14 font-semibold text-nowrap font-sans overflow-hidden flex px-3 bg-opacity-50 ${
                            inputText ===
                            para.split(" ")[0].slice(0, inputText.length)
                                ? ""
                                : "bg-red-200 shadow-sm"
                        }`}
                    >
                        {inputText}
                    </h1>
                </div>
            </div>
            <div className="flex items-center justify-center w-screen overflow-hidden mt-5">
                <Keyboard pressedkey={activeKey} />
            </div>
            {!isTestActive && !completed && (
                <div className="absolute top-0 ring-0 left-0 bottom-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="rounded-full p-2 bg-slate-200 shadow-2xl shadow-black">
                        <button
                            className="bg-gray-100 hover:bg-white text-black font-bold active:scale-95 h-52 w-52 rounded-full shadow-inner shadow-gray-500 focus:scale-105 text-3xl border-2 border-gray-500"
                            onClick={startTest}
                            tabIndex={1}
                            autoFocus={true}
                        >
                            Start Test
                        </button>
                    </div>
                </div>
            )}
            {completed && <TestResults finalParagraph={finalParagraph} />}
            <div className="sm:hidden mt-20"> 
                <Links />
            </div>
        </div>
    );
};

export default Testbord;

function Links() {
    return (
        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
            <Link className="mb-4 sm:mb-0" href={"/"}>
                <div className="text-center border w-full max-w-xs py-3 hover:bg-gray-300 px-4 rounded-lg sm:w-52">
                    Home
                </div>
            </Link>
            <h1 className="text-2xl sm:text-4xl font-normal text-center font-sans mb-4 sm:mb-0">
                Typing Test
            </h1>
            <Link className="" href={"/game"}>
                <div className="text-center border w-full max-w-xs py-3 hover:bg-gray-300 px-4 rounded-lg sm:w-52">
                    play Game
                </div>
            </Link>
        </div>
    );
}
