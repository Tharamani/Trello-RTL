import React, { useEffect, useState } from "react";
import { fetchBoards, selectAllBoards } from "../features/boards/boardSlice";
import { useSelector, useDispatch } from "react-redux";
import AddNewBoard from "./AddNewBoard";
import {
  fetchLists,
  setBoardId,
  selectAllLists,
} from "../features/lists/listSlice";

function SideBar() {
  const dispatch = useDispatch();
  const boards = useSelector(selectAllBoards);
  const lists = useSelector(selectAllLists);

  useEffect(() => {
    dispatch(fetchBoards(boards));
  }, []);

  const dispalyLists = (e) => {
    console.log("onclick boards", boards, lists);
    // const board = boards.find((board) => board.board_id === e.target.value);

    dispatch(setBoardId({ board_id: e.target.value, lists }));
  };

  return (
    <>
      <div>
        <div className="p-3 border bg-blue-100 z-50 relative">
          <h2>Your Boards</h2>
          <div className="absolute top-0 right-0">
            {/* <button className="p-3 hover:bg-gray-300">...</button> */}
            <AddNewBoard />
          </div>
        </div>

        <div className="sidebar h-screen w-[300px] border bg-blue-100">
          {boards?.length > 0 &&
            boards.map((board) => (
              <div key={board.board_id}>
                <div className="p-3 bg-blue-100 hover:bg-gray-300">
                  <div className="mb-0">
                    <button value={board.board_id} onClick={dispalyLists}>
                      {board.title}
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
