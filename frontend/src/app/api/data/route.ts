import { NextResponse } from 'next/server';
import { channels, streamers, transmissions } from '@/lib/data';

export async function GET() {
  return NextResponse.json({ channels, streamers, transmissions });
}
