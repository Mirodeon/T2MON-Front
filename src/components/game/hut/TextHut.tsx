import React from "react";
import { HutText } from "../../../utils/types";

type TextHutProps = {
  perso: string;
  data: HutText;
};

const TextHut = ({ perso, data }: TextHutProps) => {
  const text = [
    //Welcom hut 0
    <>
      Welcome {perso}!
      <br />
      Your team have been healed.
    </>,
    //Welcom merchant 1
    <>
      So {perso}.
      <br />
      Do you want to buy or sell?
    </>,
    //welcom storage 2
    <>
      Here is your T2MON storage {perso}.
      <br />
      What do you want?
    </>,
    //buy interface 3
    <>
      Do you want some magic?
      <br />
      Take a look.
    </>,
    //sell interface 4
    <>
      Arf.
      <br />
      Let me see this shit.
    </>,
    //drop interface 5
    <>
      Do I look like a fucking babysitter?!
      <br />
      Come on.
    </>,
    //take interface 6
    <>
      Yeah! Take them back!
      <br />I can't take it anymore.
    </>,
    //Try sell but bag is empty 7
    <>
      Do I look like a joke to you?
      <br />
      There is nothing here.
    </>,
    //Try take but team is already six 8
    <>
      Snow White and the Seven Dwarfs?
      <br />
      It's a no. Six at most.
    </>,
    //Try drop but only one t2mon in team 9
    <>
      Walk around unsupervised?
      <br />
      Do not even think about it.
    </>,
    //Try take but storage empy 10
    <>
      Uh...
      <br />
      You didn't leave any T2MON here.
    </>,
    //Sell an item 11
    <>
      Thank you for this {data.bag?.name}.
      <br />
      hum... {data.bag ? Math.round(data.bag.cost / 2) : ""} gold. A good deal.
    </>,
    //Sell last copy from an item 12
    <>
      It looks like this is your last copy of {data.bag?.name}.
      <br />
      {data.bag ? Math.round(data.bag.cost / 2) : ""} gold for a greedy brat!
    </>,
    //Sell last item from bag 13
    <>
      {data.bag?.name}, hmmm, yes.
      <br />
      You have nothing left... Take this{" "}
      {data.bag ? Math.round(data.bag.cost / 2) : ""} gold.
    </>,
    //Buy an item 14
    <>
      {data.bag?.name}!
      <br />I robbed you of {data.bag?.cost} gold hehe!
    </>,
    //Buy an item but will have 0gold 15
    <>
      {data.bag?.name}!
      <br />
      Minus {data.bag?.cost} gold. Bankruptcy? I toss you a coin.
    </>,
    //Not enough gold 16
    <>
      {data.bag?.name}? Really? Really?!
      <br />
      Get lost you beggar!
    </>,
    //Already 99 copy of item 17
    <>
      Hundred {data.bag?.name}?
      <br />
      You can't carry that much {perso}.
    </>,
    //simple drop 18
    <>
      Sigh...
      <br />I will take great care of your {data.mon?.name}.
    </>,
    //one mon left in team 19
    <>
      {data.mon?.name} in the cage!
      <br />
      One more and you'd be unattended!
    </>,
    //store mon full 20
    <>
      {data.mon?.name} is the last!
      <br />I have no more room for another critter.
    </>,
    //simple take 21
    <>
      Yes finally!
      <br />
      Take back your {data.mon?.name}!
    </>,
    //no more mon in store 22
    <>
      I'm free! FREE!
      <br />
      {data.mon?.name} was the last!
    </>,
    //team is full 23
    <>
      Take {data.mon?.name} back.
      <br />
      Looks like you got all your ducklings.
    </>,
  ];
  return (
    <div className="dialogue_game_hut">
      {text[data.id]}
      <span className="blink"> &#x25BC;</span>
    </div>
  );
};

export default TextHut;
