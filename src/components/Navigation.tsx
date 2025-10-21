import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AuthDialog from '@/components/AuthDialog';

const availableCities = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Екатеринбург',
  'Новосибирск',
  'Краснодар',
  'Сочи'
];

const Navigation = () => {
  const navigate = useNavigate();
  const [userCity, setUserCity] = useState<string>('Определение...');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    setIsLoggedIn(!!userId);

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const detectedCity = data.city || 'Вся Россия';
        if (availableCities.includes(detectedCity)) {
          setUserCity(detectedCity);
          setSelectedCity(detectedCity);
        } else {
          setUserCity('Вся Россия');
        }
      })
      .catch(() => {
        setUserCity('Вся Россия');
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_name');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="https://cdn.poehali.dev/files/5226ab88-5245-4be9-87b4-163a302d667d.png" 
                alt="Диво" 
                className="h-7 w-auto object-contain"
              />
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigate('/')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => navigate('/#events')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                События
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                О нас
              </button>
              {!isLoggedIn ? (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setAuthDialogOpen(true)}
                  className="bg-gradient-to-r from-[#3CB8E0] to-[#FF8C42] hover:opacity-90"
                >
                  <Icon name="LogIn" size={16} className="mr-2" />
                  Войти
                </Button>
              ) : (
                <>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => navigate('/profile')}
                    className="bg-gradient-to-r from-[#3CB8E0] to-[#FF8C42] hover:opacity-90"
                  >
                    <Icon name="User" size={16} className="mr-2" />
                    Профиль
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                </>
              )}

              <button 
                onClick={() => navigate('/#contacts')}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Контакты
              </button>
            </div>

          <div className="relative">
            <button
              onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/50 transition-all bg-card/80 backdrop-blur-sm"
            >
              <Icon name="MapPin" size={18} className="text-primary" />
              <span className="text-sm font-medium">{userCity}</span>
              <Icon name="ChevronDown" size={16} className={`transition-transform ${isCityDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCityDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
                <button
                  onClick={() => {
                    setSelectedCity(null);
                    setUserCity('Вся Россия');
                    setIsCityDropdownOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-2"
                >
                  <Icon name="Globe" size={16} className="text-muted-foreground" />
                  <span className="text-sm">Вся Россия</span>
                </button>
                <div className="border-t border-border" />
                {availableCities.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setUserCity(city);
                      setIsCityDropdownOpen(false);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Icon name="MapPin" size={16} className="text-primary" />
                    <span className="text-sm">{city}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>

    <AuthDialog 
      open={authDialogOpen} 
      onOpenChange={setAuthDialogOpen}
      onSuccess={() => {
        setIsLoggedIn(true);
        setAuthDialogOpen(false);
      }}
    />

    <div className="fixed bottom-6 right-6 z-50">
      <a
        href="https://wa.me/79999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-110 group"
      >
        <Icon name="MessageCircle" size={24} className="group-hover:animate-bounce" />
        <span className="font-semibold hidden md:inline">Помощь в WhatsApp</span>
      </a>
    </div>

    <div className="bg-gradient-to-r from-[#3CB8E0]/10 via-[#FF8C42]/10 to-[#8B7AB8]/10 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="CheckCircle" size={18} className="text-[#25D366]" />
            <span className="text-muted-foreground">15 000+ довольных гостей</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={18} className="text-[#3CB8E0]" />
            <span className="text-muted-foreground">Возврат билетов до 24 часов</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-border"></div>
          <div className="flex items-center gap-2">
            <Icon name="Lock" size={18} className="text-[#8B7AB8]" />
            <span className="text-muted-foreground">Безопасная оплата</span>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default Navigation;