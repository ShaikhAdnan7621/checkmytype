import React from "react";

const TestResults = ({ finalParagraph }) => {
  const correctWords = finalParagraph.filter(
    ({ isCorrect }) => isCorrect
  ).length;
  const totalWords = finalParagraph.length;
  const accuracy = ((correctWords / totalWords) * 100).toFixed(0);

  const ResultCircle = ({ value, label, isGood }) => (
    <div className="">
      <div
        className={`w-16 h-16  rounded-full flex justify-center mx-auto items-center shadow-lg  ${
          isGood ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {value}
      </div>
      <p className="text-center">{label}</p>
    </div>
  );

  return (
    <div className="absolute top-0 ring-0 left-0 bottom-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 ">
      <div className=" relative ">
        {
          //reload button
          <div>
            <button
              className="absolute -top-2 -right-2 p-2 h-9 w-9 flex justify-center items-center bg-red-500 text-white rounded-full"
              onClick={() => window.location.reload()}
            >
              x
            </button>
          </div>
        }
        <div className="rounded-lg p-2 bg-slate-300  shadow-lg">
          <div className=" bg-white text-black h-56 w-72 sm:w-96 rounded-lg shadow border-2 border-gray-500 p-3">
            <h1 className="text-2xl font-semibold text-center my-2">
              Test Completed
            </h1>
            <div className="flex justify-around px-5 items-center">
              <ResultCircle
                value={totalWords}
                label="PWM"
                isGood={totalWords >= 20}
              />
              <ResultCircle
                value={`${accuracy}%`}
                label="Accuracy"
                isGood={accuracy > 75}
              />
              <ResultCircle
                value={correctWords}
                label="Score"
                isGood={correctWords >= 20}
              />
            </div>
            <div className="mt-5 text-center">
              <p>
                You typed{" "}
                <span
                  className={
                    correctWords < 20 ? "text-red-500" : "text-green-500"
                  }
                >
                  {correctWords} WPM
                </span>{" "}
                correctly out of{" "}
                <span
                  className={
                    totalWords < 20 ? "text-red-500" : "text-green-500"
                  }
                >
                  {totalWords} WPM
                </span>{" "}
                total words, with an accuracy of{" "}
                <span
                  className={accuracy < 75 ? "text-red-500" : "text-green-500"}
                >
                  {accuracy}%
                </span>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
