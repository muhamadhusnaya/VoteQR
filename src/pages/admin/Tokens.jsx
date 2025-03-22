import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { QRCodeCanvas } from "qrcode.react";

const Tokens = () => {
    const [token, setToken] = useState('');
    const [tokens, setTokens] = useState([]);

    // Fetch Tokens from API
    useEffect(() => {
        fetch('http://localhost:5000/api/tokens')
            .then(res => res.json())
            .then(data => setTokens(data))
            .catch(err => console.error('Error fetching tokens:', err));
    }, []);

    // Generate New Token
    const generateToken = async () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let newToken = '';
        for (let i = 0; i < 10; i++) {
            newToken += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        try {
            const response = await fetch('http://localhost:5000/api/tokens', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: newToken, status: 'Unused' }),
            });

            const result = await response.json();
            setTokens([...tokens, result]);
            setToken(newToken);
        } catch (error) {
            console.error('Error generating token:', error);
        }
    };

    // Mark Token as Used
    const markAsUsed = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/tokens/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
            });
            setTokens(tokens.map(t => t.id === id ? { ...t, status: 'Used' } : t));
        } catch (error) {
            console.error('Error marking token as used:', error);
        }
    };

    return (
        <div className="flex min-w-screen bg-gray-100">
            <AdminSidebar />
            <div className="p-4 w-full">
                <h1 className="text-2xl font-bold mb-4">Generated Token</h1>
                <button onClick={generateToken} className="bg-sky-500 text-white px-4 py-2 rounded mb-4">
                    Generate Token
                </button>
                {token && (
                    <div className="mb-4 bg-white p-4 rounded shadow">
                        <p className="font-semibold">Generated Token: {token}</p>
                        <QRCodeCanvas value={token} size={150} />
                    </div>
                )}
                <h2 className="text-xl font-semibold mt-4">Tokens List</h2>
                <ul className="mt-2">
                    {tokens.map((item) => (
                        <li key={item.id} className="flex justify-between items-center bg-white p-2 rounded mb-2 shadow">
                            <span>{item.token}</span>
                            <span className={`text-sm ${item.status === 'Used' ? 'text-red-500' : 'text-green-500'}`}>
                                {item.status}
                            </span>
                            {item.status === 'Unused' && (
                                <button
                                    onClick={() => markAsUsed(item.id)}
                                    className="bg-gray-200 text-sm px-2 py-1 rounded hover:bg-gray-300"
                                >
                                    Mark as Used
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Tokens;
