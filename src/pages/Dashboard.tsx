import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authStorage } from '../services/api';

const Dashboard: React.FC = () => {
  const { user } = authStorage.getAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || user?.email}!
          </h1>
          <p className="text-gray-600 mt-2">Student Dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-indigo-600">5</div>
            <div className="text-gray-600">Enrolled Courses</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">12</div>
            <div className="text-gray-600">Completed Lessons</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">3</div>
            <div className="text-gray-600">Pending Assignments</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold">Introduction to Programming</h3>
              <p className="text-gray-600 text-sm mt-1">Learn basic programming concepts</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-500">Progress: 60%</span>
                <Link to="/courses/1" className="text-indigo-600 hover:text-indigo-500 text-sm">
                  Continue Learning
                </Link>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-semibold">Web Development</h3>
              <p className="text-gray-600 text-sm mt-1">HTML, CSS, and JavaScript</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-sm text-gray-500">Progress: 30%</span>
                <Link to="/courses/2" className="text-indigo-600 hover:text-indigo-500 text-sm">
                  Continue Learning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;