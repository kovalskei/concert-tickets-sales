import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface Song {
  id: string;
  artist: string;
  title: string;
  audioUrl: string;
  options: string[];
  correctAnswer: string;
}

interface DailyPrize {
  concertName: string;
  artist: string;
  totalPrizes: number;
  remainingPrizes: number;
  date: string;
}

const DailyGame = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameState, setGameState] = useState<'ready' | 'playing' | 'answered'>('ready');
  const [hasWonPrize, setHasWonPrize] = useState(false);
  const [bonusEarned, setBonusEarned] = useState(0);

  const todaysPrize: DailyPrize = {
    concertName: 'Баста в Лужниках',
    artist: 'Баста',
    totalPrizes: 10,
    remainingPrizes: 3,
    date: new Date().toLocaleDateString('ru-RU')
  };

  const todaysSong: Song = {
    id: '1',
    artist: 'Баста',
    title: 'Сансара',
    audioUrl: '',
    options: ['Сансара', 'Выпускной', 'Моя игра'],
    correctAnswer: 'Сансара'
  };

  const [endOfDayTime, setEndOfDayTime] = useState('');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setHours(24, 0, 0, 0);
      const diff = tomorrow.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setEndOfDayTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing') {
      handleTimeout();
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setIsPlaying(true);
    setTimeLeft(30);
  };

  const handleTimeout = () => {
    setGameState('answered');
    setIsPlaying(false);
    setBonusEarned(100);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setGameState('answered');
    setIsPlaying(false);
    
    const isCorrect = answer === todaysSong.correctAnswer;
    
    if (isCorrect && todaysPrize.remainingPrizes > 0) {
      setHasWonPrize(true);
      setBonusEarned(0);
    } else if (isCorrect) {
      setBonusEarned(500);
    } else {
      setBonusEarned(100);
    }
  };

  const progressPercentage = (timeLeft / 30) * 100;

  return (
    <Card className="border-2 border-[#FF8C42]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Icon name="Music" className="text-[#FF8C42]" />
            Угадай мелодию дня
          </CardTitle>
          <Badge variant="outline" className="text-lg px-3 py-1">
            <Icon name="Clock" size={16} className="mr-1" />
            {endOfDayTime}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-[#FF8C42]/20 to-[#8B7AB8]/20 p-6 rounded-lg border-2 border-[#FF8C42]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">🎁 Сегодняшний приз</h3>
              <p className="text-lg text-muted-foreground">{todaysPrize.concertName}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-[#FF8C42]">
                {todaysPrize.remainingPrizes}/{todaysPrize.totalPrizes}
              </div>
              <div className="text-sm text-muted-foreground">осталось</div>
            </div>
          </div>
          
          {todaysPrize.remainingPrizes > 0 ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Zap" size={16} className="text-[#FF8C42]" />
              Успей угадать первым и получи бесплатный билет!
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="AlertCircle" size={16} className="text-amber-500" />
              Все призы разобрали, но ты можешь получить +500₽ бонусов!
            </div>
          )}
        </div>

        {gameState === 'ready' && (
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-br from-[#3CB8E0]/10 to-[#8B7AB8]/10 p-8 rounded-lg">
              <Icon name="Music2" size={64} className="mx-auto mb-4 text-[#8B7AB8]" />
              <h3 className="text-xl font-bold mb-2">Готов угадать трек {todaysSong.artist}?</h3>
              <p className="text-muted-foreground mb-4">У тебя будет 30 секунд и 3 варианта ответа</p>
              <Button 
                onClick={startGame} 
                size="lg"
                className="bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] hover:opacity-90 text-white px-8"
              >
                <Icon name="Play" className="mr-2" />
                Начать игру
              </Button>
            </div>
          </div>
        )}

        {gameState === 'playing' && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="text-6xl font-bold text-[#FF8C42] mb-2">{timeLeft}</div>
                <Progress value={progressPercentage} className="h-2 w-48 mx-auto" />
              </div>
              <p className="text-sm text-muted-foreground mt-2">секунд осталось</p>
            </div>

            <div className="bg-muted/50 p-6 rounded-lg flex items-center justify-center gap-4">
              <div className="w-16 h-16 bg-[#8B7AB8] rounded-full flex items-center justify-center animate-pulse">
                <Icon name="Music" size={32} className="text-white" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Сейчас играет...</div>
                <div className="text-lg font-semibold">Трек #{todaysSong.id}</div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-center font-semibold">Выбери правильный ответ:</p>
              {todaysSong.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  variant="outline"
                  className="w-full h-auto py-4 text-lg hover:bg-[#FF8C42] hover:text-white hover:border-[#FF8C42] transition-all"
                >
                  <span className="font-bold mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}

        {gameState === 'answered' && (
          <div className="space-y-6">
            {hasWonPrize ? (
              <div className="bg-gradient-to-br from-[#FF8C42]/20 to-[#8B7AB8]/20 p-8 rounded-lg border-2 border-[#FF8C42] text-center">
                <Icon name="Trophy" size={64} className="mx-auto mb-4 text-[#FF8C42]" />
                <h3 className="text-3xl font-bold mb-2">🎉 Поздравляем!</h3>
                <p className="text-xl mb-4">Ты выиграл бесплатный билет!</p>
                <div className="text-2xl font-bold text-[#FF8C42] mb-4">{todaysPrize.concertName}</div>
                <p className="text-sm text-muted-foreground mb-6">
                  Билет добавлен в твой профиль
                </p>
                <Button 
                  className="bg-gradient-to-r from-[#FF8C42] to-[#8B7AB8] text-white"
                  onClick={() => window.location.href = '/profile'}
                >
                  Перейти в профиль
                </Button>
              </div>
            ) : bonusEarned === 500 ? (
              <div className="bg-gradient-to-br from-[#3CB8E0]/20 to-[#8B7AB8]/20 p-8 rounded-lg border-2 border-[#3CB8E0] text-center">
                <Icon name="CheckCircle" size={64} className="mx-auto mb-4 text-[#3CB8E0]" />
                <h3 className="text-3xl font-bold mb-2">Правильно! 🎵</h3>
                <p className="text-lg mb-2">Это был трек: <span className="font-bold">{todaysSong.title}</span></p>
                <p className="text-muted-foreground mb-4">Призовые билеты закончились, но ты получаешь:</p>
                <div className="text-4xl font-bold text-[#3CB8E0] mb-6">+{bonusEarned}₽ бонусов</div>
                <p className="text-sm text-muted-foreground">Приходи завтра за новым призом!</p>
              </div>
            ) : timeLeft === 0 ? (
              <div className="bg-muted/50 p-8 rounded-lg text-center">
                <Icon name="Clock" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Время вышло! ⏰</h3>
                <p className="text-muted-foreground mb-4">Правильный ответ: <span className="font-bold">{todaysSong.title}</span></p>
                <div className="text-3xl font-bold text-muted-foreground mb-6">+{bonusEarned}₽ бонусов</div>
                <p className="text-sm text-muted-foreground">За участие! Завтра повезёт больше 🍀</p>
              </div>
            ) : (
              <div className="bg-muted/50 p-8 rounded-lg text-center">
                <Icon name="XCircle" size={64} className="mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">Не угадал 😔</h3>
                <p className="text-muted-foreground mb-4">Правильный ответ: <span className="font-bold">{todaysSong.title}</span></p>
                <div className="text-3xl font-bold text-muted-foreground mb-6">+{bonusEarned}₽ бонусов</div>
                <p className="text-sm text-muted-foreground">За участие! Завтра повезёт больше 🍀</p>
              </div>
            )}

            <div className="pt-4 border-t border-border">
              <div className="text-center text-sm text-muted-foreground">
                Следующая игра через <span className="font-bold text-foreground">{endOfDayTime}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DailyGame;
