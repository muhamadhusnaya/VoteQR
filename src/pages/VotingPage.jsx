import React, { useState, useEffect } from "react";

const VotingPage = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        // Fetch data dari backend (contoh)
        const fetchTeams = async () => {
            const response = await fetch("http://localhost:5000/api/teams");
            const data = await response.json();
            setTeams(data);
        };
        fetchTeams();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-blue-300 text-center p-8">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-mono text-black p-10">Welcome to E-QRVOTE</h2>
                <h1 className="text-5xl font-bold text-black pb-5">Hi-Technology</h1>
                <h1 className="text-5xl font-bold text-black pb-5">2025</h1>
                {/* Slot Gambar Event */}
                <div className="flex justify-center mt-4">
                    <img
                        src="https://hitech.hmtiudinus.org/img/event.png"
                        alt="Event"
                        className="w-50 h-50 object-contain"
                    />
                </div>
            </div>

            {/* Kategori */}
            <div className="flex justify-center gap-20 mb-8">
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Team Kategori Software</h3>
                    {/* Slot Gambar Software */}
                    <img
                        src="https://hitech.hmtiudinus.org/img/software.png"
                        alt="Software"
                        className="w-28 h-28 object-contain mx-auto mt-2"
                    />
                </div>
                <div className="text-center">
                    <h3 className="text-lg font-semibold">Team Kategori Hardware</h3>
                    {/* Slot Gambar Hardware */}
                    <img
                        src="https://hitech.hmtiudinus.org/img/hardware.png"
                        alt="Hardware"
                        className="w-28 h-28 object-contain mx-auto mt-2"
                    />
                </div>
            </div>

            {/* Judul Voting */}
            <h3 className="text-2xl font-bold mb-6">Voting Team Pilihan Anda</h3>

            {/* Daftar Tim */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                {teams.map((team, index) => (
                    <div
                        key={index}
                        className="bg-gray-200 p-4 rounded-xl shadow-md flex flex-col items-center"
                    >
                        <div className="w-32 h-32 bg-white rounded-md mb-4">
                            {team.image && (
                                <img
                                    src={team.image}
                                    alt={team.name}
                                    className="w-full h-full object-cover rounded-md"
                                />
                            )}
                        </div>
                        <h4 className="font-bold text-lg">{team.name}</h4>
                        <p className="text-sm text-gray-600">{team.category}</p>
                        <button
                            className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            onClick={() => alert(`Voted for ${team.name}`)}
                        >
                            VOTE
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VotingPage;
