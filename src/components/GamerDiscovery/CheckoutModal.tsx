"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Navigation, CreditCard, SplitSquareHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { useToast } from '../ui/Toast';
import { usePlayGrid } from '@/context/PlayGridContext';

// 1. Dynamic QR Code renderer using a public API
function QRCodeSVG({ value, size = 200 }: { value: string; size?: number }) {
  // Generate a simple QR-like pattern deterministically from value string as a visual placeholder
  const hash = value.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const grid = 21;
  const cellSize = size / grid;
  const cells: React.JSX.Element[] = [];

  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      const isCorner =
        (r < 7 && c < 7) || (r < 7 && c >= grid - 7) || (r >= grid - 7 && c < 7);
      const isCornerInner =
        ((r >= 2 && r <= 4 && c >= 2 && c <= 4)) ||
        ((r >= 2 && r <= 4 && c >= grid - 5 && c <= grid - 3)) ||
        ((r >= grid - 5 && r <= grid - 3 && c >= 2 && c <= 4));
      const isCornerBorder =
        (r === 0 || r === 6 || c === 0 || c === 6) && r < 7 && c < 7 ||
        (r === 0 || r === 6 || c === grid - 1 || c === grid - 7) && r < 7 && c >= grid - 7 ||
        (r === grid - 1 || r === grid - 7 || c === 0 || c === 6) && r >= grid - 7 && c < 7;
      const pseudoRandom = ((hash * (r + 1) * (c + 1) + r * 31 + c * 17) % 100) > 45;
      const filled = isCornerInner || isCornerBorder || (!isCorner && pseudoRandom);

      if (filled) {
        cells.push(
          <rect
            key={`${r}-${c}`}
            x={c * cellSize}
            y={r * cellSize}
            width={cellSize}
            height={cellSize}
            fill="white"
            rx={cellSize * 0.15}
          />
        );
      }
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-lg">
      <rect width={size} height={size} fill="#09090b" rx="8" />
      {cells}
    </svg>
  );
}

// 3. CHECKOUT MODAL
interface CheckoutModalProps {
  bookingDetails: any;
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ bookingDetails, isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'checkout' | 'confirmed'>('checkout');
  const [splitPayment, setSplitPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { walletBalance, setWalletBalance } = usePlayGrid();

  const bookingId = `PG${Date.now().toString(36).toUpperCase().slice(-6)}`;

  useEffect(() => {
    if (isOpen) {
      setStep('checkout');
      setSplitPayment(false);
      setIsProcessing(false);
    }
  }, [isOpen]);

  if (!isOpen || !bookingDetails) return null;

  const { hub, consoleType, selectedSlots, totalHours, addons, totalPrice } = bookingDetails;

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    toast('Slot temporarily locked for 5 mins ⏳', 'info');

    setTimeout(() => {
      setWalletBalance(walletBalance - totalPrice);
      setIsProcessing(false);
      setStep('confirmed');
      toast('🎮 Booking Confirmed! You\'re all set.', 'success');
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-color-card border border-color-border rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {step === 'checkout' ? (
            <>
              {/* Checkout Header */}
              <div className="bg-gradient-to-r from-color-primary/20 to-color-secondary/10 p-6 border-b border-color-border flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">Checkout</h2>
                  <p className="text-color-muted text-sm mt-1">{hub.name} · {consoleType}</p>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                {/* Summary Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-color-muted">{consoleType} × {totalHours}hr</span>
                    <span>₹{hub.consoles.find((c: any) => c.type === consoleType)?.hourlyRate * totalHours}</span>
                  </div>
                  {addons.extraController && (
                    <div className="flex justify-between text-sm">
                      <span className="text-color-muted">Extra Controller × {totalHours}hr</span>
                      <span>₹{50 * totalHours}</span>
                    </div>
                  )}

                  <div className="border-t border-dashed border-color-border pt-3 flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-color-primary">₹{totalPrice}</span>
                  </div>
                </div>

                {/* Time Slots Summary */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-color-muted mb-2">Booked Slots</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedSlots.map((slot: any) => (
                      <Badge key={slot.id} variant="primary" className="text-xs">{slot.label}</Badge>
                    ))}
                  </div>
                </div>

                {/* Split Payment Toggle */}
                <div className="flex items-center justify-between p-4 bg-color-elevated rounded-xl border border-color-border">
                  <div className="flex items-center gap-3">
                    <SplitSquareHorizontal className="w-5 h-5 text-color-secondary" />
                    <div>
                      <p className="font-medium text-sm">Split Payment</p>
                      <p className="text-color-muted text-xs">Share with a friend</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSplitPayment(!splitPayment)}
                    className={`w-12 h-7 rounded-full transition-colors relative ${splitPayment ? 'bg-color-secondary' : 'bg-color-border'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform ${splitPayment ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>

                {splitPayment && (
                  <div className="mt-3 p-4 rounded-xl border border-color-secondary/30 bg-color-secondary/5">
                    <p className="text-sm text-color-muted mb-1">Each person pays:</p>
                    <p className="text-xl font-bold">₹{Math.ceil(totalPrice / 2)}</p>
                  </div>
                )}
              </div>

              {/* CTA */}
              <div className="p-6 border-t border-color-border bg-color-elevated">
                <Button
                  onClick={handleConfirmPayment}
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-2"
                  size="lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" /> Pay ₹{splitPayment ? Math.ceil(totalPrice / 2) : totalPrice}
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            /* BOOKING CONFIRMED SCREEN */
            <div className="p-6 text-center overflow-y-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                className="w-16 h-16 mx-auto bg-gradient-to-br from-color-success to-emerald-400 rounded-full flex items-center justify-center mb-4"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-1">Booking Confirmed!</h2>
              <p className="text-color-muted text-sm mb-6">Your gaming session is locked in. Show this QR at the counter.</p>

              {/* Generated QR */}
              <div className="inline-block p-4 bg-white/5 rounded-2xl border border-color-border mb-6">
                <QRCodeSVG value={`playgrid:booking:${bookingId}:${hub.id}:${consoleType}:${totalHours}hr`} size={180} />
              </div>

              <p className="text-sm text-color-muted mb-1">Booking ID</p>
              <p className="text-xl font-mono font-bold text-color-primary mb-6">{bookingId}</p>


              <div className="mt-6 space-y-3">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hub.name + ' ' + hub.address + ' ' + hub.city)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-color-secondary hover:text-secondary-hover transition-colors"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>
                <Button onClick={onClose} variant="outline" className="w-full">
                  Done
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
