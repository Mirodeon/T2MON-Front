import React, { useEffect } from "react";
import useGameControll from "../utils/useGameControll";

type MenuPadProps = {
  setPanel: React.Dispatch<React.SetStateAction<string>>;
  panel: string;
  setMoving: React.Dispatch<React.SetStateAction<boolean>>;
  setSubPanel: React.Dispatch<React.SetStateAction<string>>;
};

const MenuPad = ({ setPanel, panel, setMoving, setSubPanel }: MenuPadProps) => {
  const controll = useGameControll();

  const handleDisplayMenu = () => {
    if (panel !== "menu") {
      setPanel("menu");
      setMoving(false);
    } else {
      setPanel("game");
    }
    setSubPanel("none");
  };
  const handleDisplayParam = () => {
    if (panel !== "param") {
      setPanel("param");
      setMoving(false);
    } else {
      setPanel("game");
    }
    setSubPanel("none");
  };

  useEffect(() => {
    if (panel !== "fight" && panel !== "save") {
      if (controll.onlySpace) {
        handleDisplayMenu();
      }
      if (controll.onlyP) {
        handleDisplayParam();
      }
    } // eslint-disable-next-line
  }, [controll.space, controll.p]);

  return (
    <div className="container_padMenu">
      <div className="padMenu">
        <div
          className={"nav_btn" + (panel === "param" ? " active" : "")}
          {...(panel !== "fight" &&
            panel !== "save" && { onClick: handleDisplayParam })}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Settings
        </div>
        <div
          className={"nav_btn" + (panel === "menu" ? " active" : "")}
          {...(panel !== "fight" &&
            panel !== "save" && { onClick: handleDisplayMenu })}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Menu
        </div>
      </div>
    </div>
  );
};

export default MenuPad;
