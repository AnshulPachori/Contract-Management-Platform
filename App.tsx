import React, { useState, useEffect, useCallback } from 'react';
import { ViewType, Blueprint, Contract, ContractStatus } from './types';
import Dashboard from './components/Dashboard';
import BlueprintBuilder from './components/BlueprintBuilder';
import ContractForm from './components/ContractForm';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

/* ================= UTIL ================= */

const load = <T,>(key: string, fallback: T): T => {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback;
  } catch {
    return fallback;
  }
};

/* ================= APP ================= */

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('DASHBOARD');

  // ✅ START EMPTY — NO MOCK DATA
  const [blueprints, setBlueprints] = useState<Blueprint[]>(() =>
    load('blueprints', [])
  );
  const [contracts, setContracts] = useState<Contract[]>(() =>
    load('contracts', [])
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  /* ================= PERSIST ================= */

  useEffect(() => {
    localStorage.setItem('blueprints', JSON.stringify(blueprints));
  }, [blueprints]);

  useEffect(() => {
    try {
      localStorage.setItem('contracts', JSON.stringify(contracts));
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        console.warn('LocalStorage quota exceeded');
      }
    }
  }, [contracts]);

  /* ================= SELECTED ================= */

  const selectedItem =
    contracts.find(c => c.id === selectedId) || null;

  /* ================= ACTIONS ================= */

  const addBlueprint = useCallback((bp: Blueprint) => {
    setBlueprints(prev => [...prev, bp]);
    setCurrentView('DASHBOARD');
  }, []);

  const addContract = useCallback((contract: Contract) => {
    setContracts(prev => [...prev, contract]);
    setCurrentView('DASHBOARD');
  }, []);

  const updateContract = useCallback((updated: Contract) => {
    setContracts(prev =>
      prev.map(c => (c.id === updated.id ? updated : c))
    );
    setSelectedId(null);
    setCurrentView('DASHBOARD');
  }, []);

  /* ================= UI ================= */

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar currentView={currentView} setView={setCurrentView} />

      <div className="flex-1 flex flex-col">
        <Header
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="flex-1 overflow-y-auto p-6">
          {currentView === 'DASHBOARD' && (
            <Dashboard
              contracts={contracts}
              blueprints={blueprints}
              searchQuery={searchQuery}
              onViewContract={(c) => {
                setSelectedId(c.id);
                setCurrentView('VIEW_CONTRACT');
              }}
              onNewContract={() => setCurrentView('CREATE_CONTRACT')}
              onNewBlueprint={() => setCurrentView('CREATE_BLUEPRINT')}
              onUpdateContract={updateContract}
            />
          )}

          {currentView === 'CREATE_BLUEPRINT' && (
            <BlueprintBuilder
              onSave={addBlueprint}
              onCancel={() => setCurrentView('DASHBOARD')}
            />
          )}

          {currentView === 'CREATE_CONTRACT' && (
            <ContractForm
              blueprints={blueprints}
              onSave={addContract}
              onCancel={() => setCurrentView('DASHBOARD')}
            />
          )}

          {currentView === 'VIEW_CONTRACT' && selectedItem && (
            <ContractForm
              blueprints={blueprints}
              existingContract={selectedItem}
              onSave={updateContract}
              onCancel={() => setCurrentView('DASHBOARD')}
              readOnly={selectedItem.status === ContractStatus.LOCKED}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
