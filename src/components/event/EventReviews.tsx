import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

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

const EventReviews = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-heading font-bold text-center mb-4">Отзывы наших гостей</h3>
        <p className="text-center text-muted-foreground mb-12">
          Реальные впечатления от канделайт концертов
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-card border-border hover:card-glow transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img 
                    src={review.avatar} 
                    alt={review.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-heading font-bold">{review.name}</h4>
                      {review.verified && (
                        <Badge className="bg-[#3CB8E0]/20 text-[#3CB8E0] border-0 text-xs">
                          <Icon name="CheckCircle" size={12} className="mr-1" />
                          Проверено
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={14} className="fill-[#FF8C42] text-[#FF8C42]" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{review.text}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventReviews;
