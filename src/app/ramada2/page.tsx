'use client';

import { useState, useEffect } from 'react';
import RamadaLayout from '@/components/RamadaLayout';

export default function Ramada2Page() {
  const [topic, setTopic] = useState('ramada2');
  const [title, setTitle] = useState('Corporate Conference');
  const [time, setTime] = useState('9:00 AM - 5:00 PM');
  const [venue, setVenue] = useState('Conference Hall, Ramada Plaza');

  useEffect(() => {
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      if (topics[2]) {
        setTopic(topics[2]);
      }
    }
    
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    if (savedEventDetails) {
      const details = JSON.parse(savedEventDetails);
      if (details[2]) {
        setTitle(details[2].title || 'Corporate Conference');
        setTime(details[2].time || '9:00 AM - 5:00 PM');
        setVenue(details[2].venue || 'Conference Hall, Ramada Plaza');
      }
    }
  }, []);

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    const savedTopics = localStorage.getItem('ramadaTopics');
    const topics = savedTopics ? JSON.parse(savedTopics) : {};
    topics[2] = newTopic;
    localStorage.setItem('ramadaTopics', JSON.stringify(topics));
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[2]) details[2] = {};
    details[2].title = newTitle;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[2]) details[2] = {};
    details[2].time = newTime;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleVenueChange = (newVenue: string) => {
    setVenue(newVenue);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[2]) details[2] = {};
    details[2].venue = newVenue;
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
