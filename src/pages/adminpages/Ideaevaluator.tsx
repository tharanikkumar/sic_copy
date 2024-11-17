import React from 'react'
import Navbar from '../../components/Navbar'
import Topbar from '../../components/Topbar'
import { useEffect } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../../config'
import { Link } from 'react-router-dom'
const Ideaevaluator = () => {
  const [ideas,setIdeas] = React.useState([]) 
  useEffect(() => {
    const fetchEvaluators = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}getideas.php`, {
          withCredentials: true,
        });
          console.log(response);
          setIdeas(response.data.ideas);
  
      } catch (error) {
        console.error('Error fetching evaluators:', error);
      }
    };

    fetchEvaluators();
  }, []);
  return (

    <div>
      <Navbar />
     <Topbar/>

     <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Admin Idea evaluator</h1>
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
            {ideas.map((idea, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{idea.student_name}</td>
                <td className="border px-4 py-2">{idea.idea_title}</td>
               
                <td className="border px-4 py-2 space-x-2">
                  <Link
                    to={`/detailedidea/${idea.id}`}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-700"
                    onClick={() => console.log(idea)}>
                   Detailed view
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Ideaevaluator