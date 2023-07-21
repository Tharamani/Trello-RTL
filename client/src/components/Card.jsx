import React from "react";

function Card({ card }) {
  return (
    <div className="bg-white mt-2 p-2 shadow-md rounded-md">
      {card.card_name}
    </div>
  );
}

export default Card;
