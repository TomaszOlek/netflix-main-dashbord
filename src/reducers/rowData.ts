import breakingBad from "../assets/serials/breakingBad.png";
import walkingDead from "../assets/serials/walkingDead.png";
import Vikings from "../assets/serials/Vikings.png";
import Lucifer from "../assets/serials/Lucifer.png";
import PeakyBlinders from "../assets/serials/PeakyBlinders.png";

import { shuffleArray } from "../functions/functions"

export type rowDataAction = {
  type: "rowData/addItemsToRow" | "rowData/createNewRow";
  payload: string
}

export type RowDataState = {
  index: number,
  movies: videosData[]
}


type videosData = {
  image: string;
  name: string;
  lastWatched: string;
  procentageWatched: number;
  lengthOfEpisode: number;
};

const rawData = [
  {
    image: breakingBad,
    name: "Breaking Bad",
    lastWatched: "Pilot",
    procentageWatched: 50,
    lengthOfEpisode: 58,
  },
  {
    image: walkingDead,
    name: "Walking Dead",
    lastWatched: "Days Gone Bye",
    procentageWatched: 30,
    lengthOfEpisode: 52,
  },
  {
    image: Vikings,
    name: "Vikings",
    lastWatched: "Rites of Passage",
    procentageWatched: 85,
    lengthOfEpisode: 50,
  },
  {
    image: Lucifer,
    name: "Lucifer",
    lastWatched: "Lucifer, Stay. Good Devil.",
    procentageWatched: 20,
    lengthOfEpisode: 48,
  },
  {
    image: PeakyBlinders,
    name: "Peaky Blinders",
    lastWatched: "Episode 1",
    procentageWatched: 90,
    lengthOfEpisode: 56,
  },
];


function rowData(state: Record<string, RowDataState> = {}, action: rowDataAction) {
  switch (action.type) {
    case "rowData/addItemsToRow":
      return {
        ...state,
        [action.payload]: {
          index: state[action.payload].index + 1,
          movies: [ ...state[action.payload].movies, state[action.payload].movies[state[action.payload].index] ]
        }
      };
    case "rowData/createNewRow":
      return {
        ...state,
        [action.payload]: {
          index: 0,
          movies: shuffleArray(rawData, 3)
        }
      };
    default:
      return state;
  }
}

export default rowData;