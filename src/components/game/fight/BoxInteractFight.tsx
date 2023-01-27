import React, { useEffect, useState } from "react";
import {
  slideReset,
  slideUp,
  slideDown,
  slideLateral,
} from "../../../utils/slideList";
import { ControllActivity } from "../../../utils/types";
import useNonInitialEffect from "../../../utils/useNonInitialEffect";

type BoxInteractFightProps = {
  setSubPanel: React.Dispatch<React.SetStateAction<string>>;
  subPanel: string;
  controll: ControllActivity;
  interact: boolean;
  interactSpell: boolean;
  setInteractSpell: React.Dispatch<React.SetStateAction<boolean>>;
  finishFight: () => void;
  closeBoxSpell: () => void;
};

const BoxInteractFight = ({
  setSubPanel,
  subPanel,
  controll,
  interact,
  interactSpell,
  setInteractSpell,
  finishFight,
  closeBoxSpell,
}: BoxInteractFightProps) => {
  const [countInteract, setCountInteract] = useState(0);

  useEffect(() => {
    setCountInteract(slideReset(countInteract, `.item_interact_fight`)); // eslint-disable-next-line
  }, [interact]);

  useNonInitialEffect(() => {
    if (subPanel === "none" && !interactSpell) {
      if (countInteract === 0 && controll.a) {
        setInteractSpell(true);
      }
      if (countInteract === 1 && controll.a) {
        setSubPanel("t2mon");
      }
      if (countInteract === 2 && controll.a) {
        setSubPanel("bag");
      }
      if (countInteract === 3 && controll.a) {
        finishFight();
      }
      if (controll.onlyZ) {
        setCountInteract(slideUp(countInteract, `.item_interact_fight`));
      }
      if (controll.onlyS) {
        setCountInteract(slideDown(countInteract, `.item_interact_fight`));
      }
      if (controll.onlyQ || controll.onlyD) {
        setCountInteract(slideLateral(countInteract, `.item_interact_fight`));
      }
    } // eslint-disable-next-line
  }, [controll]);

  return (
    <div className="container_interact_fight">
      <div
        className="item_interact_fight"
        onClick={() => {
          if (interactSpell) {
            closeBoxSpell();
          } else {
            setInteractSpell(true);
          }
        }}
      >
        SPELL
      </div>
      <div
        className="item_interact_fight"
        onClick={() => {
          setSubPanel("t2mon");
          if (interactSpell) {
            closeBoxSpell();
          }
        }}
      >
        TEAM
      </div>
      <div
        className="item_interact_fight"
        onClick={() => {
          setSubPanel("bag");
          if (interactSpell) {
            closeBoxSpell();
          }
        }}
      >
        BAG
      </div>
      <div
        className="item_interact_fight"
        onClick={() => {
          finishFight();
          if (interactSpell) {
            closeBoxSpell();
          }
        }}
      >
        RUN
      </div>
    </div>
  );
};

export default BoxInteractFight;
