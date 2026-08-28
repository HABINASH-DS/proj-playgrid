# PlayGrid - Premium Gaming Lounge Booking Platform

A high-fidelity, interactive, responsive web demo for a PlayStation Hub & Gaming Lounge Booking Platform.

![PlayGrid Platform](https://img.shields.io/badge/Next.js-16.3.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=for-the-badge&logo=tailwindcss)

## 🎮 Features

### **Gamer Discovery View** (Consumer Side)
- **Hero Section**: Quick search by location, game title (EA FC 25, Tekken 8, GTA V), or console type (PS5, PS5 Pro, PS VR2)
- **Hub Cards Listing**: Display venue cards with distance, rating, active console count, hourly base price, and instant tags
- **Filter Sidebar**: Distance slider (1-25km), console types, F&B availability, tournament-ready badges
- **Interactive Slot Booking Modal**: 
  - Console picker with live availability
  - Time grid with hourly blocks (Available/Booked/Selected states with glow effects)
  - Add-on selection (extra controller, snack combos, game reservations)
  - Dynamic price calculation with split-payment toggle
- **Booking Confirmation**: Realistic dynamic QR code pass with countdown timer and Google Maps directions

### **Hub Partner Dashboard** (B2B Lounge Owner View)
- **Floor Matrix View**: Visual cards representing physical PS5 stations with live statuses (Occupied with countdown, Available, Reserved, Maintenance)
- **Walk-in Quick Billing**: Rapid action panel to block slots for cash walk-ins
- **Live Revenue Metrics**: 
  - Today's earnings with trend indicators
  - Real-time occupancy rate percentage
  - App bookings vs walk-in settlements

### **Tournaments & Community Hub**
- Weekend tournament cards (EA FC, Tekken 8)
- Entry fee & prize pool display
- Live participant counter with progress bar
- Team/player registration flow

## 🎨 Design System

- **Framework**: Next.js 14+ App Router with TypeScript
- **Styling**: Tailwind CSS with custom dark-mode gamer aesthetic
- **Color Palette**:
  - Deep zinc background: `#09090b`
  - Electric violet primary: `#8b5cf6`
  - Cyan secondary: `#06b6d4`
  - Glassmorphism effects with backdrop blur
- **Icons**: lucide-react
- **Animations**: framer-motion for smooth transitions
- **State Management**: React Context API for booking flow

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
cd playgrid

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
playgrid/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with Providers
│   │   ├── page.tsx             # Home page with mode switching
│   │   ├── globals.css          # Global styles & custom CSS
│   │   └── providers.tsx        # Context providers wrapper
│   ├── components/
│   │   ├── Header.tsx           # Navigation with city selector & mode switcher
│   │   ├── ui/
│   │   │   ├── Button.tsx       # Reusable button with variants
│   │   │   ├── Badge.tsx        # Status badges
│   │   │   └── Toast.tsx        # Toast notification system
│   │   ├── GamerDiscovery/
│   │   │   ├── GamerView.tsx           # Main consumer view with filters
│   │   │   ├── HubCard.tsx             # Venue card component
│   │   │   ├── SlotPickerModal.tsx     # Time slot selection modal
│   │   │   └── CheckoutModal.tsx       # Payment & QR confirmation
│   │   ├── Dashboard/
│   │   │   └── PartnerDashboard.tsx    # B2B lounge owner view
│   │   └── Tournaments/
│   │       └── TournamentsHub.tsx      # Tournament listing & registration
│   ├── context/
│   │   └── PlayGridContext.tsx  # Global state (mode, wallet, city)
│   └── lib/
│       ├── mockData.ts          # Mock hubs, tournaments, games, stations
│       ├── types.ts             # TypeScript interfaces
│       └── utils.ts             # Utility functions (cn for classnames)
├── public/                      # Static assets
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎯 Key Components

### **SlotPickerModal**
Interactive booking flow with:
- Console type selection
- Time grid (12 hourly slots, 10 AM - 10 PM)
- Real-time availability (70% available mock)
- Add-ons (extra controller: ₹50/hr, snack combo: ₹120)
- Dynamic price calculation

### **CheckoutModal**
Two-step checkout:
1. **Payment screen**: Summary breakdown, split-payment toggle
2. **Confirmation screen**: QR code generator, booking ID, countdown timer, Google Maps integration

### **PartnerDashboard**
Real-time floor management:
- Station cards with live countdown timers
- Status indicators (Available/Occupied/Reserved/Maintenance)
- Walk-in billing calculator
- Revenue metrics dashboard

## 🌐 Responsive Design

Fully responsive across:
- **Mobile**: 320px - 767px (single column, touch-optimized)
- **Tablet**: 768px - 1023px (2-column grid)
- **Desktop**: 1024px+ (3-4 column layouts)

## 🎨 Customization

### Changing Color Scheme
Edit `src/app/globals.css`:

```css
:root {
  --primary: #8b5cf6;      /* Electric Violet */
  --secondary: #06b6d4;    /* Cyan */
  --accent: #f43f5e;       /* Rose */
}
```

### Adding New Hubs
Edit `src/lib/mockData.ts` and add to `MOCK_HUBS` array.

### Modifying Time Slots
Edit `generateTimeSlots()` in `SlotPickerModal.tsx` to change hours, intervals, or availability logic.

## 🔧 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **lucide-react** | Icon library |
| **clsx + tailwind-merge** | Conditional classname utility |

## 📱 Features Highlight

✅ **Live Time Grid** - Interactive hourly booking slots  
✅ **Glassmorphism UI** - Modern frosted glass effects  
✅ **Toast Notifications** - Real-time feedback  
✅ **QR Code Generation** - Dynamic booking passes  
✅ **Split Payment** - Cost sharing between friends  
✅ **Real-time Countdown** - Live session timers  
✅ **Google Maps Integration** - One-tap navigation  
✅ **Dark Mode** - Gamer-optimized theme (forced dark)  
✅ **Responsive** - Mobile, tablet, desktop optimized  

## 🎮 Mock Data

The platform includes realistic mock data:
- **4 Gaming Hubs** across Bengaluru, Mumbai, Chennai
- **8 Console Stations** with live status simulation
- **2 Active Tournaments** (EA FC 25, Tekken 8)
- **Popular Games** with cover art

## 📄 License

MIT License - feel free to use for portfolio or commercial projects.

## 🚀 Deployment

Deploy instantly on:
- **Vercel** (recommended): `vercel --prod`
- **Netlify**: `npm run build && netlify deploy`
- **Railway**: Connect repo and auto-deploy

## 🤝 Contributing

This is a demo project. Feel free to fork and customize for your own use case.

---

**Built with ❤️ by a Principal Full-Stack Engineer**
