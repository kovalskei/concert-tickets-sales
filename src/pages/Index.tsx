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
            <div className="flex items-center gap-2">
              <Icon name="Flame" size={28} className="text-primary candle-flicker" />
              <h1 className="text-2xl font-heading font-bold text-gradient glow-effect">
                ДИВО
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
              КАНДЕЛАЙТ КОНЦЕРТЫ
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Магия классической музыки в окружении 1000 свечей. Уникальные концерты в исторических особняках России и СНГ.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8 h-14">
                <Icon name="Flame" className="mr-2 candle-flicker" size={20} />
                Найти концерт
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-primary text-lg px-8 h-14 hover:bg-primary/10">
                <Icon name="Calendar" className="mr-2" size={20} />
                Расписание
              </Button>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <Icon name="Flame" size={40} className="mx-auto mb-3 text-primary candle-flicker" />
              <p className="text-3xl font-heading font-bold text-foreground">150+</p>
              <p className="text-muted-foreground">Канделайт концертов</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Icon name="MapPin" size={40} className="mx-auto mb-3 text-secondary" />
              <p className="text-3xl font-heading font-bold text-foreground">12</p>
              <p className="text-muted-foreground">Городов России и СНГ</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Icon name="Users" size={40} className="mx-auto mb-3 text-primary" />
              <p className="text-3xl font-heading font-bold text-foreground">50K+</p>
              <p className="text-muted-foreground">Довольных гостей</p>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Icon name="Sparkles" size={40} className="mx-auto mb-3 text-secondary" />
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
            Почему Диво?
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border p-8 text-center hover:card-glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Flame" size={32} className="text-primary candle-flicker" />
              </div>
              <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                Уникальная атмосфера
              </h4>
              <p className="text-muted-foreground">
                1000 свечей создают неповторимую магию живой музыки
              </p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:card-glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center">
                <Icon name="Building2" size={32} className="text-secondary" />
              </div>
              <h4 className="text-xl font-heading font-bold text-foreground mb-3">
                Исторические залы
              </h4>
              <p className="text-muted-foreground">
                Концерты в особняках и дворцах с вековой историей
              </p>
            </Card>

            <Card className="bg-card border-border p-8 text-center hover:card-glow transition-all">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <Icon name="Music" size={32} className="text-primary" />
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
                <Icon name="Flame" size={24} className="text-primary candle-flicker" />
                <h4 className="font-heading font-bold text-lg">ДИВО</h4>
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
            <p>© 2025 Диво. Канделайт концерты. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;