import React from "react";
import { Route, Switch } from "react-router-dom";
import { WikiArticle } from ".";

type WikiContentProps = {
  screen: boolean;
  article: number;
};

const WikiContent = ({ screen, article }: WikiContentProps) => {
  const sections = ["controller", "t2mon", "spell", "item", "fight"];
  const getRoutes = () => {
    const result: JSX.Element[] = [];
    sections.forEach((r) => {
      result.push(
        <Route exact path={`*/${r}`} key={result.length}>
          <WikiArticle screen={screen} article={article} section={r} />
        </Route>
      );
    });
    return result;
  };
  const routes = getRoutes();

  return (
    <main className="content_wiki_page">
      <Switch>
        {routes}
        <Route path="*">
          <h1 className="title_wiki title_page_format">WIKI</h1>
        </Route>
      </Switch>
    </main>
  );
};

export default WikiContent;
