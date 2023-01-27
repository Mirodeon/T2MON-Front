import { useState, useEffect } from "react";
import { Responsive } from "./types";

const useResponsive = (): Responsive => {
  const [width, setWidth] = useState<number>(1024);
  const [height, setHeight] = useState<number>(768);
  const [page, setPage] = useState<HTMLElement | null>(null);
  window.onresize = () => {
    if (page) {
      setWidth(page.offsetWidth);
      setHeight(page.offsetHeight);
    }
  };

  useEffect(() => {
    let page: HTMLElement | null = document.querySelector(`#root`);
    if (page) {
      setPage(page);
      setWidth(page.offsetWidth);
      setHeight(page.offsetHeight);
    }
  }, []);

  return {
    width: width > 800 ? true : false,
    height: height > 600 ? true : false,
  };
};

export default useResponsive;
