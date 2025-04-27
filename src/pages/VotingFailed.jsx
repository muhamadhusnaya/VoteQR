import React from "react";
import { useSearchParams } from "react-router-dom";
import HeroTitle from "../components/Texts/HeroTitle";

const VotingFailed = () => {
    const [searchParams] = useSearchParams();
    const errorMessage = searchParams.get("error") || "Terjadi kesalahan";

    return (
        <div className="overflow-hidden bg-[#130153] min-h-screen flex flex-col items-center relative text-white">
            <div className="absolute w-full h-full">
                <div className="absolute z-0 w-1/2 aspect-square bg-purple-light -right-1/5 -top-1/4 rounded-full blur-[300px]" />
                <div className="absolute z-0 w-2/5 aspect-square bg-yellow -right-1/5 -bottom-1/5 rounded-full blur-[300px]" />
                <div className="absolute z-0 w-1/2 aspect-square bg-blue-light -left-1/5 -bottom-1/4 rounded-full blur-[300px]" />
                <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-[#130153] z-10" />
            </div>
            <div className="flex flex-col items-center z-40 text-white mt-20">
                <div className="relative">
                    <HeroTitle />
                </div>
            </div>
            <div className="z-20 mt-10 flex flex-col items-center text-center px-6">
                <h2 className="text-3xl font-bold text-red-500">VOTING GAGAL</h2>
                <p className="text-lg text-white mt-4 max-w-md">{errorMessage}</p>

                <p className="text-sm text-white mt-8">Jangan Lupa Berkunjung ke Minigames <br />sampai jumpa di</p>
                <h3 className="text-2xl font-bold text-yellow mt-2">Hi - Technology 2026</h3>
            </div>
        </div>
    );
};

export default VotingFailed;
