'use client';

import React, { useState, useEffect } from 'react';

interface RamadaLayoutProps {
  topic: string;
  title: string;
  time: string;
  venue: string;
  isEditable?: boolean;
  onTopicChange?: (topic: string) => void;
  onTitleChange?: (title: string) => void;
  onTimeChange?: (time: string) => void;
  onVenueChange?: (venue: string) => void;
}

export default function RamadaLayout({ 
  topic, 
  title = 'Event Title', 
  time = 'Event Time', 
  venue = 'Event Venue', 
  isEditable = false, 
  onTopicChange, 
  onTitleChange, 
  onTimeChange, 
  onVenueChange 
}: RamadaLayoutProps) {
  // State for editing
  const [currentTopic, setCurrentTopic] = useState(topic);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentTime, setCurrentTime] = useState(time);
  const [currentVenue, setCurrentVenue] = useState(venue);
  const [isEditing, setIsEditing] = useState(false);

  // Image slider states
  const [slider1Index, setSlider1Index] = useState(0);
  const [slider2Index, setSlider2Index] = useState(0);
  const [slider3Index, setSlider3Index] = useState(0);
  const [editingSlider, setEditingSlider] = useState<number | null>(null);
  const [dragOverSlider, setDragOverSlider] = useState<number | null>(null);
  
  const defaultSliderImages = [
    ['Image 1-1', 'Image 1-2', 'Image 1-3'],
    ['Image 2-1', 'Image 2-2', 'Image 2-3'],
    ['Image 3-1', 'Image 3-2', 'Image 3-3']
  ];
  
  const [sliderImages, setSliderImages] = useState(defaultSliderImages);

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (editingSlider !== null) return;
      
      setSlider1Index((prev) => (prev + 1) % 3);
      setSlider2Index((prev) => (prev + 1) % 3);
      setSlider3Index((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, [editingSlider]);

  // Sync props with state
  useEffect(() => {
    setCurrentTopic(topic);
    setCurrentTitle(title);
    setCurrentTime(time);
    setCurrentVenue(venue);
  }, [topic, title, time, venue]);

  // Global paste handler for image sliders
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      if (editingSlider !== null) {
        e.preventDefault();
        const items = e.clipboardData?.items;
        
        if (items) {
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
              const blob = item.getAsFile();
              if (blob) {
                const reader = new FileReader();
                reader.onload = (e) => {
                  const result = e.target?.result as string;
                  const newImages = [...sliderImages];
                  const currentIndex = editingSlider === 0 ? slider1Index : editingSlider === 1 ? slider2Index : slider3Index;
                  newImages[editingSlider][currentIndex] = result;
                  setSliderImages(newImages);
                };
                reader.readAsDataURL(blob);
              }
            }
          }
        }
      }
    };

    if (editingSlider !== null) {
      document.addEventListener('paste', handleGlobalPaste);
      return () => {
        document.removeEventListener('paste', handleGlobalPaste);
      };
    }
  }, [editingSlider, slider1Index, slider2Index, slider3Index, setSliderImages]);

  // Image handling functions
  const handleImageUpload = (sliderIndex: number, imageIndex: number, file: File | string) => {
    const reader = new FileReader();
    
    if (typeof file === 'string') {
      const newImages = [...sliderImages];
      newImages[sliderIndex][imageIndex] = file;
      setSliderImages(newImages);
    } else {
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const newImages = [...sliderImages];
        newImages[sliderIndex][imageIndex] = result;
        setSliderImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e: React.ClipboardEvent, sliderIndex: number, imageIndex: number) => {
    e.preventDefault();
    const items = e.clipboardData?.items;
    
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf('image') !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            handleImageUpload(sliderIndex, imageIndex, blob);
          }
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent, sliderIndex: number, imageIndex: number) => {
    e.preventDefault();
    setDragOverSlider(null);
    
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.indexOf('image') !== -1) {
        handleImageUpload(sliderIndex, imageIndex, file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent, sliderIndex: number) => {
    e.preventDefault();
    setDragOverSlider(sliderIndex);
  };

  const handleDragLeave = () => {
    setDragOverSlider(null);
  };

  const handleRemoveImage = (sliderIndex: number, imageIndex: number) => {
    const defaultImages = ['Image 1-1', 'Image 1-2', 'Image 1-3', 'Image 2-1', 'Image 2-2', 'Image 2-3', 'Image 3-1', 'Image 3-2', 'Image 3-3'];
    const defaultImage = defaultImages[sliderIndex * 3 + imageIndex];
    const newImages = [...sliderImages];
    newImages[sliderIndex][imageIndex] = defaultImage;
    setSliderImages(newImages);
  };

  // Contact editing states
  const [editingContact, setEditingContact] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    email: 'contact@ramadaplaza.com',
    phone: '+1-234-567-8900',
    address: '123 Ramada Street, Plaza City'
  });

  useEffect(() => {
    const savedContact = localStorage.getItem('ramadaContact');
    if (savedContact) {
      const contact = JSON.parse(savedContact);
      setContactInfo(contact);
    }
  }, []);

  const handleContactEdit = () => {
    setEditingContact(true);
  };

  const handleContactSave = () => {
    localStorage.setItem('ramadaContact', JSON.stringify(contactInfo));
    setEditingContact(false);
  };

  const handleContactCancel = () => {
    const savedContact = localStorage.getItem('ramadaContact');
    if (savedContact) {
      const contact = JSON.parse(savedContact);
      setContactInfo(contact);
    } else {
      setContactInfo({
        email: 'contact@ramadaplaza.com',
        phone: '+1-234-567-8900',
        address: '123 Ramada Street, Plaza City'
      });
    }
    setEditingContact(false);
  };

  return (
    <>
      {/* RED NEWS BAR */}
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-3 z-50 overflow-hidden">
        <div className="relative h-8 flex items-center">
          <div className="absolute whitespace-nowrap animate-scroll-text">
            <span className="text-lg font-bold">
              Ramada Plaza-Karachi By Wyndham-Live Events &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              Ramada Plaza-Karachi By Wyndham-Live Events &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen bg-white p-8 pb-28 pt-20">
        
        {/* MAIN CONTENT */}
        <div className="flex gap-8">
          
          {/* LEFT SIDE - Image sliders */}
          <div className="flex flex-col gap-4">
            {[0, 1, 2].map((sliderIndex) => {
              const currentIndex = sliderIndex === 0 ? slider1Index : sliderIndex === 1 ? slider2Index : slider3Index;
              const currentImage = sliderImages[sliderIndex][currentIndex];
              
              return (
                <div
                  key={`slider-${sliderIndex}`}
                  className={`w-32 h-32 bg-blue-500 rounded-lg flex items-center justify-center text-white text-sm relative overflow-hidden cursor-pointer ${
                    dragOverSlider === sliderIndex ? 'ring-2 ring-green-500' : ''
                  } ${editingSlider === sliderIndex ? 'ring-2 ring-yellow-500' : ''}`}
                  onDragOver={(e) => handleDragOver(e, sliderIndex)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, sliderIndex, currentIndex)}
                  onPaste={(e) => handlePaste(e, sliderIndex, currentIndex)}
                  onClick={() => isEditable && setEditingSlider(editingSlider === sliderIndex ? null : sliderIndex)}
                >
                  {/* Image display */}
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-500">
                    {currentImage.startsWith('data:') ? (
                      <img 
                        src={currentImage} 
                        alt={`Slider ${sliderIndex + 1} Image ${currentIndex + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-xs text-center px-2">{currentImage}</span>
                    )}
                  </div>
                  
                  {/* Edit indicator */}
                  {isEditable && (
                    <div className="absolute top-1 right-1 flex gap-1">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      {currentImage.startsWith('data:') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(sliderIndex, currentIndex);
                          }}
                          className="w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center hover:bg-red-600"
                          title="Remove image"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  )}
                  
                  {/* Dots indicator */}
                  <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
                    {sliderImages[sliderIndex].map((_, index) => (
                      <div
                        key={index}
                        className={`w-1 h-1 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}
                      />
                    ))}
                  </div>
                  
                  {/* Edit mode overlay */}
                  {editingSlider === sliderIndex && (
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-2">
                      <p className="text-xs mb-1 text-center">Drop image here</p>
                      <p className="text-xs mb-1 text-center">or paste (Ctrl+V)</p>
                      <p className="text-xs mb-2 text-center">Click to close</p>
                      
                      {/* Remove button */}
                      {currentImage.startsWith('data:') && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveImage(sliderIndex, currentIndex);
                          }}
                          className="px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                        >
                          Remove Image
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CENTER CONTENT */}
          <div className="flex-1 bg-blue-500 rounded-2xl p-8 text-white text-center relative max-w-full overflow-hidden">
            
            {isEditable && isEditing ? (
              <div className="flex flex-col items-center gap-4 mt-8">
                <input
                  value={currentTopic}
                  onChange={(e) => {
                    setCurrentTopic(e.target.value);
                    onTopicChange?.(e.target.value);
                  }}
                  className="px-4 py-2 rounded text-black text-center font-bold text-lg"
                  placeholder="Topic"
                />
                <input
                  value={currentTitle}
                  onChange={(e) => {
                    setCurrentTitle(e.target.value);
                    onTitleChange?.(e.target.value);
                  }}
                  className="px-4 py-2 rounded text-black text-center w-full max-w-md"
                  placeholder="Event Title"
                />
                <input
                  value={currentTime}
                  onChange={(e) => {
                    setCurrentTime(e.target.value);
                    onTimeChange?.(e.target.value);
                  }}
                  className="px-4 py-2 rounded text-black text-center w-full max-w-md"
                  placeholder="Event Time"
                />
                <input
                  value={currentVenue}
                  onChange={(e) => {
                    setCurrentVenue(e.target.value);
                    onVenueChange?.(e.target.value);
                  }}
                  className="px-4 py-2 rounded text-black text-center w-full max-w-md"
                  placeholder="Event Venue"
                />
                <button
                  onClick={() => {
                    setIsEditing(false);
                  }}
                  className="px-4 py-1 bg-green-600 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-between mt-8 space-y-6">
                <h1 className="text-2xl font-bold">{currentTopic}</h1>
                
                <div className="flex-1 flex flex-col justify-center space-y-8">
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-2">Title</h3>
                    <p className="text-white break-words overflow-wrap-anywhere text-center px-2">
                      {currentTitle}
                    </p>
                  </div>
                  
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-2">Time</h3>
                    <p className="text-white break-words overflow-wrap-anywhere text-center px-2">
                      {currentTime}
                    </p>
                  </div>
                  
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <h3 className="text-lg font-semibold mb-2">Venue</h3>
                    <p className="text-white break-words overflow-wrap-anywhere text-center px-2">
                      {currentVenue}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FLOATING EDIT BUTTON */}
      {isEditable && !isEditing && (
        <div className="fixed bottom-28 right-8 z-20">
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600"
          >
            Edit Event Details
          </button>
        </div>
      )}

      {/* RED FOOTER WITH EDIT */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 text-center z-50 shadow-lg relative">
        {/* Edit button - clearly visible */}
        {isEditable && (
          <button
            onClick={handleContactEdit}
            className="absolute top-1 right-1 px-2 py-1 bg-red-800 hover:bg-red-900 rounded text-white text-xs font-medium transition-all duration-200"
            title="Edit contact info"
          >
            Edit
          </button>
        )}
        
        <div className="max-w-4xl mx-auto">
          {editingContact ? (
            <div className="space-y-2">
              <h3 className="font-bold text-lg mb-2">Edit RamadaPlaza Contact</h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-sm">
                <input
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
                  placeholder="Email"
                  className="px-2 py-1 rounded text-black text-xs w-32"
                />
                <input
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({...contactInfo, phone: e.target.value})}
                  placeholder="Phone"
                  className="px-2 py-1 rounded text-black text-xs w-32"
                />
                <input
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({...contactInfo, address: e.target.value})}
                  placeholder="Address"
                  className="px-2 py-1 rounded text-black text-xs w-48"
                />
              </div>
              <div className="flex gap-2 justify-center mt-2">
                <button
                  onClick={handleContactSave}
                  className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                >
                  Save
                </button>
                <button
                  onClick={handleContactCancel}
                  className="px-3 py-1 bg-red-800 text-white text-xs rounded hover:bg-red-900"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-lg mb-2">RamadaPlaza Contact</h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
                <span>Email: {contactInfo.email}</span>
                <span>Phone: {contactInfo.phone}</span>
                <span>Address: {contactInfo.address}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
