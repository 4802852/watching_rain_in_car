import { useRef, useEffect } from "react";

export const useCanvas = (canvasWidth, canvasHeight, animate) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const setCanvas = () => {
      const devicePixelRatio = window.devicePixelRatio ?? 1;
      if (canvas && context) {
        canvas.style.width = canvasWidth + "px";
        canvas.style.height = canvasHeight + "px";

        canvas.width = canvasWidth * devicePixelRatio;
        canvas.height = canvasHeight * devicePixelRatio;
        context.scale(devicePixelRatio, devicePixelRatio);
      }
    };
    setCanvas();

    let requestId;
    const requestAnimation = () => {
      requestId = window.requestAnimationFrame(requestAnimation);
      if (context) animate(context);
    };
    requestAnimation();
    return () => {
      window.cancelAnimationFrame(requestId);
    };
  }, [canvasWidth, canvasHeight, animate]);

  return canvasRef;
};
