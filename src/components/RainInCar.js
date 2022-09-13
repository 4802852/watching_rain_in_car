import React from "react";
import { useCanvas } from "../hooks/useCanvas";
import { DropOnAir } from "./RainDropOnAir";
import { DropOnWindow, DropRemain } from "./RainDropOnWindow";
import Wiper from "./Wiper";
import { Slider } from "antd";

const RainInCar = ({ canvasWidth, canvasHeight }) => {
  // info definition
  let frequency = 50;
  let rainFall = 100;

  // Drop Number Info
  const dropNumberAir = canvasWidth < 500 ? 50 : 100;
  let dropUpdateNumberAir;
  const dropNumberWindow = canvasWidth < 500 ? 30 : 60;
  let dropUpdateNumberWindow;
  const setRainFall = (rainFall) => {
    dropUpdateNumberAir = Math.floor(dropNumberAir * ((rainFall * 0.8 + 20) / 100));
    dropUpdateNumberWindow = Math.floor(dropNumberWindow * ((rainFall * 0.8 + 20) / 100));
  };
  setRainFall(rainFall);

  // Slider Change Function
  const onFrequencyChange = (newValue) => {
    setWiperInterval(newValue);
    if (newValue === 0) isAuto = false;
    else isAuto = true;
  };

  const onRainFallChange = (newValue) => {
    setRainFall(newValue);
  };

  // Slider CSS
  const markColor = "rgb(230,230,230,0.7)";

  const frequencyMark = {
    0: {
      style: {
        color: markColor,
      },
      label: <strong>0, Manual (Click To Wipe Out)</strong>,
    },
    100: {
      style: {
        color: markColor,
      },
      label: <strong>100</strong>,
    },
  };

  const rainFallMark = {
    0: {
      style: {
        color: markColor,
      },
      label: <strong>0</strong>,
    },
    100: {
      style: {
        color: markColor,
      },
      label: <strong>100</strong>,
    },
  };

  // Background
  const fillBackground = (context) => {
    context.fillStyle = "rgb(31,31,31,0.5)";
    context.fillRect(0, 0, canvasWidth, canvasHeight);
  };

  // Wiper
  let IsWiping = false;
  let isAuto = true;
  let autoOn = false;

  const wiperVelocity = 0.012;
  const wiperLimit = 0.5;
  const wiper = new Wiper(canvasWidth, canvasHeight, wiperVelocity, wiperLimit);

  let wiperInterval;
  const setWiperInterval = (frequency) => {
    wiperInterval = ((wiperLimit * 4) / wiperVelocity / 60) * 1000 + 500 + (100 - frequency) * 40;
  };
  setWiperInterval(frequency);

  const startWiping = () => {
    if (!IsWiping && !isAuto) wipeStart();
  };

  const wipeStart = () => {
    IsWiping = true;
    setTimeout(() => {
      IsWiping = false;
    }, ((wiperLimit * 4) / wiperVelocity / 60) * 1000);
  };

  const autoWipe = () => {
    setTimeout(() => {
      wipeStart();
      autoOn = false;
    }, wiperInterval);
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
  for (let i = 0; i < dropNumberAir; i++) {
    drops.push(new DropOnAir(i, canvasWidth, canvasHeight));
  }

  // RainDrop on Window
  const windowDrops = [];
  for (let i = 0; i < dropNumberWindow; i++) {
    windowDrops.push(new DropOnWindow(i, canvasWidth, canvasHeight));
  }
  const remainDropNumber = 15;
  const windowDropRemains = [];
  for (let i = 0; i < dropNumberWindow * (remainDropNumber + 1); i++) {
    windowDropRemains.push(new DropRemain(i, canvasWidth, canvasHeight, remainDropNumber));
  }

  // Animation Render
  const animate = (context) => {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    // Background
    fillBackground(context);
    blurWindow(context);
    // Rain Drop
    for (let i = 0; i < dropNumberAir; i++) {
      drops[i].update(context, i <= dropUpdateNumberAir ? true : false);
    }
    // Wiper Movement
    if (isAuto && !autoOn) {
      autoOn = true;
      autoWipe();
    }
    let wiperData = wiper.animate(context, IsWiping);
    // Rain Drop on Window Remains
    for (let i = dropNumberWindow; i < dropNumberWindow * (remainDropNumber + 1); i++) {
      let dropData = windowDropRemains[i].getData();
      windowDropRemains[i - dropNumberWindow].draw(context, dropData);
    }
    // Rain Drop on Window
    for (let i = 0; i < dropNumberWindow; i++) {
      let dropData = windowDrops[i].draw(context, wiperData, i <= dropUpdateNumberWindow ? true : false);
      windowDropRemains[remainDropNumber * dropNumberWindow + i].draw(context, dropData);
    }
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <canvas ref={canvasRef} onMouseDown={startWiping} style={{ background: "url(/image/background.jpeg)", backgroundSize: "cover" }} />
      <div className="slider" style={{ bottom: "2rem", left: "1rem" }}>
        <Slider marks={rainFallMark} vertical defaultValue={100} onChange={onRainFallChange} />
      </div>
      <div className="slider" style={{ bottom: "2rem", left: "5rem" }}>
        <Slider marks={frequencyMark} vertical defaultValue={50} onChange={onFrequencyChange} />
      </div>
    </div>
  );
};

export default RainInCar;
