import React from 'react';
import { Globe2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="relative overflow-hidden border-b border-emerald-900/20 bg-gradient-to-br from-emerald-950 via-teal-900 to-stone-900 text-white shadow-lg">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="relative mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/20">
            <Globe2 className="h-6 w-6 text-amber-300" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-200/90">
              World Survive
            </p>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Painel ambiental — focos de calor no Brasil
            </h1>
          </div>
        </div>
        <p className="max-w-xs text-sm text-emerald-100/85 md:text-right">
          Visualização por ano, macroregião, bioma e UF (série 2019–2025).
        </p>
      </div>
    </header>
  );
};

export default Header;
