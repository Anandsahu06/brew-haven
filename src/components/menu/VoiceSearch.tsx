'use client';

import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

interface VoiceSearchProps {
  onSearchResult: (text: string) => void;
}

export const VoiceSearch: React.FC<VoiceSearchProps> = ({ onSearchResult }) => {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Voice search is not supported on this browser. Try typing in the search bar!');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onSearchResult(transcript);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <button
      type="button"
      onClick={startListening}
      title={isListening ? 'Listening for coffee query...' : 'Voice Search Menu'}
      className={`p-2 rounded-full border transition-all ${
        isListening
          ? 'bg-red-500/20 border-red-500 text-red-500 animate-pulse'
          : 'bg-bg-surface border-border-subtle text-txt-muted hover:text-gold'
      }`}
    >
      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </button>
  );
};
