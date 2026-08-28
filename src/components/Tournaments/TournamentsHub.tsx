"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MOCK_TOURNAMENTS } from '@/lib/mockData';
import { Tournament } from '@/lib/types';
import { Trophy, Calendar, Users, Crown, Zap, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

function TournamentCard({ tournament }: { tournament: Tournament }) {
  const [registered, setRegistered] = useState(false);
  const { toast } = useToast();
  const fillPercent = (tournament.participants / tournament.maxParticipants) * 100;

  const handleRegister = () => {
    if (registered) return;
    setRegistered(true);
    toast(`🏆 Registered for ${tournament.title}!`, 'success');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl border border-color-border overflow-hidden group hover:border-color-primary/50 transition-all hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)]"
    >
      {/* Tournament Banner */}
      <div className="bg-gradient-to-r from-color-primary/20 via-color-secondary/10 to-transparent p-6 border-b border-color-border">
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="warning" className="mb-3 text-[10px] uppercase tracking-wider">
              <Trophy className="w-3 h-3 mr-1" /> Live Tournament
            </Badge>
            <h3 className="text-xl font-bold">{tournament.title}</h3>
            <p className="text-color-muted text-sm mt-1">{tournament.game}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-color-primary">₹{tournament.prizePool.toLocaleString()}</div>
            <div className="text-xs text-color-muted">Prize Pool</div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <div className="text-xs text-color-muted mb-0.5 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Date
            </div>
            <div className="font-medium text-sm">{tournament.date}</div>
          </div>
          <div>
            <div className="text-xs text-color-muted mb-0.5 flex items-center gap-1">
              <Zap className="w-3 h-3" /> Entry Fee
            </div>
            <div className="font-medium text-sm">₹{tournament.entryFee}</div>
          </div>
          <div>
            <div className="text-xs text-color-muted mb-0.5">Venue</div>
            <div className="font-medium text-sm truncate">{tournament.hubName}</div>
          </div>
        </div>

        {/* Participants Progress */}
        <div>
          <div className="flex justify-between text-xs text-color-muted mb-2">
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {tournament.participants} registered</span>
            <span>{tournament.maxParticipants - tournament.participants} spots left</span>
          </div>
          <div className="w-full bg-color-elevated rounded-full h-2">
            <div
              className="bg-gradient-to-r from-color-primary to-color-secondary h-2 rounded-full transition-all"
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        <Button
          variant={registered ? 'outline' : 'primary'}
          className={`w-full ${registered ? 'cursor-default' : ''}`}
          onClick={handleRegister}
        >
          {registered ? (
            <><CheckCircle className="w-4 h-4 mr-2 text-color-success" /> Registered!</>
          ) : (
            <>Register for ₹{tournament.entryFee}</>
          )}
        </Button>
      </div>
    </motion.div>
  );
}


export function TournamentsHub() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
          <Crown className="w-4 h-4 mr-2" /> Weekly Events
        </Badge>
        <h2 className="text-4xl font-extrabold mb-4">Tournaments & <span className="text-transparent bg-clip-text bg-gradient-to-r from-color-primary to-color-secondary">Community</span></h2>
        <p className="text-color-muted max-w-xl mx-auto">Compete every weekend for real prizes. Pay a split entry fee and win big — skill is the only currency that matters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MOCK_TOURNAMENTS.map(tournament => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ))}
      </div>
    </div>
  );
}
