import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Allschools from './pages/adminpages/Allschools';
import { Login } from './pages/adminpages/Login';
import Admindashboard from './pages/adminpages/Admindashboard';
import AddSchool from './pages/adminpages/AddSchool';
import Editschool from './pages/adminpages/Ideainput';
import Addfaculty from './pages/adminpages/Ideas';
import Dettailedschool from './pages/adminpages/Editevaluator';
import EvalutorRegistration from './pages/EvalutorRegistration';
import Ideas from './pages/adminpages/Ideas';
import EditEvaluator from './pages/adminpages/Editevaluator';
import Ideainput from './pages/adminpages/Ideainput';



function App() {
  return (
    <div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/editevaluator/:id" element={<EditEvaluator />} />          <Route path="/admin_ideas" element={<Ideas />} />
          <Route path="/allschools" element={<Allschools />} />
          <Route path="/evaluator_registration" element={<EvalutorRegistration />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
        <Route path='/addideas' element={<Ideainput />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
