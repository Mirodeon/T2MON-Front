import axiosService from "../../../utils/axios";
import { GameState } from "../../../utils/types"

const saveGame = async (game: GameState, user_id: number): Promise<GameState> => {
    const save = {
        user_id: user_id,
        name: game.name,
        pseudo: game.pseudo,
        position: game.position,
        gold: game.gold,
        team: game.team,
        petStore: game.petStore,
        bag: game.bag,
    };

    const response = await axiosService
        .put(`/game/${game.id}/`, save)
        .then((res) => res.data)
        .catch((err) => console.log(err));

    let updatedGame = {
        id: response.id,
        is_active: true,
        name: response.name,
        pseudo: response.pseudo,
        position: response.position,
        gold: response.gold,
        team: response.team,
        petStore: response.petStore,
        bag: response.bag,
    };
    
    return updatedGame;
};

export default saveGame;