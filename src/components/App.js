import React, { useRef } from "react";
import { useClientWidthHeight } from "../hooks/useClientWidthHeight";
import "./App.css";
import RainInCar from "./RainInCar2/RainInCar";

function App() {
  const appRef = useRef(null);
  const clientRect = useClientWidthHeight(appRef);
  let canvasWidth, canvasHeight;

  if (clientRect.Width >= (clientRect.Height * 16) / 9) {
    canvasWidth = (clientRect.Height * 16) / 9;
    canvasHeight = clientRect.Height;
  } else {
    canvasWidth = clientRect.Width;
    canvasHeight = (clientRect.Width / 16) * 9;
  }

  return (
    <div className="App" ref={appRef} style={{ flexDirection: "column" }}>
      <RainInCar canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
    </div>
  );
}

export default App;
