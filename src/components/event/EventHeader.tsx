import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const EventHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#3CB8E0] to-[#8B7AB8] rounded-lg flex items-center justify-center">
              <Icon name="Music" size={24} className="text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-gradient">Диво</h1>
          </button>

          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Все концерты
          </Button>
        </div>
      </div>
    </header>
  );
};

export default EventHeader;
