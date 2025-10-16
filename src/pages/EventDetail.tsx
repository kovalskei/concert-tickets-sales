import { useParams } from 'react-router-dom';
import EventHeader from '@/components/event/EventHeader';
import EventHero from '@/components/event/EventHero';
import EventFeatures from '@/components/event/EventFeatures';
import EventReviews from '@/components/event/EventReviews';
import EventBooking from '@/components/event/EventBooking';
import EventFAQ from '@/components/event/EventFAQ';

interface Event {
  id: number;
  title: string;
  artist: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  price: number;
  image: string;
  description: string;
  program: string[];
  duration: string;
  seatsLeft: number;
}

const mockEvents: { [key: number]: Event } = {
  1: {
    id: 1,
    title: 'Вивальди при свечах',
    artist: 'Камерный оркестр',
    date: '2025-11-14',
    time: '20:30',
    venue: 'Особняк Румянцева',
    city: 'Москва',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
    description: 'Сделайте вечер «как в кино». Купите билеты за 30 секунд — и сфотографируйтесь при свечах до и после.',
    program: [
      'Антонио Вивальди - Времена года',
      'Иоганн Себастьян Бах - Концерт для скрипки',
      'Георг Фридрих Гендель - Музыка на воде'
    ],
    duration: '1 час 45 минут',
    seatsLeft: 23
  },
  2: {
    id: 2,
    title: 'Бах. Шедевры барокко',
    artist: 'Трио "Барокко"',
    date: '2025-11-20',
    time: '19:00',
    venue: 'Дворец Белосельских-Белозерских',
    city: 'Санкт-Петербург',
    price: 2800,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/7fff8562-7c26-48d1-bda2-4fed92a9baa2.jpg',
    description: 'Окунитесь в эпоху барокко в окружении тысячи свечей. Лучшие произведения Баха в исполнении виртуозного трио.',
    program: [
      'Иоганн Себастьян Бах - Бранденбургские концерты',
      'Иоганн Себастьян Бах - Ария на струне соль',
      'Иоганн Себастьян Бах - Токката и фуга'
    ],
    duration: '1 час 30 минут',
    seatsLeft: 8
  },
  3: {
    id: 3,
    title: 'Моцарт. Реквием',
    artist: 'Хоровая капелла',
    date: '2025-12-05',
    time: '20:00',
    venue: 'Храм Христа Спасителя',
    city: 'Москва',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/f63e7f6b-3f63-4b92-85aa-a394cf4fec3f.jpg',
    description: 'Величественный Реквием Моцарта в исполнении хоровой капеллы. Духовная музыка в атмосфере свечей.',
    program: [
      'Вольфганг Амадей Моцарт - Реквием ре минор',
      'Вольфганг Амадей Моцарт - Ave Verum Corpus',
      'Вольфганг Амадей Моцарт - Lacrimosa'
    ],
    duration: '2 часа',
    seatsLeft: 15
  },
  4: {
    id: 4,
    title: 'Чайковский. Времена года',
    artist: 'Симфонический оркестр',
    date: '2025-12-12',
    time: '19:30',
    venue: 'Концертный зал им. Чайковского',
    city: 'Москва',
    price: 2900,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
    description: 'Проникновенные мелодии Чайковского в свете свечей. Путешествие через все времена года за один вечер.',
    program: [
      'Пётр Ильич Чайковский - Времена года',
      'Пётр Ильич Чайковский - Вальс цветов',
      'Пётр Ильич Чайковский - Танец феи Драже'
    ],
    duration: '1 час 45 минут',
    seatsLeft: 42
  }
};

const EventDetail = () => {
  const { id } = useParams();
  const event = mockEvents[Number(id)] || mockEvents[1];

  return (
    <div className="min-h-screen bg-background">
      <EventHeader />
      <EventHero event={event} />
      <EventFeatures />
      <EventReviews />
      <EventBooking event={event} />
      <EventFAQ />
    </div>
  );
};

export default EventDetail;
