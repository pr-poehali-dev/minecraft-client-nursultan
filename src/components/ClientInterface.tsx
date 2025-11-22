import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Module {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  keybind?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  modules: Module[];
}

interface ClientInterfaceProps {
  username: string;
  onExit: () => void;
}

const ClientInterface = ({ username, onExit }: ClientInterfaceProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'combat',
      name: 'Combat',
      icon: 'Sword',
      modules: [
        { id: 'killaura', name: 'KillAura', description: 'Автоматическая атака ближайших врагов', enabled: false, keybind: 'R' },
        { id: 'velocity', name: 'Velocity', description: 'Отключение отбрасывания от ударов', enabled: false, keybind: 'V' },
        { id: 'autototem', name: 'AutoTotem', description: 'Автоматическое использование тотемов', enabled: false, keybind: 'T' },
        { id: 'criticals', name: 'Criticals', description: 'Всегда критические удары', enabled: false },
      ]
    },
    {
      id: 'movement',
      name: 'Movement',
      icon: 'Zap',
      modules: [
        { id: 'fly', name: 'Fly', description: 'Режим полёта в креативе', enabled: false, keybind: 'F' },
        { id: 'speed', name: 'Speed', description: 'Увеличенная скорость передвижения', enabled: false, keybind: 'X' },
        { id: 'spider', name: 'Spider', description: 'Карабканье по стенам как паук', enabled: false },
        { id: 'longjump', name: 'LongJump', description: 'Дальние прыжки', enabled: false },
      ]
    },
    {
      id: 'render',
      name: 'Render',
      icon: 'Eye',
      modules: [
        { id: 'esp', name: 'ESP', description: 'Подсветка игроков и мобов через стены', enabled: false, keybind: 'E' },
        { id: 'tracers', name: 'Tracers', description: 'Линии к игрокам и сущностям', enabled: false },
        { id: 'fullbright', name: 'Fullbright', description: 'Максимальная яркость освещения', enabled: false, keybind: 'B' },
        { id: 'nametags', name: 'NameTags', description: 'Улучшенные теги имён', enabled: false },
      ]
    },
    {
      id: 'player',
      name: 'Player',
      icon: 'User',
      modules: [
        { id: 'autoarmor', name: 'AutoArmor', description: 'Автоматическое надевание лучшей брони', enabled: false },
        { id: 'nofall', name: 'NoFall', description: 'Отключение урона от падения', enabled: false },
        { id: 'fasteat', name: 'FastEat', description: 'Быстрое поедание еды', enabled: false },
        { id: 'antiafk', name: 'AntiAFK', description: 'Защита от кика за неактивность', enabled: false },
      ]
    },
    {
      id: 'world',
      name: 'World',
      icon: 'Globe',
      modules: [
        { id: 'scaffold', name: 'Scaffold', description: 'Автоматическая постройка блоков под ногами', enabled: false, keybind: 'G' },
        { id: 'cheststealer', name: 'ChestStealer', description: 'Автоматический забор вещей из сундуков', enabled: false },
        { id: 'xray', name: 'X-Ray', description: 'Просвечивание блоков для поиска руды', enabled: false },
      ]
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('combat');
  const [guiScale, setGuiScale] = useState([100]);
  const [renderDistance, setRenderDistance] = useState([12]);

  const toggleModule = (categoryId: string, moduleId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id === categoryId) {
        return {
          ...cat,
          modules: cat.modules.map(mod => 
            mod.id === moduleId ? { ...mod, enabled: !mod.enabled } : mod
          )
        };
      }
      return cat;
    }));
  };

  const getEnabledCount = () => {
    return categories.reduce((total, cat) => 
      total + cat.modules.filter(m => m.enabled).length, 0
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-primary" style={{ textShadow: '0 0 20px hsl(199 89% 48%)' }}>
              NURSULTAN CLIENT
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Игрок: <span className="text-primary font-semibold">{username}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-lg border border-primary/30 bg-card">
              <span className="text-primary font-semibold">{getEnabledCount()}</span>
              <span className="text-muted-foreground ml-2 text-sm">активно</span>
            </div>
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
            >
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </Button>
            <Button
              onClick={onExit}
              variant="outline"
              className="border-destructive/30 hover:bg-destructive/10 text-destructive"
            >
              <Icon name="LogOut" size={18} className="mr-2" />
              Выход
            </Button>
          </div>
        </div>

        {showSettings ? (
          <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur animate-slide-in">
            <div className="flex items-center gap-3 mb-6">
              <Icon name="Settings" size={24} className="text-primary" />
              <h2 className="text-2xl font-bold text-primary">Настройки игры</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Масштаб интерфейса: {guiScale[0]}%
                  </label>
                  <Slider
                    value={guiScale}
                    onValueChange={setGuiScale}
                    min={50}
                    max={200}
                    step={10}
                    className="mb-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Дальность прорисовки: {renderDistance[0]} чанков
                  </label>
                  <Slider
                    value={renderDistance}
                    onValueChange={setRenderDistance}
                    min={2}
                    max={32}
                    step={2}
                    className="mb-2"
                  />
                </div>

                <div className="p-4 rounded-lg bg-muted/30 border border-primary/20">
                  <h3 className="font-semibold mb-3 text-foreground">Производительность</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">FPS:</span>
                      <span className="text-green-500 font-bold">144</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Пинг:</span>
                      <span className="text-green-500 font-bold">25ms</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">RAM:</span>
                      <span className="text-yellow-500 font-bold">2.4 / 4.0 GB</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-foreground mb-3">Горячие клавиши</h3>
                <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                  {categories.flatMap(cat => 
                    cat.modules
                      .filter(mod => mod.keybind)
                      .map(mod => (
                        <div 
                          key={mod.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-primary/10"
                        >
                          <span className="text-sm text-foreground">{mod.name}</span>
                          <kbd className="px-3 py-1 text-xs font-bold rounded bg-primary/20 text-primary border border-primary/30">
                            {mod.keybind}
                          </kbd>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card className="p-4 border-primary/30 bg-card/50 backdrop-blur">
                <h2 className="text-lg font-semibold mb-4 text-primary">Категории</h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(199_89%_48%)]'
                          : 'bg-muted/50 hover:bg-muted text-foreground hover:shadow-[0_0_10px_hsl(199_89%_48%/0.3)]'
                      }`}
                    >
                      <Icon name={category.icon} size={20} />
                      <span className="font-medium">{category.name}</span>
                      <span className="ml-auto text-xs opacity-70">
                        {category.modules.filter(m => m.enabled).length}
                      </span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="mt-4 p-4 border-primary/30 bg-card/50 backdrop-blur">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="Info" size={18} className="text-primary" />
                  <h3 className="font-semibold text-sm text-foreground">Подсказка</h3>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Нажмите <kbd className="px-2 py-0.5 rounded bg-primary/20 text-primary text-xs">RShift</kbd> чтобы открыть/закрыть ClickGUI в игре
                </p>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="p-6 border-primary/30 bg-card/50 backdrop-blur">
                {categories
                  .filter(cat => cat.id === selectedCategory)
                  .map(category => (
                    <div key={category.id} className="animate-slide-in">
                      <div className="flex items-center gap-3 mb-6">
                        <Icon name={category.icon} size={28} className="text-primary" />
                        <h2 className="text-2xl font-bold text-primary">{category.name}</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.modules.map((module) => (
                          <div
                            key={module.id}
                            className={`p-4 rounded-lg border transition-all duration-300 ${
                              module.enabled
                                ? 'border-primary bg-primary/10 shadow-[0_0_20px_hsl(199_89%_48%/0.3)]'
                                : 'border-muted bg-muted/30 hover:border-primary/50'
                            }`}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="font-semibold text-lg text-foreground">
                                    {module.name}
                                  </h3>
                                  {module.keybind && (
                                    <kbd className="px-2 py-0.5 text-xs font-bold rounded bg-secondary/20 text-secondary border border-secondary/30">
                                      {module.keybind}
                                    </kbd>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {module.description}
                                </p>
                              </div>
                              <Switch
                                checked={module.enabled}
                                onCheckedChange={() => toggleModule(category.id, module.id)}
                                className="ml-3"
                              />
                            </div>
                            {module.enabled && (
                              <div className="mt-3 flex items-center gap-2 text-xs text-primary">
                                <div className="w-2 h-2 rounded-full bg-primary animate-neon-pulse"></div>
                                <span>Активен</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientInterface;
