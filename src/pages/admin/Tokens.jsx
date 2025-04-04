import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import { QRCodeCanvas } from "qrcode.react";

const Tokens = () => {
    const [tokens, setTokens] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchTokens = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:3000/api/tokens/list");
                if (!response.ok) throw new Error("Failed to fetch tokens");
                const data = await response.json();
                setTokens(data);
            } catch (err) {
                console.error("Error fetching tokens:", err);
                setError("Failed to load tokens");
            } finally {
                setIsLoading(false);
            }
        };
        fetchTokens();
    }, []);

    const deleteToken = async (id) => {
        if (!window.confirm("Are you sure you want to delete this token?")) return;
        setIsLoading(true);
        setError("");
        try {
            const response = await fetch(`http://localhost:3000/api/tokens/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Failed to delete token");
            setTokens(tokens.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error deleting token:", error);
            setError("Error deleting token");
        } finally {
            setIsLoading(false);
        }
    };

    const generateToken = async () => {
        setIsLoading(true);
        setError("");
        try {
            const response = await fetch("http://localhost:3000/api/tokens/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });
            if (!response.ok) throw new Error("Failed to generate token");
            const newToken = await response.json();
            setTokens([...tokens, newToken]);
        } catch (error) {
            console.error("Error generating token:", error);
            setError("Error generating token");
        } finally {
            setIsLoading(false);
        }
    };

    const filteredTokens = tokens.filter((tokenItem) => {
        if (filterStatus === "All") return true;
        return tokenItem.status === filterStatus;
    });

    const downloadExcel = () => {
        alert("Download Excel feature coming soon!");
    };

    return (
        <div className="flex min-w-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-8 max-w-screen h-full mx-auto">
                <h1 className="text-2xl font-bold text-sky-500 mb-6">Token Management</h1>
                {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>}

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-sky-400">Tokens List</h2>
                        <div className="flex items-center space-x-4">
                            <label className="text-gray-700">Filter:</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="p-2 border border-gray-300 text-gray-500 rounded"
                            >
                                <option value="All">All</option>
                                <option value="Not Used">Not Used</option>
                                <option value="Used">Used</option>
                            </select>
                            <button
                                onClick={generateToken}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Generate Token
                            </button>
                            <button
                                onClick={downloadExcel}
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                            >
                                Download Excel
                            </button>
                        </div>
                    </div>
                    {isLoading ? (
                        <p className="text-black">Loading tokens...</p>
                    ) : filteredTokens.length === 0 ? (
                        <p className="text-black">No tokens available.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-400 border-b text-black rounded">
                                        <th className="p-3 text-left">QR Code</th>
                                        <th className="p-3 text-left">Token</th>
                                        <th className="p-3 text-left">Status</th>
                                        <th className="p-3 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTokens.map((item) => (
                                        <tr key={item.id} className="border-b">
                                            <td className="p-3">
                                                {item.pathQrcode ? (
                                                    <img
                                                        src={`http://localhost:3000/uploads/qrcodes/${item.pathQrcode}`}
                                                        alt="QR Code"
                                                        className="w-16 h-16 object-cover rounded"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded">
                                                        No Image
                                                    </div>
                                                )}
                                            </td>
                                            <td className="p-3 font-mono text-gray-500 break-all">{item.token}</td>
                                            <td className="p-3 text-md">
                                                <span className={`px-2 py-1 rounded ${item.status === "Used" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-500"}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <button
                                                    onClick={() => deleteToken(item.id)}
                                                    disabled={isLoading}
                                                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:bg-gray-100"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Tokens;
