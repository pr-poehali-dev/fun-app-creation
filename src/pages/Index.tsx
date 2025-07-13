import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [petStats, setPetStats] = useState({
    happiness: 75,
    health: 80,
    energy: 60,
    hunger: 40
  });
  
  const [petMood, setPetMood] = useState('happy');
  const [lastAction, setLastAction] = useState('');

  const feedPet = () => {
    setPetStats(prev => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - 20),
      happiness: Math.min(100, prev.happiness + 10)
    }));
    setLastAction('Покормил питомца! 🍎');
    setPetMood('excited');
    setTimeout(() => setPetMood('happy'), 2000);
  };

  const playWithPet = () => {
    setPetStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 15),
      energy: Math.max(0, prev.energy - 10)
    }));
    setLastAction('Поиграл с питомцем! 🎾');
    setPetMood('playful');
    setTimeout(() => setPetMood('happy'), 2000);
  };

  const healPet = () => {
    setPetStats(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 20),
      happiness: Math.min(100, prev.happiness + 5)
    }));
    setLastAction('Подлечил питомца! 💊');
    setPetMood('grateful');
    setTimeout(() => setPetMood('happy'), 2000);
  };

  const restPet = () => {
    setPetStats(prev => ({
      ...prev,
      energy: Math.min(100, prev.energy + 25),
      health: Math.min(100, prev.health + 5)
    }));
    setLastAction('Питомец отдохнул! 😴');
    setPetMood('sleepy');
    setTimeout(() => setPetMood('happy'), 3000);
  };

  // Auto decrease stats over time
  useEffect(() => {
    const interval = setInterval(() => {
      setPetStats(prev => ({
        happiness: Math.max(0, prev.happiness - 1),
        health: Math.max(0, prev.health - 0.5),
        energy: Math.max(0, prev.energy - 0.8),
        hunger: Math.min(100, prev.hunger + 1.2)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getPetEmoji = () => {
    switch(petMood) {
      case 'excited': return '😸';
      case 'playful': return '😺';
      case 'grateful': return '😻';
      case 'sleepy': return '😴';
      case 'sad': return '😿';
      default: return '😊';
    }
  };

  const getStatColor = (value: number) => {
    if (value > 70) return 'bg-green-500';
    if (value > 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-game text-4xl text-gray-800 mb-2">Мой Питомец</h1>
          <p className="text-gray-600">Позаботься о своем виртуальном друге! 🐾</p>
        </div>

        {/* Pet Display */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-4">
              <img 
                src="/img/4d0ee3e1-0e63-4bf5-888c-39264306aede.jpg" 
                alt="Virtual Pet" 
                className="w-32 h-32 mx-auto rounded-full border-4 border-pink-200 shadow-lg animate-bounce"
              />
            </div>
            <div className="text-6xl mb-4 animate-pulse">
              {getPetEmoji()}
            </div>
            <h3 className="font-game text-2xl text-gray-800 mb-2">Пушистик</h3>
            {lastAction && (
              <p className="text-sm text-purple-600 animate-fade-in">{lastAction}</p>
            )}
          </CardContent>
        </Card>

        {/* Stats */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 shadow-xl">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <Icon name="BarChart3" size={20} />
              Состояние питомца
            </h3>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <Icon name="Heart" size={16} className="text-red-500" />
                    Счастье
                  </span>
                  <span>{Math.round(petStats.happiness)}%</span>
                </div>
                <Progress value={petStats.happiness} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <Icon name="Shield" size={16} className="text-green-500" />
                    Здоровье
                  </span>
                  <span>{Math.round(petStats.health)}%</span>
                </div>
                <Progress value={petStats.health} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <Icon name="Zap" size={16} className="text-yellow-500" />
                    Энергия
                  </span>
                  <span>{Math.round(petStats.energy)}%</span>
                </div>
                <Progress value={petStats.energy} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-2">
                    <Icon name="Apple" size={16} className="text-orange-500" />
                    Голод
                  </span>
                  <span>{Math.round(petStats.hunger)}%</span>
                </div>
                <Progress value={100 - petStats.hunger} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-2 border-indigo-200 shadow-xl">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg text-gray-800 mb-4 flex items-center gap-2">
              <Icon name="Gamepad2" size={20} />
              Действия
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              <Button 
                onClick={feedPet}
                className="bg-gradient-to-r from-orange-400 to-red-400 hover:from-orange-500 hover:to-red-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                disabled={petStats.hunger < 20}
              >
                <Icon name="Apple" size={18} className="mr-2" />
                Покормить
              </Button>
              
              <Button 
                onClick={playWithPet}
                className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                disabled={petStats.energy < 15}
              >
                <Icon name="Gamepad2" size={18} className="mr-2" />
                Играть
              </Button>
              
              <Button 
                onClick={healPet}
                className="bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                disabled={petStats.health > 90}
              >
                <Icon name="Heart" size={18} className="mr-2" />
                Лечить
              </Button>
              
              <Button 
                onClick={restPet}
                className="bg-gradient-to-r from-indigo-400 to-cyan-400 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                disabled={petStats.energy > 80}
              >
                <Icon name="Moon" size={18} className="mr-2" />
                Спать
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200 shadow-xl">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-purple-700">
              💡 <strong>Совет:</strong> Следи за показателями питомца! Они автоматически снижаются со временем.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;