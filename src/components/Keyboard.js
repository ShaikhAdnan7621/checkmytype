"use client";

import { useEffect, useState } from "react";

function Key({ letter, activeKey, size }) {
  if (activeKey === "Control") {
    activeKey = "Ctr";
  }
  if (activeKey === " ") {
    activeKey = "Space";
  }
  return (
    <button
      style={{ width: `${size * 4}px` }}
      className={` m-1 p-2 border rounded-lg border-gray-500  ${
        activeKey.toUpperCase() === letter
          ? " bg-gray-300 shadow-inner shadow-gray-600 "
          : " shadow shadow-gray-400 bg-white text-black"
      }`}
    >
      {letter.toUpperCase()}
    </button>
  );
}

export default function Keyboard({ pressedkey }) {
  const [activeKey, setActiveKey] = useState(pressedkey);


  // prettier-ignore
  const keyboardLayout = [
    {"`":8, "1":10, "2":10, "3":10, "4":10, "5":10, "6":10, "7":10, "8":10, "9":10, "0":10, "-":10, "=":10, "Back":21},
    {"Tab":19, "Q":10, "W":10, "E":10, "R":10, "T":10, "Y":10, "U":10, "I":10, "O":10, "P":10, "[":10, "]":10, "\\":10},
    {"Caps":19, "A":10, "S":10, "D":10, "F":10, "G":10, "H":10, "J":10, "K":10, "L":10, ";":10, "'":10, "Enter":22},
    {"SHIFT":26, "Z":10, "X":10, "C":10, "V":10, "B":10, "N":10, "M":10, ",":10, ".":10, "/":10, "shift":27 },
    {"CTR":12, "Fn":12, "ALT":12, "Space":62, "alt":12, "ctr":12, "<":12, "˄˅":13, ">":12}
  ];

  return (
    <div tabIndex="0" className="border border-gray-500 rounded-lg p-1 ">
      {keyboardLayout.map((row, index) => (
        <div className="flex justify-center" key={index}>
          {Object.entries(row).map(([letter, size]) => (
            <Key
              letter={letter}
              activeKey={activeKey}
              key={letter}
              size={size}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
