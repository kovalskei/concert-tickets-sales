import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

const EventFeatures = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-heading font-bold text-center mb-4">Почему это вау</h3>
        <p className="text-center text-muted-foreground mb-12">
          Более 50 000 счастливых гостей уже побывали на наших концертах
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card border-border hover:card-glow transition-all text-center">
              <CardContent className="p-6">
                <Icon name={feature.icon as any} size={48} className="mx-auto mb-4 text-[#3CB8E0]" />
                <h4 className="font-heading font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventFeatures;
