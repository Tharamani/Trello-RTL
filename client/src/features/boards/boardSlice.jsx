import { createSlice, current } from "@reduxjs/toolkit";

export const selectAllBoards = (state) => state.boardSlice.boards;

const boardItems =
  localStorage.getItem("boardItems") !== null
    ? JSON.parse(localStorage.getItem("boardItems"))
    : [];

const setBoardItems = (item) => {
  localStorage.setItem("boardItems", JSON.stringify(item));
};

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: boardItems,
  },
  reducers: {
    setBoardId: (state, action) => {
      state.boardId = action.payload;
      console.log("setBoardId", current(state), action.payload);
    },

    fetchBoards: (state, action) => {
      console.log("reducers, fetchBoards", action);
      state.boards = action.payload;
    },

    addNewBoard: (state, action) => {
      console.log("reducers, addNewBoard", action);
      state.boards.push(action.payload);
      // setBoardItem(state.boards.map((board) => board));
      setBoardItems(state.boards.map((board) => board));
    },
  },
});

export const { fetchBoards, addNewBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
