import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);

    // Fetch Teams from API
    useEffect(() => {
        fetch('http://localhost:5000/api/teams')
            .then((res) => res.json())
            .then((data) => setTeams(data))
            .catch((err) => console.error(err));
    }, []);

    // Handle Add Team
    const handleAddTeam = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/api/teams', {
                method: 'POST',
                body: formData,
            });
            const newTeam = await response.json();
            setTeams([...teams, newTeam]);
            setName('');
            setCategory('');
            setImage(null);
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };

    // Handle Delete Team
    const handleDeleteTeam = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/teams/${id}`, {
                method: 'DELETE',
            });
            setTeams(teams.filter((team) => team.id !== id));
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <AdminSidebar />
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">CRUD Team</h1>
                <div className="grid grid-cols-2 gap-8">
                    {/* List Teams */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Team List</h2>
                        {teams.length === 0 ? (
                            <p>No teams available.</p>
                        ) : (
                            <ul>
                                {teams.map((team) => (
                                    <li key={team.id} className="p-2 mb-2 bg-gray-50 rounded-lg flex items-center justify-between">
                                        <span>{team.name} - {team.category}</span>
                                        {team.image && (
                                            <img
                                                src={`http://localhost:5000${team.image}`}
                                                alt={team.name}
                                                className="w-12 h-12 object-cover rounded-md"
                                            />
                                        )}
                                        <button
                                            onClick={() => handleDeleteTeam(team.id)}
                                            className="ml-4 text-red-500 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Form Add Team */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4">Add Team</h2>
                        <input
                            type="text"
                            placeholder="Team Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                        >
                            <option value="">Select Category</option>
                            <option value="Software">Software</option>
                            <option value="Hardware">Hardware</option>
                        </select>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="w-full mb-4 p-2 border border-gray-300 rounded-md"
                        />
                        <button
                            onClick={handleAddTeam}
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        >
                            Add Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Teams;
