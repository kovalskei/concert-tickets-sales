import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ExperienceType = 'date' | 'friends' | 'parents' | 'family';

interface Experience {
  title: string;
  description: string;
  label: string;
}

const experiences: Record<ExperienceType, Experience> = {
  date: {
    title: 'Свидание в сотнях огней',
    description: 'Сделайте вечер «как в кино». Купите билеты за 30 секунд — и сфотографируйтесь при свечах до и после.',
    label: 'Свидание'
  },
  friends: {
    title: 'Вечер с друзьями под музыку',
    description: 'Соберитесь компанией и насладитесь живой музыкой в атмосфере сотен свечей. Незабываемые эмоции гарантированы.',
    label: 'С друзьями'
  },
  parents: {
    title: 'Подарок для родителей',
    description: 'Подарите близким волшебный вечер классической музыки. Идеальный повод провести время вместе и создать теплые воспоминания.',
    label: 'С родителями'
  },
  family: {
    title: 'Семейный культурный вечер',
    description: 'Приобщите детей к прекрасному в уютной атмосфере. Концерт при свечах — это мягкое погружение в мир классики для всей семьи.',
    label: 'С семьей'
  }
};

export default function InteractiveExperienceSection() {
  const [selectedType, setSelectedType] = useState<ExperienceType>('date');
  const currentExperience = experiences[selectedType];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <Card className="relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border-[#3CB8E0]/20 hover:card-glow transition-all">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 transition-all duration-300">
                  {currentExperience.title}
                </h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed transition-all duration-300">
                  {currentExperience.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-6">
                  {(Object.keys(experiences) as ExperienceType[]).map((type) => (
                    <Badge
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`cursor-pointer px-4 py-2 text-sm transition-all duration-300 ${
                        selectedType === type
                          ? 'bg-[#3CB8E0] text-white border-[#3CB8E0] shadow-lg scale-105'
                          : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {experiences[type].label}
                    </Badge>
                  ))}
                </div>

                <p className="text-gray-400 mb-6">от 1990 рублей · ближайший концерт: сегодня, 19:00</p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <a 
                    href="https://qtickets.ru/event/193730" 
                    className="qtickets-button inline-flex items-center justify-center rounded-md text-sm font-medium bg-[#3CB8E0] hover:bg-[#3CB8E0]/90 text-white shadow-lg px-6 py-3 transition-colors"
                  >
                    🎟️ Купить сейчас
                  </a>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                    📷 Фото при свечах
                  </Button>
                </div>

                <div className="space-y-2">
                  <button className="text-[#3CB8E0] hover:text-[#3CB8E0]/80 text-sm underline transition-colors">
                    Смотреть улыбки гостей
                  </button>
                  <p className="text-xs text-gray-400">
                    Оплата в 1 клик · без регистрации · электронный билет мгновенно
                  </p>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg"
                    alt="Candlelight concert"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}