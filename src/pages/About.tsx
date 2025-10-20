import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  const stats = [
    { value: '15 000+', label: 'Довольных гостей', icon: 'Heart' },
    { value: '500+', label: 'Проведённых событий', icon: 'Calendar' },
    { value: '15', label: 'Городов России', icon: 'MapPin' },
    { value: '100%', label: 'Гарантия качества', icon: 'Award' }
  ];

  const formats = [
    {
      title: 'Концерты при свечах',
      description: '1000 свечей, живая классическая музыка в исторических особняках',
      icon: 'Music',
      image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg'
    },
    {
      title: 'Иммерсивные шоу',
      description: 'Цирковые номера, чтение стихов, танцевальные представления',
      icon: 'Theater',
      image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg'
    },
    {
      title: 'Гастро-события',
      description: 'Сочетание изысканной кухни и культурных впечатлений',
      icon: 'UtensilsCrossed',
      image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg'
    },
    {
      title: 'Городские маршруты',
      description: 'Открывайте ваш город заново с уникальными экскурсиями',
      icon: 'Map',
      image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg'
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/')}
              className="text-2xl font-heading font-bold bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] bg-clip-text text-transparent"
            >
              ДИВО
            </button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/')}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] text-white border-0">
              О проекте
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6">
              Качественные вечера<br />в каждом городе
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              Мы помогаем людям в любом городе находить качественные вечера — от камерных 
              концертов до иммерсивных шоу, гастро-ивентов и городских маршрутов
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="mb-4 mx-auto w-16 h-16 bg-gradient-to-br from-[#3CB8E0] to-[#8B7AB8] rounded-full flex items-center justify-center">
                  <Icon name={stat.icon as any} size={28} className="text-white" />
                </div>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <Card className="bg-gradient-to-br from-[#3CB8E0]/10 to-[#FF8C42]/10 border-[#3CB8E0]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#3CB8E0] rounded-full flex items-center justify-center mb-6">
                  <Icon name="Target" size={32} className="text-white" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">Миссия</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Сделать регулярный качественный досуг доступным в каждом городе России
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#FF8C42]/10 to-[#8B7AB8]/10 border-[#8B7AB8]/30">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] rounded-full flex items-center justify-center mb-6">
                  <Icon name="Eye" size={32} className="text-white" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-4">Видение</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Сеть из 100+ городов, где «вечер Диво» — синоним свиданий, тёплой атмосферы и новых впечатлений
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Как мы работаем</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Мы объединяем площадки, локальных артистов и продюсеров в единую сеть, 
              масштабируем лучшие форматы по данным и стандартам качества
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:card-glow transition-all">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#3CB8E0] to-[#FF8C42] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Network" size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Единая сеть</h3>
                <p className="text-muted-foreground">
                  Объединяем площадки, артистов и продюсеров для создания качественных событий
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:card-glow transition-all">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF8C42] to-[#8B7AB8] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="BarChart3" size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Данные и аналитика</h3>
                <p className="text-muted-foreground">
                  Масштабируем лучшие форматы на основе реальной обратной связи гостей
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:card-glow transition-all">
              <CardContent className="p-8">
                <div className="w-20 h-20 bg-gradient-to-br from-[#8B7AB8] to-[#3CB8E0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Star" size={40} className="text-white" />
                </div>
                <h3 className="text-xl font-heading font-bold mb-3">Стандарты качества</h3>
                <p className="text-muted-foreground">
                  Контролируем каждую деталь — от света до акустики, чтобы гарантировать впечатление
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formats */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Наши форматы</h2>
            <p className="text-xl text-muted-foreground">
              От камерной классики до гастро-ивентов — выбирайте то, что вам по душе
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
            {formats.map((format, idx) => (
              <Card key={idx} className="overflow-hidden group hover:card-glow transition-all">
                <div className="relative h-64">
                  <img 
                    src={format.image} 
                    alt={format.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-14 h-14 bg-gradient-to-br from-[#FF8C42] to-[#8B7AB8] rounded-full flex items-center justify-center">
                    <Icon name={format.icon as any} size={28} className="text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-heading font-bold mb-3">{format.title}</h3>
                  <p className="text-muted-foreground">{format.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* First Time in Russia */}
      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-[#3CB8E0]/10 via-[#FF8C42]/10 to-[#8B7AB8]/10 border-2 border-primary/30 overflow-hidden">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] text-white border-0 text-base px-6 py-2">
                    🎉 Мировая премьера в России
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                    Впервые в России!
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Уникальный формат канделайт-концертов, покоривший миллионы сердец по всему миру, 
                    теперь доступен в России и СНГ
                  </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-3xl mb-2">💜</div>
                    <p className="text-sm text-muted-foreground">Идеально для свиданий</p>
                    <p className="text-xs text-muted-foreground mt-1">Романтическая атмосфера при свечах</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🎭</div>
                    <p className="text-sm text-muted-foreground">Время с друзьями</p>
                    <p className="text-xs text-muted-foreground mt-1">Культурный вечер в компании</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">👨‍👩‍👧</div>
                    <p className="text-sm text-muted-foreground">Семейный вечер</p>
                    <p className="text-xs text-muted-foreground mt-1">Приобщите детей к прекрасному</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl mb-2">🍸</div>
                    <p className="text-sm text-muted-foreground">Коктейльное настроение</p>
                    <p className="text-xs text-muted-foreground mt-1">Изысканная атмосфера</p>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] hover:opacity-90 text-lg px-8 py-6"
                    onClick={() => navigate('/')}
                  >
                    <Icon name="Sparkles" className="mr-2" size={20} />
                    Смотреть события
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Icon name="Heart" size={48} className="text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Присоединяйтесь к нам
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Станьте частью сообщества, которое создаёт незабываемые вечера в каждом городе России
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] hover:opacity-90 text-lg px-8 py-6"
              onClick={() => navigate('/')}
            >
              <Icon name="Calendar" className="mr-2" size={20} />
              Смотреть афишу
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
