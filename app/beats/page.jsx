"use client";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../Components/NavBar';

const frequencyOptions = [
    { value: 200, label: '200 Hz (Default)' },
    { value: 150, label: '150 Hz' },
    { value: 250, label: '250 Hz' },
];

const differenceOptions = [
    { value: 10, label: '10 Hz (Default)' },
    { value: 5, label: '5 Hz (Delta - Deep Sleep)' },
    { value: 15, label: '15 Hz (Beta - Alertness)' },
    { value: 20, label: '20 Hz (Beta - High Alertness)' },
    { value: 40, label: '40 Hz (Gamma - Max Relax/Focus)' },
];

const BinauralBeatsPlayer = () => {
    const [baseFrequency, setBaseFrequency] = useState(200);
    const [frequencyDifference, setFrequencyDifference] = useState(10);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioContext, setAudioContext] = useState(null);
    const [oscillatorLeft, setOscillatorLeft] = useState(null);
    const [oscillatorRight, setOscillatorRight] = useState(null);
    const [gainNodeLeft, setGainNodeLeft] = useState(null);
    const [gainNodeRight, setGainNodeRight] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            setAudioContext(audioCtx);

            const gainL = audioCtx.createGain();
            const gainR = audioCtx.createGain();
            setGainNodeLeft(gainL);
            setGainNodeRight(gainR);

            const oscL = audioCtx.createOscillator();
            const oscR = audioCtx.createOscillator();
            setOscillatorLeft(oscL);
            setOscillatorRight(oscR);

            oscL.connect(gainL);
            oscR.connect(gainR);
            gainL.connect(audioCtx.destination);
            gainR.connect(audioCtx.destination);

            oscL.start();
            oscR.start();
            gainL.gain.setValueAtTime(0, audioCtx.currentTime);
            gainR.gain.setValueAtTime(0, audioCtx.currentTime);
        }

        return () => {
            if (audioContext) {
                if (oscillatorLeft) oscillatorLeft.stop();
                if (oscillatorRight) oscillatorRight.stop();
            }
        };
    }, []);

    useEffect(() => {
        if (oscillatorLeft && oscillatorRight && isPlaying && audioContext) {
            oscillatorLeft.frequency.setValueAtTime(baseFrequency - frequencyDifference / 2, audioContext.currentTime);
            oscillatorRight.frequency.setValueAtTime(baseFrequency + frequencyDifference / 2, audioContext.currentTime);
            gainNodeLeft.gain.setValueAtTime(0.5, audioContext.currentTime);
            gainNodeRight.gain.setValueAtTime(0.5, audioContext.currentTime);
        } else if (!isPlaying && audioContext && gainNodeLeft && gainNodeRight) {
            gainNodeLeft.gain.setValueAtTime(0, audioContext.currentTime);
            gainNodeRight.gain.setValueAtTime(0, audioContext.currentTime);
        }
    }, [baseFrequency, frequencyDifference, isPlaying, oscillatorLeft, oscillatorRight, audioContext, gainNodeLeft, gainNodeRight]);

    const togglePlay = () => {
        if (!audioContext) return;
        setIsPlaying(!isPlaying);
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    };

    const handleBaseFrequencyChange = (event) => {
        setBaseFrequency(parseInt(event.target.value));
    };

    const handleFrequencyDifferenceChange = (event) => {
        setFrequencyDifference(parseInt(event.target.value));
    };

    return (
        <>
            <div>
                <video
                    autoPlay
                    loop
                    muted
                    className="absolute top-0 left-0 w-full object-cover -z-10"
                >
                    <source src="/beats_b.mp4" type="video/mp4" />
                </video>
                <NavBar />
                <motion.div
                    className="flex justify-center items-center min-h-screen bg-black/50 gap-12 px-4 sm:px-6 md:px-8 lg:px-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div
                        className="bg-white/70 flex flex-col md:flex-row justify-center items-center rounded-lg shadow-md p-6 md:p-8 lg:p-3"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.div
                            className="mb-4 md:mb-0 md:mr-8 lg:mr-3"
                            initial={{ rotate: 0 }}
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <Image
                                src="/beats.gif"
                                alt="Soul Space Logo"
                                width={200}
                                height={200}
                                className="rounded-full shadow-md bg-gradient-to-r from-blue-500 to-purple-500"
                            />
                        </motion.div>
                        <div className="flex justify-center items-center flex-col text-center md:text-left">
                            <motion.h1
                                className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-2 md:mb-4 text-gray-800"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                Binaural Harmony
                            </motion.h1>
                            <motion.h2
                                className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-gray-800"
                                initial={{ y: -50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.7 }}
                            >
                                Tune Your Mind with Soul Space
                            </motion.h2>

                            <div className="mb-2 md:mb-4 w-full md:w-auto">
                                <label htmlFor="baseFrequency" className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                                    Base Frequency (Hz):
                                </label>
                                <select
                                    id="baseFrequency"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={baseFrequency}
                                    onChange={handleBaseFrequencyChange}
                                >
                                    {frequencyOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4 w-full md:w-auto">
                                <label htmlFor="frequencyDifference" className="block text-gray-700 text-sm font-bold mb-1 md:mb-2">
                                    Frequency Difference (Hz):
                                </label>
                                <select
                                    id="frequencyDifference"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={frequencyDifference}
                                    onChange={handleFrequencyDifferenceChange}
                                >
                                    {differenceOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <motion.button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isPlaying ? 'bg-red-500 hover:bg-red-700' : ''
                                    }`}
                                type="button"
                                onClick={togglePlay}
                                disabled={!audioContext}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isPlaying ? 'Stop' : 'Play'}
                            </motion.button>

                            {audioContext && audioContext.state === 'suspended' && (
                                <p className="mt-2 text-sm text-yellow-500">AudioContext is suspended. Please interact with the page to enable audio.</p>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default BinauralBeatsPlayer;