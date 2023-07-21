import React, { useEffect } from "react";
import Card from "./Card";
import AddNew from "./AddNew";
import { useSelector, useDispatch } from "react-redux";
import { fetchLists, selectAllLists } from "../features/lists/listSlice";

function List() {
  const dispatch = useDispatch();
  const lists = useSelector(selectAllLists);
  console.log("List : ", lists);

  useEffect(() => {
    dispatch(fetchLists());
  }, []);

  return (
    <>
      {lists.map((list) => (
        <div key={list.list_id} className="p-3 w-1/3">
          <div className="p-3 bg-gray-200">
            <div className="mb-4">{list.list_name}</div>
            {list?.cards?.length > 0 &&
              list.cards.map((card) => <Card key={card.card_id} card={card} />)}
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
