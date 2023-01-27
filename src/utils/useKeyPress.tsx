import { useState, useEffect } from "react";

type handlerProps = {
  key: KeyboardEvent["key"];
};
const useKeyPress = (targetKey: string) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({ key }: handlerProps) => {
    if (key === targetKey) setKeyPressed(true);
  };

  const upHandler = ({ key }: handlerProps) => {
    if (key === targetKey) setKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line
  }, []);

  return keyPressed;
};

export default useKeyPress;
