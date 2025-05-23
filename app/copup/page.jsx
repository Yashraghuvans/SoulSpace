"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../Components/NavBar';

const copingSkillsLibrary = [
    {
        id: 1,
        name: 'Deep Breathing Exercise',
        description: 'Slow, deep breaths can calm your nervous system.',
        feelingTags: ['stressed', 'anxious', 'overwhelmed'],
        timeRequired: '< 5 minutes',
        steps: ['Find a comfortable position.', 'Inhale deeply through your nose, counting to 4.', 'Hold your breath for a count of 4.', 'Exhale slowly through your mouth, counting to 6.', 'Repeat several times.'],
    },
    {
        id: 2,
        name: 'Mindful Observation',
        description: 'Engage your senses to ground yourself in the present moment.',
        feelingTags: ['stressed', 'anxious', 'disconnected'],
        timeRequired: '< 5 minutes',
        steps: ['Pick an object near you.', 'Observe it carefully, noting its color, shape, texture, and any other details.', 'Engage all your senses: what does it look like, feel like, smell like (if applicable)?', 'Simply observe without judgment.'],
    },
    {
        id: 3,
        name: 'Listen to Calming Music',
        description: 'Soothing music can help shift your mood.',
        feelingTags: ['low mood', 'stressed', 'sad'],
        timeRequired: '5-15 minutes',
        steps: ['Put on some instrumental or calming music.', 'Focus on the sounds and how they make you feel.', 'Allow yourself to relax and enjoy the music.'],
    },
    {
        id: 4,
        name: 'Quick Walk',
        description: 'Gentle physical activity can boost your mood and reduce stress.',
        feelingTags: ['low mood', 'stressed', 'restless'],
        timeRequired: '10-20 minutes',
        steps: ['Step outside if possible.', 'Take a brisk walk around your home or neighborhood.', 'Pay attention to your surroundings and how your body feels.'],
    },
    {
        id: 5,
        name: 'Journaling Prompt',
        description: 'Writing down your thoughts and feelings can provide clarity.',
        feelingTags: ['low mood', 'stressed', 'confused'],
        timeRequired: '10-15 minutes',
        steps: ['Grab a notebook or open a document.', 'Write about what you are feeling right now.', 'Consider what might have triggered these feelings.', 'What is one small step you could take to feel a bit better?'],
    },
    {
        id: 6,
        name: 'Connect with Someone',
        description: 'Talking to a trusted friend or family member can provide support.',
        feelingTags: ['low mood', 'lonely', 'stressed'],
        timeRequired: 'Variable',
        steps: ['Reach out to someone you trust.', 'Share how you are feeling.', 'Simply talking and feeling heard can be helpful.'],
    },
    {
        id: 7,
        name: 'Engage in a Hobby',
        description: 'Spending time on enjoyable activities can lift your spirits.',
        feelingTags: ['low mood', 'bored', 'disconnected'],
        timeRequired: '15+ minutes',
        steps: ['Choose a hobby you enjoy (e.g., reading, painting, playing an instrument).', 'Dedicate some time to it.', 'Focus on the activity and let your worries fade.'],
    },
    {
        id: 8,
        name: 'Progressive Muscle Relaxation',
        description: 'Tense and then release different muscle groups to reduce tension.',
        feelingTags: ['stressed', 'anxious', 'tense'],
        timeRequired: '15-20 minutes',
        steps: ['Find a comfortable position.', 'Tense a specific muscle group (e.g., your fists) for 5-10 seconds.', 'Release the tension suddenly and notice the difference.', 'Repeat with other muscle groups (arms, shoulders, face, etc.).'],
    },
    {
        id: 9,
        name: 'Visualize a Calm Place',
        description: 'Imagine a peaceful and relaxing environment.',
        feelingTags: ['stressed', 'anxious', 'overwhelmed'],
        timeRequired: '< 5 minutes',
        steps: ['Close your eyes.', 'Imagine a place where you feel completely calm and safe.', 'Engage your senses: what do you see, hear, smell, feel?', 'Stay with this image for a few minutes.'],
    },
    {
        id: 10,
        name: 'Do a Puzzle',
        description: 'Engaging in a simple puzzle can distract from worries.',
        feelingTags: ['anxious', 'bored', 'restless'],
        timeRequired: '10-20 minutes',
        steps: ['Find a simple puzzle (e.g., Sudoku, crossword, jigsaw).', 'Focus your attention on solving it.', 'Allow yourself to get absorbed in the task.'],
    },
];

