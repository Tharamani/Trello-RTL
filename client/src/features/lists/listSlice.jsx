import { createSlice, current } from "@reduxjs/toolkit";
// import * as api from "../../api/api";

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

export const getListsBid = (prevItems, pBoardId) => {
  console.log("prevItems , pBoardId", prevItems, pBoardId);
  return prevItems.filter((list) => list.board_id === pBoardId);
};

const listsItems =
  localStorage.getItem("listsItems") !== null
    ? JSON.parse(localStorage.getItem("listsItems"))
    : [];

const setListsItems = (item) => {
  localStorage.setItem("listsItems", JSON.stringify(item));
};

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    lists: listsItems,
    boardId: 0,
  },
  reducers: {
    setBoardId: (state, action) => {
      // state[action.payload] = state.lists;
      state.boardId = action.payload.board_id;
    },

    addNewList: (state, action) => {
      if (state.boardId === action.payload.board_id)
        state.lists.push(action.payload);
      setListsItems(state.lists.map((list) => list));
    },

    addNewCard: (state, action) => {
      console.log("addNewCard", action, current(state));
      let existingList = state.lists.find(
        (list) => list.list_id === action.payload.list_id
      );
      if (!existingList.cards) existingList.cards = [];

      existingList.cards.push(action.payload);
      setListsItems(state.lists);
    },

    updateCard: (state, action) => {
      console.log("updateCard", action, current(state));
      let existingList = state.lists.find(
        (list) => list.list_id === action.payload.list_id
      );

      existingList.cards.find(
        (card) => card.card_id === action.payload.card_id
      ).title = action.payload.title;
      setListsItems(state.lists.map((list) => list));
    },

    removeCard: (state, action) => {
      console.log("removeCard", action, current(state));

      let existingList = state.lists.find(
        (list) => list.list_id === action.payload.list_id
      );

      existingList.cards.splice(
        existingList.cards.indexOf(
          findCardById(existingList.cards, action.payload.card_id)
        ),
        1
      );
      setListsItems(state.lists.map((list) => list));
    },

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
  },
});

export const {
  fetchLists,
  addNewList,
  addNewCard,
  updateCard,
  removeCard,
  moveCard,
  setBoardId,
} = listsSlice.actions;

export default listsSlice.reducer;
