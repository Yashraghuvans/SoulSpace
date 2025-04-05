"use client";

import React from 'react';

const Card = () => {
    return (
        <>
            <div className='flex justify-center items-center my-52'>
                <div className="flex flex-col gap-4 justify-center items-center">
                    <div className="card bg-red-500 text-white flex flex-col items-center justify-center text-center h-24 w-64 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10">
                        <p className="text-lg font-bold">Hover Me</p>
                        <p className="text-sm">Lorem Ipsum</p>
                    </div>
                    <div className="card bg-blue-500 text-white flex flex-col items-center justify-center text-center h-24 w-64 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10">
                        <p className="text-lg font-bold">Hover Me</p>
                        <p className="text-sm">Lorem Ipsum</p>
                    </div>
                    <div className="card bg-green-500 text-white flex flex-col items-center justify-center text-center h-24 w-64 rounded-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:z-10">
                        <p className="text-lg font-bold">Hover Me</p>
                        <p className="text-sm">Lorem Ipsum</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Card;
