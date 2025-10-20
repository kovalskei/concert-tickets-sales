import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import DailyGame from '@/components/game/DailyGame';
import StreakCalendar from '@/components/game/StreakCalendar';
import Leaderboard from '@/components/game/Leaderboard';
import Navigation from '@/components/Navigation';
import Footer from '@/components/HomePage/Footer';
import MapWithLights from '@/components/MapWithLights';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const REFERRAL_API = 'https://functions.poehali.dev/b85734c8-e904-4924-bcc7-218619173fbd';

interface UserData {
  id: number;
  email: string;
  name: string;
  referral_code: string;
  total_referrals: number;
  bonus_balance: number;
}

interface Subscription {
  platform: string;
  bonus_claimed: boolean;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedLight, setSelectedLight] = useState<any>(null);
  const [isAddLightOpen, setIsAddLightOpen] = useState(false);
  const [newLightData, setNewLightData] = useState({ text: '', image: '', platform: 'instagram' });
  const { toast } = useToast();

  const referralLink = userData ? `${window.location.origin}/?ref=${userData.referral_code}` : '';

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    console.log('Profile: Reading from localStorage, user_id:', storedUserId);
    console.log('Profile: All localStorage:', Object.keys(localStorage));
    setUserId(storedUserId);
    
    if (storedUserId) {
      console.log('Profile: Fetching user data for ID:', storedUserId);
      fetchUserData(storedUserId);
    } else {
      console.log('Profile: No user_id found, showing login prompt');
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (id: string) => {
    try {
      console.log('Profile: Fetching from API:', `${REFERRAL_API}?user_id=${id}`);
      const response = await fetch(`${REFERRAL_API}?user_id=${id}`);
      const data = await response.json();
      console.log('Profile: API response:', data);
      
      if (data.success) {
        console.log('Profile: Setting user data:', data.user);
        setUserData(data.user);
        setSubscriptions(data.subscriptions || []);
      } else {
        console.log('Profile: API returned success=false');
      }
    } catch (error) {
      console.error('Profile: Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast({
      title: 'Ссылка скопирована! 🎉',
      description: 'Поделитесь ей с друзьями',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = `Приглашаю тебя на концерты Канделайт! 🎵✨ При регистрации по моей ссылке мы оба получим скидку 200₽!`;
    const url = referralLink;

    const shareUrls: Record<string, string> = {
      vk: `https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const claimSubscriptionBonus = async (platform: string) => {
    try {
      const response = await fetch(REFERRAL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'claim_subscription_bonus',
          user_id: userId,
          platform,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Бонус получен! 🎁',
          description: data.message,
        });
        if (userId) {
          fetchUserData(userId);
        }
      } else {
        toast({
          title: 'Ошибка',
          description: data.message,
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error claiming bonus:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" className="animate-spin mx-auto mb-4" size={48} />
          <p className="text-muted-foreground">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Icon name="UserX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Войдите в аккаунт</h2>
            <p className="text-muted-foreground mb-6">
              Чтобы увидеть свой профиль и реферальную программу
            </p>
            <Button onClick={() => window.location.href = '/'}>
              На главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const cityLights = [
    { id: 1, city: 'Москва', venue: 'LOFT HALL', lat: 55.7558, lon: 37.6173, x: 55, y: 45, count: 8542, todayCount: 127, user: '@anna_m', text: 'Свечи, музыка и любимый рядом ✨', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg', likes: 1200 },
    { id: 2, city: 'Москва', venue: 'Особняк Румянцева', lat: 55.7600, lon: 37.6200, x: 56, y: 46, count: 8542, todayCount: 127, user: '@dmitry_love', text: 'Сделал предложение под Вивальди 💍', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg', likes: 3800 },
    { id: 3, city: 'Москва', venue: 'Доходный дом Баженова', lat: 55.7500, lon: 37.6100, x: 54, y: 44, count: 8542, todayCount: 127, user: '@maria_art', text: 'Идеальное первое свидание 🎻', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg', likes: 892 },
    { id: 4, city: 'Москва', venue: 'Палаты Аверкия Кириллова', lat: 55.7480, lon: 37.6350, x: 55, y: 46, count: 8542, todayCount: 127, user: '@moscowlights', text: 'Атмосфера старой Москвы 🏛️', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg', likes: 2340 },
    { id: 5, city: 'Санкт-Петербург', venue: 'Дворец Белосельских-Белозерских', lat: 59.9343, lon: 30.3351, x: 52, y: 35, count: 4891, todayCount: 89, user: '@peter_culture', text: 'Бах в историческом зале = магия', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg', likes: 2100 },
    { id: 6, city: 'Санкт-Петербург', venue: 'Особняк Кельха', lat: 59.9400, lon: 30.3400, x: 53, y: 36, count: 4891, todayCount: 89, user: '@spb_romance', text: 'Романтика Белых ночей при свечах', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg', likes: 1650 },
    { id: 7, city: 'Санкт-Петербург', venue: 'Особняк Половцова', lat: 59.9420, lon: 30.3280, x: 52, y: 36, count: 4891, todayCount: 89, user: '@nevsky_lights', text: 'Вечер, который запомнится навсегда', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/8b4b2bbb-95f0-42b8-90b9-1ba7b9588ca0.jpg', likes: 1890 },
    { id: 8, city: 'Казань', venue: 'Усадьба Баташева', lat: 55.7964, lon: 49.1089, x: 62, y: 48, count: 1851, todayCount: 34, user: '@kazan_vibe', text: 'Моцарт в Усадьбе Баташева 🔥', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/b1b9fbd4-43dc-44da-aa2f-72ea98d23633.jpg', likes: 567 },
    { id: 9, city: 'Казань', venue: 'Дом Ушковой', lat: 55.7900, lon: 49.1220, x: 63, y: 48, count: 1851, todayCount: 34, user: '@tatar_classic', text: 'Классика в сердце Казани 🎼', image: 'https://cdn.poehali.dev/projects/5dd05840-e04e-455d-87e2-1a9c0a120a10/files/27a533f4-dea9-4406-a309-e01d62382732.jpg', likes: 723 },
  ];

  const handleAddLight = () => {
    toast({
      title: 'Огонёк добавлен! ✨',
      description: 'Ваш момент появится на карте в течение 24 часов',
    });
    setIsAddLightOpen(false);
    setNewLightData({ text: '', image: '', platform: 'instagram' });
  };

  return (
    <>
      <Navigation isLoggedIn={true} onLogout={handleLogout} />
      
      <Dialog open={isMapOpen} onOpenChange={setIsMapOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Карта огней Диво</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">15 000+ гостей зажгли огоньки</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Посмотрите, как светится Россия благодаря вечерам Диво
              </p>
              <Button onClick={() => setIsAddLightOpen(true)} className="bg-amber-500 hover:bg-amber-600 text-black">
                <Icon name="Plus" className="mr-2" size={18} />
                Зажечь свой огонёк
              </Button>
            </div>
            
            <MapWithLights 
              cityLights={cityLights} 
              onLightSelect={(light) => setSelectedLight(light)} 
            />
            
            {selectedLight && (
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <img 
                    src={selectedLight.image} 
                    alt={selectedLight.user}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{selectedLight.user}</span>
                      <Badge variant="secondary">{selectedLight.city}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{selectedLight.text}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="MapPin" size={14} />
                        {selectedLight.venue}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Heart" size={14} className="text-red-500" />
                        {selectedLight.likes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddLightOpen} onOpenChange={setIsAddLightOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Зажгите свой огонёк на карте</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4 text-sm">
              <p className="mb-2">📱 Как попасть на карту:</p>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                <li>Опубликуйте фото/видео с концерта</li>
                <li>Добавьте хэштег <Badge variant="secondary">#канделайт</Badge></li>
                <li>Укажите геолокацию площадки</li>
              </ol>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">Текст эмоции</label>
              <Textarea 
                placeholder="Поделитесь впечатлением..."
                value={newLightData.text}
                onChange={(e) => setNewLightData({...newLightData, text: e.target.value})}
                className="resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Ссылка на пост</label>
              <Input 
                placeholder="https://instagram.com/p/..."
                value={newLightData.image}
                onChange={(e) => setNewLightData({...newLightData, image: e.target.value})}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Соцсеть</label>
              <div className="grid grid-cols-2 gap-2">
                {['Instagram', 'ВКонтакте', 'Telegram', 'Одноклассники'].map((platform) => (
                  <Button
                    key={platform}
                    variant={newLightData.platform === platform.toLowerCase() ? 'default' : 'outline'}
                    onClick={() => setNewLightData({...newLightData, platform: platform.toLowerCase()})}
                    size="sm"
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            </div>

            <Button onClick={handleAddLight} className="w-full">
              Отправить на модерацию
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-2">
              Личный кабинет
            </h1>
            <p className="text-muted-foreground">
              Управляйте своими бонусами и приглашайте друзей
            </p>
          </div>

        <div className="space-y-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Map" className="text-amber-400" />
                Карта огней Диво
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                15 000+ гостей уже зажгли огоньки на карте России. Посмотрите, как светится ваш город!
              </p>
              <Button onClick={() => setIsMapOpen(true)} className="w-full">
                <Icon name="MapPin" className="mr-2" />
                Открыть карту огней
              </Button>
            </CardContent>
          </Card>

          <DailyGame />
          <StreakCalendar currentStreak={7} totalDays={30} />
          <Leaderboard />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-[#3CB8E0]/10 to-[#FF8C42]/10 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Wallet" className="text-[#3CB8E0]" />
                Баланс бонусов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-foreground mb-2">
                {userData.bonus_balance} ₽
              </div>
              <p className="text-sm text-muted-foreground">
                Используйте при покупке билетов
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#FF8C42]/10 to-[#8B7AB8]/10 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Users" className="text-[#FF8C42]" />
                Приглашённых друзей
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-5xl font-bold text-foreground mb-2">
                {userData.total_referrals}
              </div>
              <p className="text-sm text-muted-foreground">
                200₽ за каждого друга
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Gift" className="text-[#8B7AB8]" />
              Пригласите друзей — получите бонусы
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-3">Ваша реферальная ссылка:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-sm"
                />
                <Button
                  onClick={handleCopyLink}
                  variant={copied ? 'default' : 'outline'}
                  className="min-w-[120px]"
                >
                  {copied ? (
                    <>
                      <Icon name="Check" size={16} className="mr-2" />
                      Скопировано
                    </>
                  ) : (
                    <>
                      <Icon name="Copy" size={16} className="mr-2" />
                      Копировать
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted-foreground mb-3">Поделиться в соцсетях:</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleShare('vk')}
                  className="flex-1 border-[#0077FF] hover:bg-[#0077FF]/10"
                >
                  <Icon name="Share2" size={20} className="mr-2" />
                  ВКонтакте
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleShare('telegram')}
                  className="flex-1 border-[#0088cc] hover:bg-[#0088cc]/10"
                >
                  <Icon name="Send" size={20} className="mr-2" />
                  Telegram
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleShare('whatsapp')}
                  className="flex-1 border-[#25D366] hover:bg-[#25D366]/10"
                >
                  <Icon name="MessageCircle" size={20} className="mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#FF8C42]/20 to-[#8B7AB8]/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-[#FF8C42] mt-1" size={20} />
                <div className="text-sm">
                  <p className="font-semibold mb-1">Как это работает:</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Поделитесь ссылкой с друзьями</li>
                    <li>• Друг регистрируется и получает скидку 200₽</li>
                    <li>• Вы тоже получаете 200₽ на счёт</li>
                    <li>• Приведите 5 друзей = 1000₽ бонусов!</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Star" className="text-[#3CB8E0]" />
              Получите бонусы за подписки
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Подпишитесь на наши соцсети и получите 200₽ за каждую подписку!
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { platform: 'telegram', name: 'Telegram', icon: 'Send', url: 'https://t.me/candelight_concerts' },
                { platform: 'instagram', name: 'Instagram', icon: 'Instagram', url: 'https://instagram.com/candelight' },
                { platform: 'vk', name: 'ВКонтакте', icon: 'Share2', url: 'https://vk.com/candelight' },
              ].map((social) => {
                const claimed = subscriptions.find((s) => s.platform === social.platform)?.bonus_claimed;
                
                return (
                  <Card key={social.platform} className="border-2">
                    <CardContent className="p-4 text-center">
                      <Icon name={social.icon as any} size={32} className="mx-auto mb-3 text-[#3CB8E0]" />
                      <h4 className="font-semibold mb-2">{social.name}</h4>
                      {claimed ? (
                        <Badge variant="secondary" className="w-full">
                          <Icon name="Check" size={14} className="mr-1" />
                          Получено
                        </Badge>
                      ) : (
                        <>
                          <a href={social.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" size="sm" className="w-full mb-2">
                              Подписаться
                            </Button>
                          </a>
                          <Button
                            size="sm"
                            className="w-full bg-[#3CB8E0] hover:bg-[#3CB8E0]/90"
                            onClick={() => claimSubscriptionBonus(social.platform)}
                          >
                            Получить 200₽
                          </Button>
                        </>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default Profile;