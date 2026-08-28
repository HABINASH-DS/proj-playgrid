"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type PlayGridMode = 'GAMER' | 'PARTNER';

interface PlayGridContextType {
  mode: PlayGridMode;
  setMode: (mode: PlayGridMode) => void;
  walletBalance: number;
  setWalletBalance: (balance: number) => void;
  selectedCity: string;
  setSelectedCity: (city: string) => void;
}

const PlayGridContext = createContext<PlayGridContextType | undefined>(undefined);

export const PlayGridProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<PlayGridMode>('GAMER');
  const [walletBalance, setWalletBalance] = useState(1250); // initial fake balance
  const [selectedCity, setSelectedCity] = useState('Bengaluru');

  return (
    <PlayGridContext.Provider value={{
      mode, setMode,
      walletBalance, setWalletBalance,
      selectedCity, setSelectedCity
    }}>
      {children}
    </PlayGridContext.Provider>
  );
};

export const usePlayGrid = () => {
  const context = useContext(PlayGridContext);
  if (context === undefined) {
    throw new Error('usePlayGrid must be used within a PlayGridProvider');
  }
  return context;
};
