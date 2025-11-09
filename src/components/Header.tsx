import React from 'react';
import { Flame } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-orange-600 to-red-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Flame size={32} className="text-yellow-300" />
          <h1 className="text-2xl md:text-3xl font-bold">
            Dashboard de Queimadas no Brasil
          </h1>
        </div>
        <div className="text-sm md:text-base opacity-90">
          Monitoramento 2019-2025
        </div>
      </div>
    </header>
  );
};

export default Header;