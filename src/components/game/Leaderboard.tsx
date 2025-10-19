import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Player {
  id: string;
  name: string;
  streak: number;
  bonusEarned: number;
  ticketsWon: number;
  rank: number;
  badges: string[];
}

const Leaderboard = () => {
  const topPlayers: Player[] = [
    {
      id: '1',
      name: 'Алексей М.',
      streak: 30,
      bonusEarned: 25000,
      ticketsWon: 3,
      rank: 1,
      badges: ['Легенда', 'VIP Фанат', 'Хантер']
    },
    {
      id: '2',
      name: 'Мария К.',
      streak: 28,
      bonusEarned: 22000,
      ticketsWon: 2,
      rank: 2,
      badges: ['VIP Фанат', 'Три недели']
    },
    {
      id: '3',
      name: 'Дмитрий П.',
      streak: 25,
      bonusEarned: 19500,
      ticketsWon: 2,
      rank: 3,
      badges: ['Три недели', 'Хантер']
    },
    {
      id: '4',
      name: 'Елена С.',
      streak: 21,
      bonusEarned: 15000,
      ticketsWon: 1,
      rank: 4,
      badges: ['Три недели']
    },
    {
      id: '5',
      name: 'Иван Л.',
      streak: 18,
      bonusEarned: 12500,
      ticketsWon: 1,
      rank: 5,
      badges: ['Две недели']
    }
  ];

  const getBadgeColor = (badge: string) => {
    const colors: Record<string, string> = {
      'Легенда': 'bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] text-white',
      'VIP Фанат': 'bg-[#8B7AB8] text-white',
      'Хантер': 'bg-[#3CB8E0] text-white',
      'Три недели': 'bg-[#FF8C42] text-white',
      'Две недели': 'bg-amber-500 text-white',
      'Неделя': 'bg-green-500 text-white'
    };
    return colors[badge] || 'bg-muted';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-amber-400 to-amber-600';
    if (rank === 2) return 'from-gray-300 to-gray-500';
    if (rank === 3) return 'from-amber-600 to-amber-800';
    return 'from-muted to-muted';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Trophy" className="text-[#FF8C42]" />
          Топ игроков
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-gradient-to-r from-[#FF8C42]/10 via-[#8B7AB8]/10 to-[#3CB8E0]/10 p-4 rounded-lg border border-[#FF8C42]/30">
          <div className="flex items-center gap-3 text-sm">
            <Icon name="Info" size={18} className="text-[#8B7AB8]" />
            <p className="text-muted-foreground">
              Рейтинг обновляется каждый день. Попади в топ-100 и получи эксклюзивные бонусы!
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {topPlayers.map((player, index) => (
            <div
              key={player.id}
              className={cn(
                "relative p-4 rounded-lg transition-all hover:shadow-md",
                player.rank <= 3
                  ? `bg-gradient-to-r ${getRankColor(player.rank)}/10 border-2`
                  : "bg-muted/50 border",
                player.rank === 1 && "border-amber-400",
                player.rank === 2 && "border-gray-400",
                player.rank === 3 && "border-amber-600",
                player.rank > 3 && "border-border"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0",
                  player.rank <= 3 
                    ? `bg-gradient-to-br ${getRankColor(player.rank)} text-white shadow-lg`
                    : "bg-muted text-muted-foreground"
                )}>
                  {getRankIcon(player.rank)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg truncate">{player.name}</h4>
                    {player.rank === 1 && <Icon name="Crown" size={18} className="text-amber-500" />}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {player.badges.map((badge, badgeIndex) => (
                      <Badge
                        key={badgeIndex}
                        className={cn("text-xs px-2 py-0", getBadgeColor(badge))}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Icon name="Flame" size={14} className="text-[#FF8C42]" />
                      <span className="text-muted-foreground">Серия:</span>
                      <span className="font-bold">{player.streak}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Coins" size={14} className="text-[#3CB8E0]" />
                      <span className="text-muted-foreground">Бонусы:</span>
                      <span className="font-bold">{player.bonusEarned.toLocaleString()}₽</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Ticket" size={14} className="text-[#8B7AB8]" />
                      <span className="text-muted-foreground">Билеты:</span>
                      <span className="font-bold">{player.ticketsWon}</span>
                    </div>
                  </div>
                </div>
              </div>

              {player.rank <= 3 && (
                <div className="absolute top-2 right-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#FF8C42] to-[#8B7AB8] rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Icon name="Star" size={16} className="text-white" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border">
          <div className="bg-gradient-to-r from-[#3CB8E0]/10 to-[#8B7AB8]/10 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name="User" className="text-[#8B7AB8]" />
                <span className="font-semibold">Твоя позиция</span>
              </div>
              <Badge variant="outline" className="text-lg px-3 py-1">
                #47
              </Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="text-center p-2 bg-background/50 rounded">
                <div className="text-muted-foreground mb-1">Серия</div>
                <div className="font-bold text-lg">7</div>
              </div>
              <div className="text-center p-2 bg-background/50 rounded">
                <div className="text-muted-foreground mb-1">Бонусы</div>
                <div className="font-bold text-lg">3500₽</div>
              </div>
              <div className="text-center p-2 bg-background/50 rounded">
                <div className="text-muted-foreground mb-1">Билеты</div>
                <div className="font-bold text-lg">0</div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="TrendingUp" size={14} className="text-green-500" />
              <span>Поднялся на 12 позиций за неделю!</span>
            </div>
          </div>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Zap" className="text-amber-500 flex-shrink-0 mt-1" />
            <div className="text-sm">
              <p className="font-bold text-amber-700 dark:text-amber-400 mb-1">
                Бонусы за топ позиции
              </p>
              <ul className="space-y-1 text-amber-700/80 dark:text-amber-400/80">
                <li>🥇 1 место: +10,000₽ бонусов</li>
                <li>🥈 2 место: +5,000₽ бонусов</li>
                <li>🥉 3 место: +2,500₽ бонусов</li>
                <li>📊 Топ-10: +1,000₽ бонусов</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
