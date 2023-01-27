import { dataController, dataFight, dataItem, dataSpell, dataT2mon } from ".";

const getWikiData = (section: string) => {
  const data: {
    [key: string]: {
      title: JSX.Element;
      article: { title: JSX.Element; txt: JSX.Element }[];
      custom?: JSX.Element[];
    };
  } = {
    controller: dataController,
    t2mon: dataT2mon,
    spell: dataSpell,
    item: dataItem,
    fight: dataFight,
  };
  return data[section];
};

export default getWikiData;
