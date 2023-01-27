import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HomeSwitch from "../components/home/HomeSwitch";
import { WikiContent, WikiNav, WikiSubNav } from "../components/wiki";
import { Responsive } from "../utils/types";

type WikiProps = {
  responsive: Responsive;
};

const Wiki = ({ responsive }: WikiProps) => {
  document.title = "TeeTooMon - Wiki";
  const [screen, setScreen] = useState(true);
  const [article, setArticle] = useState(0);
  const location = useLocation();
  const path = location.pathname;
  useEffect(() => {
    setArticle(0);
  }, [path]);
  useEffect(() => {
    if (!responsive.width) {
      setScreen(false);
    }
  }, [responsive.width]);

  return (
    <>
      <WikiNav responsive={responsive} />
      <div className={"container_wiki_page" + (screen ? "" : " page_format")}>
        {responsive.width ? (
          <HomeSwitch screen={screen} setScreen={setScreen} />
        ) : null}
        <WikiContent screen={screen} article={article} />
        {screen ? (
          <WikiSubNav article={article} setArticle={setArticle} />
        ) : null}
      </div>
    </>
  );
};

export default Wiki;
