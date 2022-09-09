import React, { useState } from "react";
import { useCanvas } from "../hooks/useCanvas";
import Wiper from "./Wiper";

const RainInCar = ({ canvasWidth, canvasHeight }) => {
  //   const fillBackground = (context) => {
  //     context.fillStyle = "rgb(31,31,36)";
  //     context.fillRect(0, 0, canvasWidth, canvasHeight);
  //   };

  const [IsWiping, setIsWiping] = useState(false);
  const [WipeStart, setWipeStart] = useState(false);

  const wiperVelocity = 0.01;

  const wiper = new Wiper(canvasWidth, canvasHeight, wiperVelocity);

  const startWiping = () => {
    if (!IsWiping) setWipeStart(true);
  };


  const animate = (context) => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // Background
    // fillBackground(context);
    // Wiper Movement
    if (WipeStart) {
      setIsWiping(true);
      setWipeStart(false);
      setTimeout(() => {
        setIsWiping(false);
      }, ((0.4 * 4) / wiperVelocity / 60) * 1000);
    }
    if (IsWiping) {
      wiper.animate(context, wiperVelocity);
    } else {
      wiper.drawWiper(context);
    }
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);
  return <canvas ref={canvasRef} onMouseDown={startWiping} />;
};

export default RainInCar;
