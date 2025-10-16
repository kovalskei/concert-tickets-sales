import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

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

const EventFAQ = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-heading font-bold text-center mb-12">Частые вопросы</h3>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <Card key={index} className="bg-card border-border hover:card-glow transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#3CB8E0]/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="HelpCircle" size={18} className="text-[#3CB8E0]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading font-bold text-lg mb-2">{item.question}</h4>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventFAQ;
