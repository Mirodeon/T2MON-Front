import React from "react";
import WikiSpell from "../WikiSpell";
import { articleAboutType } from "./dataShared";

const dataSpell = {
  title: <>SPELL</>,
  article: [
    {
      title: <>What are the different spell effects?</>,
      txt: (
        <>
          Spells can have three different effects. The first is to do damage,
          the second to recover, the third to steal. It's three effects can
          apply either to health points, mana, or both.
        </>
      ),
    },
    {
      title: <>What is mana?</>,
      txt: (
        <>
          Mana is the resource used by your t2mon to cast spells. Mana is
          characterized by the color blue in the interfaces where it is
          represented. A t2mon always has one spell that does not consume mana
          and three others with variable costs.
        </>
      ),
    },
    articleAboutType,
    {
      title: <>All spells:</>,
      txt: (
        <>
          <WikiSpell />
          Here you can find all spells, their effects, types and mana
          consumption.
        </>
      ),
    },
  ],
};

export default dataSpell;
