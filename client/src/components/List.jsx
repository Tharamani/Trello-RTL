import React, { useEffect } from "react";
import Card from "./Card";
import AddNew from "./AddNew";
import { useSelector, useDispatch } from "react-redux";
import { fetchLists, selectAllLists } from "../features/lists/listSlice";

function List() {
  const lists = useSelector(selectAllLists);

  return (
    <>
      {lists.map((list) => (
        <div key={list.list_id} className="p-3 w-1/6">
          <div className="p-3 bg-gray-200 shadow-md rounded-md">
            <div className="mb-4">{list.list_name}</div>
            {list?.cards?.length > 0 &&
              list.cards.map((card, index) => (
                <Card
                  key={card.card_id}
                  card={card}
                  index={index}
                  listId={list.list_id}
                  list={list}
                />
              ))}
            <div className="mt-3">
              <AddNew type="card" listId={list.list_id} />
            </div>
          </div>
        </div>
      ))}
      <div className="p-3 w-1/3">
        <div className="p-3 bg-gray-200">
          {/* <Card /> */}
          <AddNew />
        </div>
      </div>
    </>
  );
}

export default List;
