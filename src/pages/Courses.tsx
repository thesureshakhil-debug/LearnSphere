import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { getCourses, enrollInCourse } from '../lib/api';
import { useStore } from '../store';

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string;
  category: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  price: number;
  enrolledStudents: number;
  isEnrolled?: boolean;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const { user } = useStore();

  const categories = ['all', 'programming', 'mathematics', 'science', 'business', 'arts'];
  const levels = ['all', 'beginner', 'intermediate', 'advanced'];

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, categoryFilter, levelFilter]);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(course =>
        course.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (levelFilter !== 'all') {
      filtered = filtered.filter(course => course.level === levelFilter);
    }

    setFilteredCourses(filtered);
  };

  const handleEnroll = async (courseId: string) => {
    try {
      await enrollInCourse(courseId);
      // Update local state to reflect enrollment
      setCourses(courses.map(course =>
        course._id === courseId ? { ...course, isEnrolled: true } : course
      ));
    } catch (error) {
      console.error('Failed to enroll in course:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Courses</h1>
          <p className="text-gray-600">Discover and enroll in courses that match your interests</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {levels.map(level => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {course.thumbnail ? (
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-gray-500">No Image</div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {course.level}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    By {course.instructor}
                  </span>
                  <span className="text-sm text-gray-500">
                    {course.duration} hours
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </span>
                  <span className="text-sm text-gray-500">
                    {course.enrolledStudents} students
                  </span>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Link to={`/courses/${course._id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  
                  {user?.role === 'student' && (
                    course.isEnrolled ? (
                      <Button disabled className="w-full bg-green-600">
                        Enrolled
                      </Button>
                    ) : (
                      <Button 
                        onClick={() => handleEnroll(course._id)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700"
                      >
                        Enroll Now
                      </Button>
                    )
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No courses found matching your criteria.</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;