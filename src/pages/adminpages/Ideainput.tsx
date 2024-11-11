import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { LabelInputContainer } from '../adminpages/Login';
import axios from 'axios';
import Papa from 'papaparse';
import Topbar from '../../components/Topbar';

const Ideainput = () => {
    const [formData, setFormData] = useState({
        idea_title: '',
        school: '',
        student_name: '',
        type: '',
        idea_description: '',
        status_id: '',
        theme_id: '',
    });
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setErrors({ ...errors, [name]: '' });
    };

    // Function to handle CSV file upload
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    // Assuming the CSV has headers that match the form field names
                    const csvData = results.data[0]; // Taking the first row for simplicity
                    setFormData({
                        ...formData,
                        ...csvData,
                    });
                },
                error: function (error) {
                    console.error("Error parsing CSV file:", error);
                },
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      console.log(formData);
            // try {
            //     await axios.post(`${BACKEND_URL}/evaluator_registration`, formData, {
            //         withCredentials: true,
            //     });
            // } catch (error) {
            //     console.error("Failed to submit:", error);
            // }
     
    };

    return (
        <div>
            <Navbar />
            <Topbar/>
            <div className="bg-sky-900 text-white text-3xl font-bold py-4 px-6 text-center">
                Idea Input
            </div>
            <Link to="/">
                <button className="bg-cyan-900 mt-4 text-white py-2 px-4 rounded-md hover:bg-cyan-800">Back</button>
            </Link>

            <form className="p-6 md:p-9 space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CSV Upload */}
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="csvFile">Upload CSV</Label>
                        <Input
                            id="csvFile"
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                        />
                    </LabelInputContainer>

                    {/* Individual Fields */}
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="student_name">Student Name</Label>
                        <Input
                            id="student_name"
                            placeholder="Student Name"
                            name="student_name"
                            type="text"
                            className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                            value={formData.student_name}
                            onChange={handleInputChange}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="school">School</Label>
                        <Input
                            id="school"
                            placeholder="School"
                            name="school"
                            type="text"
                            className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                            value={formData.school}
                            onChange={handleInputChange}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="type">Type</Label>
                        <Input
                            id="type"
                            placeholder="Type"
                            name="type"
                            type="text"
                            className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                            value={formData.type}
                            onChange={handleInputChange}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="idea_description">Idea Description</Label>
                        <Input
                            id="idea_description"
                            placeholder="Idea Description"
                            name="idea_description"
                            type="text"
                            className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                            value={formData.idea_description}
                            onChange={handleInputChange}
                        />
                    </LabelInputContainer>

                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="idea_title">Idea Title</Label>
                        <Input
                            id="idea_title"
                            placeholder="Idea Title"
                            name="idea_title"
                            type="text"
                            className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                            value={formData.idea_title}
                            onChange={handleInputChange}
                        />
                    </LabelInputContainer>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 font-semibold rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Ideainput;
