"use client";

import React, { useState, useRef, useEffect } from 'react';
import { usePlayGrid } from '@/context/PlayGridContext';
import { MapPin, Search, Wallet, User, Gamepad2, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { mode, setMode, walletBalance, selectedCity, setSelectedCity } = usePlayGrid();
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const cities = ['Bengaluru', 'Mumbai', 'Chennai', 'Delhi', 'Hyderabad'];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsCityDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800 px-4 py-3 sm:px-6 lg:px-8 bg-zinc-950/80 backdrop-blur-xl">
      <div className="flex items-center justify-between max-w-7xl mx-auto">

        {/* Left Side: Logo & City */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer transition-transform hover:scale-105">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 overflow-hidden">
              <Gamepad2 className="h-6 w-6 text-white relative z-10" />
              <div className="absolute inset-0 bg-white/20 blur-md rounded-full -top-2 -left-2 w-6 h-6"></div>
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">
              PlayGrid
            </span>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-700 hover:border-violet-500"
            >
              <MapPin className="h-4 w-4 text-violet-400" />
              <span className="max-w-[80px] sm:max-w-none truncate">{selectedCity}</span>
              <ChevronDown className={`h-3 w-3 transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isCityDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-12 left-0 w-52 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl shadow-black/50 overflow-hidden py-1.5 z-50"
                >
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2.5 ${
                        selectedCity === city
                          ? 'bg-violet-600/20 text-violet-300 font-medium'
                          : 'text-zinc-300 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <MapPin className={`h-3.5 w-3.5 ${selectedCity === city ? 'text-violet-400' : 'text-zinc-500'}`} />
                      {city}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center: Global Search (Only in Gamer Mode) */}
        {mode === 'GAMER' && (
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-violet-400 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search hubs, games, or consoles..."
              className="block w-full rounded-full border border-zinc-700 bg-zinc-800/80 py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
            />
          </div>
        )}

        {/* Right Side: Mode Switcher & Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => setMode(mode === 'GAMER' ? 'PARTNER' : 'GAMER')}
            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              mode === 'GAMER'
                ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-amber-500 hover:text-amber-300'
                : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-violet-500 hover:text-violet-300'
            }`}
          >
            {mode === 'GAMER' ? (
              <><ShieldCheck className="h-3.5 w-3.5 text-amber-400" /> Partner</>
            ) : (
              <><Gamepad2 className="h-3.5 w-3.5 text-violet-400" /> Gamer</>
            )}
          </button>

          <div className="flex items-center gap-2 bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-700">
            <Wallet className="h-4 w-4 text-cyan-400" />
            <span className="text-sm font-medium text-white">₹{walletBalance}</span>
          </div>

          <button className="h-9 w-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center hover:border-violet-500 transition-colors">
            <User className="h-4 w-4 text-zinc-400" />
          </button>
        </div>
      </div>
    </header>
  );
}
