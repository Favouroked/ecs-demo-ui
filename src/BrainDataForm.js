import React, { useState } from 'react';
import axios from 'axios';

const BrainDataForm = () => {
  const [type, setType] = useState('emotion');
  const [emotionType, setEmotionType] = useState('');
  const [intensity, setIntensity] = useState(0);
  const [thoughtContent, setThoughtContent] = useState('');
  const [sentiment, setSentiment] = useState('positive');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = type === 'emotion'
      ? { 'emotion_type': emotionType, intensity }
      : { content: thoughtContent, sentiment };

    try {
        const username = 'admin';
        const password = 'pass';
      await axios.post(`http://localhost:8080/api/brain-data/${type}`, data, { auth: { username, password }});
      setEmotionType('');
      setIntensity(0);
      setThoughtContent('');
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} data submitted successfully`);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Submit {type.charAt(0).toUpperCase() + type.slice(1)} Data</h2>

      {/* Select Type (Emotion or Thought) */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="emotion">Emotion</option>
          <option value="thought">Thought</option>
        </select>
      </div>

      {/* Emotion Fields */}
      {type === 'emotion' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Emotion Type</label>
            <select
              value={emotionType}
              onChange={(e) => setEmotionType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select an emotion</option>
              <option value="happy">Happy</option>
              <option value="sad">Sad</option>
              <option value="stressed">Stressed</option>
              <option value="anxious">Anxious</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Intensity</label>
            <input
              type="number"
              value={intensity}
              onChange={(e) => setIntensity(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              min="0"
              max="100"
            />
          </div>
        </>
      )}

      {/* Thought Fields */}
      {type === 'thought' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Thought Content</label>
            <input
              type="text"
              value={thoughtContent}
              onChange={(e) => setThoughtContent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your thought"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Sentiment</label>
            <select
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
          </div>
        </>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  );
};

export default BrainDataForm;
