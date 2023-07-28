import React from "react";
import { useDispatch } from "react-redux";
import { removeCard } from "../features/lists/listSlice";

function Options({ pCard, listId, setIsEditCard }) {
  const dispatch = useDispatch();

  const deleteCard = async (e) => {
    console.log("deleteCard ");
    dispatch(removeCard({ ...pCard, list_id: listId }));
    setIsEditCard(false);
  };

  return (
    <>
      <div className="p-3">
        <button
          className="bg-stone-600 text-white shadow-md rounded-md p-3 absolute right-0 z-10"
          onClick={deleteCard}
        >
          Archive
        </button>
      </div>
    </>
  );
}

export default Options;
