import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { moveCard } from "../features/lists/listSlice";
import EditCard from "./EditCard";
import MyModal from "./MyModal";

function Card({ card, index, listId }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // useDrag will be responsible for making an element draggable
  const [{ isDragging }, drag] = useDrag({
    type: "CARD", // element can be draggable
    item: {
      // data of the item to be available to the drop methods
      card_id: card.card_id,
      card_name: card.card_name,
      index,
      list_id: listId,
    },
    // monitors updates the props of the components in response to the drag and drop state changes
    // collecting function that retrieves the relevant bits of it from the monitors.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // useDrop responsible for handling whether any item gets hovered or dropped on the element
  const [, drop] = useDrop({
    // accept receives type of the dragged item to be droppable
    accept: "CARD",
    canDrop: (item) => item.list_id === card.list_id,
    // This method is called when we hover over an element while dragging
    hover(item) {
      // console.log("dispatchItem hover ", item);
      // item is the dragged element
      if (item.card_id !== card.card_id && item.list_id === listId) {
        //movecard within list
        dispatch(
          moveCard({
            sourceListId: item.list_id,
            targetListId: listId,
            sourceIndex: item.index,
            targetIndex: index,
          })
        );
        item.index = index;
      } else if (item.card_id !== card.card_id && item.list_id !== listId) {
        // move card between list
        dispatch(
          moveCard({
            sourceListId: item.list_id,
            targetListId: listId,
            sourceIndex: item.index,
            targetIndex: index,
          })
        );
        item.list_id = listId;
        item.index = index; // hover index
      }
    },
  });

  drag(drop(ref));

  const setIsEditCard = (isValue) => {
    setIsEdit(isValue);
  };

  const handleClick = (e) => {
    setIsEdit(true);
  };

  const onClose = () => setShowModal(false);

  return (
    <>
      <div>
        {isEdit && (
          <EditCard
            pCard={card}
            setIsEditCard={setIsEditCard}
            listId={listId}
          />
        )}
      </div>
      {!isEdit && (
        <div
          ref={ref}
          className="bg-white mt-2 p-3 shadow-md rounded-md opacity-${isDragging ? 0.5 : 1} relative"
        >
          <button onClick={(e) => setShowModal(true)}>{card.title}</button>

          <button
            onClick={handleClick}
            className="hover:bg-gray-300 absolute top-0 right-0 p-3 mb-1"
          >
            ...
          </button>
        </div>
      )}
      <MyModal card={card} showModal={showModal} onClose={onClose} />
    </>
  );
}

export default Card;
