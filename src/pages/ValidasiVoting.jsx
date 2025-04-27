import React, { useState, useEffect } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import HeroTitle from "../components/Texts/HeroTitle";

const ValidasiVoting = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { teamId } = location.state || {};
    const [name, setName] = useState("");
    const [token, setToken] = useState("");
    const [ipPublic, setIpPublic] = useState("");

    useEffect(() => {
        if (!teamId) {
            navigate("/");
            return;
        }

        const fetchIP = async () => {
            try {
                const res = await fetch("https://api.ipify.org?format=json");
                const data = await res.json();
                setIpPublic(data.ip);
            } catch (error) {
                console.error("Gagal mengambil IP publik:", error);
            }
        };

        fetchIP();
    }, [teamId, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            username: name,
            token: token,
            teamId: teamId,
            ipPublic: ipPublic,
        };

        try {
            const response = await fetch(
                "http://192.168.1.10:3000/api/voting-history",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                }
            );

            const data = await response.json();
            console.log("Response:", data);

            if (response.ok) {
                navigate("/voting-success", { state: { teamId } });
            } else {
                navigate(
                    `/voting-failed?error=${encodeURIComponent(
                        data.message || "Voting gagal. Coba lagi."
                    )}`
                );
            }
        } catch (error) {
            console.error("Error during voting:", error);
            navigate(
                `/voting-failed?error=${encodeURIComponent(
                    "Terjadi kesalahan pada server. Silakan coba lagi."
                )}`
            );
        }
    };

    return (
        <div className="overflow-hidden bg-blue-darkest pb-[20%]">
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
                        <div className="relative">
                            <HeroTitle />
                        </div>
                    </div>
                    <div className="w-[80%] sm:max-w-md mt-12 z-40 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg">
                        <h2 className="text-lg sm:text-2xl text-white font-semibold text-center mb-6">
                            Silakan Validasi Diri Anda
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="text-white block text-sm font-medium mb-1">
                                    Masukkan Nama
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        className="w-full border rounded-lg p-3 pl-10 bg-gray-100 focus:outline-none text-gray-600"
                                        placeholder="Nama Lengkap"
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.target.value)
                                        }
                                        required
                                    />
                                    <FaUser className="absolute left-3 text-gray-500" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-white block text-sm font-medium mb-1">
                                    Masukkan Token
                                </label>
                                <div className="relative flex items-center">
                                    <input
                                        type="text"
                                        className="w-full border rounded-lg p-3 pl-10 bg-gray-100 focus:outline-none text-gray-600"
                                        placeholder="Token Anda"
                                        value={token}
                                        onChange={(e) =>
                                            setToken(e.target.value)
                                        }
                                        required
                                    />
                                    <FaLock className="absolute left-3 text-gray-500" />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-yellow text-black py-3 rounded-lg font-semibold hover:bg-yellow-400 transition duration-300"
                            >
                                SUBMIT
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValidasiVoting;
