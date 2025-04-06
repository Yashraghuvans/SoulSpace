import React from 'react';

const Footer = () => {
    return (
        <>
            <div className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/journal.jpg')" }}>
                <div className="flex flex-col items-center py-8 bg-black/70">
                    <div className="bg-white/50 p-6 rounded-md w-full max-w-md mb-6">
                        <span className="block text-2xl text-black font-bold mb-4 text-center">
                            Contact Us
                        </span>
                        <form className="flex flex-col">
                            <input
                                type="text"
                                placeholder="Name"
                                className="py-2 px-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:shadow-md focus:scale-105 transition-transform ease-in-out duration-300 text-sm"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                name="email"
                                className="py-2 px-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:shadow-md focus:scale-105 transition-transform ease-in-out duration-300 text-sm"
                                required
                            />
                            <textarea
                                placeholder="Message"
                                id="message"
                                name="message"
                                className="resize-none h-24 py-2 px-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:shadow-md focus:scale-105 transition-transform ease-in-out duration-300 text-sm"
                                required
                                defaultValue={''}
                            />
                            <button
                                type="submit"
                                className="bg-blue-500 text-white border-none rounded-md py-3 px-6 text-sm cursor-pointer hover:scale-110 transition-transform ease-in-out duration-300"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                    <p className="text-gray-500 text-xs">
                        &copy; {new Date().getFullYear()} All Rights Reserved.
                    </p>
                </div>
            </div>
        </>
    );
};

export default Footer;