const feelingKeywords = [...new Set(copingSkillsLibrary.flatMap(skill => skill.feelingTags))].sort();

const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
};

const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: '#3b82f6', transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
};

const suggestionVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.1 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeInOut" } },
};

const skillItemVariants = {
    initial: { opacity: 0, y: 5 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    exit: { opacity: 0, y: -5, transition: { duration: 0.1, ease: "easeInOut" } },
};

const timeOptionsMap = {
    stressed: ['< 5 minutes', '5-15 minutes', '15+ minutes'],
    anxious: ['< 5 minutes', '5-15 minutes', '15+ minutes'],
    overwhelmed: ['< 5 minutes', '5-15 minutes'],
    'low mood': ['5-15 minutes', '15+ minutes'],
    sad: ['5-15 minutes', '15+ minutes'],
    restless: ['10-20 minutes', '15+ minutes'],
    confused: ['5-15 minutes', '15+ minutes'],
    lonely: ['Variable', '5-15 minutes', '15+ minutes'],
    disconnected: ['< 5 minutes', '5-15 minutes', '15+ minutes'],
    bored: ['15+ minutes', '5-15 minutes'],
    tense: ['15-20 minutes', '5-15 minutes', '< 5 minutes'],
};

const CopingSkillMatcher = () => {
    const [currentFeeling, setCurrentFeeling] = useState('');
    const [availableTime, setAvailableTime] = useState('');
    const [timeOptions, setTimeOptions] = useState([
        { value: '', label: 'Select time' },
        { value: '< 5 minutes', label: 'Less than 5 minutes' },
        { value: '5-15 minutes', label: '5-15 minutes' },
        { value: '15+ minutes', label: '15+ minutes' },
        { value: 'Variable', label: 'Variable' },
    ]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (currentFeeling) {
            const relevantTimeOptions = timeOptionsMap[currentFeeling.toLowerCase()] || ['< 5 minutes', '5-15 minutes', '15+ minutes', 'Variable'];
            setTimeOptions([
                { value: '', label: 'Select time' },
                ...relevantTimeOptions.map(option => ({ value: option, label: option })),
            ]);
            setAvailableTime('');
        } else {
            setTimeOptions([
                { value: '', label: 'Select time' },
                { value: '< 5 minutes', label: 'Less than 5 minutes' },
                { value: '5-15 minutes', label: '5-15 minutes' },
                { value: '15+ minutes', label: '15+ minutes' },
                { value: 'Variable', label: 'Variable' },
            ]);
            setAvailableTime('');
        }
    }, [currentFeeling]);

    const handleFeelingChange = (event) => {
        setCurrentFeeling(event.target.value);
    };

    const handleTimeChange = (event) => {
        setAvailableTime(event.target.value);
    };

    const handleFindSkills = () => {
        if (!currentFeeling || !availableTime) {
            setSuggestions([]);
            return;
        }

        const relevantSkills = copingSkillsLibrary.filter((skill) => {
            const feelingMatch = skill.feelingTags.some((tag) =>
                currentFeeling.toLowerCase().includes(tag.toLowerCase())
            );
            const timeMatch = skill.timeRequired.includes(availableTime);

            return feelingMatch && timeMatch;
        });

        setSuggestions(relevantSkills);
    };

    return (
        <>
            <div className="bg-cover bg-center bg-no-repeat min-h-screen flex flex-col"
                style={{ backgroundImage: "url('/back1.jpg')" }}
            >
                <NavBar />
                <motion.div
                    className="bg-black/70 p-6 sm:p-8 rounded-xl shadow-lg flex justify-center flex-col items-center w-full flex-grow overflow-auto pt-20 sm:pt-28 px-4 sm:px-8 md:px-16 lg:px-20"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <div className='backdrop-blur-lg bg-white/30 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-lg'>
                        <motion.h2 className="text-3xl sm:text-4xl font-semibold mb-4 sm:mb-6 text-blue-700 text-center">Find Calm & Support</motion.h2>

                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="feeling" className="block text-black text-sm font-bold mb-2">
                                How are you feeling right now?
                            </label>
                            <motion.select
                                id="feeling"
                                className="shadow appearance-none border rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
                                value={currentFeeling}
                                onChange={handleFeelingChange}
                            >
                                <option value="">Select a feeling</option>
                                {feelingKeywords.map((keyword) => (
                                    <option key={keyword} value={keyword} className="py-2">
                                        {keyword.charAt(0).toUpperCase() + keyword.slice(1)}
                                    </option>
                                ))}
                            </motion.select>
                        </div>

                        <div className="mb-4 sm:mb-6">
                            <label htmlFor="time" className="block text-black text-sm font-bold mb-2">
                                How much time do you have?
                            </label>
                            <motion.select
                                id="time"
                                className="shadow appearance-none border rounded w-full py-2 sm:py-3 px-3 sm:px-4 text-black leading-tight focus:outline-none focus:shadow-outline"
                                value={availableTime}
                                onChange={handleTimeChange}
                                disabled={!currentFeeling}
                            >
                                {timeOptions.map((option) => (
                                    <option key={option.value} value={option.value} className="py-2" disabled={option.value === '' && currentFeeling}>
                                        {option.label}
                                    </option>
                                ))}
                            </motion.select>
                            {!currentFeeling && (
                                <p className="text-black text-xs italic mt-1">Please select a feeling first.</p>
                            )}
                        </div>

                        <motion.button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-md focus:outline-none focus:shadow-outline w-full"
                            type="button"
                            onClick={handleFindSkills}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            disabled={!currentFeeling || !availableTime}
                        >
                            Find Suggestions
                        </motion.button>

                        <AnimatePresence>
                            {suggestions.length > 0 && (
                                <motion.div
                                    className="mt-6 sm:mt-8 overflow-y-auto max-h-[60vh] pr-2"
                                    variants={suggestionVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                >
                                    <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-black">Here are some ideas:</h3>
                                    <motion.ul className="space-y-3 sm:space-y-4">
                                        {suggestions.map((skill) => (
                                            <motion.li
                                                key={skill.id}
                                                className="border rounded-lg p-3 sm:p-4 shadow-sm"
                                                variants={skillItemVariants}
                                            >
                                                <h4 className="font-semibold text-md sm:text-lg text-indigo-700 mb-1 sm:mb-2">{skill.name}</h4>
                                                <p className="text-black text-xs sm:text-sm mb-2 sm:mb-3">{skill.description}</p>
                                                {skill.steps && skill.steps.length > 0 && (
                                                    <div className="mt-1 sm:mt-2">
                                                        <p className="text-black text-xs italic mb-1">Steps:</p>
                                                        <ol className="list-decimal list-inside text-black text-xs sm:text-sm">
                                                            {skill.steps.map((step, index) => (
                                                                <li key={index} className="mb-1">{step}</li>
                                                            ))}
                                                        </ol>
                                                    </div>
                                                )}
                                                <p className="text-black text-xs mt-1 sm:mt-2">
                                                    Time: <span className="font-medium">{skill.timeRequired}</span>
                                                </p>
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {suggestions.length === 0 && currentFeeling && availableTime && (
                            <motion.p
                                className="mt-4 sm:mt-6 text-gray-600 italic text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                                exit={{ opacity: 0 }}
                            >
                                Hmm, couldn't find anything specific for that right now. Try another feeling or time frame.
                            </motion.p>
                        )}
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default CopingSkillMatcher;