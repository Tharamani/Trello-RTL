function MyModal({ card, showModal, onClose }) {
  const handleClose = (e) => {
    if (e.target.id === "modal-container") onClose();
  };

  if (!showModal) return null;

  return (
    <div
      id="modal-container"
      onClick={handleClose}
      className="fixed inset-0 backdrop-blur-sm opacity-30 bg-slate-900
    flex justify-center items-center z-50"
    >
      <div className=" bg-slate-50 p-2 rounded w-1/3 h-1/2 relative ">
        <p className="p-3">{card.card_name} is in </p>
        <button
          className="hover:bg-gray-300 absolute top-0 right-0 p-3"
          onClick={onClose}
        >
          X
        </button>
        <h1 className="p-3 text-[#080807]">Description </h1>

        <h1 className="p-3">Attachments </h1>
        <label className="p-3">
          Activity
          <input className="p-3" defaultValue={card.card_name} />
        </label>
      </div>
    </div>
  );
}

export default MyModal;
