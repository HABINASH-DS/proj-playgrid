"use client";

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { GamerView } from '@/components/GamerDiscovery/GamerView';
import { PartnerDashboard } from '@/components/Dashboard/PartnerDashboard';
import { TournamentsHub } from '@/components/Tournaments/TournamentsHub';
import { SlotPickerModal } from '@/components/GamerDiscovery/SlotPickerModal';
import { CheckoutModal } from '@/components/GamerDiscovery/CheckoutModal';
import { usePlayGrid } from '@/context/PlayGridContext';
import { Hub } from '@/lib/types';

export default function HomePage() {
  const { mode } = usePlayGrid();
  const [selectedHub, setSelectedHub] = useState<Hub | null>(null);
  const [isSlotPickerOpen, setIsSlotPickerOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const handleBookSlot = (hub: Hub) => {
    setSelectedHub(hub);
    setIsSlotPickerOpen(true);
  };

  const handleProceedToCheckout = (details: any) => {
    setBookingDetails(details);
    setIsSlotPickerOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-color-background">
      <Header />

      <main className="pb-12">
        {mode === 'GAMER' ? (
          <>
            <GamerView onBookSlot={handleBookSlot} />
            <TournamentsHub />
          </>
        ) : (
          <PartnerDashboard />
        )}
      </main>

      {/* Modals */}
      {selectedHub && (
        <SlotPickerModal
          hub={selectedHub}
          isOpen={isSlotPickerOpen}
          onClose={() => setIsSlotPickerOpen(false)}
          onProceedToCheckout={handleProceedToCheckout}
        />
      )}

      <CheckoutModal
        bookingDetails={bookingDetails}
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setSelectedHub(null);
          setBookingDetails(null);
        }}
      />
    </div>
  );
}
