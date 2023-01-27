import React, { useState, useEffect } from "react";
import useInterval from "../../../utils/useInterval";
import { DataFrame } from "../../../utils/types";
import * as data from "../../../img/character";

type CharacterProps = {
  direction: string;
  moving: boolean;
};

const Character = ({ direction, moving }: CharacterProps) => {
  
  const dataFrame: DataFrame = {
    down: [data.cFM1, data.cF1, data.cFM2, data.cF2],
    up: [data.cBM1, data.cB1, data.cBM2, data.cB2],
    left: [data.cLM1, data.cL1, data.cLM2, data.cL2],
    right: [data.cRM1, data.cR1, data.cRM2, data.cR2],
  };

  const [sheet, setSheet] = useState(data.cF2);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    setFrame(1);
    setSheet(dataFrame[direction][moving ? 0 : 3]); // eslint-disable-next-line
  }, [direction, moving]);

  useInterval(
    () => {
      setSheet(dataFrame[direction][frame]);
      if (frame === 3) {
        setFrame(0);
      } else {
        setFrame(frame + 1);
      }
    },
    moving ? 150 : null
  );

  return (
    <div className="container_character">
      <img className="img_character" src={sheet} alt="character" />
    </div>
  );
};

export default Character;
