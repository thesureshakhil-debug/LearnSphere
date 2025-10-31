import { useState, useRef } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface Course {
  _id: string;
  title: string;
}

interface UploadModalProps {
  onClose: () => void;
  courseId: string;
  courses: Course[];
}

const UploadModal = ({ onClose, courseId, courses }: UploadModalProps) => {
  const [uploadType, setUploadType] = useState<'video' | 'pdf' | 'quiz'>('video');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courseId || '');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          // Here you would typically make an API call to upload the file
          setTimeout(() => {
            onClose();
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // In a real application, you would upload the file to your server/Cloudinary
    // await uploadFile(file, selectedCourse, uploadType, title, description);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !selectedCourse) {
      alert('Please fill in all required fields');
      return;
    }
    handleFileUpload({ target: { files: [new File([], 'dummy')] } } as any);
  };

  const getAcceptedFiles = () => {
    switch (uploadType) {
      case 'video':
        return 'video/mp4,video/avi,video/mov,video/wmv';
      case 'pdf':
        return '.pdf';
      case 'quiz':
        return '.json,.txt';
      default:
        return '*';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upload Content</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Content Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Content Type
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { type: 'video', label: 'Video', icon: '🎬' },
                  { type: 'pdf', label: 'PDF Notes', icon: '📄' },
                  { type: 'quiz', label: 'Quiz', icon: '❓' }
                ].map((item) => (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setUploadType(item.type as any)}
                    className={`p-4 border-2 rounded-lg text-center transition-all ${
                      uploadType === item.type
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="font-medium text-gray-900">{item.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Course Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Course *
              </label>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Choose a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={`Enter ${uploadType} title`}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Brief description of the content"
              />
            </div>

            {/* Video-specific fields */}
            {uploadType === 'video' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <Input
                    type="number"
                    placeholder="45"
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Quality
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    <option>HD (720p)</option>
                    <option>Full HD (1080p)</option>
                    <option>4K</option>
                  </select>
                </div>
              </div>
            )}

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload File *
              </label>
              <div 
                onClick={handleFileSelect}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors"
              >
                <div className="text-4xl mb-4">
                  {uploadType === 'video' ? '🎬' : uploadType === 'pdf' ? '📄' : '❓'}
                </div>
                <p className="text-gray-600 mb-2">
                  Click to upload {uploadType === 'video' ? 'a video file' : uploadType === 'pdf' ? 'a PDF document' : 'quiz data'}
                </p>
                <p className="text-sm text-gray-500">
                  {uploadType === 'video' ? 'MP4, AVI, MOV, WMV (Max 2GB)' : 
                   uploadType === 'pdf' ? 'PDF files only (Max 50MB)' :
                   'JSON or TXT files'}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={getAcceptedFiles()}
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            {/* Upload Progress */}
            {uploading && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={uploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={uploading || !title || !selectedCourse}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                {uploading ? 'Uploading...' : 'Upload Content'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;