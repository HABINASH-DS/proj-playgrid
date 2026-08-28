"use client"; // Needs to be client now because of Contexts, wait, I can make a Providers component instead so layout can be server component.

import { PlayGridProvider } from '@/context/PlayGridContext';
import { ToastProvider } from '@/components/ui/Toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PlayGridProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </PlayGridProvider>
  );
}
