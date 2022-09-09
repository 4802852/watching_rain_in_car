import React from "react";
import { useCanvas } from "../hooks/useCanvas";

const RainInCar = ({ canvasWidth, canvasHeight }) => {
  const fillBackground = (context) => {
    context.fillStyle = "rgb(31,31,36)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  const animate = (context) => {
    fillBackground(context);
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);
  return <canvas ref={canvasRef} />;
};

export default RainInCar;
