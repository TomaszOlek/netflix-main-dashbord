
export type RowOffsetState = {
  [key: string]: number;
}

export type rowDataAction = {
  type: "rowOffset/incremented" | "rowOffset/decremented";
  payload: number
}


export interface WindowSizeState {
  windowSize: number;
}


function rowOffset(state: RowOffsetState = {}, action: rowDataAction) {
  switch (action.type) {
    case "rowOffset/incremented":
      return {
        ...state,
        [action.payload]: (state[action.payload] || 0) + 1
      };
    case "rowOffset/decremented":
      return {
        ...state,
        [action.payload]: (state[action.payload] || 0) - 1
      };
    default:
      return state;
  }
}

export default rowOffset;
