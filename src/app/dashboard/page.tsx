import { Suspense } from 'react';
import PortalLayout from '@/components/portal/PortalLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portal — Gbi Gubae Sunday School',
  description: 'Access your role-based dashboard for the Debre Berhan Unity Churches Sunday School learning platform.',
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">Loading Portal...</div>}>
      <PortalLayout />
    </Suspense>
  );
}
