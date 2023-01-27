import React from "react";

type WikiTitleProps = {
  title: JSX.Element;
};
const WikiTitle = ({ title }: WikiTitleProps) => {
  return <h1 className="title_wiki">{title}</h1>;
};

export default WikiTitle;