import { Review, CityLight, CityStats } from '@/types/events';
import { concerts } from './concerts';

export const mockEvents = concerts;

export const mockReviews: Review[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: 'https://i.pravatar.cc/150?img=1',
    rating: 5,
    text: 'Невероятная атмосфера! Свечи, живая музыка и прекрасная акустика создали волшебный вечер. Обязательно вернусь снова!',
    date: '2024-02-28',
    event: 'Вивальди при свечах'
  },
  {
    id: 2,
    name: 'Дмитрий Соколов',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 5,
    text: 'Пришли с девушкой на свидание — она в восторге! Романтичнее места сложно придумать. Спасибо за незабываемые эмоции.',
    date: '2024-02-25',
    event: 'Моцарт в огнях свечей'
  },
  {
    id: 3,
    name: 'Елена Морозова',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5,
    text: 'Ходили всей семьёй с детьми. Дети впервые услышали классику вживую и были заворожены. Культурный вечер удался на все 100%!',
    date: '2024-02-20',
    event: 'Бах. Шедевры барокко'
  }
];

export const cityLights: CityLight[] = [
  { id: 1, city: 'Москва', venue: 'LOFT HALL', lat: 55.7558, lon: 37.6173, x: 55, y: 45, count: 8542, todayCount: 127, user: '@anna_m', text: 'Свечи, музыка и любимый рядом ✨', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg', likes: 1200 },
  { id: 2, city: 'Москва', venue: 'Особняк Румянцева', lat: 55.7600, lon: 37.6200, x: 56, y: 46, count: 8542, todayCount: 127, user: '@dmitry_love', text: 'Сделал предложение под Вивальди 💍', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg', likes: 3800 },
  { id: 3, city: 'Москва', venue: 'Доходный дом Баженова', lat: 55.7500, lon: 37.6100, x: 54, y: 44, count: 8542, todayCount: 127, user: '@maria_art', text: 'Идеальное первое свидание 🎻', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg', likes: 892 },
  { id: 4, city: 'Москва', venue: 'Палаты Аверкия Кириллова', lat: 55.7480, lon: 37.6350, x: 55, y: 46, count: 8542, todayCount: 127, user: '@moscowlights', text: 'Атмосфера старой Москвы 🏛️', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg', likes: 2340 },
  { id: 5, city: 'Санкт-Петербург', venue: 'Дворец Белосельских-Белозерских', lat: 59.9343, lon: 30.3351, x: 52, y: 35, count: 4891, todayCount: 89, user: '@peter_culture', text: 'Бах в историческом зале = магия', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg', likes: 2100 },
  { id: 6, city: 'Санкт-Петербург', venue: 'Особняк Кельха', lat: 59.9400, lon: 30.3400, x: 53, y: 36, count: 4891, todayCount: 89, user: '@spb_romance', text: 'Романтика Белых ночей при свечах', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg', likes: 1650 },
  { id: 7, city: 'Санкт-Петербург', venue: 'Особняк Половцова', lat: 59.9420, lon: 30.3280, x: 52, y: 36, count: 4891, todayCount: 89, user: '@nevsky_lights', text: 'Вечер, который запомнится навсегда', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg', likes: 1890 },
  { id: 8, city: 'Казань', venue: 'Усадьба Баташева', lat: 55.7964, lon: 49.1089, x: 62, y: 48, count: 1851, todayCount: 34, user: '@kazan_vibe', text: 'Моцарт в Усадьбе Баташева 🔥', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg', likes: 567 },
  { id: 9, city: 'Казань', venue: 'Дом Ушковой', lat: 55.7900, lon: 49.1220, x: 63, y: 48, count: 1851, todayCount: 34, user: '@tatar_classic', text: 'Классика в сердце Казани 🎼', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg', likes: 723 },
];

export const cityStats: CityStats[] = [
  { city: 'Москва', total: 8542, today: 127, color: '#FF8C42' },
  { city: 'Санкт-Петербург', total: 4891, today: 89, color: '#3CB8E0' },
  { city: 'Казань', total: 1851, today: 34, color: '#8B7AB8' },
];

export const availableCities = ['Москва', 'Санкт-Петербург', 'Казань'];