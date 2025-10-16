import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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

const features = [
  {
    title: '1000+ свечей',
    description: 'эффект бесконечного пространства',
    icon: 'Sparkles'
  },
  {
    title: 'Лучшие музыканты',
    description: 'лауреаты и солисты оркестров',
    icon: 'Award'
  },
  {
    title: 'Исторические залы',
    description: 'два таймслота на выбор',
    icon: 'Building2'
  },
  {
    title: 'Фото-зона',
    description: 'заберите вечер с собой',
    icon: 'Camera'
  }
];

const reviews = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anna',
    rating: 5,
    text: 'Невероятная атмосфера! Свечи создают магию, музыканты играют потрясающе. Обязательно вернусь снова.',
    date: '2025-10-15',
    verified: true
  },
  {
    id: 2,
    name: 'Михаил Сидоров',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mikhail',
    rating: 5,
    text: 'Прекрасный концерт в историческом зале. Романтично и впечатляюще. Жена в восторге!',
    date: '2025-10-12',
    verified: true
  },
  {
    id: 3,
    name: 'Елена Краснова',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
    rating: 5,
    text: 'Отличная организация, удобные места, великолепная акустика. Рекомендую всем!',
    date: '2025-10-10',
    verified: true
  }
];

const faqItems = [
  {
    question: 'Как делать фото?',
    answer: 'Подойдите к фото-зоне. Персонал поможет. Лучше поздний сеанс — свечей больше.'
  },
  {
    question: 'Что надеть?',
    answer: 'Дресс-код не обязателен. Совет: однотонные тёплые оттенки — вы будете «светиться» красивее.'
  },
  {
    question: 'Можно с детьми?',
    answer: 'Да, 6+. LED-свечи безопасны, но просим бережно.'
  }
];

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [photoSlot, setPhotoSlot] = useState('before');

  const event = mockEvents[Number(id)] || mockEvents[1];

  const totalPrice = event.price * selectedSeats;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-[#3CB8E0] to-[#8B7AB8] rounded-lg flex items-center justify-center">
                <Icon name="Music" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-gradient">Диво</h1>
            </button>

            <Button variant="ghost" onClick={() => navigate('/')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Все концерты
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-12 bg-gradient-to-br from-[#1a2332] via-[#2a3f4f] to-[#1a2332]">
        <div className="absolute inset-0 bg-[url('https://cdn.poehali.dev/files/f72d1137-335c-4175-9ab8-2fb91abb3eea.png')] bg-cover bg-center opacity-40" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <Badge className="mb-4 bg-[#3CB8E0]/30 text-white border-[#3CB8E0]/50">
                Канделайт концерт
              </Badge>
              
              <h2 className="text-5xl font-heading font-bold mb-4">
                Свидание в сотнях огней
              </h2>
              
              <p className="text-lg text-white/80 mb-6">
                {event.description}
              </p>

              <div className="flex items-center gap-4 mb-6 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  <span>ближайший сеанс</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">сегодня, {event.time}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-2 text-white/90">
                  <span>от</span>
                  <span className="text-4xl font-heading font-bold">{event.price} ₽</span>
                  <span className="text-white/70">· ближайший сеанс</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#3CB8E0] hover:bg-[#3CB8E0]/90 text-white"
                  onClick={() => {
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Icon name="Ticket" className="mr-2" />
                  Купить сейчас
                </Button>
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  Фото при свечах
                </Button>
              </div>

              <p className="text-xs text-white/60 mt-4">
                Оплата в 1 клик · без регистрации · электронный билет мгновенно
              </p>
            </div>

            <Card className="bg-card/90 backdrop-blur border-border/50">
              <CardContent className="p-6">
                <h4 className="font-heading font-bold text-lg mb-4">Запишитесь в фото-слот</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Чтобы не стоять в очереди — выберите окно 10 минут.
                </p>

                <div className="space-y-2 mb-4">
                  {['20-05–20-15', '21-05–21-15', '21-15–21-25'].map((slot) => (
                    <button
                      key={slot}
                      className="w-full p-3 rounded-lg border border-border hover:border-[#3CB8E0] hover:bg-[#3CB8E0]/5 transition-all text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{photoSlot === 'before' ? 'До концерта' : 'После концерта'} · {slot}</span>
                        <Icon name="Check" size={16} className="text-[#3CB8E0]" />
                      </div>
                    </button>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-[#3CB8E0] to-[#8B7AB8] hover:opacity-90">
                  Забронировать фото-слот
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-heading font-bold text-center mb-4">Почему это вау</h3>
          <p className="text-center text-muted-foreground mb-12">
            Более 50 000 счастливых посетителей уже побывали на канделайт концертах Диво
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="bg-card border-border p-6 hover:card-glow transition-all animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-[#3CB8E0]/20 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature.icon as any} size={24} className="text-[#3CB8E0]" />
                </div>
                <h4 className="font-heading font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-heading font-bold mb-8">Детали концерта</h3>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex items-start gap-3 mb-6">
                  <Icon name="Music" size={24} className="text-[#8B7AB8] mt-1" />
                  <div>
                    <h4 className="font-heading font-bold mb-2">Программа концерта</h4>
                    <ul className="space-y-2">
                      {event.program.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-[#FF8C42]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={24} className="text-[#3CB8E0] mt-1" />
                  <div>
                    <h4 className="font-heading font-bold mb-1">Длительность</h4>
                    <p className="text-sm text-muted-foreground">{event.duration}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start gap-3 mb-6">
                  <Icon name="MapPin" size={24} className="text-[#FF8C42] mt-1" />
                  <div>
                    <h4 className="font-heading font-bold mb-1">Место проведения</h4>
                    <p className="text-sm text-muted-foreground">{event.venue}</p>
                    <p className="text-sm text-muted-foreground">{event.city}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Фото-зона до/после концерта<br />
                      LED-свечи безопасны • 6+<br />
                      Исторически площадка в центре
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="booking" className="py-16 bg-gradient-to-br from-[#1a2332] via-[#2a3f4f] to-[#1a2332]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/95 backdrop-blur border-border shadow-2xl">
              <CardContent className="p-8">
                <h3 className="text-3xl font-heading font-bold mb-6 text-center">
                  Подарить вечер при свечах
                </h3>

                <div className="mb-6">
                  <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="Calendar" size={20} className="text-[#3CB8E0]" />
                      <div>
                        <p className="font-semibold text-sm">Сегодня в {event.time}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-600 border-green-500/30">
                      Осталось: {event.seatsLeft}
                    </Badge>
                  </div>

                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <label className="font-heading font-bold">Количество билетов</label>
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
                      <span className="text-lg font-heading font-bold">Итого:</span>
                      <span className="text-3xl font-heading font-bold text-gradient">
                        €{totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Электронный сертификат приходит на e-mail за 30 секунд. Действует 6 месяцев, можно распечатать дома.
                  </p>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-[#FF8C42] to-[#FF8C42]/80 hover:opacity-90 shadow-lg text-white font-bold text-lg py-6"
                >
                  Оформить сертификат
                </Button>

                <div className="text-center mt-4">
                  <p className="text-xs text-muted-foreground">
                    Сегодня в 18:30 • от €{event.price} • осталось: {event.seatsLeft}
                  </p>
                  <Button variant="link" className="text-sm mt-2">
                    Перейти к покупке
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-heading font-bold mb-8 text-center">Стена улыбок гостей</h3>
          <p className="text-center text-muted-foreground mb-12">
            Здесь появляются фото «при свечах». Добавьте своё — и передайте огонь дальше.
          </p>

          <div className="max-w-4xl mx-auto mb-8">
            <Card className="bg-card border-border p-8 text-center">
              <div className="max-w-md mx-auto">
                <Icon name="Camera" size={48} className="mx-auto mb-4 text-[#3CB8E0]" />
                <h4 className="font-heading font-bold text-xl mb-4">Стена улыбок гостей</h4>
                <p className="text-muted-foreground mb-6">
                  Здесь появляются фото «при свечах». Добавьте своё — и передайте огонь дальше.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button variant="outline">
                    <Icon name="Upload" className="mr-2" />
                    Загрузить фотографии
                  </Button>
                  <Button className="bg-gradient-to-r from-[#3CB8E0] to-[#8B7AB8]">
                    Создать «огонёк»
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {faqItems.map((item, index) => (
              <Card 
                key={index}
                className="bg-card border-border p-6 hover:card-glow transition-all"
              >
                <h5 className="font-heading font-bold mb-2">{item.question}</h5>
                <p className="text-sm text-muted-foreground">{item.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-heading font-bold mb-8 text-center">Отзывы гостей</h3>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card 
                key={review.id}
                className="bg-card border-border p-6 hover:card-glow transition-all"
              >
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={review.avatar}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-[#3CB8E0]"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-heading font-bold">{review.name}</h5>
                        {review.verified && (
                          <Icon name="BadgeCheck" size={16} className="text-[#3CB8E0]" />
                        )}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Icon key={i} name="Star" size={14} className="text-[#FF8C42] fill-[#FF8C42]" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {review.text}
                  </p>

                  <div className="text-xs text-muted-foreground pt-4 border-t border-border">
                    {new Date(review.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button variant="outline" size="lg" className="border-[#3CB8E0] hover:bg-[#3CB8E0]/10">
              <Icon name="MessageCircle" className="mr-2" />
              Смотреть улыбки гостей
            </Button>
          </div>
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
                Канделайт концерты классической музыки
              </p>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Концерты</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors">Москва</button></li>
                <li><button className="hover:text-primary transition-colors">Санкт-Петербург</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-heading font-bold mb-4">Помощь</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button className="hover:text-primary transition-colors">FAQ</button></li>
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

export default EventDetail;