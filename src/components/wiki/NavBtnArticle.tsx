import React from "react";

type NavBtnProps = {
  currentArticle: number;
  setArticle: React.Dispatch<React.SetStateAction<number>>;
  targetArticle: number;
  content: string;
};

const NavBtnArticle = ({
  currentArticle,
  setArticle,
  targetArticle,
  content,
}: NavBtnProps) => {
  return (
    <div
      className={
        "nav_btn" + (currentArticle === targetArticle ? " active" : "")
      }
      onClick={() => setArticle(targetArticle)}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {content}
    </div>
  );
};

export default NavBtnArticle;
