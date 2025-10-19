import Icon from '@/components/ui/icon';

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <img 
              src="https://cdn.poehali.dev/files/5226ab88-5245-4be9-87b4-163a302d667d.png" 
              alt="Диво" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-sm text-muted-foreground">
              Классическая музыка при свечах в исторических особняках
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">О нас</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Вакансии</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Пресса</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Помощь</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Возврат билетов</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Контакты</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Соцсети</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Icon name="Facebook" size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Icon name="Instagram" size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <Icon name="Twitter" size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 Диво. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
