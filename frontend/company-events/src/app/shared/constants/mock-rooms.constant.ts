import { IRoom } from '@company/shared/models/room.interface';

export const MOCK_ROOMS: IRoom[] = [
  {
    id: 1,
    name: 'Conference Room A',
    capacity: 20,
    events: [
      {
        id: 101,
        name: 'Team Meeting',
        date: new Date('2025-05-04'),
        eventStart: '10:00',
        eventEnd: '11:00',
        location: 'Conference Room A',
        organizer: 'John Doe',
        participants: ['Alice', 'Bob'],
        description: 'Monthly team meeting to discuss project updates.',
      },
      {
        id: 102,
        name: 'Project Kickoff',
        date: new Date('2025-05-04'),
        eventStart: '14:00',
        eventEnd: '20:30',
        location: 'Conference Room A',
        organizer: 'Jane Smith',
        participants: ['Alice', 'Bob', 'Charlie'],
        description: 'Kickoff meeting for the new project.',
      },
    ],
  },
  {
    id: 2,
    name: 'Conference Room B',
    capacity: 15,
    events: [
      {
        id: 201,
        name: 'Client Presentation',
        date: new Date('2025-05-04'),
        eventStart: '09:00',
        eventEnd: '10:30',
        location: 'Conference Room B',
        organizer: 'Sarah Johnson',
        participants: ['Client A', 'Client B'],
        description: 'Presentation of the project proposal to the client.',
      },
    ],
  },
  {
    id: 3,
    name: 'Small Meeting Room',
    capacity: 5,
    events: [],
  },
];
