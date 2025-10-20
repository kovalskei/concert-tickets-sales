import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/HomePage/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { concerts, Concert } from '@/data/concerts';

const ConcertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState<Concert | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState(1);
  const [activeUsers, setActiveUsers] = useState(2);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    const foundConcert = concerts.find(c => c.id === Number(id));
    setConcert(foundConcert || null);

    // Имитация активных пользователей на основе времени
    const updateActiveUsers = () => {
      const now = Date.now();
      const hourOfDay = new Date().getHours();
      
      // Базовое количество зависит от времени суток
      let baseUsers = 1;
      if (hourOfDay >= 9 && hourOfDay < 12) baseUsers = 3; // Утро
      else if (hourOfDay >= 12 && hourOfDay < 18) baseUsers = 5; // День
      else if (hourOfDay >= 18 && hourOfDay < 23) baseUsers = 8; // Вечер (пик)
      else baseUsers = 1; // Ночь
      
      // Добавляем случайную вариацию на основе секунд
      const variation = Math.floor((now / 1000) % 5) - 2;
      const users = Math.max(1, Math.min(12, baseUsers + variation));
      
      setActiveUsers(users);
    };

    updateActiveUsers();
    const interval = setInterval(updateActiveUsers, 15000); // Обновляем каждые 15 секунд

    return () => clearInterval(interval);
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
          {concert.id === 1 ? (
            <div className="absolute inset-0">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/20251020_1959_01k7z8pg9yfkp8jhjkpv30mq93.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${concert.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            </div>
          )}
          
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
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-6 h-6 flex-shrink-0">
                      <img src="https://cdn.poehali.dev/files/ccaa833a-e892-4627-8746-381eb78e13ff.png" alt="Д" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mt-2">
                      Что вас ждёт
                    </h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">
                    {concert.description}
                  </p>
                </CardContent>
              </Card>

              {/* Программа */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-6 h-6 flex-shrink-0">
                      <img src="https://cdn.poehali.dev/files/fbdfa858-a81b-487f-a529-d81161aedd71.png" alt="И" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mt-2">
                      Программа вечера
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Каждая композиция — отдельная история</p>
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
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-6 h-6 flex-shrink-0">
                      <img src="https://cdn.poehali.dev/files/6bd8192c-a55d-4353-aae7-6492a1347e01.png" alt="В" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mt-2">
                      Важная информация
                    </h2>
                  </div>
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
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg mb-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm font-bold">
                      <Icon name="Users" size={16} className="animate-pulse" />
                      <span>Прямо сейчас {activeUsers} {activeUsers === 1 ? 'человек выбирает' : activeUsers < 5 ? 'человека выбирают' : 'человек выбирают'} места</span>
                    </div>
                  </div>
                  <div className="text-center mb-6">
                    <div className="text-sm text-muted-foreground mb-2">Цена билета</div>
                    <div className="text-4xl font-heading font-bold text-foreground">2900</div>
                    <p className="text-xs text-muted-foreground mt-2">💫 Включено шампанское в антракте</p>
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

                  <a 
                    href="https://qtickets.ru/event/193730"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center rounded-md bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 text-white font-bold shadow-lg px-8 py-3 text-base transition-all"
                  >Купить билет</a>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Users" size={16} className="text-[#3CB8E0]" />
                      <span className="text-muted-foreground"><strong className="text-foreground">127 человек</strong> смотрят это событие</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Shield" size={16} className="text-[#3CB8E0]" />
                      <span>Безопасная оплата</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="RefreshCw" size={16} className="text-[#3CB8E0]" />
                      <span>Возврат 100% за 24 часа</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Gift" size={16} className="text-[#FF8C42]" />
                      <span>Можно подарить другу</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Галерея фото */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-6 h-6 flex-shrink-0">
                      <img src="https://cdn.poehali.dev/files/cd2c79e9-6ed4-48a2-a2f5-28504c096c1b.png" alt="О" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mt-2">
                      Посмотрите, как это было
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Реальные фото с наших концертов — без фотошопа, только эмоции</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <img 
                      src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/4bdc00b8-a05e-429d-b880-04fa6a680fa2.jpg"
                      alt="Зал с свечами"
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                    <img 
                      src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/51f4a196-09ec-45db-a866-4655198245a0.jpg"
                      alt="Публика"
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                    <img 
                      src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8fb492fa-0b5a-4001-acea-980eb657556f.jpg"
                      alt="Музыканты"
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                    <img 
                      src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/c8f3f358-e84f-4378-bccd-ab1db6711cf5.jpg"
                      alt="Пианист"
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                    <img 
                      src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/fd39e944-c009-4a04-a91d-a307041c8b4b.jpg"
                      alt="Романтика"
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                    <img 
                      src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/f0cdfd35-4be0-43e1-acd7-af401748a1a4.jpg"
                      alt="Панорама"
                      className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Площадка */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-2">
                    <div className="w-6 h-6 flex-shrink-0">
                      <img src="https://cdn.poehali.dev/files/ccaa833a-e892-4627-8746-381eb78e13ff.png" alt="Д" className="w-full h-full object-contain" />
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-foreground mt-2">
                      Где это будет происходить
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">Место, которое само по себе — произведение искусства</p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Icon name="MapPin" size={20} className="text-[#FF8C42] mt-1" />
                      <div>
                        <p className="font-semibold text-foreground mb-1">{concert.venue}</p>
                        <p className="text-sm text-muted-foreground">
                          Садовая улица, 12, {concert.location}
                        </p>
                      </div>
                    </div>
                    <div className="relative h-96 bg-muted rounded-lg overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-br from-[#3CB8E0]/20 to-[#8B7AB8]/20 flex items-center justify-center">
                        <Icon name="MapPin" size={64} className="text-[#3CB8E0]" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-red-500 text-white border-0 px-4 py-2">
                          {concert.venue} - вход с Садовой
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Похожие концерты */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                ✨ Вам может понравиться
              </h2>
              <p className="text-muted-foreground text-lg">
                Другие волшебные вечера, которые стоит посетить
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <Card 
                  key={item}
                  className="group overflow-hidden cursor-pointer hover:shadow-xl transition-all"
                  onClick={() => navigate(`/concert/${item}`)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg"
                      alt="Концерт"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                    <Badge className="absolute top-4 right-4 bg-[#3CB8E0]">
                      Канделайт
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                      Чайковский и Рахманинов
                    </h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Icon name="Calendar" size={16} />
                        <span>29 октября 2025</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="MapPin" size={16} />
                        <span>LOFT HALL, Москва</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-2xl font-bold">1800₽</span>
                      <Button size="sm" className="bg-[#3CB8E0]">Купить билет</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ConcertDetails;