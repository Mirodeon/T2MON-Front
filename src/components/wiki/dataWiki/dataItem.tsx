import React from "react";
import WikiItem from "../WikiItem";

const dataItem = {
  title: <>ITEM</>,
  article: [
    {
      title: <>What are the different spell effects?</>,
      txt: (
        <>
          Items have four different effects. They can either allow you to
          level-up a T2mon, recover half life or mana or even catch a wild
          T2mon.
        </>
      ),
    },
    {
      title: <>What is the shop?</>,
      txt: (
        <>
          The shop is accessible in the various huts scattered throughout the
          game. It allows you to buy items using your gold or to sell them.
          Items can be stack up to ninety-nine copies.
        </>
      ),
    },
    {
      title: <>How to use an item?</>,
      txt: (
        <>
          Items can be used by accessing the bag via the menu. Once the object
          has been selected, all you have to do is choose the t2mon that will
          benefit from it. Items can also be used in fight, their effect will
          apply to the T2mon in fight. An item allowing to capture a t2mon can
          only be used in fight and an item allowing to level-up only outside of
          a fight.
        </>
      ),
    },
    {
      title: <>All Items:</>,
      txt: (
        <>
          <WikiItem />
          Here you can find all items and their effects.
        </>
      ),
    },
  ],
};

export default dataItem;
