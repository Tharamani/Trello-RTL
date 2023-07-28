import React from "react";
import Card from "./Card";
import AddNew from "./AddNew";
import { useSelector } from "react-redux";
import { selectAllLists } from "../features/lists/listSlice";

function List() {
  const lists = useSelector(selectAllLists);
  console.log("Lists>>> :", lists);

  return (
    <>
      {lists?.length > 0 &&
        lists.map((list) => (
          <div key={list.list_id} className="p-3 w-1/6 relative">
            <div className="p-3 bg-gray-200 shadow-md rounded-md">
              <div className="mb-4">{list.title}</div>
              {list?.cards?.length > 0 &&
                list.cards.map((card, index) => (
                  <Card
                    key={card.card_id}
                    card={card}
                    index={index}
                    listId={list.list_id}
                  />
                ))}
              <div className="mt-3">
                <AddNew type="card" listId={list.list_id} />
              </div>
            </div>
          </div>
        ))}
      <div className="p-3 w-1/5">
        <div className="p-3 bg-gray-200 shadow-md rounded-md">
          <AddNew />
        </div>
      </div>
    </>
  );
}

export default List;
