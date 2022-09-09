import React from "react";
import { useCanvas } from "../hooks/useCanvas";
import { DropOnAir, DropOnWindow } from "./RainDrop";
import Wiper from "./Wiper";

const RainInCar = ({ canvasWidth, canvasHeight }) => {
  // Background
  const fillBackground = (context) => {
    context.fillStyle = "rgb(31,31,36)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  // Wiper
  let IsWiping = false;
  let WipeStart = false;

  const wiperVelocity = 0.01;
  const wiper = new Wiper(canvasWidth, canvasHeight, wiperVelocity);

  const startWiping = () => {
    if (!IsWiping) WipeStart = true;
  };

  // RainDrop
  const drops = [];
  for (let i = 0; i < (canvasWidth < 500 ? 50 : 100); i++) {
    drops.push(new DropOnAir(i, canvasWidth, canvasHeight));
  }

  // RainDrop on Window
  const windowDrops = [];
  for (let i = 0; i < (canvasWidth < 500 ? 15 : 30); i++) {
    windowDrops.push(new DropOnWindow(i, canvasWidth, canvasHeight));
  }

  // Animation Render
  const animate = (context) => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // Background
    fillBackground(context);
    // Rain Drop
    drops.forEach((drop) => drop.update(context));
    // Wiper Movement
    if (WipeStart) {
      IsWiping = true;
      WipeStart = false;
      setTimeout(() => {
        IsWiping = false;
      }, ((0.4 * 4) / wiperVelocity / 60) * 1000);
    }
    let wiperData = wiper.animate(context, IsWiping);
    // Rain Drop on Window
    windowDrops.forEach((drop) => drop.draw(context, wiperData));
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);
  return <canvas ref={canvasRef} onMouseDown={startWiping} />;
};

export default RainInCar;
