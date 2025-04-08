import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [teamCategory, setTeamCategory] = useState('');
    const [teamImage, setTeamImage] = useState(null);
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchTeams();
    }, []);

    const fetchTeams = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:3000/api/teams');
            if (!response.ok) throw new Error('Failed to fetch teams');
            const data = await response.json();
            setTeams(data);
        } catch (err) {
            setError('Failed to load teams');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!teamName || !teamCategory) {
            setError('Name and category are required');
            return;
        }

        const formData = new FormData();
        formData.append('name', teamName);
        formData.append('category', teamCategory);
        if (teamImage) formData.append('image', teamImage);

        setIsLoading(true);
        setError('');

        try {
            let response;
            if (editId) {
                response = await fetch(`http://localhost:3000/api/teams/${editId}`, {
                    method: 'PUT',
                    body: formData,
                });
            } else {
                response = await fetch('http://localhost:3000/api/teams', {
                    method: 'POST',
                    body: formData,
                });
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to process request');
            }

            const updatedTeam = await response.json();
            if (editId) {
                setTeams(teams.map((team) => (team.id === editId ? updatedTeam : team)));
            } else {
                setTeams([...teams, updatedTeam]);
            }

            resetForm();
        } catch (error) {
            setError(error.message || 'Error processing request');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (team) => {
        setEditId(team.id);
        setTeamName(team.name);
        setTeamCategory(team.category);
        setTeamImage(null); // Tidak mengganti gambar kecuali diubah oleh user
    };

    const handleDeleteTeam = async (id) => {
        if (!window.confirm('Are you sure you want to delete this team?')) return;

        setIsLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/teams/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete team');

            setTeams(teams.filter((team) => team.id !== id));
        } catch (error) {
            setError('Error deleting team');
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setEditId(null);
        setTeamName('');
        setTeamCategory('');
        setTeamImage(null);
    };

    return (
        <div className="flex min-w-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold text-black mb-6">Manage Teams</h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-2 gap-8">
                    {/* LIST TIM */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-sky-500 mb-4">Team List</h2>
                        {isLoading ? (
                            <p className='text-black'>Loading...</p>
                        ) : teams.length === 0 ? (
                            <p className='text-black'>No teams available.</p>
                        ) : (
                            <ul className="space-y-2">
                                {teams.map((team) => (
                                    <li key={team.id} className="p-3 bg-gray-50 rounded-lg flex items-center space-x-4">
                                        <div className="flex items-center space-x-4 w-full">
                                            {team.image && (
                                                <img
                                                    src={`http://localhost:3000${team.image}`}
                                                    alt={team.name}
                                                    className="w-12 h-12 object-cover rounded-md"
                                                />
                                            )}
                                            <div className="flex-1">
                                                <span className="font-medium text-gray-700">{team.name}</span>
                                                <span className="block text-sm text-gray-500">{team.category}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button onClick={() => handleEditClick(team)} className="bg-green-400 px-3 py-1 rounded-md hover:bg-green-200">Edit</button>
                                                <button onClick={() => handleDeleteTeam(team.id)} className="bg-red-400 px-3 py-1 rounded-md hover:bg-red-200">Delete</button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* FORM ADD/EDIT */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-sky-500 mb-4">
                            {editId ? 'Edit Team' : 'Add Team'}
                        </h2>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
                        <input
                            value={teamName}
                            onChange={(e) => setTeamName(e.target.value)}
                            placeholder="Team Name"
                            className="w-full p-2 text-gray-700 border rounded-md mb-2"
                        />
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={teamCategory}
                            onChange={(e) => setTeamCategory(e.target.value)}
                            className="w-full p-2 border border-gray-300 text-gray-700 rounded-md"
                        >
                            <option value="">Select Category</option>
                            <option value="Software">Software</option>
                            <option value="Hardware">Hardware</option>
                        </select>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Team Image</label>
                        <input
                            type="file"
                            onChange={(e) => setTeamImage(e.target.files[0])}
                            className="w-full p-2 text-gray-700 border rounded-md mb-2"
                        />
                        <div className="d-flex gap-2">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 px-3 py-1 text-white rounded-md "
                            >
                                {editId ? 'Save Changes' : 'Add Team'}
                            </button>

                            {editId && (
                            <button
                            onClick={resetForm}
                            className="bg-gray-400 px-3 py-1 rounded-md"
                            >
                            Cancel
                            </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teams;
