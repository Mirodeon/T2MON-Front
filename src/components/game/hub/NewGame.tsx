import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import gameSlice from "../../../store/slices/game";
import axiosService from "../../../utils/axios";
import { RootState } from "../../../store";
import { InputForm } from "../../auth";

type NewGameProps = {
  setSelectedGame: React.Dispatch<React.SetStateAction<boolean>>;
  setNewGame: React.Dispatch<React.SetStateAction<boolean>>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
  reload: boolean;
};

const NewGame = ({
  setSelectedGame,
  setNewGame,
  setReload,
  reload,
}: NewGameProps) => {
  const account = useSelector((state: RootState) => state.auth.account);
  const userId = account?.id;
  const dispatch = useDispatch();
  const [nameErr, setNameErr] = useState("");
  const [pseudoErr, setPseudoErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNewGame = (
    name: string,
    pseudo: string,
    user_id: number | undefined,
    team: any[],
    petStore: any[],
    bag: any[]
  ) => {
    axiosService
      .post(`/game/`, {
        name,
        pseudo,
        user_id,
        team,
        petStore,
        bag,
      })
      .then((res) => {
        dispatch(
          gameSlice.actions.setActivityOn({
            id: res.data.id,
            is_active: true,
            name: res.data.name,
            pseudo: res.data.pseudo,
            position: res.data.position,
            gold: res.data.gold,
            team: res.data.team,
            petStore: res.data.petStore,
            bag: res.data.bag,
          })
        );
        console.log(res);
        setLoading(false);
        setSelectedGame(false);
        setNewGame(false);
        setReload(!reload);
      })
      .catch((err: any) => {
        if (err.response.data.name) {
          setNameErr(err.response.data.name.toString());
        }
        if (err.response.data.pseudo) {
          setPseudoErr(err.response.data.pseudo.toString());
        }
        setLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      pseudo: "",
      user_id: userId,
      team: [],
      petStore: [],
      bag: [],
    },
    onSubmit: (values) => {
      setLoading(true);
      setNameErr("");
      setPseudoErr("");
      if (account) {
        handleNewGame(
          values.name,
          values.pseudo,
          values.user_id,
          values.team,
          values.petStore,
          values.bag
        );
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().trim().required("Name is required."),
      pseudo: Yup.string().trim().required("Pseudo is required."),
    }),
  });

  const handleUnselectedGame = () => {
    setSelectedGame(false);
    setNewGame(false);
  };

  return (
    <div className="container_content_game">
      <div className="container_select_game">
        <h1 className="title_select_game">New Game</h1>
        <form onSubmit={formik.handleSubmit} className="container_form">
          <div className="content_form">
            <InputForm
              name={"name"}
              message={nameErr}
              error={formik.errors.name}
              value={formik.values.name}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              showMessage={true}
            />
            <InputForm
              name={"pseudo"}
              message={pseudoErr}
              error={formik.errors.pseudo}
              value={formik.values.pseudo}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              showMessage={true}
            />
          </div>
          <div className="container_btn_form">
            <div className="nav_btn" onClick={handleUnselectedGame}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              return
            </div>
            <button type="submit" disabled={loading} className="nav_btn">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              New Game
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewGame;
