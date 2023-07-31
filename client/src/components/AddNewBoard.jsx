import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewBoard } from "../features/lists/listSlice";
import { nanoid } from "nanoid";

function AddNewBoard() {
  const [title, setTitle] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const dispatch = useDispatch();

  const saveBoard = (e) => {
    try {
      e.preventDefault();
      if (!title) throw new Error("Please enter title");
      dispatch(addNewBoard({ board_id: nanoid(), title, lists: [] }));

      setTitle("");
      setIsFormVisible(false);
    } catch (error) {
      console.log("ERROR : AddNew", error.message);
    }
  };
  return (
    <>
      {!isFormVisible && (
        <button
          className="p-3 hover:bg-gray-300 "
          onClick={(e) => setIsFormVisible(true)}
        >
          +
        </button>
      )}
      {isFormVisible && (
        <form
          onSubmit={saveBoard}
          className="p-3 mt-3 w-72 h-72 shadow-md rounded-md bg-blue-100 absolute"
        >
          <div>
            <h3 className="text-center">Create board</h3>
            <button
              onClick={(e) => setIsFormVisible(false)}
              className="ml-3 absolute top-0 right-0 p-3 hover:bg-gray-300"
            >
              X
            </button>
          </div>
          <div className="mt-10 relative">
            <label>
              Board Title
              <input
                className="p-3 shadow-md rounded-md mt-4"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Enter board title"
              ></input>
            </label>

            <button className="mt-4 ml-24 p-3 py-1 absolute bg-blue-500 text-white shadow-md rounded-md">
              Create
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default AddNewBoard;
