import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface StreakCalendarProps {
  currentStreak: number;
  totalDays?: number;
}

const StreakCalendar = ({ currentStreak, totalDays = 30 }: StreakCalendarProps) => {
  const streakRewards = [
    { day: 1, bonus: 100, icon: 'Coins' },
    { day: 3, bonus: 300, icon: 'Sparkles' },
    { day: 7, bonus: 1000, icon: 'Zap', badge: 'Неделя' },
    { day: 14, bonus: 2000, icon: 'Award', badge: 'Две недели' },
    { day: 21, bonus: 3500, icon: 'Star', badge: 'Три недели' },
    { day: 30, bonus: 0, icon: 'Trophy', badge: 'Легенда', prize: 'Бесплатный билет!' }
  ];

  const daysRemaining = totalDays - currentStreak;
  const progressPercentage = (currentStreak / totalDays) * 100;

  const getNextReward = () => {
    return streakRewards.find(r => r.day > currentStreak) || streakRewards[streakRewards.length - 1];
  };

  const nextReward = getNextReward();

  return (
    <Card className="border-2 border-[#3CB8E0]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="Flame" className="text-[#FF8C42]" />
            Твоя серия
          </CardTitle>
          <Badge className="bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] text-white text-lg px-4 py-1">
            {currentStreak} / {totalDays} дней
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="relative">
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#3CB8E0] via-[#FF8C42] to-[#8B7AB8] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Старт</span>
            <span className="font-bold text-foreground">{progressPercentage.toFixed(0)}%</span>
            <span>Финиш 🏆</span>
          </div>
        </div>

        <div className="grid grid-cols-10 gap-2">
          {Array.from({ length: totalDays }).map((_, index) => {
            const day = index + 1;
            const isCompleted = day <= currentStreak;
            const isCurrent = day === currentStreak + 1;
            const reward = streakRewards.find(r => r.day === day);

            return (
              <div
                key={day}
                className={cn(
                  "relative aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all",
                  isCompleted && "bg-gradient-to-br from-[#3CB8E0] to-[#8B7AB8] text-white",
                  isCurrent && "ring-2 ring-[#FF8C42] ring-offset-2 bg-muted",
                  !isCompleted && !isCurrent && "bg-muted text-muted-foreground"
                )}
              >
                {isCompleted && <Icon name="Check" size={16} />}
                {!isCompleted && day}
                {reward && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#FF8C42] rounded-full flex items-center justify-center">
                    <Icon name={reward.icon as any} size={10} className="text-white" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {currentStreak < totalDays ? (
          <div className="bg-gradient-to-br from-[#FF8C42]/10 to-[#8B7AB8]/10 p-6 rounded-lg border border-[#FF8C42]/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#FF8C42] to-[#8B7AB8] rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name={nextReward.icon as any} size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-bold text-lg">Следующая награда</h4>
                  {nextReward.badge && (
                    <Badge variant="outline" className="border-[#FF8C42] text-[#FF8C42]">
                      {nextReward.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-2">
                  {nextReward.prize ? (
                    <span className="text-xl font-bold text-[#FF8C42]">{nextReward.prize}</span>
                  ) : (
                    <>+{nextReward.bonus}₽ бонусов</>
                  )}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Target" size={16} className="text-[#8B7AB8]" />
                  <span>Осталось {nextReward.day - currentStreak} {nextReward.day - currentStreak === 1 ? 'день' : 'дней'}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#FF8C42]/20 to-[#8B7AB8]/20 p-8 rounded-lg border-2 border-[#FF8C42] text-center">
            <Icon name="Trophy" size={64} className="mx-auto mb-4 text-[#FF8C42]" />
            <h3 className="text-2xl font-bold mb-2">🎉 Ты прошёл 30 дней!</h3>
            <p className="text-lg text-muted-foreground mb-4">Невероятное достижение!</p>
            <div className="text-3xl font-bold text-[#FF8C42] mb-4">
              🎁 Бесплатный билет получен!
            </div>
            <Badge className="bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] text-white px-6 py-2 text-lg">
              Легенда 👑
            </Badge>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Всего заработано:</span>
            <span className="font-bold text-lg">
              {streakRewards
                .filter(r => r.day <= currentStreak)
                .reduce((sum, r) => sum + r.bonus, 0)}₽
            </span>
          </div>
          
          {currentStreak > 0 && currentStreak < totalDays && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 flex items-start gap-2">
              <Icon name="AlertCircle" size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700 dark:text-amber-400">
                <span className="font-bold">Не разорви серию!</span> Если пропустишь день, счётчик обнулится.
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
          {streakRewards.slice(0, 3).map((reward, index) => (
            <div
              key={index}
              className={cn(
                "text-center p-3 rounded-lg transition-all",
                currentStreak >= reward.day 
                  ? "bg-gradient-to-br from-[#3CB8E0]/20 to-[#8B7AB8]/20 border border-[#3CB8E0]" 
                  : "bg-muted"
              )}
            >
              <Icon 
                name={currentStreak >= reward.day ? 'CheckCircle' : (reward.icon as any)} 
                size={24} 
                className={cn(
                  "mx-auto mb-1",
                  currentStreak >= reward.day ? "text-[#3CB8E0]" : "text-muted-foreground"
                )}
              />
              <div className="text-xs text-muted-foreground mb-1">День {reward.day}</div>
              <div className="text-sm font-bold">+{reward.bonus}₽</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCalendar;
