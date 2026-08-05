'use client';

import React, { createContext, useContext, useState } from 'react';
import { audioSynth } from '@/lib/audioSynth';

interface SoundscapeContextType {
  isPlaying: boolean;
  togglePlay: () => void;
  volume: number;
  setVolume: (val: number) => void;
  playSteamSound: () => void;
  activeTrackName: string;
  setActiveTrackName: (name: string) => void;
}

const SoundscapeContext = createContext<SoundscapeContextType | undefined>(undefined);

export const SoundscapeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [activeTrackName, setActiveTrackName] = useState('Rain & Espresso Lounge');

  const togglePlay = () => {
    if (isPlaying) {
      audioSynth.stopSoundscape();
      setIsPlaying(false);
    } else {
      audioSynth.startSoundscape();
      audioSynth.setVolume(volume);
      setIsPlaying(true);
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    audioSynth.setVolume(val);
  };

  const playSteamSound = () => {
    audioSynth.toggleSteamBurst();
  };

  return (
    <SoundscapeContext.Provider
      value={{
        isPlaying,
        togglePlay,
        volume,
        setVolume,
        playSteamSound,
        activeTrackName,
        setActiveTrackName,
      }}
    >
      {children}
    </SoundscapeContext.Provider>
  );
};

export const useSoundscape = () => {
  const context = useContext(SoundscapeContext);
  if (!context) {
    throw new Error('useSoundscape must be used within a SoundscapeProvider');
  }
  return context;
};
