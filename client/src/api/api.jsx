const url = "http://localhost:4000";

// Create list
export const createList = async (item, id) => {
  console.log("API... createList", item, id);
  if (!id) throw new Error("Error: createList:  id");

  const response = await fetch(`${url}/boards/${id}/lists`, {
    // using board id create list // api call
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (!response.ok) throw new Error("Error ", { cause: data.message });

  const data = await response.json();

  return data;
};

export const createCard = async (item, id) => {
  console.log("API... createCard", item, id);
  if (!id) throw new Error("Error: createCard:  id");

  const response = await fetch(`${url}/lists/${id}/cards`, {
    // using list id create cards
    // api call
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Error ", { cause: data.message });

  const data = await response.json();
  console.log("API... createCard", data);

  return data;
};

export const getLists = async (id) => {
  // console.log("getLists bId:", id);
  if (!id) throw new Error("Error: getLists: id");
  const response = await fetch(`${url}/boards/${id}/lists`);

  if (!response.ok) {
    throw new Error("Error ", { cause: data.message });
  }
  const data = await response.json();
  console.log("getLists... data", data);
  return data;
};

export const getBoards = async () => {
  const response = await fetch(`${url}/boards`);
  const data = await response.json();
  console.log("getBoards... data", data);

  return data;
};

export const createBoard = async (item) => {
  const response = await fetch(`${url}/boards`, {
    // using board id create list // api call
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });

  if (!response.ok)
    throw new Error("Error createBoard", { cause: data.message });

  const data = await response.json();
  console.log("createBoard... data", data);
  return data;
};

export const editCard = async (item, id) => {
  console.log("editCard api... item", item, id);
  if (!id) throw new Error("ERROR : editCard : card id error");

  const response = await fetch(`${url}/cards/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Error ", { cause: data.message });

  const data = await response.json();
  console.log("api.. editCard", data);

  return data;
};

// Delete card
export const deleteCard = async (item) => {
  if (!item.card_id)
    throw new Error("ERROR : deleteCard : error deleting card");

  const response = await fetch(`${url}/cards/${item.card_id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error ", { cause: data.message });

  const data = await response.json();
  console.log("fetchRequest.. deleteCard", data);

  return data;
};
