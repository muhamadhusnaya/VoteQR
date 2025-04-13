import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const VotingHistory = () => {
    const [votingData, setVotingData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Voting History from API
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch("http://localhost:3000/api/voting-history");
                if (!response.ok) throw new Error("Failed to fetch voting history");
                const data = await response.json();
                setVotingData(data);
            } catch (error) {
                console.error("Error fetching voting history:", error);
                setError("Failed to load voting history");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Export to Excel
    const handleExportExcel = () => {
        const filteredData = getFilteredData().map((item, index) => ({
            No: index + 1,
            Nama_Pengguna: item.username,
            Token: item.tokenString,
            IP_Publik: item.ipPublic,
            Tanggal: item.createdAt ? new Date(item.createdAt).toLocaleString() : "-",
        }));
    
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Voting History");
    
        const excelBuffer = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array"
        });
    
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "VotingHistory.xlsx");
    };

    const getFilteredData = () => {
        return votingData.filter((item) =>
            item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tokenString?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className="flex min-w-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-sky-500 mb-6">Voting History</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
                    <input
                        type="text"
                        placeholder="Search by name or token..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-50 border border-gray-300 p-2 rounded-lg w-full text-gray-400 md:w-1/3"
                    />
                    <button
                        onClick={handleExportExcel}
                        disabled={isLoading || votingData.length === 0}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 whitespace-nowrap"
                    >
                        Export to Excel
                    </button>
                </div>

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {isLoading ? (
                        <div className="p-8 text-center text-black">Loading voting history...</div>
                    ) : votingData.length === 0 ? (
                        <div className="p-8 text-center text-black">No voting history available</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-gray-500 text-black">
                                        <th className="p-3 text-left">No</th>
                                        <th className="p-3 text-left">Username</th>
                                        <th className="p-3 text-left">Token</th>
                                        <th className="p-3 text-left">IP Address</th>
                                        <th className="p-3 text-left">Voting Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getFilteredData().length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="p-4 text-center">No matching records found</td>
                                        </tr>
                                    ) : (
                                        getFilteredData().map((item, index) => (
                                            <tr key={index} className="border-b text-black hover:bg-gray-50">
                                                <td className="p-3">{index + 1}</td>
                                                <td className="p-3">{item.username || '-'}</td>
                                                <td className="p-3 font-mono">{item.tokenString || '-'}</td>
                                                <td className="p-3">{item.ipPublic}</td>
                                                <td className="p-3">
                                                    {item.createdAt ? new Date(item.createdAt).toLocaleString() : '-'}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VotingHistory;
