import React, { useEffect, useState } from "react";
import { fetchBoards, selectAllBoards } from "../features/boards/boardSlice";
import { useSelector, useDispatch } from "react-redux";
import AddNewBoard from "./AddNewBoard";
import { fetchLists, setBoardId } from "../features/lists/listSlice";

function SideBar() {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);
  // console.log("boards : ", boards);

  useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  const dispalyLists = (e) => {
    // console.log("dispalyLists", e.target.value);
    dispatch(fetchLists(e.target.value));
    dispatch(setBoardId(e.target.value));
  };

  return (
    <>
      <div>
        <div className="relative p-3 border bg-blue-100">
          <h2>Your Boards</h2>
          <div className="absolute top-0 right-0 p-3 ">
            <button className="p-3 hover:bg-gray-300">...</button>
            <AddNewBoard />
          </div>
        </div>

        <div className="sidebar h-screen w-[300px] border bg-blue-100">
          {boards.map((board) => (
            <div key={board.board_id}>
              <div className="p-3 bg-blue-100 hover:bg-gray-300">
                <div className="mb-0">
                  <button value={board.board_id} onClick={dispalyLists}>
                    {board.board_name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default SideBar;
