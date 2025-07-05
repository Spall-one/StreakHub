'use client';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Channel, Streamer, Transmission } from '@/lib/types';

interface DataPayload {
  channels: Channel[];
  streamers: Streamer[];
  transmissions: Transmission[];
}

export default function Home() {
  const { data: session } = useSession();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(null);
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);
  const [streamers, setStreamers] = useState<Streamer[]>([]);
  const [embed, setEmbed] = useState<string>('');
  const [upcoming, setUpcoming] = useState<Transmission[]>([]);

  useEffect(() => {
    fetch('/api/data')
      .then((r) => r.json())
      .then((data: DataPayload) => {
        setChannels(data.channels);
        setStreamers(data.streamers);
        setTransmissions(data.transmissions);
        setCurrentChannel(data.channels[0]);
      });
  }, []);

  useEffect(() => {
    if (!currentChannel) return;
    const today = new Date().toISOString().slice(0, 10);
    const nowMinutes = new Date().getHours() * 60 + new Date().getMinutes();
    const todays = transmissions.filter(
      (t) => t.channelId === currentChannel.id && t.date === today
    );
    const current = todays.find((t) => {
      const startMinutes = parseInt(t.startTime.split(':')[0]) * 60 + parseInt(t.startTime.split(':')[1]);
      return nowMinutes >= startMinutes && nowMinutes < startMinutes + t.duration;
    });
    if (current) {
      setEmbed(current.embedCode);
    } else {
      setEmbed('');
    }
    const future = todays
      .filter((t) => {
        const startMinutes = parseInt(t.startTime.split(':')[0]) * 60 + parseInt(t.startTime.split(':')[1]);
        return startMinutes >= nowMinutes;
      })
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    setUpcoming(future);
  }, [currentChannel, transmissions]);

  const currentStreamer = (transId: number) =>
    streamers.find((s) => s.id === transId);

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <header className="p-4 flex justify-between items-center bg-white shadow">
        <h1 className="text-xl font-bold">Streak</h1>
        <div>
          {session ? (
            <button onClick={() => signOut()} className="text-sm">Logout</button>
          ) : (
            <button onClick={() => signIn()} className="text-sm">Login</button>
          )}
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-56 bg-white border-r overflow-y-auto">
          <ul>
            {channels.map((c) => (
              <li
                key={c.id}
                className={`p-3 cursor-pointer hover:bg-gray-200 ${
                  currentChannel?.id === c.id ? 'bg-gray-200' : ''
                }`}
                onClick={() => setCurrentChannel(c)}
              >
                <span className="mr-2">{c.icon}</span>
                {c.name}
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-4 overflow-y-auto">
          {embed ? (
            <div className="aspect-video w-full mb-4" dangerouslySetInnerHTML={{ __html: embed }} />
          ) : (
            <div className="aspect-video w-full mb-4 flex items-center justify-center bg-black text-white">
              Nessuna trasmissione in corso
            </div>
          )}
          <h2 className="text-lg font-semibold mb-2">Prossimi eventi</h2>
          <ul>
            {upcoming.map((t) => (
              <li key={t.id} className="mb-2 p-2 bg-white rounded shadow">
                <div className="font-bold">{t.title}</div>
                <div className="text-sm">
                  {t.startTime} - {currentStreamer(t.streamerId)?.name}
                </div>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
}
