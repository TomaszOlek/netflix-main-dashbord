export const setWindowSize = (windowSize: number) => ({
  type: "windowSize/set",
  payload: windowSize
});

//rowData
export const addItemsToRow = (rowName: string) => ({
  type: "rowData/addItemsToRow",
  payload: rowName
});

export const createNewRow = (rowName: string) => ({
  type: "rowData/createNewRow",
  payload: rowName
})

//rowOffset
export const incrementedOffset = (rowName: string) => ({
  type:"rowOffset/incremented",
  payload: rowName
})

export const decrementedOffset = (rowName: string) => ({
  type: "rowOffset/decremented",
  payload: rowName
})

