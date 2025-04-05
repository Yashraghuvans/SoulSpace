import React from 'react';

const Services = () => {
    const features = [
        {
            id: 1,
            name: 'Binaural Beats',
            subHead: 'Tune Into Tranquility: Heal Your Mind with Sound',
            description: [
                'By playing two slightly different frequencies in each ear, your brain perceives a third tone that can influence your mental state.',
                'Creates a deeply immersive, therapeutic sound experience that promotes inner balance.',
            ],
        },
        {
            id: 2,
            name: 'Instant Mood Booster',
            subHead: 'Lift Your Spirits in Seconds!',
            description: [
                'Because sometimes, all it takes is a little nudge to feel a lot better.',
                'Science-backed methods blended with feel-good activities to spark joy fast',
            ],
        },
        {
            id: 3,
            name: 'Emotion Wheel Journaling',
            subHead: 'Explore Your Emotions, One Color at a Time',
            description: [
                'Emotion Wheel Journaling is a powerful technique that helps you identify, label, and process your emotions with clarity.',
                'Helps bridge the gap between feeling and understanding—essential for emotional regulation and personal growth.',
            ],
        },
        {
            id: 4,
            name: 'Mental Health Awareness Questionnaire',
            subHead: 'Understand Your Mind, One Answer at a Time',
            description: [
                'A Mental Health Awareness Questionnaire is a self-assessment tool designed to help individuals reflect on their emotional, psychological, and behavioral well-being.',
                'Aims to increase awareness about mental health by helping users identify early signs of stress, anxiety, depression, or burnout.',
            ],
        },
        {
            id: 5,
            name: 'Coping Skill Matcher',
            subHead: 'Struggling? Let’s Match You with What Helps',
            description: [
                'The Coping Skill Matcher is an interactive tool that helps individuals find personalized strategies to manage stress, anxiety, and emotional challenges.',
                'Offers a wide range of healthy coping mechanisms—like deep breathing, journaling, physical activity, grounding exercises, or creative expression.',
            ],
        },
    ];

    return (
        <div
            id="box"
            className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/back2.jpg')" }}
        >
            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/50 relative" id="features">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-white/80">
                        <span className="text-blue-600 text-6xl">F</span>eatures
                    </h2>
                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-800 z-0"></div>

                        <div
                            className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-700 opacity-20 z-0"
                            style={{ width: '3px', left: 'calc(50% - 1px)' }}
                        ></div>

                        <div className="relative z-10 space-y-16">
                            {features.map((feature, index) => (
                                <div key={feature.id} className="flex justify-center">
                                    <div
                                        className={`w-full max-w-2xl rounded-lg shadow-lg p-6 relative ${
                                            index % 2 === 0
                                                ? 'bg-black/80 text-white/80'
                                                : 'bg-white/80 text-black/80'
                                        } sm:mx-4`}
                                    >
                                        <div
                                            className={`absolute top-6 -left-2 w-4 h-4 transform -translate-x-1/2 rotate-45 ${
                                                index % 2 === 0 ? 'bg-white/80' : 'bg-black/80'
                                            }`}
                                        ></div>

                                        <h3 className="text-xl font-bold">{feature.name}</h3>
                                        <p className={`mt-1 text-lg ${index % 2 === 0 ? 'text-blue-400' : 'text-blue-600'}`}>
                                            {feature.subHead}
                                        </p>
                                        <ul className="mt-4 space-y-2">
                                            {feature.description.map((item, i) => (
                                                <li key={i} className="flex items-start">
                                                    <span
                                                        className={`mr-2 mt-1 ${
                                                            index % 2 === 0 ? 'text-blue-400' : 'text-blue-500'
                                                        }`}
                                                    >
                                                        ♥
                                                    </span>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Services;