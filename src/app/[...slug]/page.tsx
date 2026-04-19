'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import RamadaLayout from '@/components/RamadaLayout';

export default function DynamicRamadaPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  
  const [topic, setTopic] = useState(slug || 'ramada');
  const [title, setTitle] = useState('Event Title');
  const [time, setTime] = useState('Event Time');
  const [venue, setVenue] = useState('Event Venue');

  useEffect(() => {
    // Generate a consistent ID based on the slug
    const generateId = (slug: string) => {
      let hash = 0;
      for (let i = 0; i < slug.length; i++) {
        const char = slug.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
      }
      return Math.abs(hash) + 1000; // Ensure positive and avoid conflicts with original pages
    };

    const pageId = generateId(slug || 'ramada');

    // Load saved topics from localStorage
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      if (topics[pageId]) {
        setTopic(topics[pageId]);
      }
    }
    
    // Load saved event details from localStorage
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    if (savedEventDetails) {
      const details = JSON.parse(savedEventDetails);
      if (details[pageId]) {
        setTitle(details[pageId].title || 'Event Title');
        setTime(details[pageId].time || 'Event Time');
        setVenue(details[pageId].venue || 'Event Venue');
      }
    }
  }, [slug]);

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    
    // Generate a consistent ID based on the slug
    const generateId = (slug: string) => {
      let hash = 0;
      for (let i = 0; i < slug.length; i++) {
        const char = slug.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash) + 1000;
    };

    const pageId = generateId(slug || 'ramada');
    
    const savedTopics = localStorage.getItem('ramadaTopics');
    const topics = savedTopics ? JSON.parse(savedTopics) : {};
    topics[pageId] = newTopic;
    localStorage.setItem('ramadaTopics', JSON.stringify(topics));
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    
    // Generate a consistent ID based on the slug
    const generateId = (slug: string) => {
      let hash = 0;
      for (let i = 0; i < slug.length; i++) {
        const char = slug.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash) + 1000;
    };

    const pageId = generateId(slug || 'ramada');
    
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[pageId]) details[pageId] = {};
    details[pageId].title = newTitle;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    
    // Generate a consistent ID based on the slug
    const generateId = (slug: string) => {
      let hash = 0;
      for (let i = 0; i < slug.length; i++) {
        const char = slug.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash) + 1000;
    };

    const pageId = generateId(slug || 'ramada');
    
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[pageId]) details[pageId] = {};
    details[pageId].time = newTime;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleVenueChange = (newVenue: string) => {
    setVenue(newVenue);
    
    // Generate a consistent ID based on the slug
    const generateId = (slug: string) => {
      let hash = 0;
      for (let i = 0; i < slug.length; i++) {
        const char = slug.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
      }
      return Math.abs(hash) + 1000;
    };

    const pageId = generateId(slug || 'ramada');
    
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[pageId]) details[pageId] = {};
    details[pageId].venue = newVenue;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  return (
    <RamadaLayout 
      topic={topic} 
      title={title}
      time={time}
      venue={venue}
      onTopicChange={handleTopicChange}
      onTitleChange={handleTitleChange}
      onTimeChange={handleTimeChange}
      onVenueChange={handleVenueChange}
      isEditable={true}
    />
  );
}
