import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface NavigationProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Navigation = ({ isLoggedIn = false, onLogout }: NavigationProps) => {
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [userCity, setUserCity] = useState('Вся Россия');
  
  const availableCities = ['Москва', 'Санкт-Петербург', 'Казань', 'Екатеринбург', 'Новосибирск'];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <a href="/">
              <img 
                src="https://cdn.poehali.dev/files/5226ab88-5245-4be9-87b4-163a302d667d.png" 
                alt="Диво" 
                className="h-7 w-auto object-contain cursor-pointer"
              />
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <a href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Главная
            </a>
            <a href="/#events" className="text-sm font-medium hover:text-primary transition-colors">
              События
            </a>
            <a href="/#calendar" className="text-sm font-medium hover:text-primary transition-colors">
              Календарь
            </a>
            {!isLoggedIn ? (
              <Button
                variant="default"
                size="sm"
                onClick={() => window.location.href = '/'}
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
                  onClick={() => window.location.href = '/profile'}
                  className="bg-gradient-to-r from-[#3CB8E0] to-[#FF8C42] hover:opacity-90"
                >
                  <Icon name="User" size={16} className="mr-2" />
                  Профиль
                </Button>
                {onLogout && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onLogout}
                  >
                    <Icon name="LogOut" size={16} className="mr-2" />
                    Выйти
                  </Button>
                )}
              </>
            )}
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
  );
};

export default Navigation;
