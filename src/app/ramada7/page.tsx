'use client';

import { useState, useEffect } from 'react';
import RamadaLayout from '@/components/RamadaLayout';

export default function Ramada7Page() {
  const [topic, setTopic] = useState('ramada7');
  const [title, setTitle] = useState('Charity Fundraiser');
  const [time, setTime] = useState('5:00 PM - 9:00 PM');
  const [venue, setVenue] = useState('Banquet Hall, Ramada Plaza');

  useEffect(() => {
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      if (topics[7]) {
        setTopic(topics[7]);
      }
    }
    
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    if (savedEventDetails) {
      const details = JSON.parse(savedEventDetails);
      if (details[7]) {
        setTitle(details[7].title || 'Charity Fundraiser');
        setTime(details[7].time || '5:00 PM - 9:00 PM');
        setVenue(details[7].venue || 'Banquet Hall, Ramada Plaza');
      }
    }
  }, []);

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    const savedTopics = localStorage.getItem('ramadaTopics');
    const topics = savedTopics ? JSON.parse(savedTopics) : {};
    topics[7] = newTopic;
    localStorage.setItem('ramadaTopics', JSON.stringify(topics));
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[7]) details[7] = {};
    details[7].title = newTitle;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[7]) details[7] = {};
    details[7].time = newTime;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleVenueChange = (newVenue: string) => {
    setVenue(newVenue);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[7]) details[7] = {};
    details[7].venue = newVenue;
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
