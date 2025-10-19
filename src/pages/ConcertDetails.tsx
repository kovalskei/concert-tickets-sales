import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/HomePage/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Concert {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  price: number;
  image: string;
  description: string;
  program: string[];
  duration: string;
  category: string;
}

const ConcertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState<Concert | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState(1);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    // Моковые данные концертов
    const concerts: Concert[] = [
      {
        id: 1,
        title: 'Вивальди: Времена года',
        date: '2024-11-15',
        time: '19:00',
        location: 'Москва',
        venue: 'Концертный зал им. Чайковского',
        price: 1500,
        image: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=2070',
        description: 'Погрузитесь в атмосферу волшебства классической музыки при свечах. Знаменитый цикл Антонио Вивальди "Времена года" исполнит камерный оркестр в уникальной обстановке, освещённой сотнями свечей.',
        program: [
          'Антонио Вивальди - Концерт "Весна"',
          'Антонио Вивальди - Концерт "Лето"',
          'Антонио Вивальди - Концерт "Осень"',
          'Антонио Вивальди - Концерт "Зима"'
        ],
        duration: '1 час 30 минут',
        category: 'Классика'
      },
      {
        id: 2,
        title: 'Бах и Моцарт при свечах',
        date: '2024-11-22',
        time: '20:00',
        location: 'Санкт-Петербург',
        venue: 'Филармония',
        price: 1800,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070',
        description: 'Насладитесь шедеврами великих композиторов в интимной атмосфере концерта при свечах. Произведения Баха и Моцарта в исполнении талантливых музыкантов подарят незабываемые эмоции.',
        program: [
          'И.С. Бах - Токката и фуга ре минор',
          'В.А. Моцарт - Маленькая ночная серенада',
          'И.С. Бах - Ария из сюиты №3',
          'В.А. Моцарт - Реквием (фрагменты)'
        ],
        duration: '1 час 45 минут',
        category: 'Классика'
      },
      {
        id: 3,
        title: 'Людовико Эйнауди',
        date: '2024-12-01',
        time: '19:30',
        location: 'Москва',
        venue: 'Зарядье',
        price: 2000,
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=2070',
        description: 'Современная классика от итальянского композитора Людовико Эйнауди. Минималистичные мелодии, наполненные глубоким смыслом, в уникальной атмосфере при свечах.',
        program: [
          'Nuvole Bianche',
          'Una Mattina',
          'Divenire',
          'Experience',
          'Fly'
        ],
        duration: '2 часа',
        category: 'Современная классика'
      }
    ];

    const foundConcert = concerts.find(c => c.id === Number(id));
    setConcert(foundConcert || null);
  }, [id]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleBuyTickets = () => {
    if (!isLoggedIn) {
      navigate('/', { state: { showAuth: true } });
      return;
    }
    // Логика покупки билетов
    console.log(`Покупка ${selectedTickets} билетов на концерт ${concert?.title}`);
  };

  if (!concert) {
    return (
      <>
        <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Концерт не найден
            </h1>
            <Button onClick={() => navigate('/')}>Вернуться на главную</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <Navigation isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      
      <div className="min-h-screen bg-background">
        {/* Hero секция с изображением */}
        <div className="relative h-[60vh] min-h-[400px]">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${concert.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          
          <div className="relative container mx-auto px-4 h-full flex items-end pb-12">
            <div className="max-w-3xl">
              <Badge className="mb-4 bg-[#3CB8E0] hover:bg-[#3CB8E0]/90">
                {concert.category}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-4">
                {concert.title}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  <span>{formatDate(concert.date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={20} />
                  <span>{concert.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={20} />
                  <span>{concert.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Основной контент */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Левая колонка - информация */}
            <div className="lg:col-span-2 space-y-8">
              {/* Описание */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                    О концерте
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {concert.description}
                  </p>
                </CardContent>
              </Card>

              {/* Программа */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Программа концерта
                  </h2>
                  <ul className="space-y-3">
                    {concert.program.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Icon name="Music" size={20} className="text-[#3CB8E0] mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Детали */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
                    Детали мероприятия
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <Icon name="MapPin" size={24} className="text-[#3CB8E0]" />
                      <div>
                        <div className="text-sm text-muted-foreground">Место проведения</div>
                        <div className="font-semibold">{concert.venue}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                      <Icon name="Clock" size={24} className="text-[#3CB8E0]" />
                      <div>
                        <div className="text-sm text-muted-foreground">Продолжительность</div>
                        <div className="font-semibold">{concert.duration}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Правая колонка - покупка билетов */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-2 border-[#3CB8E0]/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-sm text-muted-foreground mb-2">Цена билета</div>
                    <div className="text-4xl font-heading font-bold text-foreground">
                      {concert.price}₽
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">
                        Количество билетов
                      </label>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSelectedTickets(Math.max(1, selectedTickets - 1))}
                        >
                          <Icon name="Minus" size={16} />
                        </Button>
                        <div className="flex-1 text-center text-xl font-semibold">
                          {selectedTickets}
                        </div>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSelectedTickets(Math.min(10, selectedTickets + 1))}
                        >
                          <Icon name="Plus" size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-muted-foreground">Итого:</span>
                        <span className="text-2xl font-bold text-foreground">
                          {concert.price * selectedTickets}₽
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-[#3CB8E0] hover:bg-[#3CB8E0]/90 text-white"
                    size="lg"
                    onClick={handleBuyTickets}
                  >
                    <Icon name="Ticket" size={20} className="mr-2" />
                    Купить билеты
                  </Button>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Shield" size={16} className="text-[#3CB8E0]" />
                      <span>Безопасная оплата</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="RefreshCw" size={16} className="text-[#3CB8E0]" />
                      <span>Возврат билетов за 24 часа</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ConcertDetails;