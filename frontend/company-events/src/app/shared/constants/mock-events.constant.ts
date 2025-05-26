import { IEvent } from '@company/shared/models/event.interface';

export const MOCK_EVENTS: IEvent[] = [
  {
    id: 1,
    name: 'Company Anniversary',
    date: new Date('2025-16-04'),
    eventStart: '10:00',
    eventEnd: '12:00',
    location: 'Main Office',
    organizer: 'HR Department',
    participants: [],
    description: 'Join us to celebrate our company anniversary with a special event!',
  },
  {
    id: 2,
    name: 'Team Building Workshop',
    date: new Date('2025-16-04'),
    eventStart: '09:00',
    eventEnd: '12:00',
    location: 'Conference Center',
    organizer: 'Training Team',
    participants: [],
    description: 'A fun and engaging workshop to strengthen team dynamics and collaboration.',
  },
  {
    id: 3,
    name: 'Summer Party',
    date: new Date('2025-05-04'),
    eventStart: '15:00',
    eventEnd: '18:00',
    location: 'City Park',
    organizer: 'Events Committee',
    participants: [],
    description: 'Join us for a summer party with food, games, and fun activities!',
  },
];
