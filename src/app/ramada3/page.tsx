'use client';

import { useState, useEffect } from 'react';
import RamadaLayout from '@/components/RamadaLayout';

export default function Ramada3Page() {
  const [topic, setTopic] = useState('ramada3');
  const [title, setTitle] = useState('Wedding Reception');
  const [time, setTime] = useState('6:00 PM - 12:00 AM');
  const [venue, setVenue] = useState('Grand Ballroom, Ramada Plaza');

  useEffect(() => {
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      if (topics[3]) {
        setTopic(topics[3]);
      }
    }
    
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    if (savedEventDetails) {
      const details = JSON.parse(savedEventDetails);
      if (details[3]) {
        setTitle(details[3].title || 'Wedding Reception');
        setTime(details[3].time || '6:00 PM - 12:00 AM');
        setVenue(details[3].venue || 'Grand Ballroom, Ramada Plaza');
      }
    }
  }, []);

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    const savedTopics = localStorage.getItem('ramadaTopics');
    const topics = savedTopics ? JSON.parse(savedTopics) : {};
    topics[3] = newTopic;
    localStorage.setItem('ramadaTopics', JSON.stringify(topics));
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[3]) details[3] = {};
    details[3].title = newTitle;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleTimeChange = (newTime: string) => {
    setTime(newTime);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[3]) details[3] = {};
    details[3].time = newTime;
    localStorage.setItem('ramadaEventDetails', JSON.stringify(details));
  };

  const handleVenueChange = (newVenue: string) => {
    setVenue(newVenue);
    const savedEventDetails = localStorage.getItem('ramadaEventDetails');
    const details = savedEventDetails ? JSON.parse(savedEventDetails) : {};
    if (!details[3]) details[3] = {};
    details[3].venue = newVenue;
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
