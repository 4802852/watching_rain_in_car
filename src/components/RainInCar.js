import React from "react";
import { useCanvas } from "../hooks/useCanvas";
import { DropOnAir } from "./RainDropOnAir";
import { DropOnWindow, DropRemain } from "./RainDropOnWindow";
import Wiper from "./Wiper";

const RainInCar = ({ canvasWidth, canvasHeight }) => {
  // Background
  const fillBackground = (context) => {
    context.fillStyle = "rgb(31,31,31,0.5)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  // Wiper
  let IsWiping = false;
  let WipeStart = false;

  const wiperVelocity = 0.012;
  const wiperLimit = 0.5;
  const wiper = new Wiper(canvasWidth, canvasHeight, wiperVelocity, wiperLimit);

  const startWiping = () => {
    if (!IsWiping) WipeStart = true;
  };

  // Window Blur
  const windowData = wiper.windowdata();
  const blurWindow = (context) => {
    const { centerX, centerY, minRadius, maxRadius, THETA } = windowData;
    context.beginPath();
    context.strokeStyle = "rgb(0,0,0, 0)";
    context.beginPath();
    context.moveTo(0, canvasHeight);
    context.lineTo(0, 0);
    context.lineTo(canvasWidth, 0);
    context.lineTo(canvasWidth, canvasHeight);
    context.lineTo(0, canvasHeight);
    context.arc(centerX, centerY, minRadius, THETA - Math.PI, THETA - Math.PI + wiperLimit * 2);
    context.arc(centerX, centerY, maxRadius, THETA - Math.PI + wiperLimit * 2, THETA - Math.PI, true);
    context.lineTo(centerX + minRadius * Math.cos(THETA - Math.PI), centerY + minRadius * Math.sin(THETA - Math.PI));
    context.closePath();
    context.stroke();
    context.fillStyle = "rgb(200,200,200,0.3)";
    context.fill();
  };

  // RainDrop on Air
  const drops = [];
  for (let i = 0; i < (canvasWidth < 500 ? 50 : 100); i++) {
    drops.push(new DropOnAir(i, canvasWidth, canvasHeight));
  }

  // RainDrop on Window
  const dropNumber = canvasWidth < 500 ? 20 : 40;
  const windowDrops = [];
  for (let i = 0; i < dropNumber; i++) {
    windowDrops.push(new DropOnWindow(i, canvasWidth, canvasHeight));
  }
  const reaminDropNumber = 15;
  const windowDropRemains = [];
  for (let i = 0; i < dropNumber * (reaminDropNumber + 1); i++) {
    windowDropRemains.push(new DropRemain(i, canvasWidth, canvasHeight, reaminDropNumber));
  }

  // Animation Render
  const animate = (context) => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // Background
    fillBackground(context);
    blurWindow(context);
    // Rain Drop
    drops.forEach((drop) => drop.update(context));
    // Wiper Movement
    if (WipeStart) {
      IsWiping = true;
      WipeStart = false;
      setTimeout(() => {
        IsWiping = false;
      }, ((wiperLimit * 4) / wiperVelocity / 60) * 1000);
    }
    let wiperData = wiper.animate(context, IsWiping);
    // Rain Drop on Window Remains
    for (let i = dropNumber; i < dropNumber * (reaminDropNumber + 1); i++) {
      let dropData = windowDropRemains[i].getData();
      windowDropRemains[i - dropNumber].draw(context, dropData);
    }
    // Rain Drop on Window
    windowDrops.forEach((drop, index) => {
      let dropData = drop.draw(context, wiperData);
      //   console.log(dropData);
      windowDropRemains[reaminDropNumber * dropNumber + index].draw(context, dropData);
    });
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);
  return <canvas ref={canvasRef} onMouseDown={startWiping} style={{ background: "url(/image/background.jpeg)", backgroundSize: "cover" }} />;
};

export default RainInCar;
