'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface RamadaPage {
  id: number;
  topic: string;
  url: string;
}

interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export default function HomePage() {
  const [ramadaPages, setRamadaPages] = useState<RamadaPage[]>([
    { id: 1, topic: 'ramada1', url: '/ramada1' },
    { id: 2, topic: 'ramada2', url: '/ramada2' },
    { id: 3, topic: 'ramada3', url: '/ramada3' },
    { id: 4, topic: 'ramada4', url: '/ramada4' },
    { id: 5, topic: 'ramada5', url: '/ramada5' },
    { id: 6, topic: 'ramada6', url: '/ramada6' },
    { id: 7, topic: 'ramada7', url: '/ramada7' },
  ]);
  const [newPageName, setNewPageName] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: 'contact@ramadaplaza.com',
    phone: '+1-234-567-8900',
    address: '123 Ramada Street, Plaza City, PC 12345'
  });

  useEffect(() => {
    // Load saved topics from localStorage
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      setRamadaPages((prev: RamadaPage[]) => 
        prev.map((page: RamadaPage) => ({
          ...page,
          topic: topics[page.id] || page.topic
        }))
      );
    }
    
    // Load custom pages from localStorage
    const customPages = localStorage.getItem('customRamadaPages');
    if (customPages) {
      const pages = JSON.parse(customPages);
      setRamadaPages((prev: RamadaPage[]) => [...prev, ...pages]);
    }
    
    // Load contact info from localStorage
    const savedContact = localStorage.getItem('ramadaContact');
    if (savedContact) {
      const contact = JSON.parse(savedContact);
      setContactInfo(contact);
    }
  }, []);

  const generateNextId = () => {
    const existingIds = ramadaPages.map(page => page.id);
    let nextId = Math.max(...existingIds, 0) + 1;
    while (existingIds.includes(nextId)) {
      nextId++;
    }
    return nextId;
  };

  const generatePageName = (baseName: string) => {
    const existingNames = ramadaPages.map(page => page.topic.toLowerCase());
    let counter = 1;
    let newName = baseName;
    
    while (existingNames.includes(newName.toLowerCase())) {
      newName = `${baseName}${counter}`;
      counter++;
    }
    
    return newName;
  };

  const addNewPage = () => {
    if (!newPageName.trim()) return;
    
    const nextId = generateNextId();
    const pageName = generatePageName(newPageName.trim());
    const url = `/${pageName}`;
    
    const newPage: RamadaPage = {
      id: nextId,
      topic: pageName,
      url: url
    };
    
    // Update state
    setRamadaPages(prev => [...prev, newPage]);
    
    // Save to localStorage for custom pages
    const customPages = ramadaPages.filter(page => page.id > 7);
    const updatedCustomPages = [...customPages, newPage];
    localStorage.setItem('customRamadaPages', JSON.stringify(updatedCustomPages));
    
    // Initialize topic in localStorage
    const savedTopics = localStorage.getItem('ramadaTopics') || '{}';
    const topics = JSON.parse(savedTopics);
    topics[nextId] = pageName;
    localStorage.setItem('ramadaTopics', JSON.stringify(topics));
    
    // Reset and close dialog
    setNewPageName('');
    setShowAddDialog(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 pb-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Ramada Projects
        </h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ramadaPages.map((page: RamadaPage) => (
            <Link
              key={page.id}
              href={page.url}
              className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
            >
              <div className="text-2xl font-semibold text-blue-600 mb-2">
                {page.topic}
              </div>
              <div className="text-sm text-gray-500">
                Page {page.id}
              </div>
            </Link>
          ))}
          
          {/* Add New Page Button */}
          <button
            onClick={() => setShowAddDialog(true)}
            className="block p-6 bg-green-500 rounded-lg shadow-md hover:shadow-lg hover:bg-green-600 transition-colors text-center text-white"
          >
            <div className="text-3xl font-bold mb-2">+</div>
            <div className="text-sm">Add New Page</div>
          </button>
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p className="mb-4">Click on any Ramada page to view it.</p>
          <p className="text-sm">
            You can edit the topic name on each individual page, and it will be reflected here.
          </p>
        </div>
      </div>
      
      {/* Add Page Dialog */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-w-full mx-4">
            <h2 className="text-xl font-bold mb-4">Add New Ramada Page</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Name
              </label>
              <input
                type="text"
                value={newPageName}
                onChange={(e) => setNewPageName(e.target.value)}
                placeholder="e.g., ramada8 or mypage"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onKeyPress={(e) => e.key === 'Enter' && addNewPage()}
              />
              <p className="text-xs text-gray-500 mt-1">
                If the name exists, a number will be added automatically
              </p>
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowAddDialog(false);
                  setNewPageName('');
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={addNewPage}
                disabled={!newPageName.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Add Page
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* RamadaPlaza Contact Box */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-bold text-lg mb-2">RamadaPlaza Contact</h3>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
            <span> Email: {contactInfo.email}</span>
            <span> Phone: {contactInfo.phone}</span>
            <span> Address: {contactInfo.address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
