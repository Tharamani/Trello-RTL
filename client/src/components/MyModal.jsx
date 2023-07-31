function MyModal({ card, showModal, onClose }) {
  const handleClose = (e) => {
    if (e.target.id === "modal-container") onClose();
  };

  if (!showModal) return null;

  return (
    <div
      id="modal-container"
      onClick={handleClose}
      className="fixed inset-0  bg-[#0005]
    flex flex-col justify-center items-center z-10"
    >
      <div className="bg-white opacity-100 p-2 z-50 text-black w-1/3 h-1/2 rounded relative">
        <p className="p-3">{card.title} is in </p>
        <button
          className="hover:bg-gray-300 absolute top-0 right-0 p-3"
          onClick={onClose}
        >
          X
        </button>
        <h1 className="p-3">Description </h1>

        <h1 className="p-3">Attachments </h1>
        <label className="p-3 ">
          Activity
          <input className="p-3" defaultValue={card.title} />
        </label>
      </div>
    </div>
  );
}

export default MyModal;
