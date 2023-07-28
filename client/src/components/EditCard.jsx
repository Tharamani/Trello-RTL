import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard, removeCard } from "../features/lists/listSlice";
import Options from "./Options";

function EditCard({ pCard, setIsEditCard, listId }) {
  console.log("edit card for list id ", pCard, listId);
  const [title, setTitle] = useState(pCard.title);
  const dispatch = useDispatch();

  const saveCard = (e) => {
    console.log("updateCard : title", title);
    if (title !== pCard.card_name)
      dispatch(
        updateCard({
          title,
          card_id: pCard.card_id,
          list_id: listId,
        })
      );
    setIsEditCard(false);
  };

  return (
    <>
      <div className="">
        <textarea
          className="shadow-md rounded-md p-3 w-full"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          autoFocus={true}
        ></textarea>
        <button
          onClick={saveCard}
          className="p-3 py-1 bg-blue-500 text-white shadow-md rounded-md"
        >
          Save
        </button>
      </div>

      <Options pCard={pCard} listId={listId} setIsEditCard={setIsEditCard} />
    </>
  );
}

export default EditCard;
