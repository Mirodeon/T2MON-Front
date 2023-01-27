import { useEffect, useRef } from "react";

const useTimeOut = (callback: () => any, delay: number | null) => {
  const savedCallback = useRef<(() => any) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };
    if (delay !== null) {
      let id = setTimeout(tick, delay);
      return () => clearTimeout(id);;
    }
  }, [delay]);
};

export default useTimeOut;