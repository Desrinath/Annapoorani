
import React from 'react';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-background">
      <header className="bg-surface shadow-md sticky top-0 z-10">
        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <svg className="h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.278 0-2.507-.19-3.685-.531a1.125 1.125 0 0 1-.65-1.085m3.75-9.611a7.5 7.5 0 0 1 7.5 0c1.278 0 2.507.19 3.685.531a1.125 1.125 0 0 1 .65 1.085m-3.75 9.611a7.5 7.5 0 0 1-7.5 0m7.5 0a7.5 7.5 0 0 0-7.5 0M12 6.75a2.25 2.25 0 1 1 0 4.5 2.25 2.25 0 0 1 0-4.5Z" />
              </svg>
              <h1 className="text-2xl font-bold text-primary">HealthFusion AI</h1>
            </div>
            <p className="text-sm text-muted hidden md:block">Conversational Clinical Analytics & Risk Modeling</p>
          </div>
        </div>
      </header>
      <main className="flex-grow w-full max-w-screen-2xl mx-auto p-4 sm:p-6 lg:p-8">
        <Dashboard />
      </main>
      <footer className="bg-surface py-4 mt-8 border-t border-gray-200">
        <p className="text-center text-sm text-muted">© 2025 HealthFusion AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
