import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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

interface EventHeroProps {
  event: Event;
}

const EventHero = ({ event }: EventHeroProps) => {
  return (
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
                      <span className="text-sm">До концерта · {slot}</span>
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
  );
};

export default EventHero;
