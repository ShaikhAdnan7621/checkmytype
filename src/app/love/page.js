"use client";
import { useState, useEffect } from "react";

export default function ProposalPage() {
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [showProposal, setShowProposal] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({
    position: "relative",
    left: "0",
    top: "0",
  });
  const [showCongrats, setShowCongrats] = useState(false);
  const [congratsAnimation, setCongratsAnimation] = useState(false);

  const handleEnvelopeClick = () => {
    setShowEnvelope(false);
    setTimeout(() => {
      setShowProposal(true);
    }, 1000);
  };

  const handleYesClick = () => {
    setShowCongrats(true);
    setCongratsAnimation(true);
  };

  const handleNoClick = () => {
    // Randomly reposition the "No" button WITHIN the screen bounds
    const newLeft =
      Math.floor(Math.random() * (window.innerWidth - 300 - 50)) + 50 + "px"; // Add buffer to avoid going off-screen
    const newTop =
      Math.floor(Math.random() * (window.innerHeight - 300 - 50)) + 50 + "px"; // Add buffer to avoid going off-screen
    setNoButtonPosition({
      position: "absolute",
      left: newLeft,
      top: newTop,
    });
  };

  useEffect(() => {
    if (congratsAnimation) {
      const intervalId = setInterval(() => {
        const congratsElement = document.querySelector(".congrats");
        if (congratsElement) {
          congratsElement.classList.toggle("animate-pulse");
        }
      }, 500);

      return () => clearInterval(intervalId);
    }
  }, [congratsAnimation]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 via-pink-300 to-red-300 relative overflow-hidden p-4" // Prevent scrollbars
    >
      {showEnvelope && (
        <div className="bg-white rounded-lg shadow-xl p-8 text-center transform transition duration-500 hover:scale-110">
          <h1 className="text-4xl font-bold mb-4">A Surprise 🎁 Awaits You!</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out animate-bounce"
            onClick={handleEnvelopeClick}
          >
            Reveal
          </button>
        </div>
      )}
      {showProposal && (
        <div className="bg-white rounded-lg shadow-xl p-8 text-center transform transition duration-500 ">
          <h1 className="text-4xl font-bold mb-4">
            Will you join me on this adventure called life? 💕
          </h1>
          <div className="flex justify-center space-x-5">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={handleYesClick}
            >
              Absolutely! 🥰
            </button>
            <button
              style={noButtonPosition}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out"
              onClick={handleNoClick}
            >
              No
            </button>
          </div>
          {showCongrats && (
            <div className="mt-4 congrats">
              <h2 className="text-3xl font-bold text-green-500 animate-heartbeat">
                We're in this together! 🎉
              </h2>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
