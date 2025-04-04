import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const ValidasiVoting = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { teamId } = location.state || {};
    const [name, setName] = useState("");
    const [token, setToken] = useState("");

    useEffect(() => {
        if (!teamId) {
            navigate("/");
            return;
        }
    }, [teamId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const requestData = {
            username: name,
            token: token,
            teamId: teamId
        };
    
        try {
            const response = await fetch("http://192.168.1.7:3000/api/voting-history", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });
    
            const data = await response.json();
            console.log("Response:", data);
    
            if (response.ok) {
                navigate("/voting-success", { state: { teamId } });
            } else {
                navigate(`/voting-failed?error=${encodeURIComponent(data.message || "Voting gagal. Coba lagi.")}`);
            }
        } catch (error) {
            console.error("Error during voting:", error);
            navigate(`/voting-failed?error=${encodeURIComponent("Terjadi kesalahan pada server. Silakan coba lagi.")}`);
        }
    };    

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-blue-300 p-6">
            <h1 className="text-5xl font-bold text-black text-center">Hi-Technology 2025</h1>

            <div className="mt-4">
                <img src="https://hitech.hmtiudinus.org/img/event.png" alt="Event" className="w-50 h-50 object-contain" />
            </div>

            <h2 className="text-4xl font-bold text-black text-center mt-4">Silahkan Validasi Diri Anda</h2>

            <form onSubmit={handleSubmit} className="w-full max-w-sm mt-6">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Masukkan Nama</label>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            className="w-full border rounded-lg p-3 pl-10 bg-gray-100 focus:outline-none text-gray-600"
                            placeholder="Nama Lengkap"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <FaUser className="absolute left-3 text-gray-500" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium">Masukkan Token</label>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            className="w-full border rounded-lg p-3 pl-10 bg-gray-100 focus:outline-none text-gray-600"
                            placeholder="Token Anda"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            required
                        />
                        <FaLock className="absolute left-3 text-gray-500" />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    SUBMIT
                </button>
            </form>
        </div>
    );
};

export default ValidasiVoting;
