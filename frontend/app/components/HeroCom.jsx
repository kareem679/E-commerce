import Link from "next/link";

const HeroCom = ({ title, showOrdersLink = false }) => {
  return (
    <section className="relative h-[50vh] flex flex-col justify-center items-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900/70 backdrop-blur-md">
        <div className="absolute inset-0 opacity-10"></div>
      </div>

      <div className="relative z-10 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-6">
          #{title}
        </h1>

        {showOrdersLink && (
          <Link
            href="/views/Orders"
            className="inline-block text-lg font-medium text-white px-8 py-3 rounded-xl 
          bg-white/10 border border-white/20 backdrop-blur-lg shadow-lg hover:bg-white/20 hover:scale-105 hover:text-teal-100 transition-all duration-300"
          >
            Your Orders →
          </Link>
        )}
      </div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black/30 to-transparent"></div>
    </section>
  );
};

export default HeroCom;
