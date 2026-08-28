"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConsoleType, Hub } from '@/lib/types';
import { X, Clock, Gamepad2, Check, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// Utility to generate today's time slots starting from next hour
const generateTimeSlots = () => {
  const slots = [];
  let currentHour = 10; // For demo, let's say lounge opens 10 AM
  for (let i = 0; i < 12; i++) {
    const isAvail = Math.random() > 0.3; // 70% available mock
    const hour12 = currentHour > 12 ? currentHour - 12 : currentHour;
    const ampm = currentHour >= 12 ? 'PM' : 'AM';
    const nextHour = currentHour + 1;
    const nextHour12 = nextHour > 12 ? nextHour - 12 : nextHour;
    const nextAmpm = nextHour >= 12 ? 'PM' : 'AM';

    slots.push({
      id: `slot_${i}`,
      label: `${hour12}:00 ${ampm} - ${nextHour12}:00 ${nextAmpm}`,
      isAvailable: isAvail,
      priceOverride: Math.random() > 0.8 ? 'Peak' : null
    });
    currentHour++;
  }
  return slots;
};

interface SlotPickerModalProps {
  hub: Hub;
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: (bookingDetails: any) => void;
}

export function SlotPickerModal({ hub, isOpen, onClose, onProceedToCheckout }: SlotPickerModalProps) {
  const [selectedConsoleType, setSelectedConsoleType] = useState<ConsoleType>(hub.consoles[0].type);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlotIds, setSelectedSlotIds] = useState<string[]>([]);

  // Add-ons
  const [extraController, setExtraController] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSlots(generateTimeSlots());
      setSelectedSlotIds([]);
      setExtraController(false);
    }
  }, [isOpen, hub]);

  if (!isOpen) return null;

  const currentConsoleData = hub.consoles.find(c => c.type === selectedConsoleType) || hub.consoles[0];
  const baseRate = currentConsoleData.hourlyRate;
  const totalHours = selectedSlotIds.length;

  const handleSlotToggle = (id: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    setSelectedSlotIds(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleProceed = () => {
    const price = (baseRate * totalHours) + (extraController ? 50 * totalHours : 0);
    onProceedToCheckout({
      hub,
      consoleType: selectedConsoleType,
      selectedSlots: slots.filter(s => selectedSlotIds.includes(s.id)),
      totalHours,
      addons: { extraController },
      totalPrice: price
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-color-card border border-color-border rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-color-border glass bg-gradient-to-r from-color-card to-color-primary/5">
            <div>
              <h2 className="text-2xl font-bold">{hub.name}</h2>
              <p className="text-color-muted text-sm">{hub.address}, {hub.city}</p>
            </div>
            <button onClick={onClose} className="p-2 bg-color-elevated rounded-full hover:text-white hover:bg-color-border transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
            {/* 1. Console Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-color-primary" /> Select Console
              </h3>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                {hub.consoles.map((c) => (
                  <button
                    key={c.type}
                    onClick={() => setSelectedConsoleType(c.type)}
                    className={`flex-shrink-0 flex flex-col p-4 rounded-xl border-2 transition-all min-w-[140px] text-left
                      ${selectedConsoleType === c.type
                        ? 'border-color-primary bg-color-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]'
                        : 'border-color-border bg-color-elevated hover:border-color-muted'
                      }
                      ${c.availableCount === 0 && 'opacity-50 cursor-not-allowed'}
                    `}
                    disabled={c.availableCount === 0}
                  >
                    <span className="font-bold text-lg">{c.type}</span>
                    <span className="text-xs text-color-muted mb-2">{c.availableCount} available</span>
                    <span className="text-color-primary font-medium mt-auto">₹{c.hourlyRate}/hr</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Time Slot Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Clock className="w-5 h-5 text-color-secondary" /> Pick Your Slot(s)
                </h3>
                <div className="flex gap-3 text-xs text-color-muted">
                  <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-color-elevated border border-color-border"></div> Avail</span>
                  <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-color-primary"></div> Selected</span>
                  <span className="flex items-center gap-1"><div className="w-2.5 h-2.5 rounded-sm bg-color-border opacity-50"></div> Full</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {slots.map((slot) => {
                  const isSelected = selectedSlotIds.includes(slot.id);
                  return (
                    <button
                      key={slot.id}
                      disabled={!slot.isAvailable}
                      onClick={() => handleSlotToggle(slot.id, slot.isAvailable)}
                      className={`relative p-3 rounded-xl border text-sm font-medium transition-all
                        ${!slot.isAvailable
                          ? 'bg-color-border/30 border-color-border/50 text-color-muted cursor-not-allowed opacity-50'
                          : isSelected
                            ? 'bg-gradient-to-br from-color-primary to-color-secondary border-transparent text-white shadow-lg'
                            : 'bg-color-elevated border-color-border hover:border-color-primary/50 text-foreground hover:bg-white/5'
                        }
                      `}
                    >
                      {slot.label}
                      {slot.priceOverride === 'Peak' && slot.isAvailable && !isSelected && (
                         <span className="absolute -top-2 -right-2 bg-accent text-white text-[9px] px-1.5 py-0.5 rounded shadow">PEAK</span>
                      )}
                      {isSelected && (
                        <Check className="absolute top-1 right-1 w-3 h-3 text-white/70" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Add-ons */}
            <div>
               <h3 className="text-lg font-semibold mb-3">Power-ups (Add-ons)</h3>
               <div className="flex flex-col gap-3">
                  <label className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${extraController ? 'border-color-secondary bg-color-secondary/10' : 'border-color-border bg-color-elevated'}`}>
                     <div className="flex items-center gap-4">
                       <div className={`w-6 h-6 rounded flex items-center justify-center border ${extraController ? 'bg-color-secondary border-color-secondary text-white' : 'border-color-muted'}`}>
                          {extraController && <Check className="w-4 h-4" />}
                       </div>
                       <div>
                         <p className="font-semibold text-sm">Extra DualSense Controller</p>
                         <p className="text-xs text-color-muted">For 2-player local co-op</p>
                       </div>
                     </div>
                     <span className="font-medium">+₹50/hr</span>
                  </label>
               </div>
            </div>
          </div>

          {/* Footer / Summary */}
          <div className="p-6 border-t border-color-border bg-color-elevated flex items-center justify-between">
            <div>
              <p className="text-color-muted text-sm mb-1">
                {totalHours} hour{totalHours !== 1 ? 's' : ''} selected
              </p>
              <p className="text-3xl font-bold">
                ₹{(baseRate * totalHours) + (extraController ? 50 * totalHours : 0)}
              </p>
            </div>
            <Button
              size="lg"
              disabled={totalHours === 0}
              onClick={handleProceed}
              className="px-8 flex items-center gap-2"
            >
              Confirm Slot <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
