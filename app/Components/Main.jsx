import React from 'react';

const Main = () => {
  return (
    <>
      <div
        className="w-full h-screen bg-cover bg-center relative"
        style={{ backgroundImage: "url('/back1.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
    </>
  );
};

export default Main;