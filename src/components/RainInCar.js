import React, { useState } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { DropOnAir } from "./RainDrop";
import Wiper from "./Wiper";

const RainInCar = ({ canvasWidth, canvasHeight }) => {
  // Background
  const fillBackground = (context) => {
    context.fillStyle = "rgb(31,31,36)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  // Wiper
  const [IsWiping, setIsWiping] = useState(false);
  const [WipeStart, setWipeStart] = useState(false);

  const wiperVelocity = 0.01;

  const wiper = new Wiper(canvasWidth, canvasHeight, wiperVelocity);

  const startWiping = () => {
    if (!IsWiping) setWipeStart(true);
  };

  // RainDrop
  const drops = [];
  let tempX, tempY, tempSpeed, tempLength;
  for (let i = 0; i < 200; i++) {
    tempX = Math.random() * canvasWidth;
    tempY = Math.random() * canvasHeight;
    tempSpeed = Math.random() * 3 + 1;
    tempLength = Math.random() * 5 + 2;
    drops.push(new DropOnAir(i, tempX, tempY, tempSpeed, tempLength));
  }

  // Animation Render
  const animate = (context) => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // Background
    fillBackground(context);
    // Rain Drop
    drops.forEach((drop) => {
      drop.y += drop.speed;
      if (drop.y > canvasHeight) {
        drop.y = 0;
        drop.x = Math.random() * canvasWidth;
        drop.speed = Math.random() * 3 + 1;
        drop.length = Math.random() * 5 + 2;
      }
      drop.draw(context);
    });
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
