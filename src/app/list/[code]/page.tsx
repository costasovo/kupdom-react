'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingListWithItems, ShoppingItem } from '@/types';

export default function ShoppingListPage() {
  const params = useParams();
  const router = useRouter();
  const code = params.code as string;
  
  const [list, setList] = useState<ShoppingListWithItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newItemName, setNewItemName] = useState('');
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingItemId, setEditingItemId] = useState<number | null>(null);
  const [editingItemName, setEditingItemName] = useState('');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetchList();
  }, [code]);

  const fetchList = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/lists/${code}`);
      if (response.ok) {
        const data = await response.json();
        setList(data.list);
      } else {
        setError('Shopping list not found');
      }
    } catch (error) {
      setError('Failed to load shopping list');
    } finally {
      setLoading(false);
    }
  };

  const addItem = async () => {
    if (!newItemName.trim() || !list) return;
    
    const itemName = newItemName.trim();
    const tempId = Date.now(); // Temporary ID for optimistic update
    
    // Create a temporary item for optimistic update
    const tempItem: ShoppingItem = {
      id: tempId,
      name: itemName,
      status: 'pending',
      list_id: list.id,
      position: list.items.length + 1, // Add at the end
      created_at: new Date().toISOString()
    };

    // Optimistic update - immediately add to UI
    const updatedList = {
      ...list,
      items: [...list.items, tempItem]
    };
    setList(updatedList);
    setNewItemName(''); // Clear input immediately

    // Make API call in background
    try {
      const response = await fetch(`/api/lists/${code}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: itemName }),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        console.error('Failed to add item');
        setList(list); // Revert to original state
        setNewItemName(itemName); // Restore the input text
      }
      // If successful, keep the optimistic update - the item is already in the UI
    } catch (error) {
      console.error('Error adding item:', error);
      // Revert optimistic update on error
      setList(list); // Revert to original state
      setNewItemName(itemName); // Restore the input text
    }
  };

  const toggleItemStatus = async (itemId: number, status: 'bought' | 'unavailable') => {
    if (!list) return;

    // Get current item to check its status
    const currentItem = list.items.find(item => item.id === itemId);
    if (!currentItem) return;

    let newStatus: 'pending' | 'bought' | 'unavailable';
    
    if (status === 'bought') {
      newStatus = currentItem.status === 'bought' ? 'pending' : 'bought';
    } else if (status === 'unavailable') {
      newStatus = currentItem.status === 'unavailable' ? 'pending' : 'unavailable';
    } else {
      newStatus = 'pending';
    }

    // Optimistic update - immediately update the UI
    const updatedList = {
      ...list,
      items: list.items.map(item =>
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    };
    setList(updatedList);

    // Make API call in background
    try {
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        console.error('Failed to update item status');
        setList(list); // Revert to original state
      }
    } catch (error) {
      console.error('Error updating item status:', error);
      // Revert optimistic update on error
      setList(list); // Revert to original state
    }
  };

  const startEditItem = (item: ShoppingItem) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
  };

  const saveEditItem = async () => {
    if (!editingItemId || !editingItemName.trim() || !list) return;
    
    const originalList = list;
    const newName = editingItemName.trim();

    // Optimistic update - immediately update the UI
    const updatedList = {
      ...list,
      items: list.items.map(item =>
        item.id === editingItemId ? { ...item, name: newName } : item
      )
    };
    setList(updatedList);
    setEditingItemId(null);
    setEditingItemName('');

    // Make API call in background
    try {
      const response = await fetch(`/api/items/${editingItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        console.error('Failed to update item name');
        setList(originalList); // Revert to original state
      }
    } catch (error) {
      console.error('Error updating item:', error);
      // Revert optimistic update on error
      setList(originalList); // Revert to original state
    }
  };

  const deleteItem = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this item?') || !list) return;
    
    const originalList = list;

    // Optimistic update - immediately remove from UI
    const updatedList = {
      ...list,
      items: list.items.filter(item => item.id !== itemId)
    };
    setList(updatedList);

    // Make API call in background
    try {
      const response = await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
      
      if (!response.ok) {
        // Revert optimistic update on error
        console.error('Failed to delete item');
        setList(originalList); // Revert to original state
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      // Revert optimistic update on error
      setList(originalList); // Revert to original state
    }
  };

  const updateTitle = async () => {
    if (!list || !editingTitle) return;
    
    const originalTitle = list.title;
    const newTitle = list.title;

    // Optimistic update - immediately update the UI
    setEditingTitle(false);

    // Make API call in background
    try {
      const response = await fetch(`/api/lists/${code}/title`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle }),
      });

      if (!response.ok) {
        // Revert optimistic update on error
        console.error('Failed to update title');
        setList({ ...list, title: originalTitle }); // Revert to original title
        setEditingTitle(true); // Re-enable editing
      }
    } catch (error) {
      console.error('Error updating title:', error);
      // Revert optimistic update on error
      setList({ ...list, title: originalTitle }); // Revert to original title
      setEditingTitle(true); // Re-enable editing
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem();
    }
  };

  const copyToClipboard = async () => {
    const listUrl = `${window.location.origin}/list/${code}`;
    try {
      await navigator.clipboard.writeText(listUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getListUrl = () => {
    return `${window.location.origin}/list/${code}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shopping list...</p>
        </div>
      </div>
    );
  }

  if (error || !list) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Oops!</h1>
          <p className="text-gray-600 mb-6">{error || 'Shopping list not found'}</p>
          <button
            onClick={() => router.push('/')}
            className="bg-green-200 text-green-800 px-6 py-2 rounded-lg hover:bg-green-300"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="text-green-600 hover:text-green-700"
            >
              ← Back
            </button>
            <div className="text-center flex-1">
              {editingTitle ? (
                <input
                  type="text"
                  value={list.title}
                  onChange={(e) => setList({ ...list, title: e.target.value })}
                  onBlur={updateTitle}
                  onKeyPress={(e) => e.key === 'Enter' && updateTitle()}
                  className="text-lg font-semibold text-center bg-transparent border-b border-green-300 focus:outline-none focus:border-green-500 text-gray-900"
                  autoFocus
                />
              ) : (
                <h1
                  className="text-lg font-semibold cursor-pointer hover:text-green-600"
                  onClick={() => setEditingTitle(true)}
                >
                  {list.title}
                </h1>
              )}
              <p className="text-sm text-gray-500 font-mono">Code: {list.code}</p>
            </div>
            <button
              onClick={() => setShowShareModal(true)}
              className="text-green-600 hover:text-green-700 p-2"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Share List</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  List Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={getListUrl()}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      copySuccess
                        ? 'bg-green-200 text-green-800'
                        : 'bg-green-200 text-green-800 hover:bg-green-300'
                    }`}
                  >
                    {copySuccess ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                Share this link with others to let them view and edit this shopping list.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Add New Item */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add new item..."
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent bg-white text-gray-900 placeholder-gray-500"
            />
            <button
              onClick={addItem}
              disabled={!newItemName.trim()}
              className="bg-green-200 text-green-800 px-4 py-2 rounded-lg hover:bg-green-300 disabled:bg-green-100 disabled:cursor-not-allowed"
            >
              Add
            </button>
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {list.items.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">🛒</div>
              <p>No items yet. Add your first item above!</p>
            </div>
          ) : (
            list.items.map((item) => (
              <div
                key={item.id}
                className={`bg-white rounded-lg shadow-sm p-4 border-l-4 ${
                  item.status === 'bought' ? 'border-green-300 bg-green-50' :
                  item.status === 'unavailable' ? 'border-red-300 bg-red-50' :
                  'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Status Buttons - Toggle Logic */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleItemStatus(item.id, 'bought')}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                        item.status === 'bought' 
                          ? 'bg-green-300 border-green-300 text-white' 
                          : 'border-green-300 bg-white text-green-300 hover:border-green-400'
                      }`}
                    >
                      <span className="text-lg">✓</span>
                    </button>
                    <button
                      onClick={() => toggleItemStatus(item.id, 'unavailable')}
                      className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors ${
                        item.status === 'unavailable' 
                          ? 'bg-red-300 border-red-300 text-white' 
                          : 'border-red-300 bg-white text-red-300 hover:border-red-400'
                      }`}
                    >
                      <span className="text-lg">✗</span>
                    </button>
                  </div>

                  {/* Item Name */}
                  <div className="flex-1">
                    {editingItemId === item.id ? (
                      <input
                        type="text"
                        value={editingItemName}
                        onChange={(e) => setEditingItemName(e.target.value)}
                        onBlur={saveEditItem}
                        onKeyPress={(e) => e.key === 'Enter' && saveEditItem()}
                        className="w-full bg-transparent border-b border-green-300 focus:outline-none focus:border-green-500 text-gray-900"
                        autoFocus
                      />
                    ) : (
                      <span
                        className={`block ${
                          item.status === 'bought' ? 'line-through text-gray-500' :
                          item.status === 'unavailable' ? 'text-red-600' :
                          'text-gray-800'
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditItem(item)}
                      className="text-gray-400 hover:text-green-600 p-2 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-gray-400 hover:text-red-600 p-2 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Status Legend */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-4 border border-gray-100">
          <h3 className="font-semibold mb-3 text-gray-700">Status Legend:</h3>
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 border-2 border-gray-300 bg-white rounded-full flex items-center justify-center text-gray-400 text-sm">—</div>
              <span className="text-gray-700">Pending (default)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center text-white text-sm">✓</div>
              <span className="text-gray-700">Bought (toggle)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center text-white text-sm">✗</div>
              <span className="text-gray-700">Unavailable (toggle)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 