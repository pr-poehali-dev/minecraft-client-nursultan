import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface Module {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  modules: Module[];
}

const Index = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 'combat',
      name: 'Combat',
      icon: 'Sword',
      modules: [
        { id: 'killaura', name: 'KillAura', description: 'Автоматическая атака ближайших врагов', enabled: false },
        { id: 'velocity', name: 'Velocity', description: 'Отключение отбрасывания от ударов', enabled: false },
        { id: 'autototem', name: 'AutoTotem', description: 'Автоматическое использование тотемов', enabled: false },
      ]
    },
    {
      id: 'movement',
      name: 'Movement',
      icon: 'Zap',
      modules: [
        { id: 'fly', name: 'Fly', description: 'Режим полёта в креативе', enabled: false },
        { id: 'speed', name: 'Speed', description: 'Увеличенная скорость передвижения', enabled: false },
        { id: 'spider', name: 'Spider', description: 'Карабканье по стенам как паук', enabled: false },
      ]
    },
    {
      id: 'render',
      name: 'Render',
      icon: 'Eye',
      modules: [
        { id: 'esp', name: 'ESP', description: 'Подсветка игроков и мобов через стены', enabled: false },
        { id: 'tracers', name: 'Tracers', description: 'Линии к игрокам и сущностям', enabled: false },
        { id: 'fullbright', name: 'Fullbright', description: 'Максимальная яркость освещения', enabled: false },
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
      ]
    },
    {
      id: 'world',
      name: 'World',
      icon: 'Globe',
      modules: [
        { id: 'scaffold', name: 'Scaffold', description: 'Автоматическая постройка блоков под ногами', enabled: false },
        { id: 'cheststealer', name: 'ChestStealer', description: 'Автоматический забор вещей из сундуков', enabled: false },
      ]
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('combat');

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
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold mb-2 text-primary" style={{ textShadow: '0 0 20px hsl(199 89% 48%)' }}>
            NURSULTAN CLIENT
          </h1>
          <p className="text-muted-foreground text-sm tracking-widest">MINECRAFT 1.16.5</p>
          <div className="mt-4 inline-block px-6 py-2 rounded-lg border border-primary/30 bg-card">
            <span className="text-primary font-semibold">{getEnabledCount()}</span>
            <span className="text-muted-foreground ml-2">модулей активно</span>
          </div>
        </div>

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
                              <h3 className="font-semibold text-lg text-foreground mb-1">
                                {module.name}
                              </h3>
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

        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-lg border border-primary/30 bg-card/50 backdrop-blur">
            <Icon name="Info" size={18} className="text-primary" />
            <span className="text-sm text-muted-foreground">
              Нажмите на категорию слева, чтобы переключить модули
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
