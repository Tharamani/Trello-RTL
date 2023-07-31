import React, { useEffect, useState } from "react";
import { selectAllBoards } from "../features/lists/listSlice";
import { useSelector, useDispatch } from "react-redux";
import AddNewBoard from "./AddNewBoard";
import { setBoardId } from "../features/lists/listSlice";

function SideBar() {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);
  console.log("SideBar boards", boards);

  const dispalyLists = (e) => {
    dispatch(setBoardId(e.target.value));
  };

  return (
    <>
      <div>
        <div className="p-3 border bg-blue-100 z-50 relative">
          <h2>Your Boards</h2>
          <div className="absolute top-0 right-0">
            <AddNewBoard />
          </div>
        </div>

        <div className="sidebar h-screen w-[300px] border bg-blue-100">
          {boards?.length > 0 && (
            <div key={boards.board_id}>
              <div className="p-3 bg-blue-100 hover:bg-gray-300">
                <div className="mb-0">
                  <button value={boards.board_id} onClick={dispalyLists}>
                    {boards.title}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SideBar;
