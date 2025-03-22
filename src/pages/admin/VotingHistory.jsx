import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import * as XLSX from "xlsx";

const VotingHistory = () => {
    const [votingData, setVotingData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch Voting History from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/voting-history");
                const data = await response.json();
                setVotingData(data);
            } catch (error) {
                console.error("Error fetching voting history:", error);
            }
        };
        fetchData();
    }, []);

    // Export to Excel
    const handleExportExcel = () => {
        const filteredData = votingData
            .filter((item) =>
                item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.token.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, index) => ({
                No: index + 1,
                Nama_Pengguna: item.username,
                Token: item.token,
                IP_Publik: item.ipPublic,
            }));
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Voting History");
        XLSX.writeFile(workbook, "VotingHistory.xlsx");
    };

    return (
        <div className="flex min-w-screen bg-gray-100">
            <AdminSidebar />
            <div className="p-6 w-full">
                <h1 className="text-2xl font-bold mb-4">Voting History</h1>

                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Search by name or token..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 p-2 rounded-lg w-1/3"
                    />
                    <button
                        onClick={handleExportExcel}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Export to Excel
                    </button>
                </div>

                <table className="w-full bg-white shadow-lg rounded-lg">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-3">No</th>
                            <th className="p-3">Nama Pengguna</th>
                            <th className="p-3">Token</th>
                            <th className="p-3">IP Publik</th>
                        </tr>
                    </thead>
                    <tbody>
                        {votingData
                            .filter((item) =>
                                item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                item.token.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-100">
                                    <td className="p-3 text-center">{index + 1}</td>
                                    <td className="p-3">{item.username}</td>
                                    <td className="p-3">{item.token}</td>
                                    <td className="p-3">{item.ipPublic}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VotingHistory;
