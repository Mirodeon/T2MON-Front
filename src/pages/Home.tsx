import React, { useEffect, useState } from "react";
import { HomeArticle, HomeNav, HomeSwitch } from "../components/home";
import { Responsive } from "../utils/types";

type HomeProps = {
  responsive: Responsive;
};
const Home = ({ responsive }: HomeProps) => {
  document.title = "TeeTooMon - Home";
  const [article, setArticle] = useState(0);
  const [screen, setScreen] = useState(true);
  useEffect(() => {
    if (!responsive.width) {
      setScreen(false);
    }
  }, [responsive.width]);

  const articles = [];
  for (let i = 1; i <= 5; i++) {
    articles.push(<HomeArticle article={i} key={i} />);
  }

  return (
    <div className={"container_home_page" + (screen ? "" : " page_format")}>
      {responsive.width ? (
        <HomeSwitch screen={screen} setScreen={setScreen} />
      ) : null}
      <main className="content_home_page">
        {article === 0 || !screen ? (
          <h1 className="title_home">T2MON</h1>
        ) : null}
        {!screen ? (
          articles
        ) : article !== 0 ? (
          <HomeArticle article={article} />
        ) : null}
      </main>
      {screen ? <HomeNav article={article} setArticle={setArticle} /> : null}
    </div>
  );
};
export default Home;
