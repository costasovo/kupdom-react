'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from "next/image";

export default function HomePage() {
  const [listCode, setListCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createNewList = async () => {
    setIsCreating(true);
    try {
      const response = await fetch('/api/lists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: 'My Shopping List' }),
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/list/${data.code}`);
      } else {
        alert('Failed to create shopping list');
      }
    } catch (error) {
      console.error('Error creating list:', error);
      alert('Failed to create shopping list');
    } finally {
      setIsCreating(false);
    }
  };

  const goToList = () => {
    if (listCode.trim()) {
      router.push(`/list/${listCode.trim().toUpperCase()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      goToList();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      {/* Admin Link */}
      <div className="absolute top-4 right-4">
        <button
          onClick={() => router.push('/admin/login')}
          className="text-xs text-gray-500 hover:text-gray-700 underline"
        >
          Admin
        </button>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* App Logo/Title */}
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">KupDom</h1>
        <p className="text-gray-600 mb-8">Your Smart Shopping Companion</p>

        {/* AI Comic Image Placeholder */}
        <div className="mb-8 p-6 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-xl border-2 border-dashed border-orange-300">
          <div className="text-6xl mb-2">🛒</div>
          <p className="text-sm text-orange-700 font-medium">
            AI Comic: Man with shopping bag heading to grocery store
          </p>
          <p className="text-xs text-orange-600 mt-1">
            (Funny cartoon style illustration)
          </p>
        </div>

        {/* Create New List Button */}
        <button
          onClick={createNewList}
          disabled={isCreating}
          className="w-full mb-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
        >
          {isCreating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating...
            </>
          ) : (
            'Create New Shopping List'
          )}
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        {/* Join Existing List */}
        <div className="space-y-4">
          <div>
            <label htmlFor="listCode" className="block text-sm font-medium text-gray-700 mb-2">
              Enter List Code
            </label>
            <input
              id="listCode"
              type="text"
              value={listCode}
              onChange={(e) => setListCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              placeholder="e.g., ABC123"
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-center text-lg font-mono tracking-wider"
            />
          </div>
          
          <button
            onClick={goToList}
            disabled={!listCode.trim() || isLoading}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200"
          >
            Go to List
          </button>
        </div>
      </div>
    </div>
  );
}
