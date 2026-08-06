'use client';

import React, { createContext, useContext, useState } from 'react';

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
  const [isPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0);
  const [activeTrackName, setActiveTrackName] = useState('Silent Mode');

  // Deactivated silent no-op functions
  const togglePlay = () => {};
  const setVolume = (val: number) => { setVolumeState(val); };
  const playSteamSound = () => {};

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
