import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Topbar from '../../components/Topbar';
import axios from 'axios';
import { BACKEND_URL } from '../../../config';
import { Link } from 'react-router-dom';

const Ideaevaluator = () => {
  const [ideas, setIdeas] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);

  const fetchIdeas = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/getideas.php`, { withCredentials: true });
      setIdeas(response.data.ideas);
    } catch (error) {
      console.error('Error fetching ideas:', error);
    }
  };

  const handleCsvFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleUploadCsv = async () => {
    if (!csvFile) {
      alert('Please select a CSV file.');
      return;
    }

    setUploadStatus('Uploading...');

    const formData = new FormData();
    formData.append('file', csvFile);

    try {
      const response = await axios.post(`${BACKEND_URL}/upload_csv_api.php`, formData, { withCredentials: true });

      // Log the complete response for debugging
      console.log('Backend Response:', response);

      if (response.data.success) {
        setUploadStatus('Upload Successful');
        fetchIdeas();  // Re-fetch ideas after upload
      } else {
        setUploadStatus(`Error: ${response.data.message}`);
      }
    } catch (error) {
      // Log any unexpected errors
      console.error('Unexpected error during CSV upload:', error);
      setUploadStatus('Error uploading CSV');
    }
  };

  useEffect(() => {
    fetchIdeas();
  }, []);

  return (
    <div>
      <Navbar />
      <Topbar />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Admin Idea Evaluator</h1>
      </div>

      <div className="flex space-x-4 items-center mb-6">
        <button onClick={handleUploadCsv} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
          Upload CSV for Adding Ideas and Mapping
        </button>
        <input
          type="file"
          accept=".csv"
          onChange={handleCsvFileChange}
          className="bg-gray-500 text-white px-4 py-2 rounded-md"
        />
      </div>

      {uploadStatus && <div className="text-lg font-bold text-green-500 mb-4">{uploadStatus}</div>}

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mr-20 ml-20 mt-10 mb-6 bg-white rounded-lg overflow-hidden">
          <h2 className="text-2xl font-semibold mb-4">Idea Details</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Student Name</th>
                <th className="border px-4 py-2">Idea Title</th>
                <th className="border px-4 py-2">View</th>
                <th className="border px-4 py-2">Action</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{idea.student_name}</td>
                  <td className="border px-4 py-2">{idea.idea_title}</td>
                  <td className="border px-4 py-2">
                    <Link to={`/idea/${idea.id}`} className="text-blue-500">View</Link>
                  </td>
                  <td className="border px-4 py-2">{idea.action}</td>
                  <td className="border px-4 py-2">{idea.status_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Ideaevaluator;
