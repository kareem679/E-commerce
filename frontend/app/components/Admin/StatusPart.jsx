const StatusPart = ({status,handleStatus}) => {
  return (
    <select
      value={status}
      onChange={handleStatus}
      className="px-2 py-2 border rounded-md"
    >
      <option value="pending">pending</option>
      <option value="delivered">delivered</option>
      <option value="cancelled">cancelled</option>
    </select>
  );
};

export default StatusPart;
