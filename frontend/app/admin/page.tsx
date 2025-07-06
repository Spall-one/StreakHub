'use client';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Channel, Streamer, Transmission } from '@/lib/types';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('@/components/AdminCalendar'), { ssr: false });

export default function AdminPage() {
  const { data: session } = useSession();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);

  const handleDownload = () => {
    window.open('/api/palinsesto/template', '_blank');
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    await fetch('/api/palinsesto/upload', {
      method: 'POST',
      body: formData,
    });
    alert('File uploaded');
    e.target.value = '';
  };

  useEffect(() => {
    fetch('/api/data')
      .then((r) => r.json())
      .then((data) => {
        setChannels(data.channels);
        setStreamers(data.streamers);
        setTransmissions(data.transmissions);
      });
  }, []);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <button
          onClick={() => signIn()}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Streak Admin</h1>
        <button
          onClick={() => signOut()}
          className="text-sm underline"
        >
          Logout
        </button>
      </header>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleDownload}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Scarica template
        </button>
        <input type="file" accept=".xlsx" onChange={handleUpload} />
      </div>

      <Calendar transmissions={transmissions} channels={channels} />
    </div>
  );
}
