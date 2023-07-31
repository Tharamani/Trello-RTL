import { createSlice, current } from "@reduxjs/toolkit";

export const selectAllLists = (state) => state.listSlice.boards.lists;

export const selectAllBoards = (state) => state.listSlice.boards;

export const selectBoardId = (state) => state.listSlice.boardId;

// find list by id
export const findCardById = (prevCards, pCardId) => {
  return prevCards.find((card) => card.card_id === pCardId);
};

// find card by id
export const findListById = (prevItems, pListId) => {
  return prevItems.find((list) => list.list_id === pListId);
};

// Get from local storage
const boardItems =
  localStorage.getItem("boardItems") !== null
    ? JSON.parse(localStorage.getItem("boardItems"))
    : {};

//Store in local storage
const setBoardItems = (item) => {
  localStorage.setItem("boardItems", JSON.stringify(item));
};

const listsSlice = createSlice({
  name: "lists",
  initialState: {
    boardId: 0,
    boards: boardItems,
  },
  reducers: {
    addNewBoard: (state, action) => {
      state.boardId = action.payload.board_id;
      state.boards = action.payload;
      setBoardItems(state.boards);
    },

    addNewList: (state, action) => {
      if (!state.boards.lists) state.boards.lists = [];

      state.boards.lists.push(action.payload);
      setBoardItems(state.boards);
    },

    addNewCard: (state, action) => {
      let existingList = findListById(
        state.boards.lists,
        action.payload.list_id
      );
      if (!existingList.cards) existingList.cards = [];

      existingList.cards.push(action.payload);
      setBoardItems(state.boards);
    },

    updateCard: (state, action) => {
      let existingList = findListById(
        state.boards.lists,
        action.payload.list_id
      );

      existingList.cards.find(
        (card) => card.card_id === action.payload.card_id
      ).title = action.payload.title;
      setBoardItems(state.boards);
    },

    removeCard: (state, action) => {
      let existingList = findListById(
        state.boards.lists,
        action.payload.list_id
      );
      existingList.cards.splice(
        existingList.cards.indexOf(
          findCardById(existingList.cards, action.payload.card_id)
        ),
        1
      );
      setBoardItems(state.boards);
    },

    moveCard: (state, action) => {
      const { sourceListId, targetListId, sourceIndex, targetIndex } =
        action.payload;
      const sourceListIndex = state.boards.lists.indexOf(
        state.boards.lists.find((list) => list.list_id === sourceListId)
      );

      const targetListIndex = state.boards.lists.indexOf(
        state.boards.lists.find((list) => list.list_id === targetListId)
      );

      // Move the card within the same list
      if (sourceListId === targetListId) {
        const cards = state.boards.lists[sourceListIndex].cards;
        const [movedCard] = cards.splice(sourceIndex, 1); // splice(start, deleteCount)
        cards.splice(targetIndex, 0, movedCard); // splice(start, deleteCount, item0)
      } // Move the card between different lists
      else {
        const sourceCards = state.boards.lists[sourceListIndex].cards;
        const targetCards = state.boards.lists[targetListIndex].cards;
        const [movedCard] = sourceCards.splice(sourceIndex, 1);
        targetCards.splice(targetIndex, 0, movedCard);
      }
      setBoardItems(state.boards);
    },

    setBoardId: (state, action) => {
      state.boardId = action.payload;
    },
  },
});

export const {
  addNewBoard,
  fetchLists,
  addNewList,
  addNewCard,
  updateCard,
  removeCard,
  moveCard,
  setBoardId,
} = listsSlice.actions;

export default listsSlice.reducer;
