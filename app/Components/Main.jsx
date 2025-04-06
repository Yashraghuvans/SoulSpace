import Head from 'next/head';
import Link from 'next/link';

export default function Main() {
  return (
    <div>
      <Head>
        <title>Soul Space</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main id="home" className="relative text-white min-h-screen flex flex-col justify-center items-center px-6 sm:px-12 md:px-24 lg:px-0">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        >
          <source src="/anim.mp4" type="video/mp4" />
        </video>
        <div className="text-center relative z-10 py-8 md:py-16 lg:py-24">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-4">
            Welcome to Soul Space.
          </h1>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 sm:mb-8 leading-tight">
            Your Pocket Companion for <span className="text-blue-500">Mental Well-being</span>
          </h2>
          <p className="text-lg mb-4 sm:mb-8 text-center">
            Stressed? Find calm here. Simple tools for your well-being. Breathe, reflect, and center yourself. Your journey to peace starts now.
          </p>
          <a href="#box">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg">
              Explore More
            </button>
          </a>
        </div>

        <div className="flex justify-center mt-8 sm:mt-12 md:mt-16 space-x-6 sm:space-x-12 relative z-10">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold">15K+</p>
            <p className="text-sm sm:text-lg">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold">4+</p>
            <p className="text-sm sm:text-lg">Support Tools</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold">90%</p>
            <p className="text-sm sm:text-lg">Happy Users</p>
          </div>
        </div>
      </main>
    </div>
  );
}