import React, { useState } from 'react';

interface UsernameFormProps {
  onSubmit: (username: string) => void;
  isLoading?: boolean;
}

const UsernameForm: React.FC<UsernameFormProps> = ({ onSubmit, isLoading = false }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSubmit(username.trim());
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-center text-gray-800">Instagram Analytics</h2>
      </div>
      <div className="p-6 pt-0">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Instagram Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
              placeholder="Enter username"
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !username.trim()}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {isLoading ? 'Loading...' : 'Analyze Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UsernameForm;