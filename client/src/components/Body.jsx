import React from "react";
import List from "./List";

function Body() {
  return (
    <div className="body w-full border p-3">
      <div className="flex flex-wrap gap-3">
        <List />
      </div>
    </div>
  );
}

export default Body;
