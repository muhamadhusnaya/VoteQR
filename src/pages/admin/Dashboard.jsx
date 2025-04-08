import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import AdminNavbar from "../../components/AdminNavbar";
import AdminSidebar from "../../components/AdminSidebar";

const Dashboard = () => {
  const [totalTeams, setTotalTeams] = useState(0);
  const [totalTokens, setTotalTokens] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voteData, setVoteData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/stats");
        const data = res.data;

        setTotalTeams(data.totalTeams);
        setTotalTokens(data.totalTokens);
        setTotalVotes(data.totalVotes);

        const formattedData = data.votesPerTeam.map((team) => ({
            name: team.name,
            votes: team.voteCount,
        }));
          
        setVoteData(formattedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex min-w-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <div className="top-0 z-50">
          <AdminNavbar />
        </div>
        <div className="p-6">
          <div className="mt-6">
            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
            <p className="mt-2 text-gray-600">Welcome to the admin dashboard!</p>
          </div>

          {/* Statistik Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-indigo-700 p-6 rounded-2xl shadow-lg text-center text-white">
              <h2 className="text-xl font-semibold">Total Teams</h2>
              <p className="text-4xl font-bold mt-2">{totalTeams}</p>
            </div>
            <div className="bg-yellow-500 p-6 rounded-2xl shadow-lg text-center text-black">
              <h2 className="text-xl font-semibold">Total Tokens</h2>
              <p className="text-4xl font-bold mt-2">{totalTokens}</p>
            </div>
            <div className="bg-pink-600 p-6 rounded-2xl shadow-lg text-center text-white">
              <h2 className="text-xl font-semibold">Total Votes</h2>
              <p className="text-4xl font-bold mt-2">{totalVotes}</p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Voting Results</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    layout="vertical" // Ubah orientasi ke vertikal
                    data={voteData}
                    margin={{
                    top: 20,
                    right: 30,
                    left: 100,
                    bottom: 20,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="votes" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
