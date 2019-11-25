import React, { useReducer } from "react";
import { GameData } from "../gameLogic/GameData";

export interface IState {
  gameData: GameData | null;
}

enum StoreActionTypes {
  SET_GAME_DATA = "SET_GAME_DATA"
}

interface SetGameDataAction {
  type: StoreActionTypes.SET_GAME_DATA;
  value: GameData;
}

export type StoreAction = SetGameDataAction;

interface IStateContext {
  state: IState;
}

type Dispatch = React.Dispatch<StoreAction>;

interface IDispatchContext {
  dispatch: Dispatch
}

export const setGameData = (gameData: GameData): SetGameDataAction => ({ type: StoreActionTypes.SET_GAME_DATA, value: gameData })

export const reducer = (state: IState, action: StoreAction): IState => {
  switch (action.type) {
    case StoreActionTypes.SET_GAME_DATA:
      return { ...state, gameData: action.value };
    default:
      return state;
  }
}

const initialState: IState = {
  gameData: null
};

export const StateStore = React.createContext({} as IStateContext);
export const DispatchStore = React.createContext({} as IDispatchContext);

export const StoreProvider: React.FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateStore.Provider value={{ state }}>
      <DispatchStore.Provider value={{ dispatch }}>
        {children}
      </DispatchStore.Provider>
    </StateStore.Provider>
  );
};
