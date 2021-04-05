import { createSlice } from "@reduxjs/toolkit";

export const itemSlice = createSlice({
  name: "items",
  initialState: {
    item: [],
  },
  reducers: {
    deleteAllItems: (state) => {
      state.item.length = 0;
    },
    deleteItem: (state, action) => {
      state.item.splice(action.payload, 1);
    },
    addItem: (state, action) => {
      state.item = [...state.item, action.payload];
    },
    editItem: (state, action) => {
      state.item[action.payload.index].inputText = action.payload.inputText;
    },
    clearAndAdd: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const {
  addItem,
  deleteItem,
  deleteAllItems,
  editItem,
  clearAndAdd,
} = itemSlice.actions;
export default itemSlice.reducer;
