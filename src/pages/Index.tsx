import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Format {
  id: string;
  title: string;
  description: string;
  icon: string;
  status: 'active' | 'coming-soon';
  color: string;
  image: string;
  link?: string;
}

const formats: Format[] = [
  {
    id: 'candlelight',
    title: 'Концерты при свечах',
    description: '1000 свечей, живая классическая музыка в исторических особняках',
    icon: 'Music',
    status: 'active',
    color: 'amber',
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/9cc33549-0401-429a-a7a2-d379080f0908.jpg',
    link: '/candlelight'
  },
  {
    id: 'ballet',
    title: 'Балет огней',
    description: 'Спящая красавица в потрясающем шоу с дронами и спецэффектами',
    icon: 'Sparkles',
    status: 'coming-soon',
    color: 'purple',
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg'
  },
  {
    id: 'immersive',
    title: 'Иммерсивные шоу',
    description: 'Цирковые номера, чтение стихов артистов, танцевальные представления',
    icon: 'Theater',
    status: 'coming-soon',
    color: 'pink',
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg'
  },
  {
    id: 'gastro',
    title: 'Гастро-события',
    description: 'Сочетание изысканной кухни и культурных впечатлений',
    icon: 'UtensilsCrossed',
    status: 'coming-soon',
    color: 'orange',
    image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg'
  }
];

const stats = [
  { value: '15 000+', label: 'Довольных гостей' },
  { value: '500+', label: 'Проведённых событий' },
  { value: '15', label: 'Городов России' },
  { value: '100%', label: 'Гарантия качества' }
];

const cities = [
  'Москва', 'Санкт-Петербург', 'Казань', 'Нижний Новгород', 'Екатеринбург',
  'Новосибирск', 'Самара', 'Ростов-на-Дону', 'Краснодар', 'Воронеж',
  'Уфа', 'Пермь', 'Волгоград', 'Красноярск', 'Саратов'
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black z-10" />
        
        <img
          src="https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg"
          alt="Диво"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <Badge variant="secondary" className="mb-8 bg-amber-500/20 text-amber-200 border-amber-500/30 text-base px-6 py-2">
            Качественные впечатления в каждом городе
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Диво — ваш вечер<br />
            <span className="text-amber-400">впечатлений</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            От камерных концертов до иммерсивных шоу — находите идеальный вечер в своём городе
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-6 text-lg"
              onClick={() => navigate('/candlelight')}
            >
              <Icon name="Sparkles" className="mr-2" size={20} />
              Смотреть события
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 hover:bg-white/10 text-white px-8 py-6 text-lg"
              onClick={() => document.getElementById('formats')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Узнать больше
            </Button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <Icon name="ChevronDown" size={32} className="text-white/60" />
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx}>
                <div className="text-4xl md:text-5xl font-bold text-amber-400 mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formats Section */}
      <section id="formats" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Форматы Диво</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Каждый формат — это уникальная атмосфера и незабываемые впечатления
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {formats.map((format) => (
              <Card 
                key={format.id}
                className={`bg-gray-900/50 border-white/10 overflow-hidden group ${
                  format.status === 'active' ? 'cursor-pointer hover:border-amber-500/50' : 'opacity-75'
                } transition-all`}
                onClick={() => format.link && navigate(format.link)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={format.image} 
                    alt={format.title}
                    className={`w-full h-full object-cover ${
                      format.status === 'active' ? 'group-hover:scale-110' : ''
                    } transition-transform duration-500`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {format.status === 'coming-soon' && (
                    <Badge className="absolute top-4 right-4 bg-gray-800/90 text-white border-white/20">
                      Скоро
                    </Badge>
                  )}

                  <div className="absolute bottom-4 left-4 w-14 h-14 bg-amber-500/20 rounded-full flex items-center justify-center border-2 border-amber-500/50">
                    <Icon name={format.icon as any} size={28} className="text-amber-400" />
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3">{format.title}</h3>
                  <p className="text-gray-400 mb-6">{format.description}</p>
                  
                  {format.status === 'active' ? (
                    <Button 
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                      onClick={(e) => {
                        e.stopPropagation();
                        format.link && navigate(format.link);
                      }}
                    >
                      Смотреть события
                      <Icon name="ArrowRight" className="ml-2" size={18} />
                    </Button>
                  ) : (
                    <Button 
                      variant="outline"
                      className="w-full border-white/20 text-gray-400 cursor-not-allowed"
                      disabled
                    >
                      Скоро в вашем городе
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cities */}
      <section className="py-24 bg-gradient-to-b from-transparent to-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Мы в 15 городах России</h2>
            <p className="text-xl text-gray-400">Скоро в вашем!</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
              {cities.map((city, idx) => (
                <div 
                  key={idx}
                  className="p-4 bg-gray-900/30 border border-white/10 rounded-lg text-center hover:border-amber-500/50 transition-all"
                >
                  <Icon name="MapPin" size={20} className="text-amber-400 mx-auto mb-2" />
                  <div className="text-sm">{city}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button 
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                onClick={() => navigate('/candlelight')}
              >
                Выбрать город
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Icon name="Heart" size={48} className="text-amber-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Наша миссия</h2>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
              Сделать регулярный качественный досуг доступным в каждом городе России
            </p>
            <p className="text-lg text-gray-400 leading-relaxed">
              Мы объединяем площадки, локальных артистов и продюсеров в единую сеть, 
              масштабируем лучшие форматы по данным и стандартам качества. 
              «Вечер Диво» — это синоним свиданий, тёплой атмосферы и новых впечатлений в любом городе.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Найдите свой идеальный вечер</h2>
            <p className="text-xl text-gray-300 mb-8">
              Более 500 событий в 15 городах — выберите то, что вам по душе
            </p>
            <Button 
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-6 text-lg"
              onClick={() => navigate('/candlelight')}
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

export default Index;
