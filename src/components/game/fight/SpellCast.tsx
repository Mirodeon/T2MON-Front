import React from "react";

type SpellCastProps = {
  img: any;
};

const SpellCast = ({ img }: SpellCastProps) => {
  return (
    <div className="container_img_spell">
      <img className="img_spell" src={img} alt="spell" />
    </div>
  );
};

export default SpellCast;
