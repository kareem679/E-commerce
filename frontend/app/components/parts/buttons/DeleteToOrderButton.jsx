const DeleteToOrderButton = ({ handleRemove }) => {
  return (
    <button
      onClick={handleRemove}
      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
    >
      Delete
    </button>
  );
};

export default DeleteToOrderButton;
