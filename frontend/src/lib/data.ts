import { Channel, Streamer, Transmission } from './types';

export const streamers: Streamer[] = [
  {
    id: 1,
    name: 'Mike',
    slug: 'mike',
    avatar: '/mike.jpg',
    platform: 'twitch',
  },
  {
    id: 2,
    name: 'Anna',
    slug: 'anna',
    avatar: '/anna.jpg',
    platform: 'youtube',
  },
];

export const channels: Channel[] = [
  {
    id: 1,
    name: 'Mike',
    slug: 'mike',
    icon: '🎮',
    themeColor: '#FF8800',
    description: 'Gaming with Mike',
  },
  {
    id: 2,
    name: 'Music',
    slug: 'music',
    icon: '🎵',
    themeColor: '#00AAFF',
    description: 'Live music sessions',
  },
];

export const transmissions: Transmission[] = [
  {
    id: 1,
    channelId: 1,
    streamerId: 1,
    date: '2024-01-01',
    startTime: '18:00',
    duration: 120,
    title: 'Let\'s Play!',
    embedCode: '<iframe src="https://player.twitch.tv/?channel=mike&parent=localhost" allowfullscreen></iframe>',
  },
  {
    id: 2,
    channelId: 2,
    streamerId: 2,
    date: '2024-01-01',
    startTime: '20:00',
    duration: 90,
    title: 'Acoustic Live',
    embedCode: '<iframe src="https://www.youtube.com/embed/live_stream?channel=anna" allowfullscreen></iframe>',
  },
];
