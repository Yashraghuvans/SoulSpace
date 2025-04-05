import Head from 'next/head';

export default function Main() {
  return (
    <div>
      <Head>
        <title>Soul Space</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gray-900 text-white min-h-screen flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Soul Space.
          </h1>
          <h2 className="text-5xl font-extrabold mb-8">
            Your Pocket Companion for <span className="text-blue-500">Mental Well-being</span>
          </h2>
          <p className="text-lg mb-8">
            Stressed? Find calm here. Simple tools for your well-being. Breathe, reflect, and center yourself. Your journey to peace starts now.

          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg">
            Explore More
          </button>
        </div>

        <div className="flex justify-center mt-16 space-x-12">
          <div className="text-center">
            <p className="text-4xl font-bold">10K+</p>
            <p className="text-lg">Active Users</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">5+</p>
            <p className="text-lg">Interactive Games</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold">95%</p>
            <p className="text-lg">Happy Users</p>
          </div>
        </div>

        <button className="fixed bottom-8 left-8 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full">
          Emergency Help
        </button>
      </main>
    </div>
  );
}