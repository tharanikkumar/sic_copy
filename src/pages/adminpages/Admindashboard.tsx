import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../../../config';
import { Link, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar';

import Navbar from '../../components/Navbar';
import axios from 'axios';

const AdminDashboard = () => {

  const navigate = useNavigate();
  const [showVerifyDialog, setShowVerifyDialog] = useState(false);
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);
  const [evaluators, setEvaluators] = useState([]);
  const [stats, setStats] = useState({
  });

  const handleVerifyClick = (evaluator: any) => {
    setSelectedEvaluator(evaluator);
    setShowVerifyDialog(true);
  };

  const handleVerifyConfirm = () => {
    if (!selectedEvaluator) return;
    console.log(`Verified evaluator: ${selectedEvaluator.name}`);
    setShowVerifyDialog(false);
  };

  const handleEditClick = (evaluator: any) => {
    console.log(`Edit evaluator: ${evaluator.name}`);
  };
useEffect(() => {
    const fetchEvaluators = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}getevaluator.php`, {
          withCredentials: true,
        });
          console.log(response.data);
          setEvaluators(response.data.evaluators);
          setStats({
            totalEvaluators: response.data.common_statistics.total_evaluators,
            pendingVerifications: response.data.common_statistics.pending_evaluators,
            totalIdeas: response.data.common_statistics.ideas_registered,
          });
  
      } catch (error) {
        console.error('Error fetching evaluators:', error);
      }
    };

    fetchEvaluators();
  }, []);

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
          <p className="text-3xl font-bold">{stats.totalIdeas}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">No of Evaluators</h2>
          <p className="text-3xl font-bold">{stats.totalEvaluators}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold">Pending Verifications</h2>
          <p className="text-3xl font-bold">{stats.pendingVerifications}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Evaluator Details</h2>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
          
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {evaluators.map((evaluator, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{evaluator.first_name}</td>
                <td className="border px-4 py-2">{evaluator.email}</td>
               
                <td className="border px-4 py-2 space-x-2">
                  <Link
                    to={`/editevaluator/${evaluator.id}`}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-700"
                    onClick={() => handleEditClick(evaluator)}
                  >
                    Edit
                  </Link>
                  <button
                    className="px-3 py-1 rounded bg-green-100 text-green-700"
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

export default AdminDashboard;
