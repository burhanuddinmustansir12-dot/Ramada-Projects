'use client';

import { useState, useEffect } from 'react';
import RamadaLayout from '@/components/RamadaLayout';

export default function Ramada5Page() {
  const [topic, setTopic] = useState('ramada5');
  const [title, setTitle] = useState('Birthday Party');
  const [time, setTime] = useState('4:00 PM - 10:00 PM');
  const [venue, setVenue] = useState('Party Hall, Ramada Plaza');

  useEffect(() => {
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      if (topics[5]) {
        setTopic(topics[5]);
      }
    }
    
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    if (savedEventDetails) {
      const details = JSON.parse(savedEventDetails);
      if (details[5]) {
        setTitle(details[5].title || 'Birthday Party');
        setTime(details[5].time || '4:00 PM - 10:00 PM');
        setVenue(details[5].venue || 'Party Hall, Ramada Plaza');
      }
    }
  }, []);

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    const savedTopics = localStorage.getItem('ramadaTopics');
    const topics = savedTopics ? JSON.parse(savedTopics) : {};
    topics[5] = newTopic;
    localStorage.setItem('ramadaTopics', JSON.stringify(topics));
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[5]) details[5] = {};
    details[5].title = newTitle;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[5]) details[5] = {};
    details[5].time = newTime;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleVenueChange = (newVenue: string) => {
    setVenue(newVenue);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[5]) details[5] = {};
    details[5].venue = newVenue;
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
