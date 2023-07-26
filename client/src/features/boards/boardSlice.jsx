import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import * as api from "../../api/api";

export const selectAllBoards = (state) => state.boardSlice.boards;

// get all boards
export const fetchBoards = createAsyncThunk("boards/fetchBoards", async () => {
  const response = await api.getBoards();
  return response;
});

// Thunk to add a new board
export const addNewBoard = createAsyncThunk(
  "boards/addNewBoard",
  async (item) => {
    try {
      const response = await api.createBoard(item);
      console.log("addNewBoard : response.board ", response.board);
      return response.board;
    } catch (error) {
      console.log("Error: addNewBoard ", error.message);
    }
  }
);

const boardsSlice = createSlice({
  name: "boards",
  initialState: {
    boards: [],
  },
  extraReducers(builder) {
    builder.addCase(fetchBoards.fulfilled, (state, action) => {
      state.boards = action.payload;
    });
    builder.addCase(addNewBoard.fulfilled, (state, action) => {
      console.log("addNewBoard state, action", action);
      state.boards.push(action.payload);
    });
  },
});

export default boardsSlice.reducer;
