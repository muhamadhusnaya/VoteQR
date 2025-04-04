import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const VotingSuccess = () => {
    const location = useLocation();
    const { teamId } = location.state || {};

    const [team, setTeam] = useState(null);

    useEffect(() => {
        if (teamId) {
            fetch(`http://10.0.3.219:3000/api/teams/${teamId}`)
                .then((res) => res.json())
                .then((data) => setTeam(data))
                .catch((err) => console.error("Error fetching team data:", err));
        }
    }, [teamId]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-300 p-6">
            <h1 className="text-3xl font-bold text-black text-center">
                Hi-Technology <br /> 2025
            </h1>

            <div className="mt-4">
                <img
                    src="https://hitech.hmtiudinus.org/img/event.png"
                    alt="Event"
                    className="w-50 h-50 object-contain"
                />
            </div>

            <h2 className="text-xl font-bold text-center mt-4">
                VOTING BERHASIL
            </h2>

            {team ? (
                <>
                    <h3 className="text-2xl font-bold text-center text-black mt-2">
                        {team.name}
                    </h3>

                    <div className="mt-6 bg-gray-200 p-4 rounded-lg shadow-lg w-48">
                        <img
                            src={team.image ? `http://10.0.3.219:3000${team.image}` : "/default-team.png"}
                            alt={team.name}
                            className="w-full h-32 object-cover rounded-md"
                        />
                        <p className="text-center font-semibold mt-2">{team.name}</p>
                        <p className="text-center text-gray-600 text-sm">{team.category}</p>
                    </div>
                </>
            ) : (
                <p>Loading team data...</p>
            )}

            <p className="text-center text-black font-semibold mt-8">
                TERIMA KASIH SUDAH BERKUNJUNG <br />
                DAN SAMPAI JUMPA DI
            </p>

            <h3 className="text-2xl font-bold text-center text-black mt-2">
                Hi - Technology 2026
            </h3>
        </div>
    );
};

export default VotingSuccess;
