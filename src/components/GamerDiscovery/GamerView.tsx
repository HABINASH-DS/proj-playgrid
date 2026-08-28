"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Filter, Crown } from 'lucide-react';
import { MOCK_HUBS, MOCK_GAMES } from '@/lib/mockData';
import { Hub } from '@/lib/types';
import { HubCard } from './HubCard';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

interface GamerViewProps {
  onBookSlot: (hub: Hub) => void;
}

export function GamerView({ onBookSlot }: GamerViewProps) {
  const [distanceVal, setDistanceVal] = useState(10);
  const [selectedConsole, setSelectedConsole] = useState<string | null>(null);

  // Filter hubs strictly for mock purposes
  const filteredHubs = MOCK_HUBS.filter(hub => hub.distanceKm <= distanceVal && (!selectedConsole || hub.consoles.some(c => c.type === selectedConsole)));

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 sm:py-20 lg:py-24 rounded-3xl mb-12 glass-panel border border-color-border/50 mx-4 sm:mx-6 lg:mx-8 mt-6">
        <div className="absolute inset-0 bg-gradient-to-br from-color-primary/10 to-color-secondary/5 z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="primary" className="mb-4 text-sm px-4 py-1.5 backdrop-blur-md bg-color-primary/20 border-color-primary/50">
              <Crown className="w-4 h-4 mr-2" />
              Pro Gaming Experience
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Level Up Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-color-primary to-color-secondary">Free Time</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg text-color-muted mb-10">
              Find premium PS5 lounges near you. Book consoles instantly, order snacks, and jump straight into the action. No waiting lines.
            </p>

            {/* Quick Filter Bubbles */}
            <div className="flex flex-wrap justify-center gap-3">
              {['PS5 Pro', 'PS5', 'PS VR2', 'Xbox Series X'].map((cons) => (
                <button
                  key={cons}
                  onClick={() => setSelectedConsole(selectedConsole === cons ? null : cons)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg border ${
                    selectedConsole === cons
                      ? 'bg-gradient-to-r from-color-primary to-color-secondary text-white border-transparent'
                      : 'bg-color-elevated text-color-muted border-color-border hover:border-color-primary/50 hover:text-white'
                  }`}
                >
                  {cons}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-4 gap-8 pb-20">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1 space-y-8">
          <div className="glass p-6 rounded-2xl border border-color-border sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-lg font-semibold">
              <SlidersHorizontal className="w-5 h-5 text-color-primary" />
              Filters
            </div>

            {/* Distance Slider */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-3">
                <span className="text-color-muted">Distance</span>
                <span className="font-medium text-color-secondary">Up to {distanceVal} km</span>
              </div>
              <input
                type="range"
                min="1" max="25"
                value={distanceVal}
                onChange={(e) => setDistanceVal(parseInt(e.target.value))}
                className="w-full h-1.5 bg-color-elevated rounded-lg appearance-none cursor-pointer accent-color-primary"
              />
              <div className="flex justify-between text-xs text-color-muted mt-2">
                <span>1km</span>
                <span>25km</span>
              </div>
            </div>

            {/* Facilities Checkboxes */}
            <div className="mb-8 space-y-3">
              <h4 className="text-sm font-medium mb-4 uppercase tracking-wider text-color-muted">Facilities</h4>
              {['F&B Menu', 'Tournaments', '4K 120Hz TVs', 'VIP Rooms'].map(fac => (
                <label key={fac} className="flex items-center gap-3 cursor-pointer group">
                  <div className="w-5 h-5 rounded border border-color-border bg-color-elevated group-hover:border-color-primary flex items-center justify-center transition-colors">
                    {/* Fake checked state logic could go here */}
                  </div>
                  <span className="text-sm text-color-muted group-hover:text-white transition-colors">{fac}</span>
                </label>
              ))}
            </div>

            <Button variant="outline" className="w-full text-xs" onClick={() => {setDistanceVal(10); setSelectedConsole(null);}}>
              Reset Filters
            </Button>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Trending Lounges Near You</h2>
            <Badge variant="outline" className="text-color-muted border-color-border backdrop-blur-none">
              Showing {filteredHubs.length} results
            </Badge>
          </div>

          {filteredHubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredHubs.map((hub, i) => (
                <motion.div
                  key={hub.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <HubCard hub={hub} onBook={onBookSlot} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center glass rounded-2xl border border-color-border">
              <Filter className="w-12 h-12 text-color-muted mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">No hubs found</h3>
              <p className="text-color-muted max-w-md">Try expanding your search radius or changing your selected console type.</p>
              <Button onClick={() => {setDistanceVal(25); setSelectedConsole(null);}} className="mt-6">
                Clear Filters
              </Button>
            </div>
          )}

          {/* Popular Games Scroller */}
          <div className="mt-16">
             <h2 className="text-2xl font-bold mb-6">Play Top Titles</h2>
             <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-none snap-x">
               {MOCK_GAMES.map((game) => (
                 <div key={game.id} className="relative group w-48 h-64 rounded-xl overflow-hidden shadow-lg snap-start flex-shrink-0 cursor-pointer border border-color-border hover:border-color-primary transition-all">
                   <img src={game.coverUrl} alt={game.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                      <h4 className="font-bold text-white mb-1">{game.title}</h4>
                      <div className="flex gap-1 flex-wrap">
                        {game.genre.map(g => (
                          <span key={g} className="text-[10px] uppercase font-bold bg-white/20 text-white/90 px-1.5 py-0.5 rounded">{g}</span>
                        ))}
                      </div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
