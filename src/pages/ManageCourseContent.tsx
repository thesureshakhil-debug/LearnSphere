import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import UploadModal from '../components/teacher/UploadModal';

interface ContentItem {
  _id: string;
  title: string;
  type: 'video' | 'pdf' | 'quiz';
  duration?: number;
  size?: string;
  uploadDate: string;
  order: number;
  isPublished: boolean;
}

interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
}

const ManageCourseContent = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (courseId) {
      fetchCourseContent();
    }
  }, [courseId]);

  const fetchCourseContent = async () => {
    try {
      // Mock data - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockCourse: Course = {
        _id: courseId!,
        title: 'Introduction to React',
        description: 'Learn React fundamentals from scratch',
        category: 'Programming'
      };

      const mockContent: ContentItem[] = [
        {
          _id: '1',
          title: 'React Components Introduction',
          type: 'video',
          duration: 25,
          uploadDate: '2024-01-15',
          order: 1,
          isPublished: true
        },
        {
          _id: '2',
          title: 'State and Props Guide',
          type: 'pdf',
          size: '1.2 MB',
          uploadDate: '2024-01-16',
          order: 2,
          isPublished: true
        },
        {
          _id: '3',
          title: 'Components Quiz',
          type: 'quiz',
          uploadDate: '2024-01-17',
          order: 3,
          isPublished: false
        }
      ];

      setCourse(mockCourse);
      setContent(mockContent);
    } catch (error) {
      console.error('Failed to fetch course content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredContent = content.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const togglePublish = (contentId: string) => {
    setContent(content.map(item =>
      item._id === contentId ? { ...item, isPublished: !item.isPublished } : item
    ));
  };

  const deleteContent = (contentId: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      setContent(content.filter(item => item._id !== contentId));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Loading content...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg text-red-600">Course not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start">
            <div>
              <Link to="/teacher/dashboard" className="text-indigo-600 hover:text-indigo-500 text-sm font-medium">
                ← Back to Dashboard
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">{course.title}</h1>
              <p className="text-gray-600 mt-1">{course.description}</p>
            </div>
            <Button 
              onClick={() => setShowUploadModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Add Content
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-indigo-600">{content.length}</div>
            <div className="text-gray-600">Total Items</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">
              {content.filter(item => item.type === 'video').length}
            </div>
            <div className="text-gray-600">Videos</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">
              {content.filter(item => item.type === 'pdf').length}
            </div>
            <div className="text-gray-600">PDFs</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">
              {content.filter(item => item.isPublished).length}
            </div>
            <div className="text-gray-600">Published</div>
          </div>
        </div>

        {/* Content Management */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Course Content</h2>
              <div className="w-64">
                <Input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="p-6">
            {filteredContent.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                  {searchTerm ? 'No content found matching your search.' : 'No content added yet.'}
                </div>
                {!searchTerm && (
                  <Button 
                    onClick={() => setShowUploadModal(true)}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Upload Your First Content
                  </Button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredContent.map((item) => (
                  <div key={item._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        item.type === 'video' ? 'bg-red-100 text-red-600' :
                        item.type === 'pdf' ? 'bg-blue-100 text-blue-600' :
                        'bg-green-100 text-green-600'
                      }`}>
                        {item.type === 'video' ? '🎬' : item.type === 'pdf' ? '📄' : '❓'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            item.isPublished 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {item.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {item.type === 'video' ? `Video • ${item.duration} min` : 
                           item.type === 'pdf' ? `PDF • ${item.size}` : 
                           'Quiz'}
                          {' • '}{item.uploadDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => togglePublish(item._id)}
                      >
                        {item.isPublished ? 'Unpublish' : 'Publish'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => deleteContent(item._id)}
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          courseId={courseId!}
          courses={[course]}
        />
      )}
    </div>
  );
};

export default ManageCourseContent;