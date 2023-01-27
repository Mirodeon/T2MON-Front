import React from "react";
import WikiMon from "../WikiMon";
import { articleAboutType } from "./dataShared";

const dataT2mon = {
  title: <>T2MON</>,
  article: [
    {
      title: <>What are the stats of a t2mon?</>,
      txt: (
        <>
          T2mon have six stats which are:
          <ul className="list_txt">
            <li>
              <p className="header_item_list">HP</p>
              <p>Health points</p>
            </li>
            <li>
              <p className="header_item_list">MANA</p>
              <p>Mana points are the resource for casting spells</p>
            </li>
            <li>
              <p className="header_item_list">ATK</p>
              <p>Determine the damage of spells</p>
            </li>
            <li>
              <p className="header_item_list">DEF</p>
              <p>Determine the reduction of damage received by spells</p>
            </li>
            <li>
              <p className="header_item_list">SPEED</p>
              <p>Determine initiative in fight</p>
            </li>
            <li>
              <p className="header_item_list">DODGE</p>
              <p>Determine the difficulty to catch a T2mon</p>
            </li>
          </ul>
          These stats have an initial value and a growth rate via variable
          quality level scaling: ☆☆★, ☆★★ or ★★★.
        </>
      ),
    },
    articleAboutType,
    {
      title: <>How many T2mon can be stored?</>,
      txt: (
        <>
          You can have up to six T2mon in your team and up to thirty in your
          storage. Storage can be accessed in huts scattered throughout the
          game. In these huts, you can drop or pick up T2mon with you. However,
          you should pay attention to the fact that this resets the progress of
          the current level of the T2mon.
        </>
      ),
    },
    {
      title: <>All T2mon:</>,
      txt: (
        <>
          <WikiMon />
          Here you can find all t2mon, their stats and spells.
        </>
      ),
    },
  ],
};

export default dataT2mon;
