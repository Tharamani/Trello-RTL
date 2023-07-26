import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

export const selectAllLists = (state) => state.listSlice.lists;
export const selectBoardId = (state) => state.listSlice.boardId;

export const fetchLists = createAsyncThunk("lists/fetchLists", async (id) => {
  console.log("fetch lsits : id ", id);
  const response = await api.getLists(id);
  return response;
});

// Thunk to add a new list
export const addNewList = createAsyncThunk(
  "lists/addNewList",
  async (pItem) => {
    try {
      const response = await api.createList(
        { title: pItem.title },
        pItem.boardId
      );
      console.log("addNewList : response.list ", response.list);
      return response.list;
    } catch (error) {
      console.log("Error: addNewList ", error.message);
    }
  }
);

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

// Thunk to add a new card
export const updateCard = createAsyncThunk("lists/updateCard", async (item) => {
  try {
    console.log("updateCard : item", item);
    const response = await api.editCard(
      { title: item.card_name },
      item.card_id
    );
    console.log("addNewCard : response", response);
    return response.card;
  } catch (error) {
    console.log("Error: updateCard ", error.message);
  }
});

export const removeCard = createAsyncThunk("lists/removeCard", async (item) => {
  try {
    console.log("removeCard : item", item);
    const response = await api.deleteCard(item);
    console.log("addNewCard : response", response);
    return item;
  } catch (error) {
    console.log("Error: removeCard ", error.message);
  }
});

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    boardId: 0,
  },
  reducers: {
    moveCard: (state, action) => {
      const { sourceListId, targetListId, sourceIndex, targetIndex } =
        action.payload;
      const sourceListIndex = state.lists.indexOf(
        state.lists.find((list) => list.list_id === sourceListId)
      );

      const targetListIndex = state.lists.indexOf(
        state.lists.find((list) => list.list_id === targetListId)
      );

      console.log("listsSlice sourceListIndex", sourceListIndex);
      console.log("listsSlice targetListIndex", targetListIndex);

      // Move the card within the same list
      if (sourceListId === targetListId) {
        const cards = state.lists[sourceListIndex].cards;
        const [movedCard] = cards.splice(sourceIndex, 1); // splice(start, deleteCount)
        cards.splice(targetIndex, 0, movedCard); // splice(start, deleteCount, item0)
      } // Move the card between different lists
      else {
        const sourceCards = state.lists[sourceListIndex].cards;
        const targetCards = state.lists[targetListIndex].cards;
        const [movedCard] = sourceCards.splice(sourceIndex, 1);
        targetCards.splice(targetIndex, 0, movedCard);
      }
    },
    setBoardId: (state, action) => {
      state.boardId = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(addNewList.fulfilled, (state, action) => {
      // We can directly add the new list object to our lists array
      state.lists.push(action.payload);
    });

    builder.addCase(addNewCard.fulfilled, (state, action) => {
      let existingList = state.lists.find(
        (list) => list.list_id === action.payload.list_id
      );
      if (!existingList.cards) existingList.cards = [];

      existingList.cards.push(action.payload);
    });

    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.lists = action.payload;
    });

    builder.addCase(updateCard.fulfilled, (state, action) => {
      // state.lists = action.payload;
      console.log("updateCard action", action);
      state.lists
        .find((list) => list.list_id === action.payload.list_id)
        .cards.find(
          (card) => card.card_id === action.payload.card_id
        ).card_name = action.payload.card_name;
    });

    builder.addCase(removeCard.fulfilled, (state, action) => {
      console.log("updateCard action", action);
      const cardsArr = state.lists.find(
        (list) => list.list_id === action.payload.listId
      ).cards;

      const cardDel = state.lists
        .find((list) => list.list_id === action.payload.listId)
        .cards.find((card) => {
          if (card.card_id === action.payload.card_id);
        });

      cardsArr.splice(cardsArr.indexOf(cardDel), 1);
    });
  },
});

// console.log("listsSlice.actions", listsSlice.actions);
export const { moveCard, setBoardId } = listsSlice.actions;

// console.log("listsSlice.reducer", listsSlice.reducer);
export default listsSlice.reducer;
