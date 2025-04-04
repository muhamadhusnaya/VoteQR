import React from "react";
import { useSearchParams } from "react-router-dom";

const VotingFailed = () => {
    const [searchParams] = useSearchParams();
    const errorMessage = searchParams.get("error") || "Terjadi kesalahan";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-blue-300 text-center p-4">
            <h1 className="text-3xl font-bold text-black">Hi-Technology 2025</h1>
            <img
                    src="https://hitech.hmtiudinus.org/img/event.png"
                    alt="Event"
                    className="w-50 h-50 object-contain"
            />
            <h2 className="text-2xl font-bold text-black">VOTING GAGAL</h2>
            <p className="text-lg text-black mt-2">{errorMessage}</p>
            <p className="text-sm text-black mt-4">SAMPAI JUMPA DI</p>
            <h3 className="text-xl font-bold text-black">Hi - Technology 2026</h3>
        </div>
    );
};

export default VotingFailed;
