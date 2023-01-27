import React from "react";

type WikiArticleTextProps = {
  title: JSX.Element;
  text: JSX.Element;
};

const WikiArticleText = ({ title, text }: WikiArticleTextProps) => {
  return (
    <section className="container_article_wiki">
      <h2 className="title_article_wiki">{title}</h2>
      <article className="txt_article_wiki">
        {text}
        <span className="blink"> &#x25BC;</span>
      </article>
    </section>
  );
};

export default WikiArticleText;