import React from 'react';

const SoftwareIcons = () => {
    return (
        <div className="border border-white bg-linear-to-br from-blue-darkest to-blue-light from-15% to-90% rounded-lg sm:w-full py-10 flex flex-col items-center my-4">
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M6 9a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 9M3.854 4.146a.5.5 0 1 0-.708.708L4.793 6.5 3.146 8.146a.5.5 0 1 0 .708.708l2-2a.5.5 0 0 0 0-.708z" />
                <path d="M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
            </svg>
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4">Software Fair</h1>
        </div>
    );
};

export default SoftwareIcons;
