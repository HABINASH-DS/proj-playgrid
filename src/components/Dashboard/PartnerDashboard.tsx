"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor, Clock, AlertCircle, Wrench, UserPlus, IndianRupee,
  TrendingUp, Users, Activity, Zap, ChevronUp, ChevronDown, PlusCircle,
  XCircle, Settings2
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_DASHBOARD_STATIONS } from '@/lib/mockData';
import { ConsoleStationStat } from '@/lib/types';
import { useToast } from '@/components/ui/Toast';

/* ---------- Floor Map Station Card ---------- */
function StationCard({
  station,
  onExtend,
  onEndSession,
  onToggleMaintenance
}: {
  station: ConsoleStationStat;
  onExtend: (id: string, mins: number) => void;
  onEndSession: (id: string) => void;
  onToggleMaintenance: (id: string) => void;
}) {
  const statusConfig = {
    Available: { color: 'text-color-success', bg: 'bg-color-success/10 border-color-success/40', icon: Monitor, glow: 'shadow-[0_0_20px_rgba(16,185,129,0.2)]' },
    Occupied: { color: 'text-color-primary', bg: 'bg-color-primary/10 border-color-primary/40', icon: Clock, glow: 'shadow-[0_0_20px_rgba(139,92,246,0.2)]' },
    Reserved: { color: 'text-warning', bg: 'bg-warning/10 border-warning/40', icon: AlertCircle, glow: 'shadow-[0_0_20px_rgba(245,158,11,0.2)]' },
    Maintenance: { color: 'text-color-muted', bg: 'bg-color-elevated border-color-border', icon: Wrench, glow: '' },
  };

  const cfg = statusConfig[station.status];
  const Icon = cfg.icon;

  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      className={`relative p-5 rounded-2xl border-2 transition-all ${cfg.bg} ${cfg.glow} flex flex-col`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl bg-color-card/80 ${cfg.color}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-lg">{station.id.replace('st', 'Station ')}</p>
            <p className="text-xs text-color-muted">{station.type}</p>
          </div>
        </div>
        <Badge variant={station.status === 'Available' ? 'success' : station.status === 'Occupied' ? 'primary' : station.status === 'Reserved' ? 'warning' : 'default'}>
          {station.status}
        </Badge>
      </div>

      <div className="flex-1">
        {station.status === 'Occupied' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-color-muted">Player</span>
                <span className="font-medium">{station.currentUser}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-color-muted">Remaining</span>
                <span className={`font-mono font-bold ${(station.timeRemainingMins ?? 0) <= 10 ? 'text-color-accent animate-pulse' : 'text-color-primary'}`}>
                  {station.timeRemainingMins} min
                </span>
              </div>
              <div className="w-full bg-color-border rounded-full h-1.5 mt-2">
                <div
                  className="bg-gradient-to-r from-color-primary to-color-secondary h-1.5 rounded-full transition-all"
                  style={{ width: `${Math.max(5, 100 - (station.timeRemainingMins ?? 0) * 1.67)}%` }}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-color-border/30">
               <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs py-1 h-8 bg-color-card"
                  onClick={() => onExtend(station.id, 30)}
               >
                  <PlusCircle className="w-3 h-3 mr-1"/> 30 Mins
               </Button>
               <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs py-1 h-8 bg-color-card"
                  onClick={() => onExtend(station.id, 60)}
               >
                  <PlusCircle className="w-3 h-3 mr-1"/> 1 Hour
               </Button>
            </div>

            <Button
               variant="outline"
               size="sm"
               className="w-full text-xs py-1 h-8 border-color-danger/50 text-color-danger hover:bg-color-danger/10 hover:text-color-danger"
               onClick={() => onEndSession(station.id)}
            >
               <XCircle className="w-3 h-3 mr-1"/> End Session Early
            </Button>
          </div>
        )}

        {station.status === 'Available' && (
          <p className="text-sm text-color-success/80 mt-1 font-medium">Ready for walk-in or booking</p>
        )}

        {station.status === 'Reserved' && (
          <p className="text-sm text-warning/80 mt-1 font-medium">Reserved for incoming booking</p>
        )}
      </div>

      {/* Maintenance Toggle */}
      <div className="mt-4 pt-3 border-t border-color-border/30">
        <Button
          variant="ghost"
          size="sm"
          className={`w-full text-xs h-8 ${station.status === 'Maintenance' ? 'text-color-success hover:bg-color-success/10' : 'text-color-muted hover:text-white hover:bg-white/5'}`}
          onClick={() => onToggleMaintenance(station.id)}
        >
          <Settings2 className="w-3 h-3 mr-1.5" />
           {station.status === 'Maintenance' ? 'Mark as Available' : 'Set Under Maintenance'}
        </Button>
      </div>
    </motion.div>
  );
}

