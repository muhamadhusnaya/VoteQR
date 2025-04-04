import React from 'react';
import { Home, LayoutList, KeyRound, History} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation(); // Mendapatkan lokasi saat ini

    // Fungsi untuk menentukan apakah menu sedang aktif
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <div className="min-h-screen w-64 bg-white shadow-lg p-4">
            {/* Logo */}
            <div className="flex items-center mb-6">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    QR
                </div>
                <h2 className="text-xl font-bold ml-2">Voting</h2>
            </div>

            {/* Navigation */}
            <nav className="space-y-4">
                <a
                    href="/admin"
                    className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
                        isActive('/admin') ? 'text-white bg-blue-400' : ''
                    }`}
                >
                    <Home size={20} />
                    <span>Dashboard</span>
                </a>
                <a
                    href="/admin/teams"
                    className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
                        isActive('/admin/teams') ? 'text-white bg-blue-400' : ''
                    }`}
                >
                    <LayoutList size={20} />
                    <span>Teams</span>
                </a>
                <a
                    href="/admin/tokens"
                    className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
                        isActive('/admin/tokens') ? 'text-white bg-blue-400' : ''
                    }`}
                >
                    <KeyRound size={20} />
                    <span>Tokens</span>
                </a>
                <a
                    href="/admin/voting-history"
                    className={`flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 ${
                        isActive('/admin/voting-history') ? 'text-white bg-blue-400' : ''
                    }`}
                >
                    <History size={20} />
                    <span>Hasil Voting</span>
                </a>
            </nav>
        </div>
    );
};

export default AdminSidebar;