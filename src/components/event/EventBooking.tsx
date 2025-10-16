import { useState } from 'react';
import { Button } from '@/components/ui/button';
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

interface EventBookingProps {
  event: Event;
}

const EventBooking = ({ event }: EventBookingProps) => {
  const [selectedSeats, setSelectedSeats] = useState(1);
  const totalPrice = event.price * selectedSeats;

  return (
    <section id="booking" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl font-heading font-bold text-center mb-8">Забронировать билеты</h3>
          
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="mb-6">
                <h4 className="font-heading font-bold text-xl mb-2">{event.title}</h4>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={16} />
                    <span>{new Date(event.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Clock" size={16} />
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Количество билетов</label>
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
                  >
                    <Icon name="Minus" size={16} />
                  </Button>
                  <span className="text-2xl font-heading font-bold w-12 text-center">{selectedSeats}</span>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setSelectedSeats(Math.min(10, selectedSeats + 1))}
                  >
                    <Icon name="Plus" size={16} />
                  </Button>
                </div>
              </div>

              <div className="border-t border-border pt-6 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Билеты ({selectedSeats} шт.)</span>
                  <span className="font-heading font-bold">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                <div className="flex justify-between items-center text-sm text-muted-foreground">
                  <span>Сервисный сбор</span>
                  <span>0 ₽</span>
                </div>
              </div>

              <div className="border-t border-border pt-6 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-heading font-bold">Итого</span>
                  <span className="text-2xl font-heading font-bold text-[#3CB8E0]">
                    {totalPrice.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 text-white"
              >
                <Icon name="CreditCard" className="mr-2" />
                Перейти к оплате
              </Button>

              <p className="text-xs text-muted-foreground text-center mt-4">
                Оплата защищена SSL-шифрованием. Билеты придут на email мгновенно.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EventBooking;
