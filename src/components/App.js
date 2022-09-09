import { useRef } from "react";
import { useClientWidthHeight } from "../hooks/useClientWidthHeight";
import "./App.css";
import RainInCar from "./RainInCar";

function App() {
  const appRef = useRef(null);
  const clientRect = useClientWidthHeight(appRef);
  const canvasWidth = clientRect.Width * 0.5;
  const canvasHeight = clientRect.Height * 0.5;

  return (
    <div className="App" ref={appRef}>
      <RainInCar canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
    </div>
  );
}

export default App;
