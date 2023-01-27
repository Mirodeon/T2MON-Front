import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetcher } from "../utils/axios";
import { RootState } from "../store";
import { GameList } from "../components/game";
import { UserHub } from "../components/profile";

const Profile = () => {
  const account = useSelector((state: RootState) => state.auth.account);
  const [fetchSave, setFetchSave] = useState([]);
  const [reload, setReload] = useState(true);

  document.title = `TeeTooMon - ${
    account ? `${account.username}` : `Loading ...`
  }`;

  useEffect(() => {
    const fetchData = () => {
      fetcher(`/game/`)
        .then((data) => {
          const dataArray = data.map((r: any) => r);
          setFetchSave(dataArray);
        })
        .catch((err) => console.log(err));
    };
    fetchData();
  }, [reload]);

  return (
    <UserHub
      message={
        <>
          Welcome
          <br />
          {account?.username}
        </>
      }
      content={
        <div className="container_gameList">
          {fetchSave ? (
            <GameList
              data={fetchSave}
              available={false}
              setReload={setReload}
              reload={reload}
            />
          ) : (
            <div className="container_item_gameList">
              <div className="container_no_item_gameList">
                <p className="no_item_gameList">Loading...</p>
              </div>
            </div>
          )}
        </div>
      }
      form={false}
    />
  );
};

export default Profile;
