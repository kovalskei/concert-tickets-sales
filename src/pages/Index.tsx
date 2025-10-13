import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: 'Вивальди при свечах',
    artist: 'Камерный оркестр',
    date: '2025-11-15',
    venue: 'Особняк Румянцева',
    city: 'Москва',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
    genre: 'Канделайт'
  },
  {
    id: 2,
    title: 'Бах. Шедевры барокко',
    artist: 'Трио "Барокко"',
    date: '2025-11-20',
    venue: 'Дворец Белосельских-Белозерских',
    city: 'Санкт-Петербург',
    price: 2800,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/7b49f8ad-665c-45d2-902e-81f851a3c849.jpg',
    genre: 'Канделайт'
  },
  {
    id: 3,
    title: 'Моцарт в огнях свечей',
    artist: 'Струнный квартет',
    date: '2025-11-25',
    venue: 'Усадьба Баташева',
    city: 'Казань',
    price: 2200,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/c18c1c3e-efd3-4b70-a3e4-38bd329cf3a4.jpg',
    genre: 'Канделайт'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img 
                src="https://cdn.poehali.dev/files/0dae3401-0f84-479b-b875-d725a4bab6e6.png" 
                alt="Диво" 
                className="h-8 w-auto object-contain"
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
                onClick={() => setActiveSection('calendar')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Календарь
              </button>
              <button 
                onClick={() => setActiveSection('cities')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Города
              </button>
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

            <Button className="bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 transition-opacity">
              Войти
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-secondary/5 to-background"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-fade-in">
            <h2 className="text-6xl md:text-8xl font-heading font-black text-gradient glow-effect mb-6">
              КАНДЕЛАЙТ КОНЦЕРТЫ
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Магия классической музыки в окружении 1000 свечей. Уникальные концерты в исторических особняках России и СНГ.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 text-lg px-8 h-14 shadow-lg">
                <Icon name="Flame" className="mr-2 candle-flicker" size={20} />
                Найти концерт
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-[#3CB8E0] text-lg px-8 h-14 hover:bg-[#3CB8E0]/10">
                <Icon name="Calendar" className="mr-2" size={20} />
                Расписание
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <Icon name="Flame" size={40} className="mx-auto mb-3 text-[#FF8C42] candle-flicker" />
              <p className="text-3xl font-heading font-bold text-foreground">150+</p>
              <p className="text-muted-foreground">Канделайт концертов</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Icon name="MapPin" size={40} className="mx-auto mb-3 text-[#3CB8E0]" />
              <p className="text-3xl font-heading font-bold text-foreground">12</p>
              <p className="text-muted-foreground">Городов России и СНГ</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Icon name="Users" size={40} className="mx-auto mb-3 text-[#8B7AB8]" />
              <p className="text-3xl font-heading font-bold text-foreground">50K+</p>
              <p className="text-muted-foreground">Довольных гостей</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Icon name="Sparkles" size={40} className="mx-auto mb-3 text-[#3CB8E0]" />
              <p className="text-3xl font-heading font-bold text-foreground">1000</p>
              <p className="text-muted-foreground">Свечей на каждом концерте</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-4xl font-heading font-bold text-foreground mb-2">
                Ближайшие канделайт концерты
              </h3>
              <p className="text-muted-foreground">Погрузитесь в волшебную атмосферу классики при свечах</p>
            </div>
            <Button variant="outline" className="border-[#3CB8E0] hover:bg-[#3CB8E0]/10">
              Все события
              <Icon name="ArrowRight" className="ml-2" size={18} />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockEvents.map((event, index) => (
              <Card 
                key={event.id} 
                className="group overflow-hidden bg-card border-border hover:card-glow transition-all duration-300 animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
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
                    <Button className="bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 shadow-lg">
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

      <section className="py-20 bg-gradient-to-br from-[#3CB8E0]/10 via-[#FF8C42]/5 to-[#8B7AB8]/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRjhDNDIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDEzNEgxMHYtMmgyNnYyem0wLTI2SDEwdi0yaDI2djJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <Badge className="mb-6 text-sm px-4 py-2 bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] text-white border-0">
              🎉 Мировая премьера в России
            </Badge>
            <h3 className="text-5xl md:text-6xl font-heading font-black text-gradient glow-effect mb-6">
              Впервые в России!
            </h3>
            <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
              Уникальный формат канделайт-концертов, покоривший миллионы сердец по всему миру, теперь доступен в России и СНГ
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 text-lg px-10 h-16 shadow-2xl text-white font-bold">
                <Icon name="Sparkles" className="mr-2" size={24} />
                Забронировать билет
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-[#3CB8E0] text-lg px-10 h-16 hover:bg-[#3CB8E0]/10 font-semibold">
                <Icon name="Gift" className="mr-2" size={24} />
                Подарить впечатление
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            <Card className="bg-card/80 backdrop-blur border-[#3CB8E0]/30 p-6 text-center hover:card-glow transition-all hover:scale-105">
              <Icon name="Heart" size={48} className="mx-auto mb-4 text-[#FF8C42]" />
              <h4 className="text-lg font-heading font-bold text-foreground mb-2">
                Идеально для свиданий
              </h4>
              <p className="text-sm text-muted-foreground">
                Романтическая атмосфера при свечах создаст незабываемый вечер для двоих
              </p>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-[#8B7AB8]/30 p-6 text-center hover:card-glow transition-all hover:scale-105">
              <Icon name="Users" size={48} className="mx-auto mb-4 text-[#3CB8E0]" />
              <h4 className="text-lg font-heading font-bold text-foreground mb-2">
                Время с друзьями
              </h4>
              <p className="text-sm text-muted-foreground">
                Культурный вечер в компании близких под великую классику
              </p>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-[#FF8C42]/30 p-6 text-center hover:card-glow transition-all hover:scale-105">
              <Icon name="Home" size={48} className="mx-auto mb-4 text-[#8B7AB8]" />
              <h4 className="text-lg font-heading font-bold text-foreground mb-2">
                Семейный вечер
              </h4>
              <p className="text-sm text-muted-foreground">
                Приобщите детей к прекрасному в волшебной обстановке
              </p>
            </Card>

            <Card className="bg-card/80 backdrop-blur border-[#3CB8E0]/30 p-6 text-center hover:card-glow transition-all hover:scale-105">
              <Icon name="Wine" size={48} className="mx-auto mb-4 text-[#FF8C42]" />
              <h4 className="text-lg font-heading font-bold text-foreground mb-2">
                Коктейльное настроение
              </h4>
              <p className="text-sm text-muted-foreground">
                Изысканная атмосфера для особенного вечера со вкусом
              </p>
            </Card>
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-heading font-bold text-center text-foreground mb-12">
            Почему Диво?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border p-8 text-center hover:card-glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#FF8C42]/20 rounded-full flex items-center justify-center">
                <Icon name="Flame" size={32} className="text-[#FF8C42] candle-flicker" />
              </div>
              <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                Уникальная атмосфера
              </h4>
              <p className="text-muted-foreground">
                1000 свечей создают неповторимую магию живой музыки
              </p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:card-glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#3CB8E0]/20 rounded-full flex items-center justify-center">
                <Icon name="Building2" size={32} className="text-[#3CB8E0]" />
              </div>
              <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                Исторические залы
              </h4>
              <p className="text-muted-foreground">
                Концерты в особняках и дворцах с вековой историей
              </p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:card-glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#8B7AB8]/20 rounded-full flex items-center justify-center">
                <Icon name="Music" size={32} className="text-[#8B7AB8]" />
              </div>
              <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                Великие композиторы
              </h4>
              <p className="text-muted-foreground">
                Моцарт, Бах, Вивальди в исполнении талантливых музыкантов
              </p>
            </Card>
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
                <li><button className="hover:text-primary transition-colors">О нас</button></li>
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