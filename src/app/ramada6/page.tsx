'use client';

import { useState, useEffect } from 'react';
import RamadaLayout from '@/components/RamadaLayout';

export default function Ramada6Page() {
  const [topic, setTopic] = useState('ramada6');
  const [info, setInfo] = useState('Space to add info');

  useEffect(() => {
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      if (topics[6]) {
        setTopic(topics[6]);
      }
    }
    
    const savedInfos = localStorage.getItem('ramadaInfos');
    if (savedInfos) {
      const infos = JSON.parse(savedInfos);
      if (infos[6]) {
        setInfo(infos[6]);
      }
    }
  }, []);

  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
    const savedTopics = localStorage.getItem('ramadaTopics');
    const topics = savedTopics ? JSON.parse(savedTopics) : {};
    topics[6] = newTopic;
    localStorage.setItem('ramadaTopics', JSON.stringify(topics));
  };

  const handleInfoChange = (newInfo: string) => {
    setInfo(newInfo);
    const savedInfos = localStorage.getItem('ramadaInfos');
    const infos = savedInfos ? JSON.parse(savedInfos) : {};
    infos[6] = newInfo;
    localStorage.setItem('ramadaInfos', JSON.stringify(infos));
  };

  return (
    <RamadaLayout 
      topic={topic} 
      info={info}
      onTopicChange={handleTopicChange}
      onInfoChange={handleInfoChange}
      isEditable={true}
    />
  );
}
