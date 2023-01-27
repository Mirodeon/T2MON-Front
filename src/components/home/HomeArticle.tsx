import React from "react";
import { Link } from "react-router-dom";
import { HomeContact } from ".";

type HomeArticleProps = {
  article: number;
};

const HomeArticle = ({ article }: HomeArticleProps) => {
  const data: { [key: number]: { title: JSX.Element; article: JSX.Element } } =
    {
      1: {
        title: <>What is T2MON?</>,
        article: (
          <>
            T2MON is a pokémonLike project made for a personal purpose of
            learning React and Python.
          </>
        ),
      },
      2: {
        title: <>How to play?</>,
        article: (
          <>
            If you want to start having fun, you can directly create an account{" "}
            <Link to="/register">here</Link> and then consult the{" "}
            <Link to="/wiki">wiki</Link> if you need additional information
            about the game.
          </>
        ),
      },
      3: {
        title: <>Technologies.</>,
        article: (
          <>
            T2MON is a client-first web app based on a REST API. Front-end was
            made in React TS and back-end in Django Rest Framework. Check this
            one out on <a href="https://github.com/Mirodeon/T2MON">GitHub</a>.
          </>
        ),
      },
      4: {
        title: <>Who am I?</>,
        article: (
          <>
            I have just recently started my adventure in web development a few
            months ago in a training course at BeCode. The resources and
            knowledge that can be drawn from this kind of training being
            insufficient to satisfy me, I decided to embark on this personal
            project in order to satisfy my curiosity and had a lot of fun making
            it.
          </>
        ),
      },
      5: {
        title: <>Contact me.</>,
        article: <HomeContact />,
      },
    };
  return (
    <section className="container_article_home">
      <h2 className="title_article_home">{data[article].title}</h2>
      <article className="txt_article_home">
        {data[article].article}
        {article !== 5 ? <span className="blink"> &#x25BC;</span> : null}
      </article>
    </section>
  );
};

export default HomeArticle;
