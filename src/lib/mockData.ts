import { Hub, Tournament, ConsoleStationStat, Game } from './types';

export const MOCK_GAMES: Game[] = [
  { id: 'g1', title: 'EA FC 25', coverUrl: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=300&q=80', genre: ['Sports'] },
  { id: 'g2', title: 'Tekken 8', coverUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=300&q=80', genre: ['Fighting'] },
  { id: 'g3', title: 'GTA V', coverUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&w=300&q=80', genre: ['Action'] },
  { id: 'g4', title: 'Spider-Man 2', coverUrl: 'https://images.unsplash.com/photo-1549646487-1be61c948e89?auto=format&fit=crop&w=300&q=80', genre: ['Action', 'Adventure'] },
];

export const MOCK_HUBS: Hub[] = [
  {
    id: 'h1',
    name: 'Neon Gaming Lounge',
    address: 'Indiranagar 100ft Road',
    city: 'Bengaluru',
    rating: 4.8,
    reviewCount: 312,
    distanceKm: 1.2,
    featuredImg: 'https://images.unsplash.com/photo-1579227114347-15d08fc37cae?auto=format&fit=crop&w=800&q=80',
    consoles: [
      { type: 'PS5 Pro', count: 4, availableCount: 1, hourlyRate: 250 },
      { type: 'PS5', count: 12, availableCount: 5, hourlyRate: 150 },
      { type: 'PS VR2', count: 2, availableCount: 2, hourlyRate: 400 },
    ],
    facilities: ['F&B', 'AC', 'Tournaments', '4K TVs'],
    tags: ['4K 120Hz OLED', '2 DualSense included'],
  },
  {
    id: 'h2',
    name: 'CyberGrid Hub',
    address: 'Koramangala 4th Block',
    city: 'Bengaluru',
    rating: 4.5,
    reviewCount: 189,
    distanceKm: 2.8,
    featuredImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    consoles: [
      { type: 'PS5', count: 15, availableCount: 0, hourlyRate: 120 },
      { type: 'PC', count: 10, availableCount: 4, hourlyRate: 100 },
    ],
    facilities: ['AC', '4K TVs'],
    tags: ['Snacks Available'],
  },
  {
    id: 'h3',
    name: 'Pixel Perfect Lounges',
    address: 'Andheri West',
    city: 'Mumbai',
    rating: 4.9,
    reviewCount: 843,
    distanceKm: 5.1,
    featuredImg: 'https://images.unsplash.com/photo-1622288301592-7de1c0988cc2?auto=format&fit=crop&w=800&q=80',
    consoles: [
      { type: 'PS5', count: 8, availableCount: 3, hourlyRate: 200 },
      { type: 'Xbox Series X', count: 4, availableCount: 4, hourlyRate: 180 },
    ],
    facilities: ['F&B', 'AC', 'Tournaments'],
    tags: ['VIP Rooms', 'Ergonomic Chairs'],
  },
  {
    id: 'h4',
    name: 'NextGen Arena',
    address: 'T Nagar',
    city: 'Chennai',
    rating: 4.6,
    reviewCount: 420,
    distanceKm: 3.4,
    featuredImg: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
    consoles: [
      { type: 'PS5', count: 20, availableCount: 12, hourlyRate: 130 },
      { type: 'PS VR2', count: 3, availableCount: 1, hourlyRate: 350 },
    ],
    facilities: ['F&B', 'AC', '4K TVs'],
    tags: ['High-speed Wi-Fi', '2 DualSense included'],
  }
];

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 't1',
    title: 'Weekend EA FC 25 Clash',
    game: 'EA FC 25',
    date: 'Oct 28, 2026 - 4:00 PM',
    entryFee: 500,
    prizePool: 15000,
    participants: 14,
    maxParticipants: 32,
    hubId: 'h1',
    hubName: 'Neon Gaming Lounge'
  },
  {
    id: 't2',
    title: 'Tekken 8 King of Iron Fist',
    game: 'Tekken 8',
    date: 'Nov 5, 2026 - 2:00 PM',
    entryFee: 300,
    prizePool: 8000,
    participants: 28,
    maxParticipants: 32,
    hubId: 'h3',
    hubName: 'Pixel Perfect Lounges'
  }
];

export const MOCK_DASHBOARD_STATIONS: ConsoleStationStat[] = [
  { id: 'st1', type: 'PS5 Pro', status: 'Occupied', timeRemainingMins: 18, currentUser: 'Rahul M.' },
  { id: 'st2', type: 'PS5 Pro', status: 'Available' },
  { id: 'st3', type: 'PS5', status: 'Reserved' },
  { id: 'st4', type: 'PS5', status: 'Occupied', timeRemainingMins: 45, currentUser: 'Arjun K.' },
  { id: 'st5', type: 'PS5', status: 'Maintenance' },
  { id: 'st6', type: 'PS5', status: 'Available' },
  { id: 'st7', type: 'PS VR2', status: 'Occupied', timeRemainingMins: 5, currentUser: 'Priya S.' },
  { id: 'st8', type: 'PS VR2', status: 'Available' },
];
