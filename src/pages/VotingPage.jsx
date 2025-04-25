import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Software from "../components/SoftwareIcons";
import HardwareIcons from "../components/HardwareIcons";
import SoftwareIcons from "../components/SoftwareIcons";
import Countdown from "../components/Countdown";

const VotingPage = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    const handleVote = (teamId) => {
        navigate(`/voting-validasi/${teamId}`); // Pastikan teamId ikut di dalam URL
    };

    useEffect(() => {

        const fetchTeams = async () => {
            try {
                const response = await fetch(
                    apiUrl + "/api/teams"
                );
                const data = await response.json();
                setTeams(data);
            } catch (error) {
                console.error("Error fetching teams:", error);
            }
        };
        fetchTeams();
    }, []);

    return (
        <div className="overflow-hidden bg-blue-darkest">
            <div className="scroll-mt-24">
                <div className="min-h-screen flex flex-col overflow-hidden items-center justify-center relative bg-[#130153]">
                    <div className="absolute overflow-hidden w-full h-full bg-blue-darkest max-w-full">
                        <div className="absolute z-30 w-1/2 aspect-square bg-purple-light -right-1/5 -top-1/4 rounded-full blur-[300px]"></div>
                        <div className="absolute z-30 w-2/5 aspect-square bg-yellow -right-1/5 -bottom-1/5 rounded-full blur-[300px]"></div>
                        <div className="absolute z-30 w-1/2 aspect-square bg-blue-light -left-1/5 -bottom-1/4 rounded-full blur-[300px]"></div>
                        <div className="w-full h-full absolute bg-linear-to-b from-black/0 z-30 from-20% to-80% to-blue-darkest"></div>
                        <div className="w-full h-full absolute hero-bg bg-no-repeat bg-left-bottom z-10"></div>
                    </div>
                    <div className="flex flex-col items-center z-40 text-white mt-20">
                        <p className="text-xl md:text-3xl font-bold tracking-widest pb-5">
                            WELCOME TO
                        </p>
                        <div className="relative">
                            <h1 className="ttl text-4xl w-full whitespace-nowrap md:text-8xl tracking-wider z-50 font-bold text-center">
                                HI-TECHNOLOGY
                                <br /> 2025
                            </h1>
                            <h1 className="ttl text-4xl w-full md:text-8xl tracking-wider -z-10 absolute top-0 text-purple-light whitespace-nowrap left-1 font-bold text-center">
                                HI-TECHNOLOGY
                                <br /> 2025
                            </h1>
                            <h1 className="ttl text-4xl w-full md:text-8xl tracking-wider -z-10 absolute top-0 text-yellow whitespace-nowrap right-1 font-bold text-center">
                                HI-TECHNOLOGY
                                <br /> 2025
                            </h1>
                        </div>
                        <p className="md:text-2xl text-xl mt-36 text-center">
                            Voting Akan Di Tutup Dalam
                        </p>
                        <Countdown />
                    </div>
                    <div className="sm:flex sm:flex-col sm:items-center z-40 text-white text-center my-20 pt-10">
                        <h1 className="sm:text-5xl font-bold text-4xl">
                            KATEGORI
                            {/* <div className="absolute w-full h-full top-80 left-44">
                            <div className="w-1/5 aspect-square bg-yellow rounded-full blur-[300px] top-0 left-1 absolute z-10"></div>
                            <div className="w-1/2 aspect-square bg-red-light rounded-full blur-[300px] top-5 right-1 absolute z-10"></div>
                        </div> */}
                            <span className="text-yellow"> LOMBA</span>
                        </h1>
                        <div className="sm:mt-10 sm:flex sm:gap-4 px-5">
                            <SoftwareIcons />
                            <HardwareIcons />
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 mt-10">
                    <h3 className="text-3xl font-bold text-white mb-8 text-center">
                        Voting Tim Pilihan Anda
                    </h3>

                    <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))] xl:[grid-template-columns:repeat(auto-fit,minmax(250px,1fr))] px-4">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg flex flex-col items-center justify-between transition-transform hover:scale-105"
                            >
                                <div className="w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 bg-white rounded-full overflow-hidden flex items-center justify-center mb-4 border-4 border-yellow">
                                    <img
                                        src={
                                            team.image
                                                ? `http://192.168.1.10:3000${team.image}`
                                                : "https://via.placeholder.com/150"
                                        }
                                        alt={team.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h4 className="font-bold text-white text-lg text-center">
                                    {team.name}
                                </h4>
                                <p className="text-sm text-purple-light mb-4 text-center">
                                    {team.category}
                                </p>
                                <button
                                    className="bg-yellow text-black px-4 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-colors"
                                    onClick={() =>
                                        navigate(
                                            `/voting-validasi/${team.id}`,
                                            {
                                                state: { teamId: team.id },
                                            }
                                        )
                                    }
                                >
                                    PILIH VOTE
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VotingPage;
