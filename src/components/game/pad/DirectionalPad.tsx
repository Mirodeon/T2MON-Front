import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import gameSlice from "../../../store/slices/game";
import dispoSquare, { isAHut } from "../utils/map/dispoSquare";
import moveMap from "../utils/map/moveMap";
import useInterval from "../../../utils/useInterval";
import useGameControll from "../utils/useGameControll";
import { addClassName, removeClasseName } from "../../../utils/addClassName";
import isActive from "../../../utils/isActive";

type DirectionalPadProps = {
  position: string;
  setDirection: React.Dispatch<React.SetStateAction<string>>;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
  moving: boolean;
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
  subPanel: string;
};

const DirectionalPad = ({
  position,
  setDirection,
  setMoving,
  moving,
  setPanel,
  panel,
  subPanel,
}: DirectionalPadProps) => {
  const dispatch = useDispatch();
  const setPosition = () =>
    dispatch(gameSlice.actions.setPosition({ position }));

  let rMap = parseInt(position.split("-")[0]);
  let cMap = parseInt(position.split("-")[1]);
  let rSquare = parseInt(position.split("-")[2]);
  let cSquare = parseInt(position.split("-")[3]);

  const controll = useGameControll();

  useEffect(() => {
    moveMap(cSquare, rSquare, "load"); // eslint-disable-next-line
  }, []);

  useInterval(
    () => {
      keyMove();
    },
    moving ? 300 : null
  );

  useEffect(() => {
    setMoving(false); // eslint-disable-next-line
  }, [panel, subPanel]);

  useEffect(() => {
    if (panel === "game") {
      keyMove(controll.moving);
      setMoving(controll.moving);
    }
    if (controll.onlyZ) {
      addClassName("active", ".container_arrow.up_pad", 0);
    }
    if (controll.onlyS) {
      addClassName("active", ".container_arrow.down_pad", 0);
    }
    if (controll.onlyQ) {
      addClassName("active", ".container_arrow.left_pad", 0);
    }
    if (controll.onlyD) {
      addClassName("active", ".container_arrow.right_pad", 0);
    }
    if (isActive(".container_arrow.up_pad") && !controll.onlyZ) {
      removeClasseName("active", ".container_arrow.up_pad", 0);
    }
    if (isActive(".container_arrow.down_pad") && !controll.onlyS) {
      removeClasseName("active", ".container_arrow.down_pad", 0);
    }
    if (isActive(".container_arrow.left_pad") && !controll.onlyQ) {
      removeClasseName("active", ".container_arrow.left_pad", 0);
    }
    if (isActive(".container_arrow.right_pad") && !controll.onlyD) {
      removeClasseName("active", ".container_arrow.right_pad", 0);
    } // eslint-disable-next-line
  }, [controll.onlyZ, controll.onlyQ, controll.onlyS, controll.onlyD]);

  useEffect(() => {
    if (controll.a) {
      addClassName("active", ".container_circle.action_pad", 0);
    }
    if (controll.e) {
      addClassName("active", ".container_circle.back_pad", 0);
    }
    if (isActive(".container_circle.action_pad") && !controll.a) {
      removeClasseName("active", ".container_circle.action_pad", 0);
    }
    if (isActive(".container_circle.back_pad") && !controll.e) {
      removeClasseName("active", ".container_circle.back_pad", 0);
    } // eslint-disable-next-line
  }, [controll.a, controll.e]);

  const verticalMove = (
    edge: number,
    direction: number,
    newR: number,
    origin: string
  ) => {
    if (
      rSquare === edge &&
      dispoSquare(String(rMap - direction) + "-" + cMap, newR, cSquare)
    ) {
      rMap = rMap - direction;
      rSquare = newR;
      moveMap(cSquare, rSquare, origin);
      position = rMap + "-" + cMap + "-" + rSquare + "-" + cSquare;
      setPosition();
    } else if (
      rSquare !== edge &&
      dispoSquare(rMap + "-" + cMap, rSquare + direction, cSquare)
    ) {
      rSquare = rSquare + direction;
      moveMap(cSquare, rSquare);
      position = rMap + "-" + cMap + "-" + rSquare + "-" + cSquare;
      setPosition();
    } else if (
      rSquare !== edge &&
      isAHut(rMap + "-" + cMap, rSquare + direction, cSquare)
    ) {
      setPanel("hut");
    }
  };

  const lateralMove = (
    edge: number,
    direction: number,
    newC: number,
    origin: string
  ) => {
    if (
      cSquare === edge &&
      dispoSquare(rMap + "-" + String(cMap + direction), rSquare, newC)
    ) {
      cMap = cMap + direction;
      cSquare = newC;
      moveMap(cSquare, rSquare, origin);
      position = rMap + "-" + cMap + "-" + rSquare + "-" + cSquare;
      setPosition();
    } else if (
      cSquare !== edge &&
      dispoSquare(rMap + "-" + cMap, rSquare, cSquare + direction)
    ) {
      cSquare = cSquare + direction;
      moveMap(cSquare, rSquare);
      position = rMap + "-" + cMap + "-" + rSquare + "-" + cSquare;
      setPosition();
    } else if (
      cSquare !== edge &&
      isAHut(rMap + "-" + cMap, rSquare, cSquare + direction)
    ) {
      setPanel("hut");
    }
  };

  const keyMove = (init?: boolean) => {
    let currentDirection = "down";
    if (controll.onlyZ) {
      currentDirection = "up";
      verticalMove(1, -1, 7, "up");
    }
    if (controll.onlyQ) {
      currentDirection = "left";
      lateralMove(1, -1, 15, "left");
    }
    if (controll.onlyS) {
      currentDirection = "down";
      verticalMove(7, 1, 1, "down");
    }
    if (controll.onlyD) {
      currentDirection = "right";
      lateralMove(15, 1, 1, "right");
    }
    if (init) {
      setDirection(currentDirection);
    }
  };

  return (
    <div className="container_pad">
      <div className="pad">
        <div className="container_arrow up_pad">
          <div className="arrow up"></div>
        </div>
        <div className="container_arrow down_pad">
          <div className="arrow down"></div>
        </div>
        <div className="container_arrow left_pad">
          <div className="arrow left"></div>
        </div>
        <div className="container_arrow right_pad">
          <div className="arrow right"></div>
        </div>
      </div>
      <div className="pad">
        <div className="container_circle action_pad">
          <div className="circle action"></div>
        </div>
        <div className="container_circle back_pad">
          <div className="circle back"></div>
        </div>
      </div>
    </div>
  );
};

export default DirectionalPad;
