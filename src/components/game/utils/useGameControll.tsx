import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { ControllActivity } from "../../../utils/types";
import useKeyPress from "../../../utils/useKeyPress";
import useMouseClick from "../../../utils/useMouseClick";

const useGameControll = (): ControllActivity => {
  const keyboard = useSelector((state: RootState) => state.keyboard);
  // directional keyboard
  const zPressed = useKeyPress(keyboard.zKey); //up
  const qPressed = useKeyPress(keyboard.qKey); //left
  const sPressed = useKeyPress(keyboard.sKey); //down
  const dPressed = useKeyPress(keyboard.dKey); //right
  const aPressed = useKeyPress(keyboard.aKey); //action
  const ePressed = useKeyPress(keyboard.eKey); //back
  // directional mouseclick
  const zClicked = useMouseClick(".up_pad"); //up
  const qClicked = useMouseClick(".left_pad"); //left
  const sClicked = useMouseClick(".down_pad"); //down
  const dClicked = useMouseClick(".right_pad"); //right
  const aClicked = useMouseClick(".action_pad"); //action
  const eClicked = useMouseClick(".back_pad"); //back
  // menu keyboard
  const space = useKeyPress(keyboard.spaceKey); //menu
  const p = useKeyPress(keyboard.pKey); //param
  // other keyboard
  const enter = useKeyPress("Enter");
  const escape = useKeyPress("Escape");
  const arrowUp = useKeyPress("ArrowUp");
  const arrowLeft = useKeyPress("ArrowLeft");
  const arrowDown = useKeyPress("ArrowDown");
  const arrowRight = useKeyPress("ArrowRight");

  const z = zPressed || zClicked || arrowUp;
  const q = qPressed || qClicked || arrowLeft;
  const s = sPressed || sClicked || arrowDown;
  const d = dPressed || dClicked || arrowRight;
  const a = aPressed || aClicked || enter;
  const e = ePressed || eClicked || escape;
  const onlyZ = z && !q && !s && !d;
  const onlyQ = !z && q && !s && !d;
  const onlyS = !z && !q && s && !d;
  const onlyD = !z && !q && !s && d;

  const controllActivity = {
    z: z,
    q: q,
    s: s,
    d: d,
    a: a,
    e: e,
    space: space,
    p: p,
    moving: onlyZ || onlyQ || onlyS || onlyD,
    onlyZ: onlyZ,
    onlyQ: onlyQ,
    onlyS: onlyS,
    onlyD: onlyD,
    onlySpace: space && !p,
    onlyP: !space && p,
  };

  return controllActivity;
};

export default useGameControll;
