import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { authStorage } from '../services/api';

// ==================== Pages ====================
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import TeacherDashboard from '../pages/TeacherDashboard';
import Profile from '../pages/Profile';
import ResetPassword from '../pages/ResetPassword';
import UploadContent from '../pages/UploadContent';
import CourseDetails from '../pages/CourseDetails';
import Courses from '../pages/Courses';
import AdminCourses from '../pages/AdminCourses';
import ManageCourseContent from '../pages/ManageCourseContent';

// ==================== Protected Route ====================
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  const { user } = authStorage.getAuth();

  if (!authStorage.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

// ==================== Dynamic Dashboard ====================
const DynamicDashboard: React.FC = () => {
  const { user } = authStorage.getAuth();
  return user?.role === 'teacher' ? <TeacherDashboard /> : <Dashboard />;
};

// ==================== App Routes ====================
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* ---------- Public Routes ---------- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ---------- Protected Routes ---------- */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DynamicDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:courseId"
        element={
          <ProtectedRoute>
            <CourseDetails />
          </ProtectedRoute>
        }
      />

      {/* ---------- Teacher Routes ---------- */}
      <Route
        path="/teacher-dashboard"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <TeacherDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload-content"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <UploadContent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manage-course-content"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <ManageCourseContent />
          </ProtectedRoute>
        }
      />

      {/* ---------- Admin Routes ---------- */}
      <Route
        path="/admin-courses"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminCourses />
          </ProtectedRoute>
        }
      />

      {/* ---------- 404 Fallback ---------- */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">404 - Page Not Found</h1>
              <p className="text-gray-600 mt-2">
                The page you’re looking for doesn’t exist.
              </p>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
