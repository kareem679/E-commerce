import CountUp from "react-countup";
const Statistics = ({ orders }) => {
  const cancelledCount = orders.filter(
    (order) => order.status === "cancelled"
  ).length;
  const pendingCount = orders.filter(
    (order) => order.status === "pending"
  ).length;
  const deliveredCount = orders.filter(
    (order) => order.status === "delivered"
  ).length;

  const data = [
    {
      icon: "fa-solid fa-circle-xmark",
      title: "Cancelled Orders",
      count: cancelledCount,
      color: "from-red-400 to-red-600",
    },
    {
      icon: "fa-solid fa-clock",
      title: "Pending Orders",
      count: pendingCount,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      icon: "fa-solid fa-truck",
      title: "Delivered Orders",
      count: deliveredCount,
      color: "from-green-400 to-green-600",
    },
  ];

  return ( 
    <div className="my-20 mx-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
      {data.map((item, index) => (
        <div
          key={index}
          className={`bg-gradient-to-r ${item.color} rounded-md px-5 py-8 hover:scale-105 transition-transform duration-300 ease-out flex flex-col items-center gap-5 shadow-lg`}
        >
          <div className="bg-white/20 p-6 rounded-xl flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 shadow-inner">
            <i
              className={`${item.icon} text-white text-6xl sm:text-7xl drop-shadow-md`}
            ></i>
          </div>
          <div className="text-center">
            <h2 className="font-bold text-3xl text-white">{item.title}</h2>
            <p className="text-xl font-semibold text-white mt-2">
              <CountUp end={item.count} duration={1.5} />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
