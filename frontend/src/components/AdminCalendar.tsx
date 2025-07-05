'use client';
import { Calendar, momentLocalizer, Event } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { parseISO } from 'date-fns';
import { Channel, Transmission } from '@/lib/types';
import moment from 'moment';

const localizer = momentLocalizer(moment);

interface Props {
  transmissions: Transmission[];
  channels: Channel[];
}

export default function AdminCalendar({ transmissions, channels }: Props) {
  const events: Event[] = transmissions.map((t) => ({
    title: t.title,
    start: new Date(`${t.date}T${t.startTime}`),
    end: new Date(
      parseISO(`${t.date}T${t.startTime}`).getTime() + t.duration * 60000
    ),
    resource: channels.find((c) => c.id === t.channelId)?.name,
  }));

  return (
    <Calendar
      localizer={localizer}
      events={events}
      defaultView="week"
      style={{ height: 500 }}
    />
  );
}
