
import { Music, Guitar } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-6 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3">
          <div className="relative">
            <Guitar className="h-8 w-8" />
            <Music className="h-4 w-4 absolute -top-1 -right-1 text-yellow-300" />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">30 Acordes em 30 Dias</h1>
            <p className="text-orange-100 mt-1">Aprenda violão de forma gradual e consistente</p>
          </div>
        </div>
      </div>
    </header>
  );
};