/* ---------- Walk-In Quick Billing ---------- */
function WalkInBilling({
  stations,
  onAssignWalkIn
}: {
  stations: ConsoleStationStat[];
  onAssignWalkIn: (stationId: string, hours: number) => void;
}) {
  const [hours, setHours] = useState(1);
  const [selectedStationId, setSelectedStationId] = useState<string>('');
  const rate = 150;
  const { toast } = useToast();

  const availableStations = stations.filter(s => s.status === 'Available');

  // Select first available by default
  useEffect(() => {
    if (availableStations.length > 0 && !selectedStationId) {
      setSelectedStationId(availableStations[0].id);
    }
  }, [availableStations, selectedStationId]);

  const handleConfirm = () => {
    if (!selectedStationId) {
       toast('No available stations for walk-in', 'error');
       return;
    }
    toast(`Walk-in billed for ${hours} hr(s) on ${selectedStationId.replace('st', 'Station ')} — ₹${rate * hours}`, 'success');
    onAssignWalkIn(selectedStationId, hours);
    setHours(1);
    setSelectedStationId(''); // Reset selector
  };

  return (
    <div className="glass-panel rounded-2xl p-6 border border-color-border sticky top-24">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-color-primary/20 text-color-primary">
          <UserPlus className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold">Walk-in Quick Billing</h3>
          <p className="text-xs text-color-muted">Block a station for cash customers</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Station Selection */}
        <div className="space-y-2 text-sm">
          <label className="text-color-muted">Available Station</label>
          <select
             className="w-full bg-zinc-900 text-white border border-color-border p-3 rounded-xl focus:outline-none focus:border-color-primary appearance-none hover:border-color-muted transition-colors cursor-pointer"
             value={selectedStationId}
             onChange={(e) => setSelectedStationId(e.target.value)}
          >
             {availableStations.length === 0 && (
                <option value="" disabled className="bg-zinc-900 text-color-muted">No stations available</option>
             )}
             {availableStations.map(st => (
                <option key={st.id} value={st.id} className="bg-zinc-900 text-white py-2">
                   {st.id.replace('st', 'Station ')} - {st.type}
                </option>
             ))}
          </select>
        </div>

        <div className="flex items-center justify-between p-4 bg-color-elevated rounded-xl border border-color-border">
          <span className="text-sm">Duration (hrs)</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setHours(Math.max(1, hours - 1))}
              className="w-8 h-8 rounded-lg bg-color-border text-white flex items-center justify-center hover:bg-color-primary transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <span className="font-bold text-xl w-8 text-center">{hours}</span>
            <button
              onClick={() => setHours(Math.min(8, hours + 1))}
              className="w-8 h-8 rounded-lg bg-color-border text-white flex items-center justify-center hover:bg-color-primary transition-colors"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="text-right text-sm text-color-muted">
          Total: <span className="text-xl font-bold text-white ml-2">₹{rate * hours}</span>
        </div>

        <Button
          className="w-full"
          disabled={availableStations.length === 0}
          onClick={handleConfirm}
        >
          <Zap className="w-4 h-4 mr-2" /> Confirm Walk-in
        </Button>
      </div>
    </div>
  );
}


