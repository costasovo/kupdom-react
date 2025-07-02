'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { GroceryItem, searchGroceryItems } from '@/lib/groceryItems';

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnter?: () => void;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

interface UserHistoryItem {
  name: string;
  count: number;
  lastUsed: number;
}

const USER_HISTORY_KEY = 'kupdom_user_history';
const MAX_HISTORY_ITEMS = 20;

export default function AutocompleteInput({
  value,
  onChange,
  onEnter,
  placeholder,
  disabled = false,
  className = ''
}: AutocompleteInputProps) {
  const params = useParams();
  const locale = params.locale as string || 'en';
  const t = useTranslations('Autocomplete');
  
  const [suggestions, setSuggestions] = useState<GroceryItem[]>([]);
  const [userHistory, setUserHistory] = useState<UserHistoryItem[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Load user history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_HISTORY_KEY);
      if (stored) {
        setUserHistory(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load user history:', error);
    }
  }, []);

  // Save user history to localStorage
  const saveUserHistory = useCallback((itemName: string) => {
    try {
      const updatedHistory = [...userHistory];
      const existingIndex = updatedHistory.findIndex(item => item.name.toLowerCase() === itemName.toLowerCase());
      
      if (existingIndex >= 0) {
        // Update existing item
        updatedHistory[existingIndex].count += 1;
        updatedHistory[existingIndex].lastUsed = Date.now();
      } else {
        // Add new item
        updatedHistory.push({
          name: itemName,
          count: 1,
          lastUsed: Date.now()
        });
      }
      
      // Sort by frequency and recency, keep only top items
      updatedHistory.sort((a, b) => {
        if (a.count !== b.count) return b.count - a.count;
        return b.lastUsed - a.lastUsed;
      });
      
      const trimmedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS);
      setUserHistory(trimmedHistory);
      localStorage.setItem(USER_HISTORY_KEY, JSON.stringify(trimmedHistory));
    } catch (error) {
      console.warn('Failed to save user history:', error);
    }
  }, [userHistory]);

  // Generate suggestions based on input and user history
  const generateSuggestions = useCallback((query: string) => {
    if (!query.trim()) {
      // Show user history when input is empty
      return userHistory.slice(0, 5).map(item => ({
        id: `history-${item.name}`,
        en: item.name,
        cs: item.name,
        category: 'history'
      }));
    }

    const searchResults = searchGroceryItems(query, locale);
    const historyMatches = userHistory
      .filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) &&
        !searchResults.some(result => result.en.toLowerCase() === item.name.toLowerCase())
      )
      .slice(0, 3)
      .map(item => ({
        id: `history-${item.name}`,
        en: item.name,
        cs: item.name,
        category: 'history'
      }));

    return [...historyMatches, ...searchResults].slice(0, 10);
  }, [userHistory, locale]);

  // Update suggestions when input changes
  useEffect(() => {
    const newSuggestions = generateSuggestions(value);
    setSuggestions(newSuggestions);
    setSelectedIndex(-1);
  }, [value, generateSuggestions]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter' && onEnter) {
        onEnter();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          selectSuggestion(suggestions[selectedIndex]);
        } else if (onEnter) {
          onEnter();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Handle suggestion selection
  const selectSuggestion = (suggestion: GroceryItem) => {
    const itemName = locale === 'cs' ? suggestion.cs : suggestion.en;
    onChange(itemName); // Prefill the input instead of calling onSelect
    setShowSuggestions(false);
    setSelectedIndex(-1);
    
    // Save to user history if it's not already a history item
    if (suggestion.category !== 'history') {
      saveUserHistory(itemName);
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(true);
  };

  // Handle input focus
  const handleFocus = () => {
    if (value.trim() || userHistory.length > 0) {
      setShowSuggestions(true);
    }
  };

  // Handle input blur
  const handleBlur = () => {
    // Delay hiding suggestions to allow for clicks
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 150);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: GroceryItem) => {
    selectSuggestion(suggestion);
  };

  return (
    <div className="relative flex-1">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-300 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 ${className}`}
      />
      
      {/* Suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => {
            const isSelected = index === selectedIndex;
            const isHistoryItem = suggestion.category === 'history';
            const displayName = locale === 'cs' ? suggestion.cs : suggestion.en;
            
            return (
              <div
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`px-3 py-2 cursor-pointer transition-colors ${
                  isSelected 
                    ? 'bg-green-100 text-green-800' 
                    : 'hover:bg-gray-50 text-gray-900'
                } ${isHistoryItem ? 'border-b border-gray-100' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex-1">{displayName}</span>
                  {isHistoryItem && (
                    <span className="text-xs text-gray-500 ml-2">
                      {t('history')}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
} 