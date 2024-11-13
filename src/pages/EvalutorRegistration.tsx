import Navbar from '../components/Navbar';
import { Input, Select } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { LabelInputContainer } from './adminpages/Login';
import { useState } from 'react';
import { BACKEND_URL } from "../../config";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
const EvaluatorRegistration = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    gender: '',
    alternative_email: '',
    phone_number: '',
    alternative_phone_number: '',
    college_name: '',
    designation: '',
    total_experience: '',
    city: '',
    state: '',
    knowledge_domain: '',
    theme_preference_1: '',
    theme_preference_2: '',
    theme_preference_3: '',
    expertise_in_startup_value_chain: '',
    role_interested: '',
    delete_status: 0,
    evaluator_status:0
  });
  const [errors, setErrors] = useState({});
  const validateThemePreferences = (field: string, value: any, formData: Record<string, any>) => {
   
    const themeFields = ['theme_preference_1', 'theme_preference_2', 'theme_preference_3'];
  
  
    const otherFields = themeFields.filter(f => f !== field);
  
    // Check if any of the other fields have the same value
    for (const otherField of otherFields) {
      if (formData[otherField] === value) {
        return `${field.replace(/_/g, ' ')} should not have the same value as ${otherField.replace(/_/g, ' ')}`;
      }
    }
    return null;
  };
  
  const validateForm = () => {
    const requiredFields = [
      'email', 'password', 'first_name', 'last_name', 'gender', 'alternative_email', 
      'phone_number', 'alternative_phone_number', 'college_name', 'designation', 
      'total_experience', 'city', 'state', 'knowledge_domain', 
      'theme_preference_1', 'theme_preference_2', 'theme_preference_3', 
      'expertise_in_startup_value_chain', 'role_interested'
    ];

    const newErrors: Record<string, string> = requiredFields.reduce((errors: Record<string, string>, field: string) => {
      const value = formData[field as keyof typeof formData];

      if (!value && value !== 0) {
        errors[field] = `${field.replace(/_/g, ' ')} is required`;
        return errors;
      }
      if (field.startsWith("theme_preference")) {
        const duplicateError = validateThemePreferences(field, value, formData);
        if (duplicateError) {
          errors[field] = duplicateError;
          return errors;
        }
      }

      if (field === 'first_name' || field === 'last_name' || field === 'gender') {
        const wordCount = String(value).trim().split(/\s+/).length;
        if (wordCount > 1) {
          errors[field] = `${field.replace(/_/g, ' ')} should not exceed a single word`;
        }
      }

      if (field === 'phone_number' || field === 'alternative_phone_number') {
        if (!/^\d{10}$/.test(String(value))) {  // Ensure it's exactly 10 digits
          errors[field] = `${field.replace(/_/g, ' ')} should be a 10-digit number`;
        }
      }

      if (field === 'city' || field === 'state') {
        const wordCount = String(value).trim().split(/\s+/).length;
        if (wordCount > 3) {
          errors[field] = `${field.replace(/_/g, ' ')} should not exceed 3 words`;
        }
      }

      if (field === 'college_name') {
        const wordCount = String(value).trim().split(/\s+/).length;
        if (wordCount > 5) {
          errors[field] = `${field.replace(/_/g, ' ')} should not exceed 5 words`;
        }
      }

      if (field === 'designation') {
        const wordCount = String(value).trim().split(/\s+/).length;
        if (wordCount > 3) {
          errors[field] = `${field.replace(/_/g, ' ')} should not exceed 3 words`;
        }
      }

      if (field === 'total_experience') {
        if (!/^\d+$/.test(String(value))) {  // Ensure it's a single number
          errors[field] = `${field.replace(/_/g, ' ')} should be a single number`;
        }
      }

      return errors;
    }, {});

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join('\n');
      window.alert(errorMessages);
      return false;
    }
  
    return true;
  };
  
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' }); 
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log(formData);
      try {

       const response= await axios.post(`${BACKEND_URL}register_evaluator.php`, formData, {
          withCredentials: true,
        });

  
       if(response.data.message){
        alert("Please wait for admin approval");
        return;
       }
       else{
        console.log(response.data);

        return;
       }
      } catch (error) {
        console.error("Failed to submit:", error);
      }
    } else {
     
      console.log(errors);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mr-20 ml-20 mt-10 mb-6 bg-white rounded-lg overflow-hidden">
        <div className="bg-sky-900 text-white text-3xl font-bold py-4 px-6 text-center">
          Evaluator Registration
        </div>
<Link to="/"> 
    <button className="bg-cyan-900 mt-4 text-white py-2 px-4 rounded-md hover:bg-cyan-800">Back</button>
</Link>
        <form className="p-6 md:p-9 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
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
  <Label htmlFor="theme_preference_3">Theme Preference 3</Label>
  <Select
    id="theme_preference_3"
    name="theme_preference_3"
    className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
    value={formData.theme_preference_3}
    onChange={handleInputChange}
  >
    <option value="" disabled>Select a theme</option>
    <option value="1">Light Theme</option>
    <option value="2">Dark Theme</option>
    <option value="3">Blue Theme</option>
    <option value="4">Green Theme</option>
  </Select>
</LabelInputContainer>

            <LabelInputContainer className="mb-4">
  <Label htmlFor="theme_preference_3">Theme Preference 3</Label>
  <Select
    id="theme_preference_3"
    name="theme_preference_3"
    className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
    value={formData.theme_preference_3}
    onChange={handleInputChange}
  >
    <option value="" disabled>Select a theme</option>
    <option value="1">Light Theme</option>
    <option value="2">Dark Theme</option>
    <option value="3">Blue Theme</option>
    <option value="4">Green Theme</option>
  </Select>
</LabelInputContainer>

            <LabelInputContainer className="mb-4">
  <Label htmlFor="theme_preference_3">Theme Preference 3</Label>
  <Select
    id="theme_preference_3"
    name="theme_preference_3"
    className="p-4 text-lg w-full h-16 border border-gray-300 rounded-md"
    value={formData.theme_preference_3}
    onChange={handleInputChange}
  >
    <option value="" disabled>Select a theme</option>
    <option value="1">Light Theme</option>
    <option value="2">Dark Theme</option>
    <option value="3">Blue Theme</option>
    <option value="4">Green Theme</option>
  </Select>
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
            Register
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default EvaluatorRegistration;
