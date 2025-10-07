const UpdateToOrderButton = ({ handleUpdate }) => {
  return (
    <button
      onClick={handleUpdate}
      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
    >
      Update
    </button>
  );
};

export default UpdateToOrderButton;
