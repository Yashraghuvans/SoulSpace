"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../Components/NavBar';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const emotionWheel = {
    core: ['Happy', 'Sad', 'Angry', 'Fearful', 'Surprised', 'Disgusted'],
    secondary: {
        Happy: ['Joyful', 'Excited', 'Content', 'Proud'],
        Sad: ['Lonely', 'Depressed', 'Grief', 'Disappointed'],
        Angry: ['Frustrated', 'Irritated', 'Furious', 'Resentful'],
        Fearful: ['Anxious', 'Scared', 'Terrified', 'Insecure'],
        Surprised: ['Amazed', 'Confused', 'Astonished', 'Shocked'],
        Disgusted: ['Repulsed', 'Appalled', 'Offended', 'Revolted'],
    },
};

const EmotionWheelJournal = () => {
    const [selectedCoreEmotion, setSelectedCoreEmotion] = useState('');
    const [selectedSecondaryEmotion, setSelectedSecondaryEmotion] = useState('');
    const [journalEntry, setJournalEntry] = useState('');
    const [journalEntries, setJournalEntries] = useState([
        {
            id: 1,
            emotion: 'Happy',
            text: 'Had a wonderful morning walk in the park. The sun was shining, and the birds were singing. It felt so peaceful and refreshing. Grateful for these simple moments that bring so much joy. Planning to have a productive day ahead filled with positive energy.',
            timestamp: '05/04/2025, 03:42:36',
            topic: 'Morning Serenity',
            upvotes: 0,
            downvotes: 0,
        },
        {
            id: 2,
            emotion: 'Frustrated',
            text: "Spent hours trying to debug a piece of code, and I'm still stuck. It's incredibly frustrating to keep hitting the same wall. Taking a short break now to clear my head. Hopefully, I can approach it with fresh eyes later and finally resolve this issue. Need to remember to be patient.",
            timestamp: '04/04/2025, 03:42:36',
            topic: 'Coding Challenges',
            upvotes: 0,
            downvotes: 0,
        },
    ]);

    const handleCoreEmotionChange = (event) => {
        const emotion = event.target.value;
        setSelectedCoreEmotion(emotion);
        setSelectedSecondaryEmotion('');
    };

    const handleSecondaryEmotionChange = (event) => {
        setSelectedSecondaryEmotion(event.target.value);
    };

    const handleJournalEntryChange = (event) => {
        setJournalEntry(event.target.value);
    };

    const handleSaveEntry = () => {
        if (journalEntry.trim()) {
            const newEntry = {
                id: Date.now(),
                emotion: selectedSecondaryEmotion || selectedCoreEmotion || 'No Emotion Selected',
                text: journalEntry.trim(),
                timestamp: new Date().toLocaleString(),
                topic: 'Untitled',
                upvotes: 0,
                downvotes: 0,
            };
            setJournalEntries([newEntry, ...journalEntries]);
            setJournalEntry('');
        }
    };

    const handleUpvote = (id) => {
        setJournalEntries(prevEntries =>
            prevEntries.map(entry =>
                entry.id === id ? { ...entry, upvotes: entry.upvotes + 1 } : entry
            )
        );
    };

    const handleDownvote = (id) => {
        setJournalEntries(prevEntries =>
            prevEntries.map(entry =>
                entry.id === id ? { ...entry, downvotes: entry.downvotes + 1 } : entry
            )
        );
    };

    return (
        <>
            <NavBar />
            <motion.div
                className="min-h-screen py-8 pt-28 px-28 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/journal.jpg')" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="container mx-auto p-6 bg-white/60 rounded-xl shadow-md"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.h2
                        className="text-5xl font-semibold mb-4 text-blue-700 text-center"
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        Emotion Wheel Journal
                    </motion.h2>
                    <motion.p
                        className="text-black text-md mt-1 text-center mb-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >
                        Tap into your emotional landscape. Select how you're feeling and use the space below to express your thoughts and experiences.
                    </motion.p>
                    <div className="mb-4">
                        <label htmlFor="core-emotion" className="block text-gray-700 text-sm font-bold mb-2">
                            How are you feeling primarily?
                        </label>
                        <select
                            id="core-emotion"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={selectedCoreEmotion}
                            onChange={handleCoreEmotionChange}
                        >
                            <option value="">Select a core emotion</option>
                            {emotionWheel.core.map((emotion) => (
                                <option key={emotion} value={emotion}>{emotion}</option>
                            ))}
                        </select>
                    </div>
                    {selectedCoreEmotion && (
                        <div className="mb-4">
                            <label htmlFor="secondary-emotion" className="block text-gray-700 text-sm font-bold mb-2">
                                More specifically?
                            </label>
                            <select
                                id="secondary-emotion"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={selectedSecondaryEmotion}
                                onChange={handleSecondaryEmotionChange}
                            >
                                <option value="">Select a more specific emotion</option>
                                {emotionWheel.secondary[selectedCoreEmotion]?.map((emotion) => (
                                    <option key={emotion} value={emotion}>{emotion}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="journal-entry" className="block text-gray-700 text-sm font-bold mb-2">
                            Your Journal Entry:
                        </label>
                        <textarea
                            id="journal-entry"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48 resize-vertical"
                            value={journalEntry}
                            onChange={handleJournalEntryChange}
                            placeholder="Start writing here..."
                        ></textarea>
                    </div>
                    <motion.button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleSaveEntry}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        Post Feeling
                    </motion.button>
                    {journalEntries.length > 0 && (
                        <motion.div
                            className="mt-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="text-lg font-semibold mb-4 text-gray-700">Past Entries:</h3>
                            <div className="space-y-4">
                                {journalEntries.map((entry, index) => (
                                    <motion.div
                                        key={entry.id}
                                        className="bg-white rounded-lg shadow-sm border p-4"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 }}
                                    >
                                        <div className="flex items-center mb-2">
                                            <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center font-semibold text-gray-700">
                                                {entry.emotion.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-3">
                                                <p className="font-semibold text-gray-800">{entry.topic}</p>
                                                <p className="text-gray-500 text-sm">{entry.emotion} - {entry.timestamp}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 mb-2">{entry.text}</p>
                                        <div className="flex items-center space-x-4 text-gray-600 text-sm">
                                            <button onClick={() => handleUpvote(entry.id)} className="flex items-center hover:text-blue-500 focus:outline-none">
                                                <ThumbsUp className="h-4 w-4 mr-1" /> {entry.upvotes}
                                            </button>
                                            <button onClick={() => handleDownvote(entry.id)} className="flex items-center hover:text-red-500 focus:outline-none">
                                                <ThumbsDown className="h-4 w-4 mr-1" /> {entry.downvotes}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
};

export default EmotionWheelJournal;