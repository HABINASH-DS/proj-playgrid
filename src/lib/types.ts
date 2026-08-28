export type ConsoleType = 'PS5' | 'PS5 Pro' | 'PS4' | 'PS VR2' | 'Xbox Series X' | 'PC';

export type Game = {
  id: string;
  title: string;
  coverUrl: string;
  genre: string[];
};

export type Hub = {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  distanceKm: number;
  featuredImg: string;
  consoles: {
    type: ConsoleType;
    count: number;
    availableCount: number;
    hourlyRate: number;
  }[];
  facilities: ('F&B' | 'AC' | 'Tournaments' | '4K TVs')[];
  tags: string[];
};

export type ConsoleStationStat = {
  id: string;
  type: ConsoleType;
  status: 'Available' | 'Occupied' | 'Reserved' | 'Maintenance';
  timeRemainingMins?: number;
  currentUser?: string;
};

export type TimeSlot = {
  id: string;
  startTime: string; // e.g. "14:00"
  endTime: string;   // e.g. "15:00"
  isAvailable: boolean;
};

export type Tournament = {
  id: string;
  title: string;
  game: string;
  date: string;
  entryFee: number;
  prizePool: number;
  participants: number;
  maxParticipants: number;
  hubId: string;
  hubName: string;
};
