import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard, removeCard } from "../features/lists/listSlice";

function EditCard({ pCard, setIsEditCard, listId }) {
  //   console.log("pCard editCard jsx", listId);
  const [title, setTitle] = useState(pCard.card_name);
  const dispatch = useDispatch();

  const saveCard = (e) => {
    console.log("updateCard : title", title);
    if (title !== pCard.card_name)
      dispatch(updateCard({ card_name: title, card_id: pCard.card_id }));
    setIsEditCard(false);
  };

  const deleteCard = async (e) => {
    console.log("deleteCard ");
    dispatch(removeCard({ ...pCard, listId }));
    setIsEditCard(false);
  };

  return (
    <>
      <div>
        <textarea
          className="shadow-md rounded-md p-3"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></textarea>
        <button
          onClick={saveCard}
          className="mt-4 p-3 py-1 bg-blue-500 text-white shadow-md rounded-md"
        >
          Save
        </button>
        <button onClick={deleteCard}>Archive</button>
      </div>
    </>
  );
}

export default EditCard;
