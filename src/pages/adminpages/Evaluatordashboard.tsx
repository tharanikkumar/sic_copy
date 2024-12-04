import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import UserCircleIcon from "@heroicons/react/16/solid/UserCircleIcon";
import { BACKEND_URL } from '../../../config';

interface Idea {
  student_name: string;
  school: string;
  idea_title: string;
  status_id: number;
  theme_id: number;
  type: string;
  idea_description: string;
  assigned_count: number;
}

export function EvaluatorDashboard() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    const authToken = Cookies.get("auth_token1");
    const evaluatorId = localStorage.getItem("evaluator_id");

    // Check if both auth_token1 and evaluator_id exist in localStorage
    if (!authToken || !evaluatorId) {
      setError("You are not authenticated or evaluator ID is missing.");
      setLoading(false);
      navigate("/"); // Redirect to login if either is missing
      return;
    }

    // If both exist, fetch assigned ideas
    axios
      .get(`http://localhost/webdev/get_assigned_ideas.php?evaluator_id=${evaluatorId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        setIdeas(response.data); // Assuming your API returns ideas
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch ideas");
        setLoading(false);
      });
  }, [navigate]);

  const handleProfileClick = () => {
    console.log("Navigating to /profileevaluator");
    navigate("/profileevaluator"); // Navigate to the Profile page using navigate()
  };

  const handleLogout = async () => {
    try {
        const response = await axios.post(`${BACKEND_URL}/logout.php`, {}, {
            withCredentials: true
        });

        console.log(response.data);  
        
        if (response.data.error) {
            throw new Error(response.data.error);
        }
        Cookies.remove("auth_token1");
        Cookies.remove("role");
        localStorage.removeItem("evaluator_id");
        localStorage.removeItem("auth_token1");
        localStorage.removeItem("role");
        navigate('/'); 
    } catch (error) {
        console.error('Error during logout', error);
    }
};

  return (
    <div>
      <Navbar />
      <div className="bg-pink-800 text-white py-4 px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Evaluator Dashboard</h1>

          <div className="relative">
            <button
              className="p-1 rounded-full bg-cyan-900 text-white"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <UserCircleIcon className="h-6 w-6" /> {/* Account icon */}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded">
                <ul>
                  <li>
                    <button
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                      onClick={handleProfileClick}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="block px-4 py-2 text-black hover:bg-gray-200"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Student Name</th>
              <th className="border border-gray-300 px-4 py-2">School</th>
              <th className="border border-gray-300 px-4 py-2">Idea Title</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Theme</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Assigned Count</th>
            </tr>
          </thead>
          <tbody>
            {ideas.length > 0 ? (
              ideas.map((idea, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 px-4 py-2">{idea.student_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{idea.school}</td>
                  <td className="border border-gray-300 px-4 py-2">{idea.idea_title}</td>
                  <td className="border border-gray-300 px-4 py-2">{idea.status_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{idea.theme_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{idea.type}</td>
                  <td className="border border-gray-300 px-4 py-2">{idea.idea_description}</td>
                  <td className="border border-gray-300 px-4 py-2">{idea.assigned_count}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="border border-gray-300 px-4 py-2 text-center">
                  No ideas assigned.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
