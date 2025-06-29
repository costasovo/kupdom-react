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
    if (!newItemName.trim()) return;
    
    try {
      const response = await fetch(`/api/lists/${code}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newItemName.trim() }),
      });

      if (response.ok) {
        setNewItemName('');
        fetchList();
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const toggleItemStatus = async (itemId: number, status: 'bought' | 'unavailable') => {
    try {
      // Get current item to check its status
      const currentItem = list?.items.find(item => item.id === itemId);
      if (!currentItem) return;

      let newStatus: 'pending' | 'bought' | 'unavailable';
      
      if (status === 'bought') {
        // If currently bought, set to pending. If currently unavailable, set to bought. If pending, set to bought.
        newStatus = currentItem.status === 'bought' ? 'pending' : 'bought';
      } else if (status === 'unavailable') {
        // If currently unavailable, set to pending. If currently bought, set to unavailable. If pending, set to unavailable.
        newStatus = currentItem.status === 'unavailable' ? 'pending' : 'unavailable';
      } else {
        newStatus = 'pending';
      }

      await fetch(`/api/items/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchList();
    } catch (error) {
      console.error('Error updating item status:', error);
    }
  };

  const startEditItem = (item: ShoppingItem) => {
    setEditingItemId(item.id);
    setEditingItemName(item.name);
  };

  const saveEditItem = async () => {
    if (!editingItemId || !editingItemName.trim()) return;
    
    try {
      await fetch(`/api/items/${editingItemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingItemName.trim() }),
      });
      setEditingItemId(null);
      setEditingItemName('');
      fetchList();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (itemId: number) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      await fetch(`/api/items/${itemId}`, { method: 'DELETE' });
      fetchList();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const updateTitle = async () => {
    if (!list || !editingTitle) return;
    
    try {
      await fetch(`/api/lists/${code}/title`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: list.title }),
      });
      setEditingTitle(false);
    } catch (error) {
      console.error('Error updating title:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addItem();
    }
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
                  className="text-lg font-semibold text-center bg-transparent border-b border-green-300 focus:outline-none focus:border-green-500"
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
            <div className="w-8"></div>
          </div>
        </div>
      </div>

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
              className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent bg-white"
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
                        className="w-full bg-transparent border-b border-green-300 focus:outline-none focus:border-green-500"
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
                      className="text-gray-400 hover:text-green-600 p-2 text-xl"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="text-gray-400 hover:text-red-600 p-2 text-xl"
                    >
                      🗑️
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
              <span>Pending (default)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-300 rounded-full flex items-center justify-center text-white text-sm">✓</div>
              <span>Bought (toggle)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-300 rounded-full flex items-center justify-center text-white text-sm">✗</div>
              <span>Unavailable (toggle)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 