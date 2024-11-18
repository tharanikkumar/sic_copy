import axios from 'axios';
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { useParams, Link } from 'react-router-dom';
import { BACKEND_URL } from '../../../config';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';

const DetailedIdea = () => {
  const { idea_id } = useParams();
  const [idea, setIdea] = useState({});
  const [evaluators, setEvaluators] = useState([]);
  const [details,setdetails] = useState({});
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
        const response = await axios.get(`${BACKEND_URL}getevaluators.php`, { withCredentials: true });
        setEvaluators(response.data.evaluators);
   
     
    
      } catch (error) {
        console.error("Error fetching evaluators:", error);
      }
    };
    const fetchdetails=async()=>{
      try{
        const response = await axios.get(`${BACKEND_URL}getmappeddata.php?idea_id=${idea_id}`, { withCredentials: true });
        setdetails(response.data.data);

      }catch{
        console.log("error")
      }
    }
    fetchdetails();
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
    setAssignedEvaluatorIds((prev) => [...prev, evaluatorId]); 
    setShowDropdowns((prev) => prev.map(() => false)); 
  };

  // const remainingEvaluators = evaluators.filter(
  //   (evaluator) => !assignedEvaluatorIds.includes(evaluator.id)
  // );

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
       

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Idea Details */}
          <div className="space-y-2">
            <p className=" text-xl font-medium text-gray-600"><strong>Title:</strong></p>
            <p className="text-gray-800">{idea.idea_title}</p>
          </div>

          <div className="space-y-2">
            <p className=" text-xl font-medium text-gray-600"><strong>Description:</strong></p>
            <p className="text-gray-800">{idea.idea_description}</p>
          </div>

          <div className="space-y-2">
            <p className=" text-xl font-medium text-gray-600"><strong>Student Name:</strong></p>
            <p className="text-gray-800">{idea.student_name}</p>
          </div>

          <div className="space-y-2">
            <p className=" text-xl font-medium text-gray-600"><strong>School:</strong></p>
            <p className="text-gray-800">{idea.school}</p>
          </div>

          <div className="space-y-2">
            <p className=" text-xl font-medium text-gray-600"><strong>Type:</strong></p>
            <p className=" text-md text-gray-800">{idea.type}</p>
          </div>

          <div className="space-y-2">
  <p className="text-xl font-medium text-gray-600"><strong>Status ID:</strong></p>
  <p className="text-md text-gray-800">
    {/* Check the status_id and display the appropriate status */}
    {idea.status_id === 3 ? (
      <span className="text-gray-500">Not Assigned</span>
    ) : idea.status_id === 2 ? (
      <span className="text-red-500">Not Recommended</span>
    ) : idea.status_id === 1 ? (
      <span className="text-green-500">Recommended</span>
    ) : (
      <span className="text-gray-400">Unknown Status</span>
    )}
  </p>
  
</div>


        </div>
       
        {/* Evaluators and Assign Button */}
        <div className="mt-6">
  {/* Check if idea status is not 3 (Not Assigned) */}
  <div className="mr-20 ml-20 mt-10 mb-6 bg-white rounded-lg overflow-hidden">
  {idea.status_id !== 3 && (
    <div className="mt-4">
     <table className="min-w-full table-auto border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Evaluator Name</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Score</th>
      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">Comments</th>
    </tr>
  </thead>
  <tbody>
    {/* Display already assigned evaluators */}
    {details && details.length > 0 ? (
      details.map((evaluator) => (
        <tr key={evaluator.evaluator_id} className="border-t">
          <td className="px-6 py-4 text-sm text-gray-800 border-r">{evaluator.evaluator_name}</td>
          <td className="px-6 py-4 text-sm text-gray-800 border-r">
            {evaluator.score !== null ? evaluator.score : 'Not Rated'}
          </td>
          <td className="px-6 py-4 text-sm text-gray-800">{evaluator.evaluator_comments || 'No Comments'}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="3" className="px-6 py-4 text-sm text-gray-800 text-center border-t">
          No evaluators assigned yet.
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  )}
   { idea.status_id==3 &&(
            <div className='text-3xl'>Idea Yet to assign</div>
          )}
      </div>
      </div>
    </div>
    </div>
  );
};

export default DetailedIdea;
