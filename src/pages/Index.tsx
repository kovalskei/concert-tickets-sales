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
    title: 'Purple Nights',
    artist: 'Neon Waves',
    date: '2025-11-15',
    venue: 'Arena Hall',
    city: 'Москва',
    price: 3500,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/72bd01b5-8b6c-4757-87b2-5f73acf50554.jpg',
    genre: 'Rock'
  },
  {
    id: 2,
    title: 'Electric Dreams',
    artist: 'The Pulse',
    date: '2025-11-20',
    venue: 'Stadium Live',
    city: 'Санкт-Петербург',
    price: 4200,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/77d5d4aa-299c-4323-aa94-0cc6f95c8e45.jpg',
    genre: 'Electronic'
  },
  {
    id: 3,
    title: 'Neon Symphony',
    artist: 'DJ Spectrum',
    date: '2025-11-25',
    venue: 'Club Velocity',
    city: 'Казань',
    price: 2800,
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/d9ac29ea-e35c-459f-8e45-53fa25f979e0.jpg',
    genre: 'EDM'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('main');

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Icon name="Music" size={28} className="text-primary" />
              <h1 className="text-2xl font-heading font-bold text-gradient glow-effect">
                CONCERT TICKETS
              </h1>
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

            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity">
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
              LIVE MUSIC
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Билеты на лучшие концерты в вашем городе. Не упустите шанс увидеть любимых артистов вживую!
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 h-14">
                <Icon name="Search" className="mr-2" size={20} />
                Найти концерт
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-lg px-8 h-14 hover:bg-primary/10">
                <Icon name="Calendar" className="mr-2" size={20} />
                Календарь событий
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <Icon name="Music2" size={40} className="mx-auto mb-3 text-primary" />
              <p className="text-3xl font-heading font-bold text-foreground">500+</p>
              <p className="text-muted-foreground">Концертов</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Icon name="MapPin" size={40} className="mx-auto mb-3 text-secondary" />
              <p className="text-3xl font-heading font-bold text-foreground">50+</p>
              <p className="text-muted-foreground">Городов</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Icon name="Users" size={40} className="mx-auto mb-3 text-primary" />
              <p className="text-3xl font-heading font-bold text-foreground">200K+</p>
              <p className="text-muted-foreground">Посетителей</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Icon name="Star" size={40} className="mx-auto mb-3 text-secondary" />
              <p className="text-3xl font-heading font-bold text-foreground">300+</p>
              <p className="text-muted-foreground">Артистов</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="text-4xl font-heading font-bold text-foreground mb-2">
                Популярные события
              </h3>
              <p className="text-muted-foreground">Успей купить билеты на горячие концерты</p>
            </div>
            <Button variant="outline" className="border-primary hover:bg-primary/10">
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
                      <Icon name="Calendar" size={16} className="mr-2 text-primary" />
                      {new Date(event.date).toLocaleDateString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Icon name="MapPin" size={16} className="mr-2 text-secondary" />
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
                    <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
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

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-heading font-bold text-center text-foreground mb-12">
            Почему выбирают нас?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border p-8 text-center hover:card-glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Shield" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                Безопасная оплата
              </h4>
              <p className="text-muted-foreground">
                Защищённые транзакции и гарантия возврата средств
              </p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:card-glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                <Icon name="Zap" size={32} className="text-secondary" />
              </div>
              <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                Мгновенная доставка
              </h4>
              <p className="text-muted-foreground">
                Получите электронный билет сразу после оплаты
              </p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:card-glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="HeadphonesIcon" size={32} className="text-primary" />
              </div>
              <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                Поддержка 24/7
              </h4>
              <p className="text-muted-foreground">
                Наша команда всегда готова помочь вам
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
                <Icon name="Music" size={24} className="text-primary" />
                <h4 className="font-heading font-bold text-lg">CONCERT TICKETS</h4>
              </div>
              <p className="text-sm text-muted-foreground">
                Лучшие концерты в вашем городе
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
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <Icon name="Instagram" size={20} className="text-primary" />
                </button>
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <Icon name="Twitter" size={20} className="text-primary" />
                </button>
                <button className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary/30 transition-colors">
                  <Icon name="Facebook" size={20} className="text-primary" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 Concert Tickets. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
