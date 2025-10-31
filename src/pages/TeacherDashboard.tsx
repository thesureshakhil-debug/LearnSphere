import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authStorage } from '../services/api';

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  students: number;
  lessons: number;
}

interface ContentItem {
  _id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
  duration?: number;
  size?: string;
  uploadDate: string;
  courseId: string;
}

const TeacherDashboard: React.FC = () => {
  const { user } = authStorage.getAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [recentContent, setRecentContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherData();
  }, []);

  const fetchTeacherData = async () => {
    try {
      // Mock data - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCourses: Course[] = [
        {
          _id: '1',
          title: 'Introduction to React',
          description: 'Learn React fundamentals',
          category: 'Programming',
          students: 45,
          lessons: 12
        },
        {
          _id: '2',
          title: 'Advanced JavaScript',
          description: 'Deep dive into JavaScript',
          category: 'Programming',
          students: 32,
          lessons: 8
        }
      ];

      const mockContent: ContentItem[] = [
        {
          _id: '1',
          title: 'React Components Lecture',
          type: 'video',
          duration: 45,
          uploadDate: '2024-01-15',
          courseId: '1'
        },
        {
          _id: '2',
          title: 'JavaScript ES6 Features',
          type: 'pdf',
          size: '2.4 MB',
          uploadDate: '2024-01-14',
          courseId: '2'
        }
      ];

      setCourses(mockCourses);
      setRecentContent(mockContent);
    } catch (error) {
      console.error('Failed to fetch teacher data:', error);
    } finally {
      setLoading(false);
    }
  };

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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name || user?.email}! Manage your courses and content.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-indigo-600">{courses.length}</div>
            <div className="text-gray-600">Total Courses</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {courses.reduce((acc, course) => acc + course.students, 0)}
            </div>
            <div className="text-gray-600">Total Students</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {courses.reduce((acc, course) => acc + course.lessons, 0)}
            </div>
            <div className="text-gray-600">Total Lessons</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">{recentContent.length}</div>
            <div className="text-gray-600">Content Items</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Content */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Recent Content</h2>
                <button 
                  onClick={() => navigate('/upload-content')}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
                >
                  Upload New
                </button>
              </div>
            </div>
            <div className="p-6">
              {recentContent.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No content uploaded yet. Start by uploading your first video or PDF.
                </div>
              ) : (
                <div className="space-y-4">
                  {recentContent.map((item) => (
                    <div key={item._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          item.type === 'video' ? 'bg-red-100 text-red-600' :
                          item.type === 'pdf' ? 'bg-blue-100 text-blue-600' :
                          'bg-green-100 text-green-600'
                        }`}>
                          {item.type === 'video' ? '🎬' : item.type === 'pdf' ? '📄' : '❓'}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">
                            {item.type === 'video' ? `${item.duration} min` : item.size} • {item.uploadDate}
                          </p>
                        </div>
                      </div>
                      <button className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50 transition">
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Your Courses */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Your Courses</h2>
            </div>
            <div className="p-6">
              {courses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No courses created yet. 
                  <Link to="/admin/courses" className="text-indigo-600 hover:text-indigo-500 ml-1">
                    Create your first course
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course._id} className="p-4 border border-gray-200 rounded-lg">
                      <h3 className="font-semibold text-gray-900">{course.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-sm text-gray-500">
                          {course.students} students • {course.lessons} lessons
                        </div>
                        <button 
                          className="border border-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-50 transition"
                          onClick={() => navigate('/upload-content', { state: { courseId: course._id } })}
                        >
                          Add Content
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/courses">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer">
                  <div className="text-lg font-semibold text-gray-900">Create Course</div>
                  <p className="text-sm text-gray-600 mt-1">Start a new course from scratch</p>
                </div>
              </Link>
              <Link to="/upload-content">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer">
                  <div className="text-lg font-semibold text-gray-900">Upload Content</div>
                  <p className="text-sm text-gray-600 mt-1">Add videos, PDFs, or quizzes</p>
                </div>
              </Link>
              <Link to="/courses">
                <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors cursor-pointer">
                  <div className="text-lg font-semibold text-gray-900">Browse Courses</div>
                  <p className="text-sm text-gray-600 mt-1">Explore all available courses</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;