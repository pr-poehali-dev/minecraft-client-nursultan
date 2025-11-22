import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface LauncherProps {
  onLaunch: () => void;
}

const Launcher = ({ onLaunch }: LauncherProps) => {
  const [username, setUsername] = useState('');
  const [isLaunching, setIsLaunching] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('');

  const handleLaunch = async () => {
    if (!username.trim()) return;
    
    setIsLaunching(true);
    const steps = [
      { text: 'Проверка файлов клиента...', duration: 800 },
      { text: 'Загрузка модулей...', duration: 1000 },
      { text: 'Инициализация Minecraft 1.16.5...', duration: 1200 },
      { text: 'Загрузка ресурсов...', duration: 900 },
      { text: 'Запуск игры...', duration: 700 },
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i].text);
      setProgress((i + 1) * 20);
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
    }

    setTimeout(() => {
      onLaunch();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 
            className="text-6xl font-bold mb-3 text-primary animate-neon-pulse" 
            style={{ textShadow: '0 0 30px hsl(199 89% 48%)' }}
          >
            NURSULTAN CLIENT
          </h1>
          <p className="text-muted-foreground text-sm tracking-widest">LAUNCHER v2.0</p>
          <div className="mt-2 inline-block px-4 py-1 rounded-full border border-secondary/50 bg-secondary/10">
            <span className="text-secondary text-xs font-semibold">MINECRAFT 1.16.5</span>
          </div>
        </div>

        <Card className="p-8 border-primary/30 bg-card/50 backdrop-blur-xl shadow-[0_0_30px_hsl(199_89%_48%/0.2)]">
          {!isLaunching ? (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Icon name="User" size={24} className="text-primary" />
                <h2 className="text-xl font-bold text-foreground">Авторизация</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Имя пользователя
                  </label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите ваш никнейм..."
                    className="bg-muted/50 border-primary/30 focus:border-primary transition-all"
                    onKeyPress={(e) => e.key === 'Enter' && handleLaunch()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-lg border border-primary/20 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Zap" size={16} className="text-primary" />
                      <span className="text-xs font-semibold text-primary">RAM</span>
                    </div>
                    <p className="text-2xl font-bold">4 GB</p>
                  </div>
                  <div className="p-4 rounded-lg border border-secondary/20 bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="Coffee" size={16} className="text-secondary" />
                      <span className="text-xs font-semibold text-secondary">Java</span>
                    </div>
                    <p className="text-2xl font-bold">17</p>
                  </div>
                </div>

                <Button
                  onClick={handleLaunch}
                  disabled={!username.trim()}
                  className="w-full h-14 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_hsl(199_89%_48%/0.4)] hover:shadow-[0_0_30px_hsl(199_89%_48%/0.6)] transition-all"
                >
                  <Icon name="Play" size={20} className="mr-2" />
                  ЗАПУСТИТЬ ИГРУ
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-primary/20">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span>Клиент обновлён</span>
                  </div>
                  <span>Версия 2.0.1</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 py-8">
              <div className="text-center mb-8">
                <div className="inline-block p-6 rounded-full bg-primary/10 mb-4 animate-neon-pulse">
                  <Icon name="Loader2" size={48} className="text-primary animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Запуск клиента</h3>
                <p className="text-muted-foreground">Пожалуйста, подождите...</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{currentStep}</span>
                  <span className="text-primary font-bold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              <div className="mt-8 p-4 rounded-lg bg-muted/30 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-foreground font-medium mb-1">Добро пожаловать, {username}!</p>
                    <p className="text-xs text-muted-foreground">
                      После запуска нажмите RShift для открытия ClickGUI
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={16} className="text-primary" />
            <span>Безопасно</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
          <div className="flex items-center gap-2">
            <Icon name="Zap" size={16} className="text-primary" />
            <span>Быстрый запуск</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
          <div className="flex items-center gap-2">
            <Icon name="Download" size={16} className="text-primary" />
            <span>Автообновление</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Launcher;
