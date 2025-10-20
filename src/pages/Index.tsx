import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import InteractiveExperienceSection from '@/components/InteractiveExperienceSection';
import MapWithLights from '@/components/MapWithLights';
import AuthDialog from '@/components/AuthDialog';
import { concerts, Concert } from '@/data/concerts';

interface Review {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  text: string;
  date: string;
  event: string;
}

const mockReviews: Review[] = [
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

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Concert | null>(null);
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2025-10-29');
  const [selectedEventsCity, setSelectedEventsCity] = useState<string>('all');
  const [showMyCityEvents, setShowMyCityEvents] = useState(false);
  const [userCity, setUserCity] = useState<string>('Определение...');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedMapCity, setSelectedMapCity] = useState<string | null>(null);
  const [selectedLight, setSelectedLight] = useState<any>(null);
  const [mapZoom, setMapZoom] = useState(1);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const testLogin = params.get('test_login');
    const testName = params.get('name');
    const testEmail = params.get('email');
    
    if (testLogin === 'true' && testName && testEmail) {
      console.log('Test login detected:', testName, testEmail);
      fetch('https://functions.poehali.dev/b85734c8-e904-4924-bcc7-218619173fbd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_user',
          email: testEmail,
          name: testName,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            localStorage.setItem('user_id', data.user_id);
            localStorage.setItem('user_email', testEmail);
            localStorage.setItem('user_name', testName);
            setIsLoggedIn(true);
            window.history.replaceState({}, '', '/');
          }
        })
        .catch(err => console.error('Test login failed:', err));
    } else {
      const userId = localStorage.getItem('user_id');
      console.log('Checking auth, user_id:', userId);
      setIsLoggedIn(!!userId);
    }
  }, []);

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.clear();
    setIsLoggedIn(false);
    window.location.reload();
  };

  const handleAuthSuccess = () => {
    const userId = localStorage.getItem('user_id');
    console.log('Auth success, user_id:', userId);
    setIsLoggedIn(!!userId);
  };

  const cityLights = [
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

  const cityStats = [
    { city: 'Москва', total: 8542, today: 127, color: '#FF8C42' },
    { city: 'Санкт-Петербург', total: 4891, today: 89, color: '#3CB8E0' },
    { city: 'Казань', total: 1851, today: 34, color: '#8B7AB8' },
  ];

  const winnerCity = cityStats.sort((a, b) => b.today - a.today)[0];

  const availableCities = ['Москва', 'Санкт-Петербург', 'Казань'];

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const detectedCity = data.city;
        if (availableCities.includes(detectedCity)) {
          setUserCity(detectedCity);
          setSelectedCity(detectedCity);
        } else {
          setUserCity('Вся Россия');
          setSelectedCity(null);
        }
      })
      .catch(() => {
        setUserCity('Вся Россия');
        setSelectedCity(null);
      });
  }, []);

  const availableDates = [
    { date: '2025-10-29', label: '29 октября' },
    { date: '2025-11-10', label: '10 ноября' },
    { date: '2025-11-20', label: '20 ноября' },
    { date: '2025-12-10', label: '10 декабря' }
  ];

  const filteredEvents = concerts.filter(event => {
    const matchesDate = event.date === selectedDate;
    const matchesCity = selectedCity ? event.city === selectedCity : true;
    return matchesDate && matchesCity;
  });

  const navigate = useNavigate();

  const openBooking = (event: Concert) => {
    setSelectedEvent(event);
    setIsBookingOpen(true);
  };

  const goToConcertPage = (eventId: number) => {
    navigate(`/concert/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/5226ab88-5245-4be9-87b4-163a302d667d.png" 
                alt="Диво" 
                className="h-7 w-auto object-contain"
              />
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => setActiveSection('main')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => setActiveSection('events')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                События
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                О нас
              </button>
              {!isLoggedIn ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setAuthDialogOpen(true)}
                  className="bg-gradient-to-r from-[#3CB8E0] to-[#FF8C42] hover:opacity-90"
                >
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Войти
                </Button>
              ) : (
                <>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => window.location.href = '/profile'}
                    className="bg-gradient-to-r from-[#3CB8E0] to-[#FF8C42] hover:opacity-90"
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Профиль
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                </>
              )}
              <button 
                onClick={() => setActiveSection('artists')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Артисты
              </button>
              <button 
                onClick={() => setActiveSection('tickets')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Мои билеты
              </button>
              <button 
                onClick={() => setActiveSection('contacts')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Контакты
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 transition-all bg-card/80 backdrop-blur-sm"
              >
                <Icon name="MapPin" size={18} className="text-primary" />
                <span className="text-sm font-medium">{userCity}</span>
                <Icon name="ChevronDown" size={16} className={`transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCityDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={() => {
                      setSelectedCity(null);
                      setUserCity('Вся Россия');
                      setIsCityDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Icon name="Globe" size={16} className="text-muted-foreground" />
                    <span className="text-sm">Вся Россия</span>
                  </button>
                  <div className="border-t border-border" />
                  {availableCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        setSelectedCity(city);
                        setUserCity(city);
                        setIsCityDropdownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Icon name="MapPin" size={16} className="text-primary" />
                      <span className="text-sm">{city}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/79999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-110 group"
        >
          <Icon name="MessageCircle" size={24} className="group-hover:animate-bounce" />
          <span className="font-semibold hidden md:inline">Помощь в WhatsApp</span>
        </a>
      </div>

      <div className="bg-gradient-to-r from-[#3CB8E0]/10 via-[#FF8C42]/10 to-[#8B7AB8]/10 border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={18} className="text-[#25D366]" />
              <span className="text-muted-foreground">15 000+ довольных гостей</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={18} className="text-[#3CB8E0]" />
              <span className="text-muted-foreground">Возврат билетов до 24 часов</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border"></div>
            <div className="flex items-center gap-2">
              <Icon name="Lock" size={18} className="text-[#8B7AB8]" />
              <span className="text-muted-foreground">Безопасная оплата</span>
            </div>
          </div>
        </div>
      </div>

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h2 className="text-6xl md:text-8xl font-heading font-black text-gradient glow-effect mb-6">Мировые хиты в атмосфере 1000 свечей</h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Магия классической музыки в окружении 1000 свечей. Уникальные концерты в исторических особняках России и СНГ.
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              <Badge className="bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all px-4 py-2 text-sm flex items-center gap-2">
                <Icon name="Star" size={16} className="text-amber-400" />
                <span className="font-semibold">4.9</span>
                <span className="text-muted-foreground">· 12 842 отзывов</span>
              </Badge>
              <Badge className="bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all px-4 py-2 text-sm">
                Безопасно
              </Badge>
              <Badge className="bg-card/80 backdrop-blur-sm border border-border hover:border-primary/50 transition-all px-4 py-2 text-sm">
                Возврат до 24 ч
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 text-lg px-8 h-14 shadow-lg">
                <Icon name="Flame" className="mr-2 candle-flicker" size={20} />
                Купить билет
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-[#3CB8E0] text-lg px-8 h-14 hover:bg-[#3CB8E0]/10">
                <Icon name="Calendar" className="mr-2" size={20} />
                Расписание
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-center">
              <div className="flex items-center gap-2">
                <Icon name="Flame" size={20} className="text-[#FF8C42] candle-flicker" />
                <div className="text-left">
                  <p className="text-2xl font-heading font-bold text-foreground leading-none">150+</p>
                  <p className="text-sm text-muted-foreground">Канделайт концертов</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={20} className="text-[#3CB8E0]" />
                <div className="text-left">
                  <p className="text-2xl font-heading font-bold text-foreground leading-none">12</p>
                  <p className="text-sm text-muted-foreground">Городов России и СНГ</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div className="flex items-center gap-2">
                <Icon name="Users" size={20} className="text-[#8B7AB8]" />
                <div className="text-left">
                  <p className="text-2xl font-heading font-bold text-foreground leading-none">50K+</p>
                  <p className="text-sm text-muted-foreground">Довольных гостей</p>
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div className="flex items-center gap-2">
                <Icon name="Sparkles" size={20} className="text-[#3CB8E0]" />
                <div className="text-left">
                  <p className="text-2xl font-heading font-bold text-foreground leading-none">1000</p>
                  <p className="text-sm text-muted-foreground">Свечей на каждом концерте</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-4xl font-heading font-bold text-foreground mb-2">Ближайшие ДИВО концерты</h3>
              <p className="text-muted-foreground">Погрузитесь в волшебную атмосферу классики при свечах</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSelectedEventsCity(userCity);
                  setShowMyCityEvents(true);
                }}
                className={`border-[#3CB8E0] ${
                  showMyCityEvents
                    ? 'bg-[#3CB8E0] text-white'
                    : 'hover:bg-[#3CB8E0]/10'
                }`}
              >В Моем городе</Button>
              <Button variant="outline" className="border-[#3CB8E0] hover:bg-[#3CB8E0]/10">Все города</Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => {
                setSelectedEventsCity('all');
                setShowMyCityEvents(false);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedEventsCity === 'all' && !showMyCityEvents
                  ? 'bg-primary/10 border-2 border-primary text-primary shadow-md'
                  : 'bg-card border border-border text-foreground hover:border-primary/50 hover:shadow-md'
              }`}
            >Все концерты</button>
            <button
              onClick={() => {
                setSelectedEventsCity(userCity);
                setShowMyCityEvents(true);
              }}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                showMyCityEvents
                  ? 'bg-primary/10 border-2 border-primary text-primary shadow-md'
                  : 'bg-card border border-border text-foreground hover:border-primary/50 hover:shadow-md'
              }`}
            >
              <Icon name="MapPin" size={18} />
              В моём городе
            </button>
            {Array.from(new Set(mockEvents.map(e => e.city))).map((city) => (
              <button
                key={city}
                onClick={() => {
                  setSelectedEventsCity(city);
                  setShowMyCityEvents(false);
                }}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedEventsCity === city && !showMyCityEvents
                    ? 'bg-primary/10 border-2 border-primary text-primary shadow-md'
                    : 'bg-card border border-border text-foreground hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {city}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-12">
            {availableDates.map((dateOption) => (
              <button
                key={dateOption.date}
                onClick={() => setSelectedDate(dateOption.date)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  selectedDate === dateOption.date
                    ? 'bg-primary/10 border-2 border-primary text-primary shadow-md'
                    : 'bg-card border border-border text-foreground hover:border-primary/50 hover:shadow-md'
                }`}
              >
                {dateOption.label}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showMyCityEvents && filteredEvents.filter(event => event.city === userCity).length === 0 && (
              <Card className="group overflow-hidden bg-gradient-to-br from-card via-muted/50 to-card border-2 border-dashed border-[#FF8C42]/50 animate-scale-in col-span-full md:col-span-1">
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-[#FF8C42]/10 to-[#8B7AB8]/10 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Icon name="MapPinOff" size={64} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                    <h4 className="text-2xl font-heading font-bold text-foreground mb-2">
                      В {userCity === 'Определение...' ? 'вашем городе' : `городе ${userCity}`} пока нет концертов
                    </h4>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <p className="text-lg text-muted-foreground mb-6 text-center">
                    Но мы можем организовать концерт специально для вас! Оставьте заявку, и мы свяжемся с вами.
                  </p>
                  
                  <div className="flex items-center justify-center pt-4 border-t border-border">
                    <Button 
                      onClick={() => setAuthDialogOpen(true)}
                      className="bg-gradient-to-r from-[#FF8C42] to-[#FF6B35] hover:opacity-90 shadow-lg text-white font-bold text-base px-8 py-6 w-full"
                    >
                      <Icon name="Sparkles" className="mr-2" size={20} />
                      Хочу концерт в своём городе
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {filteredEvents.filter(event => showMyCityEvents ? event.city === userCity : (selectedEventsCity === 'all' || event.city === selectedEventsCity)).map((event, index) => (
              <Card 
                key={event.id} 
                className="group overflow-hidden bg-card border-border hover:card-glow transition-all duration-300 animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => goToConcertPage(event.id)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent"></div>
                  <Badge className="absolute top-4 right-4 bg-primary/90 text-primary-foreground">
                    {event.genre}
                  </Badge>
                  {event.seatsLeft <= 20 && (
                    <Badge className={`absolute top-4 left-4 ${
                      event.seatsLeft <= 10 
                        ? 'bg-red-500 animate-pulse' 
                        : 'bg-orange-500'
                    } text-white border-0 font-bold`}>
                      <Icon name="AlertCircle" size={14} className="mr-1" />
                      Осталось {event.seatsLeft} мест
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h4 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h4>
                  <p className="text-lg text-muted-foreground mb-4">{event.artist}</p>
                  
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
                    <Button 
                      onClick={() => openBooking(event)}
                      className="bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 shadow-lg"
                    >
                      <Icon name="Ticket" className="mr-2" size={18} />
                      Купить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <InteractiveExperienceSection />

      {/* Section 3: Benefits - "Почему это вау" */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-b from-background via-muted/20 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] rounded-full animate-pulse-soft">
              <span className="text-white font-bold text-sm">✨ РЕАЛЬНОЕ ДИВО</span>
            </div>
            <h3 className="text-5xl md:text-7xl font-heading font-black text-foreground mb-4">Атмосфера мероприятий</h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Листай как сторис — это не просто концерт 🔥
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-4 auto-rows-[200px] group/grid">
              
              <div className="col-span-12 md:col-span-5 row-span-2 group relative transition-all duration-500 opacity-100 group-hover/grid:opacity-40 hover:!opacity-100">
                <div className="relative h-full phone-frame-glow rounded-[3rem] shadow-2xl">
                  <div className="relative h-full bg-black rounded-[3rem] p-4">
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20"></div>
                    <div className="relative h-full overflow-hidden rounded-[2.5rem] cursor-pointer transition-all duration-500 group-hover:scale-[0.98]">
                    <img 
                      src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/339ff3c5-fea4-49f6-af2f-ce9a751a729a.jpg"
                      alt="1000+ свечей"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      style={{
                        animation: 'candleFlicker 3s ease-in-out infinite'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <div className="bg-[#FF8C42] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                        🔥 ТОП-1
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h4 className="text-4xl md:text-5xl font-heading font-black mb-4 leading-tight">
                        1000+ свечей
                      </h4>
                      <p className="text-lg text-white/95 leading-relaxed mb-3">
                        Море живого огня создаёт эффект бесконечного пространства 🕯️
                      </p>
                      <p className="text-sm text-white/70">
                        Каждая свеча расставлена вручную для идеальной атмосферы
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-7 row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] opacity-40 group-hover/grid:opacity-40 hover:!opacity-100">
                <img 
                  src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/cb24fa73-00f9-4a3a-8ca5-05417038be31.jpg"
                  alt="Лучшие артисты"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
                <div className="absolute top-6 left-6">
                  <div className="bg-[#3CB8E0] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                    🎵 LIVE
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-3xl font-heading font-black mb-2">
                    Лучшие артисты России
                  </h4>
                  <p className="text-base text-white/90">
                    Лауреаты международных конкурсов и солисты ведущих оркестров 🎻
                  </p>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] opacity-40 group-hover/grid:opacity-40 hover:!opacity-100">
                <img 
                  src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/abe70ff3-9531-42ad-8416-cc7c9c9ededf.jpg"
                  alt="Дворцы"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute top-6 left-6">
                  <div className="bg-[#8B7AB8] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                    👑 VIP
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-2xl font-heading font-black mb-2">
                    Дворцы
                  </h4>
                  <p className="text-sm text-white/90">
                    История встречается с акустикой 🏛️
                  </p>
                </div>
              </div>

              <div className="col-span-12 md:col-span-3 row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] opacity-40 group-hover/grid:opacity-40 hover:!opacity-100">
                <img 
                  src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/05c9ba34-c79f-42eb-931c-74585b8ee1f3.jpg"
                  alt="Шампанское"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
                <div className="absolute top-6 left-6">
                  <div className="bg-[#3CB8E0] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                    🥂 ШИК
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-2xl font-heading font-black mb-2">
                    Шампанское
                  </h4>
                  <p className="text-sm text-white/90">
                    В антракте 🍾
                  </p>
                </div>
              </div>

              <div className="col-span-12 md:col-span-7 row-span-2 group relative transition-all duration-500 opacity-40 group-hover/grid:opacity-40 hover:!opacity-100">
                <div className="relative h-full phone-frame-glow rounded-[3rem] shadow-2xl">
                  <div className="relative h-full bg-black rounded-[3rem] p-4">
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-20"></div>
                    <div className="relative h-full overflow-hidden rounded-[2.5rem] cursor-pointer transition-all duration-500 group-hover:scale-[0.98]">
                    <img 
                      src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/d7470059-8845-48ae-b3c6-da268f5eab78.jpg"
                      alt="Инста-момент"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                    
                    <div className="absolute right-4 top-1/3 flex flex-col gap-4 items-center z-10">
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-1">
                          <Icon name="Heart" size={24} className="text-white" />
                        </div>
                        <span className="text-white text-xs font-bold">99K</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-1">
                          <Icon name="MessageCircle" size={24} className="text-white" />
                        </div>
                        <span className="text-white text-xs font-bold">2.3K</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-1">
                          <Icon name="Share2" size={24} className="text-white" />
                        </div>
                        <span className="text-white text-xs font-bold">Share</span>
                      </div>
                    </div>

                    <div className="absolute top-6 left-6">
                      <div className="bg-[#FF8C42] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse-soft">
                        📸 VIRAL
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h4 className="text-4xl md:text-5xl font-heading font-black mb-4 leading-tight">
                        Инста-момент
                      </h4>
                      <p className="text-lg text-white/95 leading-relaxed mb-3">
                        Фото-зона при свечах — это не просто фотки, это КОНТЕНТ 📱
                      </p>
                      <p className="text-sm text-white/70">
                        Забери кусочек волшебства с собой. Друзья будут завидовать!
                      </p>
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-5 row-span-1 group relative overflow-hidden rounded-3xl cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] opacity-40 group-hover/grid:opacity-40 hover:!opacity-100">
                <img 
                  src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/97049d94-c925-4f93-be83-11c1f3e0ac14.jpg"
                  alt="Эмоции"
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                <div className="absolute top-6 left-6">
                  <div className="bg-[#8B7AB8] text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                    💜 50 000+
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-3xl font-heading font-black mb-3">
                    Эмоции навсегда
                  </h4>
                  <p className="text-base text-white/90">
                    50 000+ счастливых гостей. Будь частью сообщества! ❤️
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className="text-center mt-16">
            <Button size="lg" className="bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] hover:opacity-90 text-white text-lg px-12 py-7 rounded-full font-black shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              Почувствовать диво сейчас ✨
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Билеты заканчиваются быстро 🚀
            </p>
          </div>
        </div>
      </section>









      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-heading font-bold text-foreground mb-4">
              Отзывы наших гостей
            </h3>
            <p className="text-muted-foreground text-lg">
              Более 50 000 счастливых посетителей уже побывали на канделайт концертах Диво
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {mockReviews.map((review, index) => (
              <Card 
                key={review.id} 
                className="bg-card border-border p-6 hover:card-glow transition-all animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={review.avatar} 
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#3CB8E0]"
                    />
                    <div className="flex-1">
                      <h5 className="font-heading font-bold text-foreground">{review.name}</h5>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-[#FF8C42] fill-[#FF8C42]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {review.text}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                    <span className="flex items-center">
                      <Icon name="Music" size={14} className="mr-1 text-[#8B7AB8]" />
                      {review.event}
                    </span>
                    <span>{new Date(review.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="border-[#3CB8E0] hover:bg-[#3CB8E0]/10">
              <Icon name="MessageCircle" className="mr-2" />
              Все отзывы
            </Button>
          </div>
        </div>
      </section>

      {/* Section: FAQ - "Частые вопросы" */}
      <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Частые вопросы
            </h2>
            <p className="text-muted-foreground text-lg">Ответы на популярные вопросы о концертах</p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#3CB8E0] transition-colors">
                  Что такое Канделайт концерты?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Канделайт — это уникальные концерты классической музыки при свете сотен свечей. 
                  Камерная атмосфера, живое исполнение и магия огня создают незабываемые впечатления.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#FF8C42] transition-colors">
                  Как получить билеты после покупки?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Билеты придут на электронную почту сразу после оплаты. Вам нужно будет показать 
                  QR-код с билета при входе на концерт — распечатывать ничего не нужно.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#8B7AB8] transition-colors">
                  Можно ли вернуть билеты?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Да, билеты можно вернуть не позднее чем за 3 дня до мероприятия. 
                  Деньги вернутся на карту в течение 5-10 рабочих дней. Напишите в поддержку для оформления возврата.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#3CB8E0] transition-colors">
                  Сколько длится концерт?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Обычно концерт длится 1,5-2 часа с одним антрактом. Точное время указано 
                  в описании каждого мероприятия. Приходите за 15-20 минут до начала.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#FF8C42] transition-colors">
                  Есть ли дресс-код?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Строгого дресс-кода нет, но мы рекомендуем элегантный стиль одежды — 
                  это добавит особой атмосферы вечеру. Приходите так, чтобы чувствовать себя комфортно.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="bg-card border border-border rounded-lg px-6">
                <AccordionTrigger className="text-lg font-semibold hover:text-[#8B7AB8] transition-colors">
                  Можно ли фотографировать во время концерта?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Фото и видео разрешены только до начала выступления и во время антракта. 
                  Во время исполнения просим отключить звук телефонов и не использовать вспышку — 
                  это отвлекает музыкантов и других гостей.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-[#3CB8E0]/20 via-[#FF8C42]/20 to-[#8B7AB8]/20 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#3CB8E0] to-[#8B7AB8] rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="ShieldCheck" size={32} className="text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Гарантия возврата
                  </h4>
                  <p className="text-muted-foreground">
                    Вернём 100% стоимости билета за 24 часа до начала концерта. Без лишних вопросов.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF8C42] to-[#8B7AB8] rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="Zap" size={32} className="text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-heading font-bold text-foreground mb-2">
                    Мгновенная доставка
                  </h4>
                  <p className="text-muted-foreground">
                    Билеты на почту сразу после оплаты. QR-код для быстрого входа на концерт.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>







      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/0dae3401-0f84-479b-b875-d725a4bab6e6.png" 
                  alt="Диво" 
                  className="h-6 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Канделайт концерты в России и СНГ
              </p>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Разделы</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors">События</button></li>
                <li><button className="hover:text-primary transition-colors">Календарь</button></li>
                <li><button className="hover:text-primary transition-colors">Города</button></li>
                <li><button className="hover:text-primary transition-colors">Артисты</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Помощь</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors">FAQ</button></li>
                <li><button className="hover:text-primary transition-colors">Возврат билетов</button></li>
                <li><button className="hover:text-primary transition-colors">Контакты</button></li>
                <li><button onClick={() => navigate('/about')} className="hover:text-primary transition-colors">О нас</button></li>
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

      {isMapOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-card rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-border">
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-6 flex items-center justify-between z-10">
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground">Карта огней России</h3>
                <p className="text-sm text-muted-foreground mt-1">Зажги вечер. Зажги Диво.</p>
              </div>
              <button 
                onClick={() => {
                  setIsMapOpen(false);
                  setSelectedMapCity(null);
                }}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <Icon name="X" size={24} />
              </button>
            </div>

            <div className="p-8 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <div className="bg-gradient-to-br from-[#3CB8E0]/10 via-[#FF8C42]/10 to-[#8B7AB8]/10 rounded-xl p-6 mb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Icon name="Trophy" size={24} className="text-[#FFD700]" />
                          <h4 className="text-xl font-bold">Самый яркий город сегодня</h4>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-3xl font-bold" style={{ color: winnerCity.color }}>{winnerCity.city}</span>
                          <Badge className="text-lg" style={{ backgroundColor: winnerCity.color }}>+{winnerCity.today} огоньков</Badge>
                        </div>
                      </div>
                      <Icon name="Flame" size={64} className="text-[#FF8C42] animate-pulse opacity-50" />
                    </div>
                  </div>

                  <div className="relative rounded-xl overflow-hidden" style={{ height: '600px' }}>
                    <MapWithLights 
                      cityLights={cityLights}
                      onLightSelect={(light) => setSelectedLight(light)}
                    />
                    
                    <div className="absolute bottom-4 left-4 right-4 flex gap-2 z-20">
                      {cityStats.map((stat) => (
                        <div key={stat.city} className="flex-1 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stat.color }}></div>
                            <span className="text-xs font-semibold">{stat.city}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Flame" size={12} style={{ color: stat.color }} />
                            <span className="text-xs font-bold">{stat.total.toLocaleString()}</span>
                            <span className="text-xs text-muted-foreground">огоньков</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-sm text-muted-foreground">Нажмите на огонёк, чтобы увидеть историю гостя</p>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  {selectedLight ? (
                    <Card className="sticky top-4">
                      <CardContent className="p-0">
                        <div className="relative aspect-[9/16] overflow-hidden rounded-t-lg">
                          <img 
                            src={selectedLight.image}
                            alt="История гостя"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                          <div className="absolute top-4 right-4">
                            <Badge className="text-xs" style={{ backgroundColor: selectedLight.city === 'Москва' ? '#FF8C42' : selectedLight.city === 'Санкт-Петербург' ? '#3CB8E0' : '#8B7AB8' }}>
                              #Диво{selectedLight.city}
                            </Badge>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm"></div>
                              <span className="font-semibold">{selectedLight.user}</span>
                            </div>
                            <p className="text-sm mb-3">{selectedLight.text}</p>
                            <div className="flex flex-col gap-2 text-sm mb-2">
                              <div className="flex items-center gap-1">
                                <Icon name="MapPin" size={16} />
                                <span>{selectedLight.venue}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Map" size={16} />
                                <span>{selectedLight.city}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Icon name="Heart" size={16} />
                                <span>{selectedLight.likes.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="Flame" size={16} />
                                <span>{selectedLight.todayCount} сегодня</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <Button 
                            className="w-full bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90"
                            onClick={() => setIsMapOpen(false)}
                          >
                            <Icon name="Ticket" className="mr-2" size={18} />
                            Зажечь свой огонёк
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="sticky top-4">
                      <CardContent className="p-8 text-center">
                        <Icon name="MousePointerClick" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h4 className="font-semibold mb-2">Выберите огонёк</h4>
                        <p className="text-sm text-muted-foreground mb-6">
                          Кликните на любой огонёк на карте, чтобы увидеть историю гостя из этого города
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-3 h-3 rounded-full bg-[#FF8C42] animate-pulse"></div>
                            <div className="text-left flex-1">
                              <p className="text-sm font-semibold">Москва</p>
                              <p className="text-xs text-muted-foreground">+127 сегодня</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-3 h-3 rounded-full bg-[#3CB8E0] animate-pulse"></div>
                            <div className="text-left flex-1">
                              <p className="text-sm font-semibold">Санкт-Петербург</p>
                              <p className="text-xs text-muted-foreground">+89 сегодня</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                            <div className="w-3 h-3 rounded-full bg-[#8B7AB8] animate-pulse"></div>
                            <div className="text-left flex-1">
                              <p className="text-sm font-semibold">Казань</p>
                              <p className="text-xs text-muted-foreground">+34 сегодня</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#3CB8E0]/10 via-[#FF8C42]/10 to-[#8B7AB8]/10 rounded-xl p-6 border border-border">
                <div className="flex items-start gap-4">
                  <Icon name="Info" size={24} className="text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-2">Как зажечь свой огонёк?</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li>• Купите билет на концерт — ваш огонёк загорится на карте автоматически</li>
                      <li>• Сделайте фото с концерта и поделитесь с тегом #ДивоМосква (или ваш город)</li>
                      <li>• Ваша история появится здесь и вдохновит других гостей!</li>
                      <li>• Помогите вашему городу стать самым ярким — участвуйте в ежедневном конкурсе</li>
                    </ul>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>
      )}

      {isBookingOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
          <Card className="w-full max-w-2xl bg-card border-border shadow-2xl animate-scale-in">
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl font-heading font-bold text-foreground mb-2">
                    Бронирование билетов
                  </h3>
                  <p className="text-muted-foreground">{selectedEvent.title}</p>
                </div>
                <button 
                  onClick={() => setIsBookingOpen(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                >
                  <Icon name="X" size={24} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Calendar" size={20} className="text-[#3CB8E0] mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Дата и время</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedEvent.date).toLocaleDateString('ru-RU', { 
                          day: 'numeric', 
                          month: 'long',
                          year: 'numeric'
                        })}, 19:00
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" size={20} className="text-[#FF8C42] mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Место проведения</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.venue}</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.city}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Music" size={20} className="text-[#8B7AB8] mt-1" />
                    <div>
                      <p className="font-semibold text-foreground">Исполнитель</p>
                      <p className="text-sm text-muted-foreground">{selectedEvent.artist}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-heading font-bold text-foreground">Количество билетов</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
                      className="w-10 h-10 bg-card rounded-full flex items-center justify-center hover:bg-[#3CB8E0] hover:text-white transition-colors"
                    >
                      <Icon name="Minus" size={20} />
                    </button>
                    <span className="text-2xl font-bold w-12 text-center">{selectedSeats}</span>
                    <button 
                      onClick={() => setSelectedSeats(Math.min(10, selectedSeats + 1))}
                      className="w-10 h-10 bg-card rounded-full flex items-center justify-center hover:bg-[#3CB8E0] hover:text-white transition-colors"
                    >
                      <Icon name="Plus" size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-lg font-heading font-bold text-foreground">Итого:</span>
                  <span className="text-3xl font-heading font-bold text-gradient">
                    {(selectedEvent.price * selectedSeats).toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <Icon name="ShieldCheck" size={20} className="text-green-500 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Гарантия возврата 100%</p>
                  <p className="text-xs text-muted-foreground">
                    Вернём полную стоимость за 24 часа до начала концерта без объяснения причин
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => setIsBookingOpen(false)}
                  variant="outline" 
                  size="lg" 
                  className="flex-1"
                >
                  Отмена
                </Button>
                <Button 
                  size="lg" 
                  className="flex-1 bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 shadow-lg text-white font-bold"
                >
                  <Icon name="CreditCard" className="mr-2" />
                  Перейти к оплате
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;