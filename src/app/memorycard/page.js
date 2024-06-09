"use client";
import React, { useState, useEffect } from "react";

const keyTypeEffectsrc = "/keyTypeEffect.mp3"; // Make sure this path is correct
const wrongKeyTypeEffectsrc = "wrongKeyTypeEffect.mp3";
export default function Page() {
    const emojiescounts = 8;
    const allEmojis = [
        "🍎",
        "🍌",
        "🍒",
        "🍇",
        "🍓",
        "🍉",
        "🍍",
        "🥭",
        "🐶",
        "🐱",
        "🦊",
        "🐼",
        "🐻",
        "🦁",
        "🐺",
        "🐇",
        "⚽",
        "🏀",
        "🏈",
        "🎾",
        "⚾",
        "🏐",
        "🏓",
        "🏏",
        "🏠",
        "🌳",
        "🌞",
        "⭐",
        "🌈",
        "🌊",
        "🚀",
        "✈️",
        "🚗",
        "🚲",
        "🚂",
        "🚁",
        "🚀",
        "🛸",
        "🍔",
        "🍕",
        "🌮",
        "🍦",
        "🍩",
        "☕",
        "🍷",
        "🍺",
        "🎉",
        "🎊",
        "🎈",
        "🎁",
        "🎄",
        "🎅",
        "👻",
        "🎃",
        "😈",
        "👿",
        "👽",
    ];
    let randomEmojies = allEmojis
        .sort(() => 0.5 - Math.random())
        .slice(0, emojiescounts);
    randomEmojies = randomEmojies.concat(randomEmojies);
    randomEmojies.sort(() => 0.5 - Math.random());

    const [emoji, setEmoji] = useState(randomEmojies);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);
    const [lastpickedcard, setLastpickedcard] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(60); // 1 minute (60 seconds)
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);

    // play audion
    const playaudio = (src) => {
        const audio = new Audio(src);
        audio.play();
    };

    useEffect(() => {
        let intervalId;
        if (isPlaying && timeRemaining > 0) {
            intervalId = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isPlaying, timeRemaining]);

    useEffect(() => {
        if (timeRemaining === 0) {
            setGameOver(true);
        }
        if (matchedCards.length === emoji.length) {
            setGameWon(true);
        }
    }, [timeRemaining, matchedCards, emoji.length]);

    const handleCardClick = (index) => {
        if (!isPlaying || gameOver || gameWon) {
            return;
        }
        if (matchedCards.includes(index)) {
            return;
        }
        if (lastpickedcard === index) {
            return;
        }

        setFlippedCards([...flippedCards, index]);
        if (lastpickedcard === null) {
            playaudio(keyTypeEffectsrc);
            setLastpickedcard(index);
            return;
        }
        if (emoji[index] === emoji[lastpickedcard]) {
            playaudio(keyTypeEffectsrc);
            setMatchedCards([...matchedCards, index, lastpickedcard]);
            setLastpickedcard(null);
        } else {
            playaudio(wrongKeyTypeEffectsrc);
            setTimeout(() => {
                setFlippedCards(
                    flippedCards.filter(
                        (i) => i !== index && i !== lastpickedcard
                    )
                );
                setLastpickedcard(null);
            }, 500); // Reduced the timeout for a quicker flip back
        }
    };
    const handleRestart = () => {
        let randomEmojies = allEmojis
            .sort(() => 0.5 - Math.random())
            .slice(0, emojiescounts);
        randomEmojies = randomEmojies.concat(randomEmojies);
        randomEmojies.sort(() => 0.5 - Math.random());
        setEmoji(randomEmojies);
        setFlippedCards([]);
        setMatchedCards([]);
        setLastpickedcard(null);
        setTimeRemaining(60);
        setGameOver(false);
        setGameWon(false);
        setIsPlaying(false);
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
            .toString()
            .padStart(2, "0")}`;
    };

    const gameResultMessage = () => {
        if (gameWon) {
            return (
                <div>
                    <h2 className="text-center text-2xl text-green-600">
                        Congratulation!
                    </h2>
                    <p className="text-center text-lg text-black mb-4">
                        You won the game!
                    </p>
                </div>
            );
        } else if (gameOver) {
            return (
                <div>
                    <h2 className="text-center text-3xl text-red-600 font-bold mb-2">
                        You Loss!
                    </h2>
                    <p className="text-center text-lg text-white mb-4">
                        Better luck next time!
                    </p>
                </div>
            );
        }
    };

    return (
        <div className="bg-gray-900 h-screen w-screen pt-10 px-5">
            <div>
                <h1 className="text-yellow-400 text-5xl text-center mb-10">
                    Memory Card
                </h1>
            </div>

            <div className="bg-gray-700 grid grid-cols-4 w-full max-w-96 sm:max-w-none  sm:w-96 sm:h-96 h-3/5 p-2 rounded-xl mx-auto">
                {isPlaying &&
                    emoji.map((e, i) => (
                        <div
                            key={i}
                            className="w-full h-full flex justify-center items-center relative"
                            onClick={() => handleCardClick(i)}
                        >
                            <div
                                className={`text-3xl w-14 h-14 sm:w-20 sm:h-20 bg-gray-800 shadow-sm flex justify-center items-center rounded-lg duration-500 ${
                                    flippedCards.includes(i)
                                        ? "rotate-y-0 opacity-100 "
                                        : "rotate-y-180 opacity-0"
                                }`}
                            >
                                {e}
                            </div>

                            <div
                                className={`text-3xl w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-br to-yellow-300 from-orange-500 shadow-md flex justify-center items-center rounded-lg absolute duration-500 text-white p-1 ${
                                    flippedCards.includes(i)
                                        ? "rotate-y-180 opacity-0 "
                                        : "rotate-y-0 opacity-100 "
                                }`}
                            >
                                <div className="w-full h-full bg-gray-800 flex justify-center items-center rounded-[6px]">
                                    ?
                                </div>
                            </div>
                        </div>
                    ))}
                {!isPlaying && (
                    <div className=" absolute top-0 left-0 w-full h-full bg-black bg-opacity-30">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-gradient-to-br to-yellow-400 from-orange-500 rounded-full w-72 h-72 p-2 hover:scale-105  transition-all duration-200 hover:duration-200 hover:shadow-[0_0px_12px_rgba(0,0,0,1)] ">
                            <button
                                className=" px-4 py-3 w-full h-full rounded-full bg-white text-black text-3xl italic font-bold flex justify-center items-center transition-all duration-200 hover:duration-200 hover:shadow-[inset_0_0px_12px_rgba(0,0,0,1)] "
                                onClick={() => setIsPlaying(true)}
                            >
                                start
                            </button>
                        </div>
                    </div>
                )}
                {(gameOver || gameWon) && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  bg-gradient-to-br to-yellow-400 from-orange-500 rounded-full w-72 h-72 p-2 hover:scale-105  transition-all duration-200 hover:duration-200 hover:shadow-[0_0px_12px_rgba(0,0,0,1)] ">
                            <div className=" px-2 py-3 w-full h-full rounded-full bg-white text-black text-3xl italic font-bold flex justify-center flex-col items-center transition-all duration-200 hover:duration-200 hover:shadow-[inset_0_0px_12px_rgba(0,0,0,1)] ">
                                {gameResultMessage()}
                                <button onClick={handleRestart}>
                                    Play Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="flex justify-between items-center mb-4 flex-col mt-10 gap-y-8">
                <h2 className="text-yellow-400 text-2xl font-bold ">
                    Time: {formatTime(timeRemaining)}
                </h2>
                {isPlaying && (
                    <div
                        className="bg-gradient-to-br to-yellow-400 from-orange-500 p-1 text-white w-full max-w-96 sm:max-w-none  sm:w-96 rounded-md opacity-80 hover:bg-opacity-100 transition duration-200 hover:duration-200 hover:shadow-[0_0px_12px_rgba(0,0,0,1)]" // Corrected hover class
                    >
                        <button
                            onClick={handleRestart}
                            className="w-full text-center bg-gray-800 text-white rounded-md p-2 hover:bg-gradient-to-br hover:to-yellow-400 hover:from-orange-500 transition-all duration-500"
                        >
                            Restart
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
