import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import DailyGame from '@/components/game/DailyGame';
import StreakCalendar from '@/components/game/StreakCalendar';
import Leaderboard from '@/components/game/Leaderboard';

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

  return (
    <div className="min-h-screen bg-background py-12">
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
  );
};

export default Profile;