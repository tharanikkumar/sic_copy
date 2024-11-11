import Navbar from "../../components/Navbar"
import { Label } from "@radix-ui/react-label"
import { LabelInputContainer } from "./Login"
import { Input } from "../../components/ui/Input"
import { BottomGradient } from "./Login"
import { useState } from "react"
import { BACKEND_URL } from "../../../config"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AddSchool = () => {
  const navigate=useNavigate()
  
    const [formData, setFormData] = useState({
        school_name: '',
        UDISE_code: "",
        district_id: "",
        state_id: "",
        accessibility_language: "",
        address: "",
      });
      const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const SPOC_id = localStorage.getItem('admin_id');

        if (!SPOC_id) {
          console.error("SPOC ID not found in localStorage");
          return;
        }
      
       try{
        const extendedFormData = {
          ...formData,
          SPOC_id: SPOC_id, 
          delete_status: false, 
        };
        console.log(BACKEND_URL);
    const response=await axios.post(`${BACKEND_URL}/admin/createschools
      `,extendedFormData,{
        withCredentials: true,
    })
    console.log(response);
   
    const message=response.data.message;
    if(message==="success"){
      navigate("/admindashboard")
       }
      else{
        alert("Cannot add school")
      }}catch(e:unknown){
        console.log(e)
       }
        
      };
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      
      };
  return (
    <div>
        <Navbar/>
        
          <button   className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-40 mt-5 text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" onClick={()=>{navigate("/admindashboard")}}>Back</button>
  
    
    <div className="flex justify-center items-center">
          
          <div className='text-4xl font-bold justify-center'>AddSchool</div>
    
    </div>
   
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl mt-12 p-4 md:p-8 shadow-input bg-white ">
      <h2 className="font-bold text-xl text-neutral-800 ">
        PM Shri Schools
      </h2>
    
      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="school_name">School Name</Label>
          <Input id="school_name" placeholder="projectmayhem@fc.com" name="school_name" type="school_name" value={formData.school_name} onChange={handleInputChange} />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="UDISE_code">UDISE Code</Label>
          <Input id="UDISE_code" name="UDISE_code" value={formData.UDISE_code} onChange={handleInputChange} placeholder="School udise code" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="district_id">District Id</Label>
          <Input id="district_id" name="district_id" value={formData.district_id} onChange={handleInputChange} placeholder="District id" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="state_id">State Id</Label>
          <Input id="state_id" name="state_id" value={formData.state_id} onChange={handleInputChange} placeholder="State id" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="School address" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="accessibility_language">Accessibility Language</Label>
          <Input id="accessibility_language" name="accessibility_language" value={formData.accessibility_language} onChange={handleInputChange} placeholder="accessible " type="text" />
        </LabelInputContainer>
        

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Create school &rarr;
          <BottomGradient />
        </button>

        

   
      </form>
    </div>
    </div>
  )
}

export default AddSchool