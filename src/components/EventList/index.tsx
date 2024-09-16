import { Box } from '@mui/material';
import type { Event } from '../../@types';
import './index.scss';
import EventCard from '../EventCard';

type EventListProps = {
  events: Event[];
};
function EventList({ events }: EventListProps) {
  return (
    <Box className="card-list">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </Box>
  );
}

export default EventList;
