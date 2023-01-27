import React from "react";
import { WikiTitle, WikiArticleText } from ".";
import { getWikiData } from "./dataWiki";

type WikiArticleProps = {
  screen: boolean;
  article: number;
  section: string;
};

const WikiArticle = ({ screen, article, section }: WikiArticleProps) => {
  const data = getWikiData(section);
  const getArticles = () => {
    const result = [<WikiTitle title={data.title} key={0} />];
    data.article.forEach((content) => {
      result.push(
        <WikiArticleText
          key={result.length}
          title={content.title}
          text={content.txt}
        />
      );
    });
    data.custom?.forEach((content) => {
      result.push(content);
    });
    return result;
  };
  const articles = getArticles();

  return <>{!screen ? articles : articles[article]}</>;
};

export default WikiArticle;
