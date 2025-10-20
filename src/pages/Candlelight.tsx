import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface CityData {
  city: string;
  slug: string;
  eventsCount: number;
  nextEventDate: string;
  venue: string;
  image: string;
  totalAttendees: number;
}

const cities: CityData[] = [
  {
    city: 'Москва',
    slug: 'moscow',
    eventsCount: 12,
    nextEventDate: '29 октября',
    venue: 'LOFT HALL',
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
    totalAttendees: 8542
  },
  {
    city: 'Санкт-Петербург',
    slug: 'saint-petersburg',
    eventsCount: 8,
    nextEventDate: '20 ноября',
    venue: 'Дворец Белосельских-Белозерских',
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg',
    totalAttendees: 4891
  },
  {
    city: 'Казань',
    slug: 'kazan',
    eventsCount: 6,
    nextEventDate: '10 декабря',
    venue: 'Усадьба Баташева',
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg',
    totalAttendees: 1851
  }
];

const Candlelight = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const filteredCities = selectedCity 
    ? cities.filter(c => c.slug === selectedCity) 
    : cities;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        <img
          src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg"
          alt="Концерт при свечах"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-6 bg-amber-500/20 text-amber-200 border-amber-500/30 text-sm px-4 py-1.5">
            Концерты при свечах
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Тысячи свечей. Один зал.<br />
            <span className="text-amber-400">Живая музыка, к которой хочется вернуться.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Классическая музыка в атмосфере 1000 свечей<br />
            в исторических особняках вашего города
          </p>
          <Button 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-6 text-lg"
            onClick={() => document.getElementById('cities')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Icon name="Calendar" className="mr-2" size={20} />
            Выбрать город и дату
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">15 000+</div>
              <div className="text-gray-400">Довольных гостей</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">500+</div>
              <div className="text-gray-400">Концертов</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">15</div>
              <div className="text-gray-400">Городов России</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">1000</div>
              <div className="text-gray-400">Свечей на концерте</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section id="cities" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Выберите ваш город</h2>
            <p className="text-xl text-gray-400">
              Концерты при свечах проходят в лучших локациях каждого города
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredCities.map((cityData) => (
              <Card 
                key={cityData.slug}
                className="bg-gray-900/50 border-white/10 overflow-hidden cursor-pointer hover:border-amber-500/50 transition-all group"
                onClick={() => navigate(`/candlelight/${cityData.slug}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={cityData.image} 
                    alt={cityData.city}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-1">{cityData.city}</h3>
                    <p className="text-sm text-gray-300">{cityData.venue}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Icon name="Calendar" size={18} />
                      <span className="font-semibold">Ближайший: {cityData.nextEventDate}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>{cityData.eventsCount} концертов в сезоне</span>
                    <span>{cityData.totalAttendees.toLocaleString()} гостей</span>
                  </div>
                  <Button 
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/candlelight/${cityData.slug}`);
                    }}
                  >
                    Смотреть афишу
                    <Icon name="ArrowRight" className="ml-2" size={18} />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Как это работает</h2>
            <p className="text-xl text-gray-400">Всего 3 простых шага до незабываемого вечера</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-amber-500/50">
                <Icon name="Search" size={32} className="text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">1. Выберите концерт</h3>
              <p className="text-gray-400">
                Найдите событие в своём городе: Вивальди, Моцарт, Чайковский и другие композиторы
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-amber-500/50">
                <Icon name="CreditCard" size={32} className="text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">2. Купите билет</h3>
              <p className="text-gray-400">
                Безопасная оплата онлайн. Билеты на email за 2 минуты
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-amber-500/50">
                <Icon name="Sparkles" size={32} className="text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mb-3">3. Наслаждайтесь</h3>
              <p className="text-gray-400">
                Приходите в зал, погружайтесь в атмосферу свечей и живой музыки
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-12">
            <Icon name="Music" size={48} className="text-amber-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Готовы к незабываемому вечеру?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Выберите свой город и забронируйте место на ближайший концерт при свечах
            </p>
            <Button 
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-6 text-lg"
              onClick={() => document.getElementById('cities')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Выбрать город
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Candlelight;
