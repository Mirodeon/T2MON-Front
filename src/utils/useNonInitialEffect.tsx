import { useEffect, EffectCallback, DependencyList, useRef } from "react";

const useNonInitialEffect = (effect: EffectCallback, deps?: DependencyList) => {
  const initialRender = useRef(true);

  useEffect(() => {
    let effectReturns: any;

    if (initialRender.current) {
      initialRender.current = false;
    } else {
      effectReturns = effect();
    }

    if (effectReturns && typeof effectReturns === "function") {
      return effectReturns;
    } // eslint-disable-next-line
  }, deps);
};

export default useNonInitialEffect;
