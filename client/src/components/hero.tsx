export default function Hero() {
  return (
    <section className="py-20 px-4 md:px-0">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Accelerate Your Business Growth Today
          </h1>
          <p className="text-xl text-gray-300 mb-10">
            Discover proven strategies that drive leads, conversions, and revenue for your business.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="bg-primary hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition transform hover:scale-105"
            >
              Get Started Free
            </a>
            <a 
              href="#features" 
              className="bg-transparent border border-white text-white font-semibold py-3 px-8 rounded-md hover:bg-white hover:text-black transition transform hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* AdSense container - leaderboard format */}
        <div className="ad-container w-full h-24 max-w-4xl mx-auto relative border border-white/10 rounded-lg bg-slate-800/30 flex justify-center items-center">
          <div className="text-gray-400 text-sm absolute -top-2.5 bg-black px-2">
            Advertisement
          </div>
        </div>
      </div>
    </section>
  );
}
