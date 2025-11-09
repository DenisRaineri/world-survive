import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main>
        <Dashboard />
      </main>
      <footer className="py-4 text-center text-gray-600 text-sm">
        <p>Dashboard de Monitoramento de Queimadas no Brasil • 2019-2025</p>
      </footer>
    </div>
  );
}

export default App;