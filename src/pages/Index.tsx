import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Event {
  id: number;
  title: string;
  artist: string;
  date: string;
  venue: string;
  city: string;
  price: number;
  image: string;
  genre: string;
  seatsLeft: number;
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Вивальди при свечах',
    artist: 'Камерный оркестр',
    date: '2025-11-14',
    venue: 'Особняк Румянцева',
    city: 'Москва',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
    genre: 'Канделайт',
    seatsLeft: 23
  },
  {
    id: 2,
    title: 'Бах. Шедевры барокко',
    artist: 'Трио "Барокко"',
    date: '2025-11-20',
    venue: 'Дворец Белосельских-Белозерских',
    city: 'Санкт-Петербург',
    price: 2800,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/7fff8562-7c26-48d1-bda2-4fed92a9baa2.jpg',
    genre: 'Канделайт',
    seatsLeft: 8
  },
  {
    id: 3,
    title: 'Моцарт. Реквием',
    artist: 'Хоровая капелла',
    date: '2025-12-05',
    venue: 'Храм Христа Спасителя',
    city: 'Москва',
    price: 3200,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/f63e7f6b-3f63-4b92-85aa-a394cf4fec3f.jpg',
    genre: 'Канделайт',
    seatsLeft: 15
  },
  {
    id: 4,
    title: 'Чайковский. Времена года',
    artist: 'Симфонический оркестр',
    date: '2025-12-12',
    venue: 'Концертный зал им. Чайковского',
    city: 'Москва',
    price: 2900,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
    genre: 'Канделайт',
    seatsLeft: 42
  }
];

const cities = ['Все города', 'Москва', 'Санкт-Петербург'];

const Index = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string>('Москва');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(mockEvents);

  useEffect(() => {
    const detectCity = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const detectedCity = data.city;
        if (cities.includes(detectedCity)) {
          setSelectedCity(detectedCity);
        }
      } catch (error) {
        console.log('Автоопределение города недоступно');
      }
    };
    detectCity();
  }, []);

  useEffect(() => {
    let filtered = mockEvents;

    if (selectedCity && selectedCity !== 'Все города') {
      filtered = filtered.filter(event => event.city === selectedCity);
    }

    if (selectedDate) {
      filtered = filtered.filter(event => event.date === selectedDate);
    }

    setFilteredEvents(filtered);
  }, [selectedCity, selectedDate]);

  const uniqueDates = Array.from(new Set(mockEvents.map(e => e.date))).sort();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3CB8E0] to-[#8B7AB8] rounded-lg flex items-center justify-center">
                <Icon name="Music" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-gradient">Диво</h1>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              <button className="text-foreground hover:text-primary transition-colors font-medium">
                Концерты
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                О нас
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                Отзывы
              </button>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                Контакты
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger className="w-[180px] border-[#3CB8E0]">
                  <div className="flex items-center gap-2">
                    <Icon name="MapPin" size={16} className="text-[#FF8C42]" />
                    <SelectValue placeholder="Выберите город" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  {cities.map(city => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="ghost" size="icon">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-background via-[#3CB8E0]/5 to-[#8B7AB8]/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-[#FF8C42]/20 text-[#FF8C42] border-[#FF8C42]/30">
              Канделайт концерты
            </Badge>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Классика при свечах
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Погрузитесь в волшебную атмосферу канделайт концертов. 
              Великие произведения в свете тысячи свечей в исторических залах.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-heading font-bold text-foreground">
              Ближайшие концерты
            </h3>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={20} className="text-[#3CB8E0]" />
                <Select value={selectedDate} onValueChange={setSelectedDate}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Все даты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Все даты</SelectItem>
                    {uniqueDates.map(date => (
                      <SelectItem key={date} value={date}>
                        {new Date(date).toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'long'
                        })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <Card 
                key={event.id}
                className="overflow-hidden bg-card border-border hover:card-glow transition-all cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-[#8B7AB8]/90 text-white border-0">
                      {event.genre}
                    </Badge>
                  </div>
                  {event.seatsLeft <= 20 && (
                    <div className="absolute top-3 right-3">
                      <Badge 
                        className={`${
                          event.seatsLeft <= 10 
                            ? 'bg-red-500/90 animate-pulse' 
                            : 'bg-orange-500/90'
                        } text-white border-0`}
                      >
                        Осталось {event.seatsLeft} мест
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <h4 className="text-xl font-heading font-bold text-foreground mb-2">
                    {event.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">{event.artist}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="Calendar" size={16} className="mr-2 text-[#3CB8E0]" />
                      {new Date(event.date).toLocaleDateString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="MapPin" size={16} className="mr-2 text-[#FF8C42]" />
                      {event.venue}, {event.city}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">От</p>
                      <p className="text-2xl font-heading font-bold text-foreground">
                        {event.price.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 shadow-lg">
                      <Icon name="Ticket" className="mr-2" size={18} />
                      Купить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground text-lg">
                Концертов не найдено. Попробуйте изменить фильтры.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3CB8E0] to-[#8B7AB8] rounded-lg flex items-center justify-center">
                  <Icon name="Music" size={16} className="text-white" />
                </div>
                <h4 className="font-heading font-bold text-xl text-gradient">Диво</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Канделайт концерты классической музыки в исторических залах России
              </p>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Концерты</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors">Москва</button></li>
                <li><button className="hover:text-primary transition-colors">Санкт-Петербург</button></li>
                <li><button className="hover:text-primary transition-colors">Расписание</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Помощь</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors">FAQ</button></li>
                <li><button className="hover:text-primary transition-colors">Возврат билетов</button></li>
                <li><button className="hover:text-primary transition-colors">Контакты</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Социальные сети</h5>
              <div className="flex gap-3">
                <button className="w-10 h-10 bg-[#3CB8E0]/20 rounded-full flex items-center justify-center hover:bg-[#3CB8E0]/30 transition-colors">
                  <Icon name="Instagram" size={20} className="text-[#3CB8E0]" />
                </button>
                <button className="w-10 h-10 bg-[#FF8C42]/20 rounded-full flex items-center justify-center hover:bg-[#FF8C42]/30 transition-colors">
                  <Icon name="Twitter" size={20} className="text-[#FF8C42]" />
                </button>
                <button className="w-10 h-10 bg-[#8B7AB8]/20 rounded-full flex items-center justify-center hover:bg-[#8B7AB8]/30 transition-colors">
                  <Icon name="Facebook" size={20} className="text-[#8B7AB8]" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Диво. Канделайт концерты. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
