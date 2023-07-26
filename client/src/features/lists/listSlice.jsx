import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/api";

export const selectAllLists = (state) => state.listSlice.lists;

export const selectBoardId = (state) => state.listSlice.boardId;

// find list by id
export const findCardById = (prevCards, pCardId) => {
  return prevCards.find((card) => card.card_id === pCardId);
};

// find card by id
export const findListById = (prevItems, pListId) => {
  return prevItems.find((list) => list.list_id === pListId);
};

// get all lists
export const fetchLists = createAsyncThunk("lists/fetchLists", async (id) => {
  console.log("fetch lsits : id ", id);
  const response = await api.getLists(id);
  return response;
});

// add a new list
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

// add a new card
export const addNewCard = createAsyncThunk("lists/addNewCard", async (item) => {
  try {
    const response = await api.createCard({ title: item.title }, item.list_id);
    console.log("addNewCard : response", response);
    return response.card;
  } catch (error) {
    console.log("Error: addNewCard ", error.message);
  }
});

// update card
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

//remove card
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
    // add new list
    builder.addCase(addNewList.fulfilled, (state, action) => {
      // We can directly add the new list object to our lists array
      state.lists.push(action.payload);
    });

    // add new card
    builder.addCase(addNewCard.fulfilled, (state, action) => {
      let existingList = state.lists.find(
        (list) => list.list_id === action.payload.list_id
      );
      if (!existingList.cards) existingList.cards = [];

      existingList.cards.push(action.payload);
    });

    // get lists
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.lists = action.payload;
    });

    // edit card
    builder.addCase(updateCard.fulfilled, (state, action) => {
      // state.lists = action.payload;
      console.log("updateCard action", action);
      findListById(state.lists, action.payload.list_id).cards.find(
        (card) => card.card_id === action.payload.card_id
      ).card_name = action.payload.card_name;
    });

    // delete card
    builder.addCase(removeCard.fulfilled, (state, action) => {
      console.log("updateCard action", action);
      const existingList = findListById(state.lists, action.payload.listId);

      existingList.cards.splice(
        existingList.cards.indexOf(
          findCardById(existingList.cards, action.payload.card_id)
        ),
        1
      );
    });
  },
});

export const { moveCard, setBoardId } = listsSlice.actions;

export default listsSlice.reducer;
