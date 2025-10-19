import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

const REFERRAL_API = 'https://functions.poehali.dev/b85734c8-e904-4924-bcc7-218619173fbd';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const AuthDialog = ({ open, onOpenChange, onSuccess }: AuthDialogProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      setReferralCode(ref);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(REFERRAL_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create_user',
          email,
          name,
          referral_code: referralCode,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('user_email', email);
        localStorage.setItem('user_name', name);

        toast({
          title: referralCode ? 'Добро пожаловать! 🎉' : 'Вы зарегистрированы! 🎉',
          description: referralCode 
            ? 'Вы и ваш друг получили по 200₽ бонусов!'
            : 'Начните приглашать друзей и получайте бонусы!',
        });

        onOpenChange(false);
        
        // Переход в профиль после успешной авторизации
        setTimeout(() => {
          window.location.href = '/profile';
        }, 500);
        
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось войти. Попробуйте позже.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-heading">
            Вход в личный кабинет
          </DialogTitle>
          <DialogDescription>
            {referralCode 
              ? '🎁 У вас есть реферальная ссылка! При регистрации вы получите бонус 200₽'
              : 'Введите email для входа или создания аккаунта'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Ваше имя</Label>
            <Input
              id="name"
              type="text"
              placeholder="Анна"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="anna@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {referralCode && (
            <div className="bg-gradient-to-r from-[#3CB8E0]/20 to-[#FF8C42]/20 rounded-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="Gift" className="text-[#FF8C42]" size={16} />
                <span className="font-semibold">Реферальный код:</span>
                <code className="bg-background px-2 py-1 rounded text-xs">
                  {referralCode}
                </code>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#3CB8E0] to-[#FF8C42] hover:opacity-90"
            disabled={loading}
          >
            {loading ? (
              <>
                <Icon name="Loader2" className="animate-spin mr-2" size={16} />
                Загрузка...
              </>
            ) : (
              <>
                <Icon name="LogIn" className="mr-2" size={16} />
                Войти
              </>
            )}
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-4">
          Продолжая, вы соглашаетесь с политикой конфиденциальности
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;