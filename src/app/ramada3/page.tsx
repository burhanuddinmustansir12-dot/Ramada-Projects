'use client';

import { useState, useEffect } from 'react';
import RamadaLayout from '@/components/RamadaLayout';

export default function Ramada3Page() {
  const [topic, setTopic] = useState('ramada3');
  const [info, setInfo] = useState('Space to add info');

  useEffect(() => {
    const savedTopics = localStorage.getItem('ramadaTopics');
    if (savedTopics) {
      const topics = JSON.parse(savedTopics);
      if (topics[3]) {
        setTopic(topics[3]);
      }
    }
    
    const savedInfos = localStorage.getItem('ramadaInfos');
    if (savedInfos) {
      const infos = JSON.parse(savedInfos);
      if (infos[3]) {
        setInfo(infos[3]);
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

  const handleInfoChange = (newInfo: string) => {
    setInfo(newInfo);
    const savedInfos = localStorage.getItem('ramadaInfos');
    const infos = savedInfos ? JSON.parse(savedInfos) : {};
    infos[3] = newInfo;
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
