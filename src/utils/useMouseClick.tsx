import { useState, useEffect } from "react";

const useMouseClick = (selector: string) => {
  const [mousePressed, setMousePressed] = useState(false);

  const downHandler = () => {
    setMousePressed(true);
  };

  const upHandler = () => {
    setMousePressed(false);
  };

  useEffect(() => {
    let target: HTMLElement | null = document.querySelector(`${selector}`);
    if (target) {
      target.addEventListener("mousedown", downHandler);
      target.addEventListener("mouseup", upHandler);
    }
    return () => {
      if (target) {
        target.removeEventListener("mousedown", downHandler);
        target.removeEventListener("mouseup", upHandler);
      }
    };
    // eslint-disable-next-line
  }, []);

  return mousePressed;
};

export default useMouseClick;
