import React from "react";
import { Link } from "react-router-dom";

type NavBtnProps = {
  path: string;
  className: string;
  content: string | JSX.Element;
};

const NavBtn = ({ path, className, content }: NavBtnProps) => {
  return (
    <Link to={path} className={"nav_btn " + className}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {content}
    </Link>
  );
};

export default NavBtn;
