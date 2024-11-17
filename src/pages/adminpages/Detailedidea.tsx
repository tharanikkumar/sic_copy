import axios from 'axios';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useParams, Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../config';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

const DetailedIdea = () => {
  const { idea_id } = useParams();
  const [idea, setIdea] = useState({});
  const [evaluators, setEvaluators] = useState([]); // To store evaluators
  const [assignedEvaluators, setAssignedEvaluators] = useState(0); // Correctly initialize assignedEvaluators
  const [showDropdowns, setShowDropdowns] = useState([false, false, false]); // Array to manage dropdown visibility for each evaluator
  const [assignedEvaluatorIds, setAssignedEvaluatorIds] = useState([]); // To track which evaluators have been assigned

  // Fetch idea details
  useEffect(() => {
    const fetchIdea = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}getidea.php?idea_id=${idea_id}`, { withCredentials: true });
        setIdea(response.data.idea);
        setAssignedEvaluators(response.data.idea.assigned_count); // Initialize assigned count based on idea data
        setAssignedEvaluatorIds(response.data.idea.evaluators.map(evaluator => evaluator.id)); // Set the already assigned evaluators
      } catch (error) {
        console.error("Error fetching idea:", error);
      }
    };

    // Fetch evaluators list
    const fetchEvaluators = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}getunassignedevaluator.php`, { withCredentials: true });
        setEvaluators(response.data.evaluators);
        console.log("Fetched evaluators:", response.data.evaluators);
      } catch (error) {
        console.error("Error fetching evaluators:", error);
      }
    };

    fetchIdea();
    fetchEvaluators();
  }, [idea_id]);

  const toggleDropdown = (index) => {
    setShowDropdowns((prev) => {
      const newShowDropdowns = [...prev];
      newShowDropdowns[index] = !newShowDropdowns[index];
      return newShowDropdowns;
    });
  };

  const assignEvaluator = (evaluatorId) => {
    console.log("Assigning evaluator with ID:", evaluatorId);
    setAssignedEvaluators((prev) => prev + 1);
    setAssignedEvaluatorIds((prev) => [...prev, evaluatorId]); // Add to the list of assigned evaluators
    setShowDropdowns((prev) => prev.map(() => false)); // Close all dropdowns after assigning
  };

  const remainingEvaluators = evaluators.filter(
    (evaluator) => !assignedEvaluatorIds.includes(evaluator.id)
  );

  return (
    <div>
      <Navbar />
      <Topbar />
      <div className="flex items-center space-x-4">
        <Link to="/admin_ideaevaluator">
          <button className="bg-cyan-900 text-white py-2 px-4 rounded-md hover:bg-cyan-800">
            Back
          </button>
        </Link>
        <div className="text-4xl mt-4 font-semibold text-gray-800">Detail View of Idea</div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Idea Details</h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Idea Details */}
          <div className="space-y-2">
            <p className="font-medium text-gray-600"><strong>Title:</strong></p>
            <p className="text-gray-800">{idea.idea_title}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-gray-600"><strong>Description:</strong></p>
            <p className="text-gray-800">{idea.idea_description}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-gray-600"><strong>Student Name:</strong></p>
            <p className="text-gray-800">{idea.student_name}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-gray-600"><strong>School:</strong></p>
            <p className="text-gray-800">{idea.school}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-gray-600"><strong>Type:</strong></p>
            <p className="text-gray-800">{idea.type}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-gray-600"><strong>Status ID:</strong></p>
            <p className="text-gray-800">{idea.status_id}</p>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-gray-600"><strong>Theme ID:</strong></p>
            <p className="text-gray-800">{idea.theme_id}</p>
          </div>
        </div>

        {/* Evaluators and Assign Button */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Evaluators</h3>

          {/* Show dropdowns for remaining evaluators */}
          {remainingEvaluators.length > 0 && (
            <div className="flex flex-wrap gap-4">
              {remainingEvaluators.slice(0, 3).map((evaluator, index) => (
                <div key={evaluator.id} className="relative inline-block text-left">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                    onClick={() => toggleDropdown(index)}
                  >
                    Assign Evaluator {index + 1}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06 0L10 10.69l3.71-3.48a.75.75 0 111.02 1.1l-4.24 3.94a.75.75 0 01-1.02 0L5.23 8.31a.75.75 0 010-1.1z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Dropdown menu */}
                  {showDropdowns[index] && (
                    <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {/* List evaluators */}
                        {evaluators.map((evaluator) => (
                          <a
                            href="#"
                            key={evaluator.id}
                            className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
                            onClick={() => assignEvaluator(evaluator.id)}
                          >
                            {evaluator.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Display assigned evaluators */}
          <div className="mt-4">
            <table className="min-w-full table-auto">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Evaluator Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Score</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Comments</th>
                </tr>
              </thead>
              <tbody>
                {/* Display already assigned evaluators */}
                {idea.evaluators && idea.evaluators.map((evaluator) => (
                  <tr key={evaluator.id}>
                    <td className="px-6 py-4 text-sm text-gray-800">{evaluator.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{evaluator.score}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{evaluator.comments}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedIdea;
