import Image from 'next/image';
import React from 'react';

const Main = () => {
  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/back1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/80 flex justify-around items-center">
          <div className='flex flex-col items-center justify-center text-white/90'>
            <h1 className='text-7xl font-bold py-7'>Soul Space</h1>
            <h2 className='text-2xl px-5'>We aim to build a user-friendly web platform leveraging React and Next.js that offers a range of features to provide immediate mood support, increase mental health awareness, and introduce basic coping skills. While initially location-agnostic, the platform is designed with the potential for future integration of localized resources </h2>
          </div>
          <div>
            <Image
              src="/front.png"
              alt="Logo"
              width={2000}
              height={1200}
              className="shadow-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;