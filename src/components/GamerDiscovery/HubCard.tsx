import React from 'react';
import { MapPin, Star, Gamepad2, Coffee, Trophy, MonitorPlay } from 'lucide-react';
import { Hub } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface HubCardProps {
  hub: Hub;
  onBook: (hub: Hub) => void;
}

export function HubCard({ hub, onBook }: HubCardProps) {
  // Try to find the most premium console available for highlights
  const ps5Pro = hub.consoles.find(c => c.type === 'PS5 Pro');
  const ps5 = hub.consoles.find(c => c.type === 'PS5');
  const baseRate = ps5?.hourlyRate || ps5Pro?.hourlyRate || hub.consoles[0].hourlyRate;

  const totalAvailable = hub.consoles.reduce((acc, curr) => acc + curr.availableCount, 0);

  return (
    <div className="group relative rounded-2xl glass-panel overflow-hidden border border-color-border hover:border-color-primary/50 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] focus-within:ring-2 focus-within:ring-color-primary">
      {/* Image Area */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        <img
          src={hub.featuredImg}
          alt={hub.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {totalAvailable <= 2 && totalAvailable > 0 && (
          <div className="absolute top-3 right-3 z-20">
            <Badge variant="warning" className="animate-pulse">Fast Filling!</Badge>
          </div>
        )}
        {totalAvailable === 0 && (
          <div className="absolute top-3 right-3 z-20">
            <Badge variant="danger">Fully Booked</Badge>
          </div>
        )}

        <div className="absolute bottom-3 left-3 z-20 right-3 flex justify-between items-end">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-color-primary transition-colors">
              {hub.name}
            </h3>
            <div className="flex items-center gap-1.5 text-sm text-color-muted">
              <MapPin className="w-3.5 h-3.5" />
              <span>{hub.distanceKm} km away</span>
              <span className="text-white/30 px-1">•</span>
              <div className="flex items-center text-warning">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="ml-1 text-white">{hub.rating}</span>
                <span className="ml-1 text-color-muted">({hub.reviewCount})</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-4">
        {/* Consoles & Facilities overview */}
        <div className="flex gap-4 mb-2 overflow-x-auto pb-2 scrollbar-none snap-x">
          {hub.consoles.filter(c => c.count > 0).map((console, idx) => (
             <div key={idx} className="flex-shrink-0 flex flex-col snap-start">
               <span className="text-xs text-color-muted">{console.type}</span>
               <div className="flex items-center gap-1.5 text-sm font-medium">
                 <div className={`w-2 h-2 rounded-full ${console.availableCount > 0 ? 'bg-success shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-danger'}`} />
                 <span className={console.availableCount > 0 ? 'text-white' : 'text-color-muted line-through'}>
                   {console.availableCount} / {console.count}
                 </span>
               </div>
             </div>
          ))}
        </div>

        {/* Tags / Badges */}
        <div className="flex flex-wrap gap-2">
           {hub.tags.slice(0, 2).map((tag, i) => (
              <Badge key={i} variant="primary" className="bg-color-primary/10 border-none text-[10px] uppercase tracking-wider">{tag}</Badge>
           ))}
           {hub.facilities.includes('Tournaments') && (
              <Badge variant="secondary" className="bg-color-secondary/10 border-none text-[10px] uppercase tracking-wider"><Trophy className="w-3 h-3 mr-1 inline"/> Arena</Badge>
           )}
        </div>

        {/* Action Row */}
        <div className="pt-4 border-t border-color-border flex items-center justify-between">
           <div>
             <div className="text-xs text-color-muted">Starts from</div>
             <div className="text-lg font-bold">₹{baseRate} <span className="text-sm font-normal text-color-muted">/ hr</span></div>
           </div>

           <Button
             variant={totalAvailable > 0 ? 'primary' : 'outline'}
             disabled={totalAvailable === 0}
             onClick={() => onBook(hub)}
             size="sm"
             className="px-6"
           >
             {totalAvailable > 0 ? 'Book Slot' : 'Join Waitlist'}
           </Button>
        </div>
      </div>
    </div>
  );
}
