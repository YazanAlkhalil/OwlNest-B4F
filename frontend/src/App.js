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
import AdminUserDetail from './pages/AdminUserDetail';
import CompanyPage from './pages/CompanyPage';
import TranieeDashboard from './pages/TranieeDashboard'
import TraineeCourses from './pages/TraineeCourses'
import TraineeCertificate from './pages/TraineeCertificate'
import CourseLayout from './components/CourseLayout'
import TraineeCourseDisplay from './components/TraineeCourseDisplay'
import TraineeProgress from './components/TraineeProgress'
import TraineeLesson from './components/TraineeLesson'
import TraineeDiscussion from './components/TraineeDiscussion'
import TraineeInfor from './components/TraineeInfor'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* auth routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreateCompanyPage />} />
          <Route path='/registerCompany' element={<RegisterCompanyPage />} />
          <Route path='/verify' element={<VerificationPage />} />
          <Route path="/company" element={<CompanyPage />} />

          {/* trainee routes */}
          <Route path="/trainee" element={<TraineeLayout />}>
          <Route path="/trainee/" element={<Navigate to="/trainee/homepage" replace />} />

            <Route path="/trainee/homePage" element={<TranieeDashboard />} />

            <Route path="/trainee/courses" element={<TraineeCourses />}>
            </Route>
            <Route path="/trainee/certifications" element={<TraineeCertificate />} />
          </Route>


          <Route path="/trainee/courses/:id" element={<CourseLayout />}>
            <Route path="/trainee/courses/:id" element={<Navigate to="/trainee/courses/:id/content" replace />} />
            <Route path="/trainee/courses/:id/content" element={<TraineeCourseDisplay />} />
            <Route path="/trainee/courses/:id/content/lesson" element={<TraineeLesson />} />
            <Route path="/trainee/courses/:id/progress" element={<TraineeProgress />} />
            <Route path="/trainee/courses/:id/discussion" element={<TraineeDiscussion />} />
            <Route path="/trainee/courses/:id/Info" element={<TraineeInfor/>} />
          </Route>

          {/* //trainer routes */}
          <Route path="/trainer" element={<TrainerLayout />}>
            <Route path='/trainer/courses/:id' element={<CreateCoursePage />} />
            <Route path='/trainer/courses' element={<TrainerCoursesPage />} />
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
          <Route path="/admin/user-details" element={<AdminUserDetail/>} />
        </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}


export default App;
