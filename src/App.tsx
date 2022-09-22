import React from 'react';
import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import Logo from './assets/logo-nlw.svg';
import './styles/main.css';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
}

function App() {
  const [games, setGames] = React.useState<Game[]>([]);

  React.useEffect(() => {
    axios('http://localhost:3300/games')
     .then(response => {
      setGames(response.data)
     })
  }, []);

  return (
    <section className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={Logo} alt="" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu{' '}
        <span className="text-transparent bg-nlw-gradient bg-clip-text">
          duo
        </span>{' '}
        está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map((game) => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          );
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </section>
  );
}

export default App;
