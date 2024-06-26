// import Sidebar from './components/Sidebar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreateCoursePage from './pages/CreateCoursePage';
import TraineeLayout from './components/TraineeLayout';
import TrainerLayout from './components/TrainerLayout';
import AdminLayout from './components/AdminLayout';
import { Toaster } from 'react-hot-toast';
import TrainerCoursesPage from './pages/TrainerCoursesPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminCoursesPage from './pages/AdminCoursesPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminCourseDetails from './pages/AdminCourseDetails';
import AdminUsers from './pages/AdminUsers';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateCompanyPage from './pages/CreateCompanyPage';
import RegisterCompanyPage from './pages/RegisterCompanyPage';
import VerificationPage from './pages/VerificationPage';
function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* auth routes */}
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/create' element={<CreateCompanyPage/>} />
        <Route path='/registerCompany' element={<RegisterCompanyPage/>} />
        <Route path='/verify' element={<VerificationPage/>} />

        {/* trainee routes */}
        <Route path="/trainee" element={<TraineeLayout />}>
        
        </Route>

        {/* //trainer routes */}
        <Route path="/trainer" element={<TrainerLayout />}>
          <Route  path='/trainer/courses/:id' element={<CreateCoursePage />} />
          <Route  path='/trainer/courses' element={<TrainerCoursesPage/>} />
          <Route path="/trainer" element={<Navigate to="/trainer/courses" replace />} />
        </Route>

        {/* //admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<AdminDashboard />}/>
          <Route path='/admin/courses/:id' element={<AdminCourseDetails />}/>
          <Route path='/admin/courses' element={<AdminCoursesPage />}/>
          <Route path='/admin/users' element={<AdminUsers />}/>
          <Route path='/admin/users/:id' element={<AdminCoursesPage />}/>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    <Toaster/>
    </BrowserRouter>
    </>
  );
}


export default App;
