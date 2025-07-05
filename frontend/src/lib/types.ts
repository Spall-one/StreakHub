export interface Streamer {
  id: number;
  name: string;
  slug: string;
  avatar: string;
  platform: 'twitch' | 'youtube';
  socialLinks?: Record<string, string>;
}

export interface Channel {
  id: number;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  themeColor?: string;
}

export interface Transmission {
  id: number;
  channelId: number;
  streamerId: number;
  date: string; // yyyy-mm-dd
  startTime: string; // HH:mm
  duration: number; // minutes
  title: string;
  embedCode: string;
}
