import React from "react";

type CubeProps = {
  status: string;
};
const Cube = ({ status }: CubeProps) => {
  return (
    <div className={"container_cube" + status}>
      <div className="cube">
        <div className="top"></div>
        <div className="face_cube">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default Cube;
