import React from "react";

const ListType = () => {
  const types = [
    "Darkness",
    "Earth",
    "Fire",
    "Ice",
    "Light",
    "Neutral",
    "Physic",
    "Water",
    "Wind",
  ];
  const getListType = () => {
    const list: JSX.Element[] = [];
    types.forEach((type) => {
      list.push(
        <li key={list.length}>
          <div className="header_type_list">
            <div className={`circle_type ${type}`}></div>
          </div>
          <p>{type}</p>
        </li>
      );
    });
    return list;
  };
  const typeList = getListType();

  return <ul className="list_type">{typeList}</ul>;
};

export default ListType;
