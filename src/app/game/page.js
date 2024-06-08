"use client";

import { useState, useEffect, useRef, useCallback } from "react";
// import mp3

const keyTypeEffectsrc = "/keyTypeEffect.mp3";
const wrongKeyTypeEffectsrc = "wrongKeyTypeEffect.mp3";

const BOX_HEIGHT_RANGE = [100, 180];
const SPEED_INCREASE_INTERVAL = 5000; // Increase difficulty every 5 seconds
const INITIAL_SPEED = 1;
const INITIAL_SPEED_PER_PX = 1;
const INITIAL_BOX_GENERATION_SPEED = 1500; // Generate boxes every 1.5 seconds

export default function App() {
    const [score, setScore] = useState(0);
    const [lifeline, setLifeline] = useState(3);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [boxes, setBoxes] = useState({
        left: [],
        center: [],
        right: [],
    });
    const [clickableAreaColors, setClickableAreaColors] = useState({
        left: "bg-cyan-500",
        center: "bg-cyan-500",
        right: "bg-cyan-500",
    });

    // Refs for columns and game container
    const leftColumnRef = useRef(null);
    const centerColumnRef = useRef(null);
    const rightColumnRef = useRef(null);
    const gameContainerRef = useRef(null);

    // Speed and difficulty variables
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const [speedPerPx, setSpeedPerPx] = useState(INITIAL_SPEED_PER_PX);
    const [boxGenerationSpeed, setBoxGenerationSpeed] = useState(
        INITIAL_BOX_GENERATION_SPEED
    );

    // play music function
    const corectmusicplay = () => {
        const audio = new Audio(keyTypeEffectsrc);
        audio.play();
    };

    const wrongmusicplay = () => {
        const audio = new Audio(wrongKeyTypeEffectsrc);
        audio.play();
    };

    // Function to generate a new box
    const generateBox = () => {
        const height =
            Math.floor(
                Math.random() * (BOX_HEIGHT_RANGE[1] - BOX_HEIGHT_RANGE[0] + 1)
            ) + BOX_HEIGHT_RANGE[0];
        const marginTop = Math.floor(Math.random() * 50);
        return {
            height,
            top: 0 - height,
            marginTop,
        };
    };

    // Function to add a box to a random column
    const addBox = () => {
        const randomColumn = Math.floor(Math.random() * 3);
        const columnKeys = ["left", "center", "right"];
        const column = columnKeys[randomColumn];

        setBoxes((prevBoxes) => ({
            ...prevBoxes,
            [column]: [...prevBoxes[column], generateBox()],
        }));
    };

    // Update box positions based on speed
    const updateBoxPositions = useCallback(() => {
        setBoxes((prevBoxes) => ({
            left: prevBoxes.left.map((box) => ({
                ...box,
                top: box.top + speedPerPx,
            })),
            center: prevBoxes.center.map((box) => ({
                ...box,
                top: box.top + speedPerPx,
            })),
            right: prevBoxes.right.map((box) => ({
                ...box,
                top: box.top + speedPerPx,
            })),
        }));
    }, [speedPerPx]);

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(updateBoxPositions, speed);
            return () => clearInterval(interval);
        }
    }, [isPlaying, updateBoxPositions, speed]);

    // Generate new boxes at a specific interval
    useEffect(() => {
        if (isPlaying) {
            const interval = setInterval(addBox, boxGenerationSpeed);
            return () => clearInterval(interval);
        }
    }, [boxGenerationSpeed, isPlaying]);

    // Increase difficulty over time
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setSpeed((prevSpeed) => prevSpeed);
                setSpeedPerPx((prevSpeedPerPx) => prevSpeedPerPx + 0.1);
                setBoxGenerationSpeed((prevBoxGenerationSpeed) =>
                    prevBoxGenerationSpeed > 200
                        ? prevBoxGenerationSpeed - 20
                        : prevBoxGenerationSpeed
                );
            }, SPEED_INCREASE_INTERVAL);
            return () => clearInterval(interval);
        }
    }, [isPlaying]);

    // Check if boxes have gone out of bounds
    useEffect(() => {
        if (isPlaying) {
            const topPosition = window.innerHeight + 5;

            const outOfBoundsBoxes = [
                ...boxes.left.filter((box) => box.top >= topPosition),
                ...boxes.center.filter((box) => box.top >= topPosition),
                ...boxes.right.filter((box) => box.top >= topPosition),
            ];

            if (outOfBoundsBoxes.length > 0) {
                setBoxes((prevBoxes) => ({
                    left: prevBoxes.left.filter((box) => box.top < topPosition),
                    center: prevBoxes.center.filter(
                        (box) => box.top < topPosition
                    ),
                    right: prevBoxes.right.filter(
                        (box) => box.top < topPosition
                    ),
                }));

                // Decrease lifeline
                setLifeline((prevLifeline) => {
                    if (prevLifeline > 0) {
                        return prevLifeline - 1;
                    } else {
                        // Game over
                        setGameOver(true);
                        setIsPlaying(false);
                        return prevLifeline;
                    }
                });
            }
        }
    }, [boxes, isPlaying]);

    // Event listener for keyboard input
    useEffect(() => {
        if (isPlaying) {
            const handleKeyDown = (e) => {
                if (e.key === "f" || e.key === "F") {
                    handleBoxClick("left");
                } else if (e.key === "j" || e.key === "J") {
                    handleBoxClick("right");
                } else if (e.key === " ") {
                    handleBoxClick("center");
                }
            };
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [boxes, isPlaying]);

    // Function to handle box clicks
    const handleBoxClick = (column) => {
        const columnRef =
            column === "left"
                ? leftColumnRef.current
                : column === "center"
                ? centerColumnRef.current
                : rightColumnRef.current;

        // Find the box that has crossed the clickable area
        const box = boxes[column].filter(
            (box) =>
                box.top + box.height > columnRef.offsetHeight - 208 &&
                box.top + box.height < columnRef.offsetHeight
        );

        if (box.length > 0) {
            // Remove the box from the column
            setBoxes((prevBoxes) => ({
                ...prevBoxes,
                [column]: prevBoxes[column].filter(
                    (box) =>
                        box.top + box.height < columnRef.offsetHeight - 208 ||
                        box.top + box.height > columnRef.offsetHeight
                ),
            }));

            // Increase score
            setScore((prevScore) => prevScore + 1);
            corectmusicplay();
        } else {
            if (score > 0) {
                setScore((prevScore) => prevScore - 1);
            } else if (lifeline > 0) {
                setLifeline((prevLifeline) => prevLifeline - 1);
            } else {
                // Game over
                setGameOver(true);
                setIsPlaying(false);
            }
            wrongmusicplay();
            setClickableAreaColors((prevColors) => ({
                ...prevColors,
                [column]: "bg-red-500",
            }));

            // Reset the color after a short duration
            setTimeout(() => {
                setClickableAreaColors((prevColors) => ({
                    ...prevColors,
                    [column]: "bg-cyan-500",
                }));
            }, 200);
        }
    };

    // Function to handle game start
    const handleGameStart = () => {
        addBox(); // Generate the first box immediately
        setIsPlaying(true);
        setGameOver(false);
        setLifeline(3);
        setScore(0);
    };
    // Function to reset game
    const handleGameReset = () => {
        handleGameStart();
        setSpeed(INITIAL_SPEED);
        setSpeedPerPx(INITIAL_SPEED_PER_PX);
        setBoxGenerationSpeed(INITIAL_BOX_GENERATION_SPEED);
        setBoxes({
            left: [],
            center: [],
            right: [],
        });
    };

    return (
        <div className="h-screen relative flex items-center justify-center bg-sky-100">
            <div className="w-screen h-full flex flex-col items-center justify-center">
                <div
                    className="w-72 sm:w-[640px] relative h-full bg-gradient-to-b from-sky-300 to-pink-300 mx-auto rounded-lg flex transform rotate -mt-20"
                    style={{
                        transform:
                            "perspective(1000px) rotateX(20deg) scaleZ(0.9)",
                    }}
                    ref={gameContainerRef}
                >
                    {/* Columns for boxes */}
                    <div
                        ref={leftColumnRef}
                        className="w-1/3 relative h-screen overflow-hidden"
                    >
                        {boxes.left.map((box, i) => (
                            <div
                                key={i}
                                className="absolute left-1/2 -translate-x-1/2 w-4/5 bg-gradient-to-b from-sky-500 to-blue-600 mx-auto rounded-xl"
                                style={{
                                    height: box.height,
                                    top: box.top,
                                    marginTop: box.marginTop,
                                }}
                            />
                        ))}
                    </div>
                    <div className="border" />
                    <div
                        ref={centerColumnRef}
                        className="w-1/3 relative h-screen overflow-hidden"
                    >
                        {boxes.center.map((box, i) => (
                            <div
                                key={i}
                                className="absolute left-1/2 -translate-x-1/2 w-4/5 bg-gradient-to-b from-sky-500 to-blue-600 mx-auto rounded-xl"
                                style={{
                                    height: box.height,
                                    top: box.top,
                                    marginTop: box.marginTop,
                                }}
                            />
                        ))}
                    </div>
                    <div className="border" />
                    <div
                        ref={rightColumnRef}
                        className="w-1/3 relative h-screen overflow-hidden"
                    >
                        {boxes.right.map((box, i) => (
                            <div
                                key={i}
                                className="absolute  left-1/2 -translate-x-1/2 w-4/5 bg-gradient-to-b from-sky-500 to-blue-600 mx-auto rounded-xl "
                                style={{
                                    height: box.height,
                                    top: box.top,
                                    marginTop: box.marginTop,
                                }}
                            />
                        ))}
                    </div>

                    {/* Clickable Areas at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-52 w-full flex">
                        {["left", "center", "right"].map((column, i) => (
                            <div
                                key={i}
                                className="w-1/3 p-1"
                                onClick={() => handleBoxClick(column)}
                            >
                                <div
                                    className={`w-full relative h-full ${clickableAreaColors[column]} bg-opacity-35 rounded-lg`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Score and Lifeline */}
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-blue-600 flex items-center justify-center text-white font-bold py-1.5 px-2">
                    Press {`"F"`} for left, {`"J"`} for right, and {`"Space"`}
                    for center.
                </div>
                <div className="absolute top-0 left-0 right-0 h-12 bg-blue-600  items-center  text-white font-bold py-1.5 px-2 justify-around flex">
                    <span>Score: {score}</span>
                    <span>Lifeline: {lifeline}</span>
                </div>
            </div>

            {/* Start Game Modal */}
            {!isPlaying && !gameOver && (
                <div className="absolute top-0 left-0 h-screen w-screen bg-opacity-35 flex items-center justify-center bg-black group ">
                    <div className="bg-white h-72 w-72 shadow-lg place-content-center text-center rounded-full ">
                        <button
                            style={{ maxWidth: "400px" }}
                            onClick={handleGameStart}
                            className="bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Click to start
                        </button>
                    </div>
                </div>
            )}

            {/* Game Over Modal */}
            {gameOver && (
                <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-70 flex items-center justify-center">
                    <div
                        className="bg-white rounded-lg shadow-lg p-10 text-center"
                        style={{ maxWidth: "400px" }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
                        <p className="text-lg mb-6">
                            Your Final Score: {score}
                        </p>
                        <button
                            onClick={handleGameReset}
                            className="bg-gradient-to-br from-sky-500 to-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Restart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
