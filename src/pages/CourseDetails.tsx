import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { authStorage } from '../services/api';

const CourseDetails: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { user } = authStorage.getAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="text-indigo-600 hover:text-indigo-500 font-medium"
          >
            &larr; Back to Dashboard
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Course Details {courseId && `- ${courseId}`}
            </h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">
                Welcome to the course details page. This is where students and teachers can view detailed information about specific courses.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold mb-2">Your Role: <span className="capitalize">{user?.role}</span></h3>
                <p className="text-gray-600">
                  {user?.role === 'student' 
                    ? 'As a student, you can enroll in courses and access learning materials.'
                    : 'As a teacher, you can manage course content and track student progress.'
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Course Information</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Duration: 8 weeks</li>
                    <li>Level: Beginner</li>
                    <li>Language: English</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">What You'll Learn</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Fundamental concepts</li>
                    <li>Practical skills</li>
                    <li>Real-world projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;