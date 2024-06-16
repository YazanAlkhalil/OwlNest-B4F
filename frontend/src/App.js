import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateCoursePage from './pages/CreateCoursePage';
import TraineeLayout from './components/TraineeLayout';
import TrainerLayout from './components/TrainerLayout';
import AdminLayout from './components/AdminLayout';
import { Toaster } from 'react-hot-toast';
function App() {
  
  return (
    <>
    <BrowserRouter>
       <Routes>
        <Route path="/trainee" element={<TraineeLayout />}>
          
        </Route>

        <Route path="/trainer" element={<TrainerLayout />}>
          <Route index path='/trainer/' element={<CreateCoursePage />} />
        </Route>

        <Route path="/admin" element={<AdminLayout />}>
          
        </Route>
      </Routes>
    <Toaster/>
    </BrowserRouter>
    </>
  );
}


export default App;
