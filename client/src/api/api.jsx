const url = "http://localhost:5000";

const bId = 35;

// Create list
export const createList = async (item, id) => {
  //   console.log("API... createList", item, bId);
  if (!item.title) throw new Error("ERROR: createList: Enter title");

  const response = await fetch(`${url}/boards/${bId}/lists`, {
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
  if (!item.title) throw new Error("Error: createCard: Enter title");

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
  if (!bId) throw new Error("Error: getLists: bId");
  const response = await fetch(`${url}/boards/${bId}/lists`);

  if (!response.ok) {
    throw new Error("Error ", { cause: data.message });
  }
  const data = await response.json();
  console.log("getLists... data", data);
  return data;
};
