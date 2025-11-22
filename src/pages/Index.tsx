import { useState } from 'react';
import Launcher from '@/components/Launcher';
import ClientInterface from '@/components/ClientInterface';

const Index = () => {
  const [isLaunched, setIsLaunched] = useState(false);

  const handleLaunch = () => {
    setIsLaunched(true);
  };

  const handleExit = () => {
    setIsLaunched(false);
  };

  return (
    <>
      {!isLaunched ? (
        <Launcher onLaunch={handleLaunch} />
      ) : (
        <ClientInterface username="Player" onExit={handleExit} />
      )}
    </>
  );
};

export default Index;