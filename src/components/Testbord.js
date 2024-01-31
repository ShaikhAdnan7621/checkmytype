"use client";
import React, { useEffect, useState } from "react";
import Keyboard from "./Keyboard";
import { space } from "postcss/lib/list";

function Testbord({ para: initialPara }) {
  const [inputText, setInput] = useState("");
  const [completedWords, setCompletedWords] = useState("");
  const [finalParagraph, setFinalParagraph] = useState([]);
  const [para, setPara] = useState(initialPara);
  const [isTestActive, setIsTestActive] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [activeKey, setActiveKey] = useState(""); // Set countdown start time

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
          ![
            "Enter",
            "Shift",
            "Control",
            "Alt",
            "Tab",
            "CapsLock",
            "Meta",
            "Escape",
            "ArrowRight",
            "ArrowLeft",
            "AltGraph",
            "ArrowUp",
            "ArrowDown",
          ].includes(key)
        ) {
          setInput(inputText + key);
        }
      };
      document.addEventListener("keydown", keydownHandler);
      // Log finalParagraph after 1 minute
      return () => document.removeEventListener("keydown", keydownHandler);
    }
  }, [inputText, para, completedWords, finalParagraph, isTestActive]);

  const startTest = () => {
    setIsTestActive(true);
    setCountdown(60);
    setTimeout(() => {
      setIsTestActive(false);
      setCompleted(true);
    }, 60000);
  };

  const animatekey = (key) => {
    setActiveKey(key);
    setTimeout(() => {
      setActiveKey("");
    }, 100);
  };
  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [countdown]);

  return (
    <div className="items-center justify-between h-screen pt-10">
      <h1 className="h-10 text-xl text-center">
        {" "}
        {isTestActive && <span>Remaning Time {countdown}</span>}
      </h1>

      <div className="flex justify-start items-center mt-8">
        <div className="w-1/2">
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
                  index === 0 ? "opacity-100 font-semibold" : "opacity-40"
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
                className={isCorrect ? "text-green-500" : "text-red-500"}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>
        <div className="min-w-8 h-14">
          <h1
            className={`text-4xl rounded-lg h-14 font-semibold text-nowrap font-sans overflow-hidden flex px-3 bg-opacity-50 ${
              inputText === para.split(" ")[0].slice(0, inputText.length)
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
        <div className="absolute top-0 ring-0 left-0 bottom-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 ">
          <div className=" rounded-full  p-2 bg-slate-200 shadow-2xl shadow-black  ">
            <button
              className="bg-gray-100 hover:bg-white text-black  font-bold active:scale-95 h-52 w-52 rounded-full shadow-inner  shadow-gray-500 focus:scale-105 text-3xl border-2 border-gray-500"
              onClick={startTest}
              tabIndex={1}
              autoFocus={true}
            >
              Start Test
            </button>
          </div>
        </div>
      )}
      {completed && (
        <div className="absolute top-0 ring-0 left-0 bottom-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 ">
          <div className=" rounded-lg p-2 bg-slate-200 shadow-2xl shadow-black  ">
            <div className="bg-gray-100 text-black h-56 w-72 sm:w-96 rounded-lg  shadow border-2 border-gray-500 p-3">
              <h1 className="text-2xl font-semibold text-center my-2">
                Test Completed
              </h1>

              <div className=" flex justify-around px-5 items-center">
                <div>
                  <div
                    className={` w-14 h-14 border rounded-full flex justify-center mx-auto items-center  ${
                      finalParagraph.length < 20
                        ? "bg-red-500"
                        : " bg-green-500 "
                    }`}
                  >
                    {finalParagraph.length}
                  </div>
                  <p className="text-center">PWM</p>
                </div>
                <div>
                  <div
                    className={` w-14 h-14 border rounded-full flex justify-center mx-auto items-center ${
                      (finalParagraph.filter(({ isCorrect }) => isCorrect)
                        .length /
                        finalParagraph.length) *
                        100 >
                      90
                        ? " bg-green-500 "
                        : " bg-red-500 "
                    } `}
                  >
                    {(finalParagraph.filter(({ isCorrect }) => isCorrect)
                      .length /
                      finalParagraph.length) *
                      100}
                    %
                  </div>
                  <p className="text-center">Acuracy</p>
                </div>
                <div>
                  <div
                    className={`w-14 h-14 border rounded-full flex justify-center mx-auto items-center ${
                      finalParagraph.filter(({ isCorrect }) => isCorrect)
                        .length < 20
                        ? "bg-red-500"
                        : " bg-green-500 "
                    } `}
                  >
                    {finalParagraph.filter(({ isCorrect }) => isCorrect).length}
                  </div>
                  <p className="text-center">Score</p>
                </div>
              </div>
              <div className="mt-5 text-center">
                <p>
                  Your Score is{" "}
                  <span
                    className={` ${
                      finalParagraph.filter(({ isCorrect }) => isCorrect)
                        .length < 20
                        ? "text-red-500"
                        : " text-green-500 "
                    }`}
                  >
                    {finalParagraph.filter(({ isCorrect }) => isCorrect).length} WPM
                  </span>{" "}
                  out of{" "}
                  <span
                    className={` ${
                      finalParagraph.length < 20
                        ? "text-red-500"
                        : " text-green-500 "
                    }`}
                  >
                    {finalParagraph.length} WPM
                  </span>{" "}
                  with Acuraccy of{" "}
                  <span
                    className={` ${
                      (finalParagraph.filter(({ isCorrect }) => isCorrect)
                        .length /
                        finalParagraph.length) *
                        100 <
                      20
                        ? "text-red-500"
                        : " text-green-500 "
                    }`}
                  >
                    {(finalParagraph.filter(({ isCorrect }) => isCorrect)
                      .length /
                      finalParagraph.length) *
                      100}
                    %
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Testbord;
