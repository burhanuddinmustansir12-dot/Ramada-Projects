'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import RamadaLayout from '@/components/RamadaLayout';

export default function DynamicRamadaPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  
  const [topic, setTopic] = useState(slug || 'ramada');
  const [info, setInfo] = useState('Space to add info');

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
    
    // Load saved infos from localStorage
    const savedInfos = localStorage.getItem('ramadaInfos');
    if (savedInfos) {
      const infos = JSON.parse(savedInfos);
      if (infos[pageId]) {
        setInfo(infos[pageId]);
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

  const handleInfoChange = (newInfo: string) => {
    setInfo(newInfo);
    
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
    
    const savedInfos = localStorage.getItem('ramadaInfos');
    const infos = savedInfos ? JSON.parse(savedInfos) : {};
    infos[pageId] = newInfo;
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
