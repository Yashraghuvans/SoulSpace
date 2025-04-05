import React from 'react';

const Services = () => {
    const features = [
        {
            id: 1,
            name: 'Binaural Beats',
            subHead: 'Easy to Use and Navigate',
            description: [
                'Designed with a user-centric approach for seamless interaction.',
                'Clear and straightforward navigation ensures a smooth experience.',
                'Accessible design principles for all users.',
            ],
        },
        {
            id: 2,
            name: 'Instant Mood Booster',
            subHead: 'Works on All Your Devices',
            description: [
                'Fully responsive design adapts to desktops, tablets, and smartphones.',
                'Consistent experience across different operating systems.',
                'Optimized for various screen sizes and resolutions.',
            ],
        },
        {
            id: 3,
            name: 'Emotion Wheel Journaling',
            subHead: 'Fast and Reliable',
            description: [
                'Built with performance in mind for quick loading times.',
                'Efficient code ensures smooth operation even under load.',
                'Regular optimizations to maintain speed and reliability.',
            ],
        },
        {
            id: 4,
            name: 'Mental Health Awareness Questionnaire',
            subHead: 'Your Data is Protected',
            description: [
                'Implementing industry-standard security measures.',
                'Respecting user privacy with transparent data handling.',
                'Regular security audits and updates.',
            ],
        },
        {
            id: 5,
            name: 'Coping Skill Matcher',
            subHead: 'Tailor It to Your Needs',
            description: [
                'Offering a range of settings and configurations.',
                'Adaptable features to match your specific requirements.',
                'Easy personalization to reflect your preferences.',
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
                                                        •
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