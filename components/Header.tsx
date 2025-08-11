
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-850 p-4 sm:p-6 border-b border-slate-700">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          <span className="text-sky-400">Generador de Prompts</span> para Gemini
        </h1>
        <p className="mt-1 text-sm sm:text-base text-slate-400">
          Crea prompts optimizados para generar aplicaciones web completas con IA.
        </p>
      </div>
    </header>
  );
};

export default Header;
