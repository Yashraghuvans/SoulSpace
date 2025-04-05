"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '../Components/NavBar';

const MentalHealthForm = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [mentalHealthScore, setMentalHealthScore] = useState(null);
    const [mentalAgeScore, setMentalAgeScore] = useState(null);
    const [mentalWellnessSolution, setMentalWellnessSolution] = useState(null);

    const questions = [
        {
            id: 1,
            text: 'How often have you felt down, depressed, or hopeless in the past two weeks?',
            options: [
                { value: 1, label: 'Not at all' },
                { value: 2, label: 'Several days' },
                { value: 3, label: 'More than half the days' },
                { value: 4, label: 'Nearly every day' },
                { value: 5, label: 'Nearly every day and severely' },
            ],
            stressFactor: 2,
        },
        {
            id: 2,
            text: 'How often have you had trouble falling or staying asleep, or sleeping too much in the past two weeks?',
            options: [
                { value: 1, label: 'Not at all' },
                { value: 2, label: 'Several days' },
                { value: 3, label: 'More than half the days' },
                { value: 4, label: 'Nearly every day' },
                { value: 5, label: 'Nearly every day and significantly impacting daily life' },
            ],
            stressFactor: 3,
        },
        {
            id: 3,
            text: 'How would you rate your stress level in general on a scale of 1 to 10 (1 being very low, 10 being very high)?',
            options: [
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
                { value: 8, label: '8' },
                { value: 9, label: '9' },
                { value: 10, label: '10' },
            ],
            stressFactor: 1,
        },
        {
            id: 4,
            text: 'How often have you felt worried or anxious in the past two weeks?',
            options: [
                { value: 1, label: 'Not at all' },
                { value: 2, label: 'Several days' },
                { value: 3, label: 'More than half the days' },
                { value: 4, label: 'Nearly every day' },
                { value: 5, label: 'Nearly every day and causing significant distress' },
            ],
            stressFactor: 2.5,
        },
        {
            id: 5,
            text: 'How much interest or pleasure have you had in doing things in the past two weeks?',
            options: [
                { value: 5, label: 'Nearly every day' },
                { value: 4, label: 'More than half the days' },
                { value: 3, label: 'Several days' },
                { value: 2, label: 'Not at all' },
                { value: 1, label: 'No interest or pleasure in anything' },
            ],
            stressFactor: 2,
        },
    ];

    const handleAnswerChange = (questionId, value) => {
        setAnswers(prevAnswers => ({ ...prevAnswers, [questionId]: parseInt(value) }));
    };

    const nextQuestion = () => {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
    };

    const prevQuestion = () => {
        setCurrentQuestion(prevQuestion => prevQuestion - 1);
    };

    const handleSubmit = () => {
        setShowResults(true);
        calculateScoresAndSolutions();
    };

    const calculateScoresAndSolutions = () => {
        let totalMentalHealthScore = 0;
        let totalStressScore = 0;
        let stressCount = 0;
        let calculatedMentalAgeScore = null;
        let calculatedMentalHealthScore = null;
        let wellnessSolution = null;

        questions.forEach(question => {
            const answer = answers[question.id];
            if (answer !== undefined) {
                totalMentalHealthScore += answer;
                if (question.stressFactor) {
                    totalStressScore += answer * question.stressFactor;
                    stressCount++;
                }
            }
        });

        const maxPossibleScore = questions.length * 5;
        calculatedMentalHealthScore = Math.round((totalMentalHealthScore / maxPossibleScore) * 9 + 1);
        setMentalHealthScore(calculatedMentalHealthScore);

        if (stressCount > 0) {
            const averageStress = totalStressScore / stressCount;
            const normalizedStress = (averageStress - 1) / 4;
            const mentalAgeEstimate = Math.round(10 + normalizedStress * 20);
            calculatedMentalAgeScore = Math.max(1, Math.min(10, mentalAgeEstimate));
            setMentalAgeScore(calculatedMentalAgeScore);
        } else {
            setMentalAgeScore(null);
        }

        if (calculatedMentalHealthScore >= 1 && calculatedMentalHealthScore <= 3) {
            wellnessSolution = <p>It's important to prioritize your well-being.Repeat positive affirmations,play uplifting music.Spend time with nature.</p>;
        } else if (calculatedMentalHealthScore >= 4 && calculatedMentalHealthScore <= 6) {
            wellnessSolution = <p>Focus on incorporating stress-reducing techniques into your daily life. Consider listening to binaural audio designed for mood support, spending time in nature, or practicing deep breathing exercises could be beneficial.</p>;
        } else if (calculatedMentalHealthScore >= 7 && calculatedMentalHealthScore <= 9) {
            wellnessSolution = <p>You're doing well! Continue to maintain a healthy lifestyle. Consider adding activities that bring you joy and help manage stress, such as hobbies, creative pursuits, or spending quality time with loved ones.</p>;
        } else if (calculatedMentalHealthScore === 10) {
            wellnessSolution = <p>Excellent! You're indicating a strong sense of well-being. Keep prioritizing self-care, maintaining positive habits, and staying connected with your support system.</p>;
        }

        setMentalWellnessSolution(wellnessSolution);
    };

    const renderQuestion = () => {
        const question = questions[currentQuestion];
        return (
            <motion.div
                key={question.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="mb-6 p-4 border rounded shadow-md bg-white/80 backdrop-blur-sm"
            >
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{question.text}</h3>
                <div className="space-y-2">
                    {question.options.map((option) => (
                        <label key={option.value} className="block text-gray-700">
                            <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option.value}
                                checked={answers[question.id] === option.value}
                                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                className="mr-2"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            </motion.div>
        );
    };

    const renderResults = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="mt-8 p-6 border rounded shadow-md bg-white/80 backdrop-blur-sm text-center"
        >
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Results</h2>
            {mentalHealthScore !== null && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="mb-2 text-gray-800"
                >
                    Overall Mental Wellness Score: <span className={`font-semibold text-xl ${mentalHealthScore <= 4 ? 'text-red-500' : mentalHealthScore <= 7 ? 'text-yellow-500' : 'text-green-500'}`}>{mentalHealthScore}/10</span>
                </motion.p>
            )}
            {mentalAgeScore !== null && (
                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="mb-4 text-gray-800"
                >
                    Estimated Mental Age Score (based on stress): <span className={`font-semibold text-xl ${mentalAgeScore <= 4 ? 'text-yellow-500' : 'text-green-500'}`}>{mentalAgeScore}/10</span>
                </motion.p>
            )}
            {mentalWellnessSolution && (
                <div className="mt-4 text-left">
                    <h3 className="font-semibold mb-2">Recommendation based on Overall Score:</h3>
                    {mentalWellnessSolution}
                </div>
            )}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                onClick={() => { setShowResults(false); setCurrentQuestion(0); setAnswers({}); setMentalHealthScore(null); setMentalAgeScore(null); setMentalWellnessSolution(null); }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Retake the Quiz
            </motion.button>
        </motion.div>
    );

    return (
        <>
            <div>
                <NavBar/>
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/back3.jpg')" }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="w-1/2 max-h-[90vh] bg-white/50 rounded-lg shadow-xl overflow-y-auto p-6"
                    >
                        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Mental Wellness Check</h1>
                        {!showResults ? (
                            <motion.div
                                key={currentQuestion}
                                className="relative"
                            >
                                {renderQuestion()}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-between"
                                >
                                    {currentQuestion > 0 && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={prevQuestion}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                        >
                                            Previous
                                        </motion.button>
                                    )}
                                    {currentQuestion < questions.length - 1 ? (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={nextQuestion}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Next
                                        </motion.button>
                                    ) : (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={handleSubmit}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Get Scores
                                        </motion.button>
                                    )}
                                </motion.div>
                            </motion.div>
                        ) : (
                            renderResults()
                        )}
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default MentalHealthForm;