/* ---------- Live Revenue Metrics ---------- */
function DashboardStats() {
  const metrics = [
    { label: "Today's Earnings", value: '₹12,450', icon: IndianRupee, color: 'text-color-success', change: '+18%' },
    { label: 'Occupancy Rate', value: '62%', icon: Activity, color: 'text-color-primary', change: '+5%' },
    { label: 'App Bookings', value: '14', icon: TrendingUp, color: 'text-color-secondary', change: '+3' },
    { label: 'Walk-in Pending', value: '₹3,200', icon: Users, color: 'text-warning', change: '4 unsettled' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, i) => {
        const Icon = m.icon;
        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-5 rounded-2xl border border-color-border hover:border-color-primary/30 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2.5 rounded-xl bg-color-elevated ${m.color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <Badge variant="outline" className="text-[10px]">{m.change}</Badge>
            </div>
            <p className="text-2xl font-bold mb-1">{m.value}</p>
            <p className="text-xs text-color-muted">{m.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}


/* ---------- MAIN DASHBOARD VIEW ---------- */
export function PartnerDashboard() {
  const [stations, setStations] = useState<ConsoleStationStat[]>(MOCK_DASHBOARD_STATIONS);
  const { toast } = useToast();

  // Simulate live countdown on occupied stations
  useEffect(() => {
    const interval = setInterval(() => {
      setStations(prev =>
        prev.map(st => {
          if (st.status === 'Occupied' && st.timeRemainingMins !== undefined) {
            const newTime = st.timeRemainingMins - 1;
            if (newTime <= 0) {
               toast(`${st.id.replace('st', 'Station ')} time is up. Slot is now Available.`, 'info');
               return { ...st, status: 'Available', timeRemainingMins: undefined, currentUser: undefined };
            }
            return { ...st, timeRemainingMins: newTime };
          }
          return st;
        })
      );
    }, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  const handleExtendSession = (id: string, addedMins: number) => {
    setStations(prev =>
       prev.map(st => {
          if (st.id === id && st.status === 'Occupied') {
             return {
                ...st,
                timeRemainingMins: (st.timeRemainingMins || 0) + addedMins
             };
          }
          return st;
       })
    );

    toast(`Session extended by ${addedMins} mins. Next slot auto-adjusted to prevent clashes.`, 'success');
  };

  const handleEndSession = (id: string) => {
    setStations(prev =>
       prev.map(st => {
          if (st.id === id) {
             return {
                ...st,
                status: 'Available',
                timeRemainingMins: undefined,
                currentUser: undefined
             };
          }
          return st;
       })
    );

    toast(`Session ended early. ${id.replace('st', 'Station ')} is now available.`, 'info');
  };

  const handleToggleMaintenance = (id: string) => {
    let newStatus = '';
    setStations(prev =>
       prev.map(st => {
          if (st.id === id) {
             const isMaintenance = st.status === 'Maintenance';
             newStatus = isMaintenance ? 'Available' : 'Maintenance';
             return {
                ...st,
                status: newStatus as any,
                timeRemainingMins: undefined,
                currentUser: undefined
             };
          }
          return st;
       })
    );

    // Toast fires on next tick logically, we can just do it here:
    setTimeout(() => {
       toast(`${id.replace('st', 'Station ')} is now ${newStatus === 'Maintenance' ? 'Under Maintenance' : 'Available'}.`, newStatus === 'Maintenance' ? 'warning' : 'success');
    }, 50);
  };

  const handleAssignWalkIn = (id: string, hours: number) => {
     setStations(prev =>
         prev.map(st => {
            if (st.id === id) {
               return {
                  ...st,
                  status: 'Occupied',
                  timeRemainingMins: hours * 60,
                  currentUser: 'Walk-in Guest'
               };
            }
            return st;
         })
     );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold mb-2">Hub Dashboard</h1>
        <p className="text-color-muted text-sm">Neon Gaming Lounge · Indiranagar 100ft Road, Bengaluru</p>
      </div>

      {/* Revenue Metrics */}
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        {/* Floor Matrix */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Monitor className="w-5 h-5 text-color-primary" /> Floor Matrix
            </h2>
            <div className="flex gap-2 text-xs text-color-muted">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-color-success"></span>Avail</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-color-primary"></span>Occ</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning"></span>Rsv</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-color-muted"></span>Maint</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AnimatePresence>
              {stations.map(station => (
                <StationCard
                  key={station.id}
                  station={station}
                  onExtend={handleExtendSession}
                  onEndSession={handleEndSession}
                  onToggleMaintenance={handleToggleMaintenance}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Walk-in Quick Billing */}
        <div>
          <WalkInBilling stations={stations} onAssignWalkIn={handleAssignWalkIn} />
        </div>
      </div>
    </div>
  );
}
