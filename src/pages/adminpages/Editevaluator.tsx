import Navbar from '../../components/Navbar';
import { Input } from '../../components/ui/Input';
import { Label } from '../../components/ui/Label';
import { LabelInputContainer } from '../adminpages/Login';
import { useState, useEffect } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

const EditEvaluator = () => {
  const [formData, setFormData] = useState({
    email: 'johndoe@example.com',
    password: '123456',
    first_name: 'John',
    last_name: 'Doe',
    gender: 'Male',
    alternative_email: 'johndoe.alt@example.com',
    phone_number: '1234567890',
    alternative_phone_number: '0987654321',
    college_name: 'Sample University',
    designation: 'Professor',
    total_experience: '10',
    city: 'Sample City',
    state: 'Sample State',
    knowledge_domain: 'Engineering',
    theme_preference_1: 'Innovation',
    theme_preference_2: 'Technology',
    theme_preference_3: 'Startups',
    expertise_in_startup_value_chain: 'Mentorship',
    role_interested: 'Evaluator',
    delete_status: 0,
    evaluator_status: 1,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchEvaluatorData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/evaluator/1`);
        setFormData(response.data);
      } catch (error) {
        console.error("Failed to fetch evaluator data:", error);
      }
    };

    fetchEvaluatorData();
  }, []);

  const validateForm = () => {
    const requiredFields = [
      'email', 'password', 'first_name', 'last_name', 'gender', 'alternative_email', 
      'phone_number', 'alternative_phone_number', 'college_name', 'designation', 
      'total_experience', 'city', 'state', 'knowledge_domain', 
      'theme_preference_1', 'theme_preference_2', 'theme_preference_3', 
      'expertise_in_startup_value_chain', 'role_interested'
    ];
  
    const newErrors = requiredFields.reduce((errors, field) => {
      const value = formData[field];
      if (!value && value !== 0) {
        errors[field] = `${field.replace(/_/g, ' ')} is required`;
      }
      return errors;
    }, {});

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log(formData);
      try {
        await axios.put(`${BACKEND_URL}/evaluator/1`, formData, {
          withCredentials: true,
        });
        alert("Evaluator details updated successfully!");
      } catch (error) {
        console.error("Failed to update evaluator details:", error);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mr-20 ml-20 mt-10 mb-6 bg-white rounded-lg overflow-hidden">
        <div className="bg-sky-900 text-white text-3xl font-bold py-4 px-6 text-center">
          Edit Evaluator
        </div>
        <Link to="/"> 
          <button className="bg-cyan-900 mt-4 text-white py-2 px-4 rounded-md hover:bg-cyan-800">Back</button>
        </Link>
        <form className="p-6 md:p-9 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Map through form fields here */}
            <LabelInputContainer className="mb-4">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                placeholder="First Name"
                name="first_name"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.first_name}
                onChange={handleInputChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                placeholder="Last Name"
                name="last_name"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.last_name}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Email"
                name="email"
                type="email"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.email}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="alternative_email">Alternative Email</Label>
              <Input
                id="alternative_email"
                placeholder="Alternative Email"
                name="alternative_email"
                type="email"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.alternative_email}
                onChange={handleInputChange}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="alternative_email">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                name="password"
                type="password"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.password}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="phone_number">Phone Number</Label>
              <Input
                id="phone_number"
                placeholder="Phone Number"
                name="phone_number"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.phone_number}
                onChange={handleInputChange}
                maxLength={10}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="alternative_phone_number">Alternative Phone Number</Label>
              <Input
                id="alternative_phone_number"
                placeholder="Alternative Phone Number"
                name="alternative_phone_number"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.alternative_phone_number}
                onChange={handleInputChange}
                maxLength={10}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="college_name">Gender</Label>
              <Input
                id="gender"
                placeholder="Gender"
                name="gender"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.gender}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="college_name">College Name</Label>
              <Input
                id="college_name"
                placeholder="College Name"
                name="college_name"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.college_name}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="designation">Designation</Label>
              <Input
                id="designation"
                placeholder="Designation"
                name="designation"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.designation}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="total_experience">Total Experience</Label>
              <Input
                id="total_experience"
                placeholder="Total Experience (Years)"
                name="total_experience"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.total_experience}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                name="city"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.city}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="State"
                name="state"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.state}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="knowledge_domain">Knowledge Domain</Label>
              <Input
                id="knowledge_domain"
                placeholder="Knowledge Domain"
                name="knowledge_domain"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.knowledge_domain}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="theme_preference_1">Theme Preference 1</Label>
              <Input
                id="theme_preference_1"
                placeholder="Theme Preference 1"
                name="theme_preference_1"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.theme_preference_1}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="theme_preference_2">Theme Preference 2</Label>
              <Input
                id="theme_preference_2"
                placeholder="Theme Preference 2"
                name="theme_preference_2"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.theme_preference_2}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="theme_preference_3">Theme Preference 3</Label>
              <Input
                id="theme_preference_3"
                placeholder="Theme Preference 3"
                name="theme_preference_3"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.theme_preference_3}
                onChange={handleInputChange}
              />
              
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="expertise_in_startup_value_chain">Expertise in Startup Value Chain</Label>
              <Input
                id="expertise_in_startup_value_chain"
                placeholder="Expertise in Startup Value Chain"
                name="expertise_in_startup_value_chain"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.expertise_in_startup_value_chain}
                onChange={handleInputChange}
              />
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
              <Label htmlFor="role_interested">Role Interested</Label>
              <Input
                id="role_interested"
                placeholder="Role Interested"
                name="role_interested"
                type="text"
                className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
                value={formData.role_interested}
                onChange={handleInputChange}
              />
            </LabelInputContainer>
            
            
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 font-semibold rounded-md hover:bg-blue-700 transition duration-300"
           >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvaluator;
