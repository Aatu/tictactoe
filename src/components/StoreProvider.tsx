import React, { useReducer, useEffect } from "react";
import { GameData } from "../gameLogic/GameData";
import { GameService } from "../gameLogic/GameService";

export interface IState {
  games: Array<GameData>;
}

enum StoreActionTypes {
  SET_GAMES = "SET_GAMES"
}

interface SetGamesAction {
  type: StoreActionTypes.SET_GAMES;
  value: Array<GameData>;
}


export type StoreAction = SetGamesAction;

interface IStateContext {
  state: IState;
}

type Dispatch = React.Dispatch<StoreAction>;

interface IDispatchContext {
  dispatch: Dispatch
}

export const setGames = (gameDatas: Array<GameData>): SetGamesAction => ({ type: StoreActionTypes.SET_GAMES, value: gameDatas })

export const reducer = (state: IState, action: StoreAction): IState => {
  switch (action.type) {
    case StoreActionTypes.SET_GAMES:
      return { ...state, games: action.value };
    default:
      return state;
  }
}

const initialState: IState = {
  games: []
};

export const StateStore = React.createContext({} as IStateContext);
export const DispatchStore = React.createContext({} as IDispatchContext);

export const StoreProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    const gameService = new GameService({dispatch});
    gameService.loadGames();
  }, [])


  return (
    <StateStore.Provider value={{ state }}>
      <DispatchStore.Provider value={{ dispatch }}>
        {children}
      </DispatchStore.Provider>
    </StateStore.Provider>
  );
};
