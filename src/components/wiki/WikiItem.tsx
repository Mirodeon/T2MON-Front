import React, { useState } from "react";
import getDataBag from "../../utils/bag/getDataBag";

const WikiItem = () => {
  const [count, setCount] = useState(0);

  const bagData = () => {
    let data = [];
    for (let i = 1; i <= 4; i++) {
      data[i - 1] = getDataBag(i);
    }
    data.sort((a, b) => {
      return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
    });
    return data;
  };
  const dataBag = bagData();
  const item = dataBag[count];

  const prev = () => {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(dataBag.length - 1);
    }
  };
  const next = () => {
    if (count < dataBag.length - 1) {
      setCount(count + 1);
    } else {
      setCount(0);
    }
  };

  return (
    <div className="container_bag_start">
      <div className="container_arrow_bag_start prev" onClick={prev}>
        <div className="arrow_bag_start prev"></div>
      </div>
      <div className="container_arrow_bag_start next" onClick={next}>
        <div className="arrow_bag_start next"></div>
      </div>
      <div className="container_details_bag_start">
        <div className="header_bag_start">
          <div className="container_img_bag_start">
            <img className="img_bag_start" src={item.img} alt="item from bag" />
          </div>
          <div className="name_bag_start">{item.name}</div>
        </div>
        <div className="description_bag_start">{item.description}</div>
      </div>
    </div>
  );
};

export default WikiItem;
