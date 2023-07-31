import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewList,
  addNewCard,
  selectBoardId,
} from "../features/lists/listSlice";
import { nanoid } from "nanoid";

function AddNew({ type, listId }) {
  const [title, setTitle] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();

  const boardId = useSelector(selectBoardId);

  const save = (e) => {
    try {
      e.preventDefault();

      if (!title) throw new Error("Please enter title");

      if (type === "card") {
        dispatch(addNewCard({ card_id: nanoid(), title, list_id: listId }));
      } else {
        dispatch(addNewList({ list_id: nanoid(), title, board_id: boardId }));
      }

      setTitle("");
      setIsFormVisible(false);
    } catch (error) {
      console.log("ERROR : AddNew", error.message);
    }
  };
  return (
    <div>
      {!isFormVisible && (
        <button onClick={(e) => setIsFormVisible(true)}>
          + Add {type ? "a card " : "another list"}
        </button>
      )}
      {isFormVisible && (
        <form onSubmit={save} className="mt-3">
          <input
            className="w-full h-10 p-2 shadow-md rounded-md"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder={type ? "Enter card title" : "Enter list title"}
          ></input>
          <div className="mt-3">
            <button className="p-3 py-1 bg-blue-500 text-white rounded-md">
              Save
            </button>
            <button onClick={(e) => setIsFormVisible(false)} className="ml-3">
              X
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AddNew;
