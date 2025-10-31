import React from 'react';
import { authStorage } from '../services/api';

const UploadContent: React.FC = () => {
  const { user } = authStorage.getAuth();

  // This page should only be accessible to teachers
  if (user?.role !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
          <p className="text-gray-600 mt-2">This page is only accessible to teachers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Upload Course Content</h1>
          <p className="text-gray-600 mt-2">Share your knowledge with students</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <form className="space-y-6">
            <div>
              <label htmlFor="courseTitle" className="block text-sm font-medium text-gray-700">
                Course Title
              </label>
              <input
                type="text"
                id="courseTitle"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter course title"
              />
            </div>

            <div>
              <label htmlFor="courseDescription" className="block text-sm font-medium text-gray-700">
                Course Description
              </label>
              <textarea
                id="courseDescription"
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Describe your course"
              />
            </div>

            <div>
              <label htmlFor="courseFile" className="block text-sm font-medium text-gray-700">
                Upload Content
              </label>
              <input
                type="file"
                id="courseFile"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Upload Content
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadContent;