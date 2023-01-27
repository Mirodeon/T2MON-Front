import React from "react";
import { NavBtnArticle } from "../wiki";

type HomeNavProps = {
  article: number;
  setArticle: React.Dispatch<React.SetStateAction<number>>;
};

const HomeNav = ({ article, setArticle }: HomeNavProps) => {
  const btns = ["What", "Play", "Techno", "About Me", "Contact"];
  return (
    <nav className="nav_home_page">
      {btns.map((btn: string, index: number) => {
        return (
          <NavBtnArticle
            currentArticle={article}
            setArticle={setArticle}
            targetArticle={index + 1}
            content={btn}
            key={index}
          />
        );
      })}
    </nav>
  );
};

export default HomeNav;
