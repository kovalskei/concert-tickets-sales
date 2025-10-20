import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import AuthDialog from '@/components/AuthDialog';

interface Event {
  id: number;
  title: string;
  artist: string;
  date: string;
  venue: string;
  city: string;
  price: number;
  image: string;
  seatsLeft: number;
  duration: string;
  time: string;
}

interface CityConfig {
  name: string;
  heroImage: string;
  description: string;
  venues: string[];
}

const cityConfigs: Record<string, CityConfig> = {
  moscow: {
    name: 'Москва',
    heroImage: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
    description: 'Концерты при свечах в исторических особняках столицы',
    venues: ['LOFT HALL', 'Особняк Румянцева', 'Доходный дом Баженова', 'Палаты Аверкия Кириллова']
  },
  kazan: {
    name: 'Казань',
    heroImage: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg',
    description: 'Магия классической музыки в сердце Татарстана',
    venues: ['Усадьба Баташева', 'Дом Ушковой', 'Национальная библиотека']
  },
  'saint-petersburg': {
    name: 'Санкт-Петербург',
    heroImage: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg',
    description: 'Романтика классики в дворцах культурной столицы',
    venues: ['Дворец Белосельских-Белозерских', 'Особняк Кельха', 'Особняк Половцова']
  }
};

const mockEvents: Record<string, Event[]> = {
  moscow: [
    {
      id: 1,
      title: 'Чайковский и Рахманинов',
      artist: 'Камерный оркестр',
      date: '2025-10-29',
      time: '19:00',
      duration: '90 минут',
      venue: 'LOFT HALL',
      city: 'Москва',
      price: 1800,
      image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
      seatsLeft: 15
    },
    {
      id: 2,
      title: 'Вивальди при свечах',
      artist: 'Скрипичный ансамбль',
      date: '2025-11-10',
      time: '20:00',
      duration: '90 минут',
      venue: 'Особняк Румянцева',
      city: 'Москва',
      price: 2500,
      image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/7b49f8ad-665c-45d2-902e-81f851a3c849.jpg',
      seatsLeft: 23
    }
  ],
  kazan: [
    {
      id: 4,
      title: 'Моцарт в огнях свечей',
      artist: 'Струнный квартет',
      date: '2025-12-10',
      time: '19:30',
      duration: '90 минут',
      venue: 'Усадьба Баташева',
      city: 'Казань',
      price: 2200,
      image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
      seatsLeft: 45
    }
  ],
  'saint-petersburg': [
    {
      id: 3,
      title: 'Бах. Шедевры барокко',
      artist: 'Трио "Барокко"',
      date: '2025-11-20',
      time: '19:00',
      duration: '90 минут',
      venue: 'Дворец Белосельских-Белозерских',
      city: 'Санкт-Петербург',
      price: 2800,
      image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/c18c1c3e-efd3-4b70-a3e4-38bd329cf3a4.jpg',
      seatsLeft: 8
    }
  ]
};

const faqs = [
  {
    question: 'Сколько длится концерт?',
    answer: 'Все концерты длятся примерно 90 минут без антракта. Это оптимальное время для полного погружения в атмосферу.'
  },
  {
    question: 'Можно ли приходить с детьми?',
    answer: 'Да, дети приветствуются! Рекомендуемый возраст — от 6 лет. Для детей до 3 лет вход свободный без отдельного места.'
  },
  {
    question: 'Дресс-код?',
    answer: 'Специального дресс-кода нет. Мы рекомендуем надеть то, в чём вам комфортно наслаждаться музыкой.'
  },
  {
    question: 'Как получить билеты?',
    answer: 'После оплаты билеты придут на email в формате PDF. Покажите QR-код на входе — с телефона или распечатанным.'
  }
];

const CandlelightCity = () => {
  const { city } = useParams<{ city: string }>();
  const navigate = useNavigate();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cityConfig = city ? cityConfigs[city] : null;
  const events = city ? mockEvents[city] || [] : [];

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId);
  }, []);

  useEffect(() => {
    if (!cityConfig) {
      navigate('/candlelight');
    }
  }, [cityConfig, navigate]);

  const handleBuyTicket = (event: Event) => {
    setSelectedEvent(event);
    if (isLoggedIn) {
      navigate('/concert/' + event.id);
    } else {
      setAuthDialogOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    if (selectedEvent) {
      navigate('/concert/' + selectedEvent.id);
    }
  };

  if (!cityConfig) {
    return null;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('ru-RU', { 
      day: 'numeric', 
      month: 'long',
      weekday: 'short'
    }).format(date);
  };

  const daysUntil = (dateStr: string) => {
    const eventDate = new Date(dateStr);
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <AuthDialog 
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        onSuccess={handleAuthSuccess}
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black z-10" />
        <img
          src={cityConfig.heroImage}
          alt={cityConfig.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <Button
            variant="ghost"
            className="mb-6 text-gray-300 hover:text-white"
            onClick={() => navigate('/candlelight')}
          >
            <Icon name="ArrowLeft" className="mr-2" size={18} />
            Все города
          </Button>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Концерты при свечах
          </h1>
          <h2 className="text-3xl md:text-4xl font-light text-amber-400 mb-6">
            {cityConfig.name}
          </h2>
          <p className="text-xl text-gray-300">
            {cityConfig.description}
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ближайшие концерты</h2>
            <p className="text-xl text-gray-400">{events.length} событий в сезоне</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {events.map((event) => {
              const days = daysUntil(event.date);
              
              return (
                <Card 
                  key={event.id}
                  className="bg-gray-900/50 border-white/10 overflow-hidden hover:border-amber-500/50 transition-all"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    {days <= 7 && days > 0 && (
                      <Badge className="absolute top-4 right-4 bg-red-500 text-white border-0">
                        <Icon name="Clock" size={14} className="mr-1" />
                        Через {days} {days === 1 ? 'день' : 'дня'}
                      </Badge>
                    )}
                    {event.seatsLeft < 20 && (
                      <Badge className="absolute top-4 left-4 bg-orange-500/90 text-white border-0">
                        Осталось {event.seatsLeft} мест
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="text-gray-400">{event.artist}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Icon name="Calendar" size={18} className="text-amber-400" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Icon name="Clock" size={18} className="text-amber-400" />
                        <span>Начало в {event.time}, {event.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Icon name="MapPin" size={18} className="text-amber-400" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-400">от</div>
                        <div className="text-3xl font-bold text-amber-400">{event.price} ₽</div>
                      </div>
                      <Button 
                        size="lg"
                        className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                        onClick={() => handleBuyTicket(event)}
                      >
                        Купить билет
                        <Icon name="ArrowRight" className="ml-2" size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Venues */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Наши площадки</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cityConfig.venues.map((venue, idx) => (
                <div 
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-gray-900/30 border border-white/10 rounded-lg"
                >
                  <Icon name="Building2" size={24} className="text-amber-400" />
                  <span className="text-lg">{venue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Часто задаваемые вопросы</h2>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, idx) => (
                <AccordionItem 
                  key={idx} 
                  value={`item-${idx}`}
                  className="bg-gray-900/30 border border-white/10 rounded-lg px-6"
                >
                  <AccordionTrigger className="text-left text-lg hover:text-amber-400">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Не пропустите волшебство
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Места быстро раскупаются — забронируйте свой билет прямо сейчас
            </p>
            <Button 
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-6 text-lg"
              onClick={() => document.querySelector('.bg-gray-900\\/50')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Выбрать концерт
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandlelightCity;
