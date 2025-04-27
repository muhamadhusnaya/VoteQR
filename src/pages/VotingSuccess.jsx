import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import HeroTitle from "../components/Texts/HeroTitle";

const VotingSuccess = () => {
    const location = useLocation();
    const { teamId } = location.state || {};
    const [team, setTeam] = useState(null);

    useEffect(() => {
        if (teamId) {
            fetch(`http://192.168.1.10:3000/api/teams/${teamId}`)
                .then((res) => res.json())
                .then((data) => setTeam(data))
                .catch((err) => console.error("Error fetching team data:", err));
        }
    }, [teamId]);

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
                <h2 className="text-3xl font-bold text-yellow">VOTING BERHASIL</h2>
                {team && (
                    <div className="mt-8 bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg flex flex-col items-center max-w-sm w-full">
                        <div className="w-32 h-32 bg-white rounded-full overflow-hidden flex items-center justify-center mb-4 border-4 border-yellow">
                            <img
                                src={
                                    team.image
                                        ? `http://192.168.1.10:3000${team.image}`
                                        : "/default-team.png"
                                }
                                alt={team.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-xl font-bold text-white">{team.name}</h4>
                        <p className="text-purple-light text-sm">{team.category}</p>
                    </div>
                )}

                <p className="mt-12 text-2xl font-semibold">
                    Terima kasih telah berpartisipasi dan Jangan Lupa Berkunjung ke Minigames <br />sampai jumpa di
                </p>
                <h4 className="text-2xl mt-2 font-bold text-yellow">Hi-Technology 2026</h4>
            </div>
        </div>
    );
};

export default VotingSuccess;
