import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import EventHero from '@/components/event/EventHero';
import EventFeatures from '@/components/event/EventFeatures';
import EventReviews from '@/components/event/EventReviews';
import EventBooking from '@/components/event/EventBooking';
import EventFAQ from '@/components/event/EventFAQ';
import { concerts, Concert } from '@/data/concerts';

// Преобразуем массив concerts в объект для быстрого доступа по id
const concertsById = concerts.reduce((acc, concert) => {
  acc[concert.id] = concert;
  return acc;
}, {} as { [key: number]: Concert });

const EventDetail = () => {
  const { id } = useParams();
  const event = concertsById[Number(id)] || concerts[0];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <EventHero event={event} />
      <EventFeatures />
      <EventReviews />
      <EventBooking event={event} />
      <EventFAQ />
    </div>
  );
};

export default EventDetail;