import { useEffect, useState } from "react";

export const useClientWidthHeight = (ref) => {
  const [Width, setWidth] = useState(0);
  const [Height, setHeight] = useState(0);

  useEffect(() => {
    const setClientWidthHeight = () => {
      if (ref.current) {
        setWidth(ref.current.clientWidth);
        setHeight(ref.current.clientHeight);
      }
    };
    setClientWidthHeight();
    window.addEventListener("resize", setClientWidthHeight);

    return () => {
      window.addEventListener("resize", setClientWidthHeight);
    };
    // eslint-disable-next-line
  }, []);

  const clientRects = { Width, Height };

  return clientRects;
};
