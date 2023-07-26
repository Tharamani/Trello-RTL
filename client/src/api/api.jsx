const url = "http://localhost:4000";

// Create list
export const createList = async (item, id) => {
  if (!id) throw new Error("Error: createList:  id");

  const response = await fetch(`${url}/boards/${id}/lists`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (!response.ok)
    throw new Error("Error ", { cause: await response.json().message });

  return await response.json();
};

// craete card
export const createCard = async (item, id) => {
  if (!id) throw new Error("Error: createCard:  id");

  const response = await fetch(`${url}/lists/${id}/cards`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok)
    throw new Error("Error ", { cause: await response.json().message });

  return await response.json();
};

//get all lists
export const getLists = async (id) => {
  if (!id) throw new Error("Error: getLists: id");
  const response = await fetch(`${url}/boards/${id}/lists`);

  if (!response.ok) {
    throw new Error("Error ", { cause: await response.json().message });
  }
  return await response.json();
};

// get all boards
export const getBoards = async () => {
  const response = await fetch(`${url}/boards`);
  const data = await response.json();

  return data;
};

// create new board
export const createBoard = async (item) => {
  const response = await fetch(`${url}/boards`, {
    // using board id create list // api call
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (!response.ok)
    throw new Error("Error createBoard", {
      cause: await response.json().message,
    });

  return await response.json();
};

// edit card
export const editCard = async (item, id) => {
  console.log("editCard api... item", item, id);
  if (!id) throw new Error("ERROR : editCard : card id error");

  const response = await fetch(`${url}/cards/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok)
    throw new Error("Error ", { cause: await response.json().message });

  return await response.json();
};

// Delete card
export const deleteCard = async (item) => {
  if (!item.card_id)
    throw new Error("ERROR : deleteCard : error deleting card");

  const response = await fetch(`${url}/cards/${item.card_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok)
    throw new Error("Error ", { cause: await response.json().message });

  return await response.json();
};
