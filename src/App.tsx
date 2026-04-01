import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-[var(--cor-fundo-app)]">
      <Header />
      <main>
        <Dashboard />
      </main>
      <footer className="border-t border-[var(--cor-borda)] bg-[var(--cor-fundo-rodape)] px-4 py-6 text-center text-sm text-[var(--cor-texto-mudo)]">
        <p className="font-medium text-[var(--cor-texto)]/80">
          World Survive — painel de focos de calor (dados didáticos 2019–2025)
        </p>
        <p className="mt-1 max-w-2xl mx-auto text-xs">
          Conjunto estático para estudo acadêmico; não substitui bases oficiais
          (ex.: INPE/Queimadas).
        </p>
      </footer>
    </div>
  );
}

export default App;
