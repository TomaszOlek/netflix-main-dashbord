export interface WindowSizeState {
  windowSize: number;
}

export type WindowSizeAction = {
  type: "windowSize/set";
  payload: number;
}

function windowSize(state: WindowSizeState = { windowSize: 0 }, action: WindowSizeAction) {
  switch (action.type) {
    case "windowSize/set":
      return {
        windowSize: action.payload,
      };
    default:
      return state;
  }
}

export default windowSize;