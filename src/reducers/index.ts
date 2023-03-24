import { combineReducers, Reducer } from 'redux';

import windowSize, { WindowSizeState, WindowSizeAction } from './windowSize';
import rowData, { RowDataState } from './rowData';
import rowOffset, { RowOffsetState } from "./rowOffset";

export interface RootState {
  windowSize: WindowSizeState;
  rowData: { [key: string]: RowDataState | { index: number, movies: any[] } };
  rowOffset: RowOffsetState;
}

const rootReducer: Reducer<RootState, WindowSizeAction> = combineReducers({
  windowSize,
  rowData,
  rowOffset,
});

export default rootReducer;