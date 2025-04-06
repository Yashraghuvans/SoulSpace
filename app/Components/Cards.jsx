import React from 'react';
import Link from 'next/link';

const Card = ({ data }) => {
    return (
        <>
            <div className="flex flex-col justify-between rounded-lg bg-white w-72 h-[370px] shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative mt-6 mx-4 rounded-lg bg-blue-500 shadow-lg shadow-blue-500/40 h-56 flex items-center justify-center">
                    <img
                        src={data.imgUrl}
                        alt={data.title}
                        className="rounded-lg object-cover h-[22vh] w-[22vw]"
                    />
                </div>
                <div className="border-none py-6 px-6 text-center">
                    <p className="text-gray-700 tracking-normal leading-5 font-semibold text-xl mb-2">
                        {data.title}
                    </p>
                    <p className="text-gray-600">
                        {data.description}
                    </p>
                </div>
                <div className="py-3 px-4 border-t border-gray-200 flex items-center justify-center bg-[rgba(0,140,255,0.082)] rounded-b-lg">
                    <Link href={data.url}>
                        <button
                            type="button"
                            className="select-none border-none outline-none shadow-md shadow-blue-500/40 text-white uppercase font-bold text-sm py-3 px-6 bg-blue-500 rounded-md"
                        >
                            {data.action}
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
};

const CardList = ({ cardsData }) => {
    return (
        <div className='bg-cover bg-center bg-no-repeat'
        style={{ backgroundImage: "url('/journal.jpg')" }}
        >
            <div className="flex flex-wrap gap-4 justify-center px-5 py-10 bg-black/70">
                {cardsData.map((card, index) => (
                    <Card key={index} data={card} />
                ))}
            </div>
        </div>
    );
};

const App = () => {
    const cardInformation = [
        {
            title: 'Binaural Beats',
            description: 'Tune Your Mind with Soul Space.',
            action: 'Explore',
            url: '/beats',
            imgUrl: '/beats.gif',
        },
        {
            title: 'Calm & Support',
            description: 'Support for Mental Health.',
            action: 'Explore',
            url: '/copup',
            imgUrl: '/back1.jpg',
        },
        {
            title: 'Mental Wellness Check',
            description: 'Assess Your Mental Wellness.',
            action: 'Explore',
            url: '/form',
            imgUrl: '/back3.jpg',
        },
        {
            title: 'Emotion Wheel Journal',
            description: 'Explore Your Emotions.',
            action: 'Explore',
            url: '/emotionWheel',
            imgUrl: '/journal.jpg',
        },
    ];

    return (
        <div>
            <CardList cardsData={cardInformation} />
        </div>
    );
};

export default App;