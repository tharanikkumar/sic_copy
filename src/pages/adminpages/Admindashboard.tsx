

import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../config';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';
import Cookies from 'js-cookie';
import Navbar from '../../components/Navbar';
import axios from 'axios';
const AdminDashboard = () => {
  const role = Cookies.get('role')
  const navigate = useNavigate();
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);
  const handleVerifyClick = (evaluator) => {
    setSelectedEvaluator(evaluator);
    setShowVerifyDialog(true);
  };

  const handleVerifyConfirm = () => {
    // Handle verification logic here, such as updating evaluator status
    console.log(`Verified evaluator: ${selectedEvaluator.name}`);
    setShowVerifyDialog(false);
  };

  const handleEditClick = (evaluator) => {
    // Handle edit logic here
    console.log(`Edit evaluator: ${evaluator.name}`);
  }

  // useEffect(() => {
  //   if (role !== "admin") {
  //     navigate('/login')
  //   }
  // }, [navigate, role]);
  // useEffect(() => {
  //   const fetchSchools = async () => {
  //     try {
  //       const response = await axios.get(`${BACKEND_URL}/getschools`, {
  //         withCredentials: true,
  //       });
  //       console.log(response.data);
  //       setSchools(response.data.data); 
      
  //     } catch (error) {
  //       console.error("Error fetching schools:", error);
  //     }
  //   };

  //   fetchSchools();
  // }, []);

  return (
    <div>
    <Navbar />
    <Topbar />

    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold">Admin Dashboard</h1>
    </div>

   
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold">No Ideas</h2>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold">No of Evaluators</h2>
        <p className="text-3xl font-bold">0</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-xl font-semibold">Pending Verifications</h2>
        <p className="text-3xl font-bold">0</p>
      </div>
    </div>


    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Evaluator Details</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {evaluators.map((evaluator, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{evaluator.name}</td>
              <td className="border px-4 py-2">{evaluator.email}</td>
              <td className="border px-4 py-2">{evaluator.status}</td>
              <td className="border px-4 py-2 space-x-2">
                <Link to={'/editevaluator/2'}
                   className="px-3 py-1 rounded 
    bg-blue-100 text-blue-700"
                  onClick={() => handleEditClick(evaluator)}
                >
                  Edit
                </Link>
                <button
                   className="px-3 py-1 rounded 
    bg-green-100 text-green-700"
                  onClick={() => handleVerifyClick(evaluator)}
                >
                  Verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {showVerifyDialog && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Confirm Verification</h3>
            <p>Are you sure you want to verify {selectedEvaluator?.name}?</p>
            <div className="mt-4 space-x-2">
              <button
                className="px-3 py-1 bg-green-500 text-white rounded"
                onClick={handleVerifyConfirm}
              >
                Confirm
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => setShowVerifyDialog(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  </div>
  );
};
const evaluators = [
  { name: "John Doe", email: "john@example.com", status: "Verified" },
  { name: "Jane Smith", email: "jane@example.com", status: "Pending" },
  { name: "Michael Johnson", email: "michael@example.com", status: "Pending" },
  { name: "Emily Davis", email: "emily@example.com", status: "Verified" },
  { name: "William Brown", email: "william@example.com", status: "Pending" },
  { name: "Sophia Wilson", email: "sophia@example.com", status: "Verified" },
  { name: "James Miller", email: "james@example.com", status: "Pending" },
  { name: "Olivia Anderson", email: "olivia@example.com", status: "Verified" },
  { name: "Benjamin Thomas", email: "benjamin@example.com", status: "Pending" },
  { name: "Charlotte Jackson", email: "charlotte@example.com", status: "Verified" },
];

export default AdminDashboard;