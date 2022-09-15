import React from "react";
import { useCanvas } from "../../hooks/useCanvas";
import { DropOnAir } from "./RainDropOnAir";
import { DropOnWindow, DropRemain } from "./RainDropOnWindow";
import Wiper from "./Wiper";
import "./RainInCar.css";

const RainInCar = ({ canvasWidth, canvasHeight }) => {
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
  const wiperInterval = ((wiperLimit * 4) / wiperVelocity / 60) * 1000 + +2000;
  const checkbox = document.getElementById("autoCheck");

  const startWiping = () => {
    if (isAuto) {
      isAuto = false;
      checkbox.checked = false;
    } else {
      if (!IsWiping) wipeStart();
    }
  };

  const wipeStart = () => {
    IsWiping = true;
    setTimeout(() => {
      IsWiping = false;
    }, ((wiperLimit * 4) / wiperVelocity / 60) * 1000);
  };

  const autoWipe = () => {
    wipeStart();
    setTimeout(() => {
      autoOn = false;
    }, wiperInterval);
  };

  const onChecked = (e) => {
    if (isAuto) isAuto = false;
    else isAuto = true;
    checkbox.checked = isAuto;
  };

  // Window Blur
  const windowData = wiper.windowdata();
  const blurWindow = (context) => {
    const { centerX, centerY, minRadius, maxRadius, THETA } = windowData;
    context.strokeStyle = "rgb(200,200,200,0)";
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
  const dropNumberAir = canvasWidth < 500 ? 50 : 100;
  const drops = [];
  for (let i = 0; i < dropNumberAir; i++) {
    drops.push(new DropOnAir(i, canvasWidth, canvasHeight));
  }

  // RainDrop on Window
  const dropNumberWindow = canvasWidth < 500 ? 30 : 60;
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
    drops.forEach((drop) => {
      drop.update(context);
    });
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
      let dropData = windowDrops[i].draw(context, wiperData);
      windowDropRemains[remainDropNumber * dropNumberWindow + i].draw(context, dropData);
    }
  };

  const canvasRef = useCanvas(canvasWidth, canvasHeight, animate);
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <canvas ref={canvasRef} onMouseDown={startWiping} style={{ background: "url(/image/background.jpeg)", backgroundSize: "cover" }} />
      <div className="checkboxGrid" style={{ bottom: "2rem", left: "1rem" }} onClick={onChecked}>
        <input type="checkbox" id="autoCheck" defaultChecked onClick={onChecked} />
        <label for="autoCheck"></label>
        <span style={{ fontSize: "1rem", color: "rgba(200,200,200,0.7)", cursor: "default" }}>
          <strong> Auto (Click to manually wipe out)</strong>
        </span>
      </div>
    </div>
  );
};

export default RainInCar;
