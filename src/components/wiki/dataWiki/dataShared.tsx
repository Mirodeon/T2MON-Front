import React from "react";
import ListType from "../ListType";

const articleAboutType: {
  title: JSX.Element;
  txt: JSX.Element;
} = {
  title: <>What are types?</>,
  txt: (
    <>
      T2mon have two types and spells one. Types determine the affinities and
      therefore the impact of spells on a given T2mon.
      <br />
      Types are:
      <ListType />
      It's up to you to determine the relationship between them!
    </>
  ),
};

export { articleAboutType };
