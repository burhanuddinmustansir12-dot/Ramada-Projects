'use client';

import { useState, useEffect, useCallback } from 'react';
import RamadaLayout from '@/components/RamadaLayout';

export default function Ramada1Page() {
  const [topic, setTopic] = useState('ramada1');
  const [title, setTitle] = useState('Annual Gala Dinner');
  const [time, setTime] = useState('7:00 PM - 11:00 PM');
  const [venue, setVenue] = useState('Grand Ballroom, Ramada Plaza');

  useEffect(() => {
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      if (topics[1]) {
        setTopic(topics[1]);
      }
    }
    
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    if (savedEventDetails) {
      const details = JSON.parse(savedEventDetails);
      if (details[1]) {
        setTitle(details[1].title || 'Annual Gala Dinner');
        setTime(details[1].time || '7:00 PM - 11:00 PM');
        setVenue(details[1].venue || 'Grand Ballroom, Ramada Plaza');
      }
    }
  }, []);

  const handleTopicChange = useCallback((newTopic: string) => {
    if (newTopic !== topic) {
      setTopic(newTopic);
      const savedTopics = localStorage.getItem('ramadaTopics');
      const topics = savedTopics ? JSON.parse(savedTopics) : {};
      topics[1] = newTopic;
      localStorage.setItem('ramadaTopics', JSON.stringify(topics));
    }
  }, [topic]);

  const handleTitleChange = useCallback((newTitle: string) => {
    if (newTitle !== title) {
      setTitle(newTitle);
      const savedEventDetails = localStorage.getItem('ramadaEventDetails');
      const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
      if (!details[1]) details[1] = {};
      details[1].title = newTitle;
      localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
    }
  }, [title]);

  const handleTimeChange = useCallback((newTime: string) => {
    if (newTime !== time) {
      setTime(newTime);
      const savedEventDetails = localStorage.getItem('ramadaEventDetails');
      const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
      if (!details[1]) details[1] = {};
      details[1].time = newTime;
      localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
    }
  }, [time]);

  const handleVenueChange = useCallback((newVenue: string) => {
    if (newVenue !== venue) {
      setVenue(newVenue);
      const savedEventDetails = localStorage.getItem('ramadaEventDetails');
      const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
      if (!details[1]) details[1] = {};
      details[1].venue = newVenue;
      localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
    }
  }, [venue]);

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
