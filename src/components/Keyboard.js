"use client"

import { useEffect, useState } from "react";

function Key({ letter, activeKey, size }) {
    if(activeKey === "Control"){
        activeKey = "Ctr"
    }
    if(activeKey === " "){
        activeKey = "Space"
    }
  return (
    <button
      style={{ width: `${size * 4}px` }}
      className={` m-1 p-2 border rounded-lg border-gray-500  ${
        activeKey === letter ? " bg-gray-300 shadow-inner shadow-gray-600 " : " shadow shadow-gray-400 bg-white text-black"
      }`}
    >
      {letter.toUpperCase()}
    </button>
  );
}

export default function Keyboard({ pressedkey }) {
  const [activeKey, setActiveKey] = useState(pressedkey);

  useEffect(() => {
    setActiveKey(pressedkey);
  }, [pressedkey]);
  const numRow = "1234567890-=";
  const firstRow = "qwertyuiop[]\\";
  const secondRow = "asdfghjkl;'";
  const thirdRow = "zxcvbnm,./";

  return (
    <div tabIndex="0" className="border border-gray-500 rounded-lg p-1 ">
      <div className="flex justify-center">
        <Key letter={"`"} activeKey={activeKey} key={"`"} size={8} />

        {numRow.split("").map((letter) => (
          <Key letter={letter} activeKey={activeKey} key={letter} size={10} />
        ))}
        <Key letter={"Back"} activeKey={activeKey} key={"Back"} size={21} />
      </div>
      <div className="flex justify-center">
        <Key letter={"Tab"} activeKey={activeKey} key={"Tab"} size={19} />

        {firstRow.split("").map((letter) => (
          <Key letter={letter} activeKey={activeKey} key={letter} size={10} />
        ))}
      </div>
      <div className="flex justify-center">
        <Key letter={"Caps"} activeKey={activeKey} key={"C locl"} size={19} />
        {secondRow.split("").map((letter) => (
          <Key letter={letter} activeKey={activeKey} key={letter} size={10} />
        ))}
        <Key letter={"Enter"} activeKey={activeKey} key={"Enter"} size={22} />
      </div>
      <div className="flex justify-center">
        <Key letter={"Shift"} activeKey={activeKey} key={"Shift"} size={26} />
        {thirdRow.split("").map((letter) => (
          <Key letter={letter} activeKey={activeKey} key={letter} size={10} />
        ))}
        <Key letter={"Shift"} activeKey={activeKey} key={"Shift2"} size={27} />
      </div>
      <div className="flex justify-center">
        <Key letter={"Ctr"} activeKey={activeKey} key={"Ctr"} size={12} />
        <Key letter={"Fn"} activeKey={activeKey} key={"Fn"} size={12} />
        <Key letter={"Alt"} activeKey={activeKey} key={"Alt"} size={12} />
        <Key letter={"Space"} activeKey={activeKey} key={"Space"} size={62} />
        <Key letter={"Alt"} activeKey={activeKey} key={"Alt2"} size={12} />
        <Key letter={"Ctr"} activeKey={activeKey} key={"Ctr2"} size={12} />
        <Key letter={"<"} activeKey={activeKey} key={"<"} size={12} />
        <Key letter={"˄˅"} activeKey={activeKey} key={"˄˅"} size={13} />
        <Key letter={">"} activeKey={activeKey} key={">"} size={12} />
      </div>
    </div>
  );
}
