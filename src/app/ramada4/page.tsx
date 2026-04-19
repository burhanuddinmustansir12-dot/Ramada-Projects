'use client';

import { useState, useEffect } from 'react';
import RamadaLayout from '@/components/RamadaLayout';

export default function Ramada4Page() {
  const [topic, setTopic] = useState('ramada4');
  const [title, setTitle] = useState('Birthday Party');
  const [time, setTime] = useState('3:00 PM - 8:00 PM');
  const [venue, setVenue] = useState('Party Room B');

  useEffect(() => {
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      if (topics[4]) {
        setTopic(topics[4]);
      }
    }
    
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    if (savedEventDetails) {
      const details = JSON.parse(savedEventDetails);
      if (details[4]) {
        setTitle(details[4].title || 'Birthday Party');
        setTime(details[4].time || '3:00 PM - 8:00 PM');
        setVenue(details[4].venue || 'Party Room B');
      }
    }
  }, []);

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    const savedTopics = localStorage.getItem('ramadaTopics');
    const topics = savedTopics ? JSON.parse(savedTopics) : {};
    topics[4] = newTopic;
    localStorage.setItem('ramadaTopics', JSON.stringify(topics));
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[4]) details[4] = {};
    details[4].title = newTitle;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[4]) details[4] = {};
    details[4].time = newTime;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleVenueChange = (newVenue: string) => {
    setVenue(newVenue);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[4]) details[4] = {};
    details[4].venue = newVenue;
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
