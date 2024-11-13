import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../../config';
import axios from 'axios';
import { User2Icon } from 'lucide-react';
const ProfileDropdown = ({ userName }: { userName: string }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
    
            const response = axios.post(`${BACKEND_URL}logout.php`, {
                credentials: 'include',  
                headers: {
                    'Content-Type': 'application/json', 
                },
            });
    
            if (!response) {
                throw new Error('Logout failed');
            }
            navigate('/')
            localStorage.removeItem('role')  // Redirect to login page after logout
        } catch (error) {
            console.error('Error during logout', error);
        }
    };
    

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative">
            {/* Profile,
             Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center space-x-2 bg-gray-800 text-white p-2 rounded-full shadow-md hover:bg-gray-700"
            >
                <User2Icon className="w-6 h-6" />
            </button>

           
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 shadow-lg rounded-lg">
                    <div className="px-4 py-2 text-sm font-medium">{userName}</div>
                    <div className="border-t border-gray-200"></div>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;
