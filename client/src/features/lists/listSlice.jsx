import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";
const bId = 38;

export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  const response = await api.getLists(bId);
  return response;
});

// Thunk to add a new list
export const addNewList = createAsyncThunk("lists/addNewList", async (item) => {
  try {
    const response = await api.createList(item);
    return response.list;
  } catch (error) {
    console.log("Error: addNewList ", error.message);
  }
});

// Thunk to add a new card
export const addNewCard = createAsyncThunk("lists/addNewCard", async (item) => {
  try {
    const response = await api.createCard({ title: item.title }, item.list_id);
    console.log("addNewCard : response", response);
    return response.card;
  } catch (error) {
    console.log("Error: addNewCard ", error.message);
  }
});

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
  },
  // reducers: {
  //   addList: (state, action) => {
  //     console.log("listsSlice called", action);
  //   },
  // },
  extraReducers(builder) {
    builder.addCase(addNewList.fulfilled, (state, action) => {
      // We can directly add the new list object to our lists array
      state.lists.push(action.payload);
    });

    builder.addCase(addNewCard.fulfilled, (state, action) => {
      console.log("addNewCard fulfilled", action.payload);
      const existingList = state.lists.find(
        (list) => list.list_id === action.payload.list_id
      );
      if (existingList) existingList.cards.push(action.payload);
    });

    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.lists = action.payload;
    });
  },
});

export const selectAllLists = (state) => state.listSlice.lists;

// console.log("listsSlice.actions", listsSlice.actions);
export const { addList } = listsSlice.actions;

// console.log("listsSlice.reducer", listsSlice.reducer);
export default listsSlice.reducer;
