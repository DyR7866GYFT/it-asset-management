import { useState, useEffect } from 'react';
import { Asset } from './types';
import Header from './components/Header';
import AssetForm from './components/AssetForm';
import AssetList from './components/AssetList';
import { Database, Download, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'it_assets_inventory';

const seedAssets: Asset[] = [
  {
    id: '1',
    deviceName: 'SRV-PLANILLAS-BD',
    equipmentType: 'Servidor',
    ipAddress: '192.168.1.10',
    status: 'Activo',
    location: 'Sótano - Rack principal A',
    notes: 'Servidor MySQL y respaldos de contabilidad. CPU Xeon 16-cores, 32GB RAM.',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '2',
    deviceName: 'PC-CONTABILIDAD-02',
    equipmentType: 'PC',
    ipAddress: '192.168.1.54',
    status: 'Activo',
    location: 'Oficina 102 - Planta Baja',
    notes: 'Asignado a Auxiliar Contable. Windows 11 Pro, SSD 512GB.',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '3',
    deviceName: 'LAP-SOPORTE-01',
    equipmentType: 'Laptop',
    ipAddress: 'DHCP',
    status: 'Activo',
    location: 'Área de Soporte Técnico',
    notes: 'Equipo de diagnóstico y atención a usuarios en campo. Solicitado cambio de batería.',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '4',
    deviceName: 'PRN-VENTAS-DVP',
    equipmentType: 'Impresora',
    ipAddress: '192.168.1.102',
    status: 'Mantenimiento',
    location: 'Oficina Ventas - Primer Piso',
    notes: 'Impresora láser multifuncional. Atasco constante en bandeja 2. Esperando rodillo de repuesto.',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '5',
    deviceName: 'SW-CORE-L3',
    equipmentType: 'Switch',
    ipAddress: '192.168.1.2',
    status: 'Activo',
    location: 'Sótano - Rack principal A',
    notes: 'Switch Administrable Cisco Catalyst 2960. Enlace de fibra activo.',
    lastUpdated: new Date().toISOString()
  },
  {
    id: '6',
    deviceName: 'PC-DISENO-OBSOLETA',
    equipmentType: 'PC',
    ipAddress: '192.168.1.115',
    status: 'De baja',
    location: 'Almacén de Scrap TI',
    notes: 'Tarjeta madre quemada tras pico de voltaje. Recuperado SSD y tarjetas de RAM.',
    lastUpdated: new Date().toISOString()
  }
];

export default function App() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setAssets(JSON.parse(stored));
      } catch {
        persist(seedAssets);
      }
    } else {
      persist(seedAssets);
    }
  }, []);

  // Persistencia en LocalStorage
  const persist = (data: Asset[]) => {
    setAssets(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  const handleSave = (assetData: Omit<Asset, 'id' | 'lastUpdated'> & { id?: string }) => {
    const now = new Date().toISOString();

    if (!assetData.id) {
      const nuevo: Asset = {
        ...assetData,
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        lastUpdated: now
      };
      persist([nuevo, ...assets]);
    } else {
      persist(
        assets.map(a =>
          a.id === assetData.id ? { ...a, ...assetData, lastUpdated: now } : a
        )
      );
      setEditingAsset(null);
    }
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    persist(assets.filter(a => a.id !== id));
    if (editingAsset?.id === id) setEditingAsset(null);
  };

  const exportJSON = () => {
    const blob = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(assets, null, 2))}`;
    const a = document.createElement('a');
    a.setAttribute('href', blob);
    a.setAttribute('download', `inventario_ti_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const resetToSeed = () => {
    if (confirm('¿Restablecer la base de datos semilla? Se sobrescribirán los datos actuales.')) {
      persist(seedAssets);
      setEditingAsset(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 antialiased font-sans flex flex-col">
      <div className="max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex-1">
        <Header assets={assets} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-6">
            <AssetForm
              onSave={handleSave}
              editingAsset={editingAsset}
              onCancelEdit={() => setEditingAsset(null)}
            />

            <div className="bg-white rounded-2xl p-5 border border-slate-200 mt-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-650 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                <Database className="h-4 w-4 text-slate-500" />
                Herramientas de Respaldo
              </h3>
              <p className="text-slate-500 text-xs mb-4 leading-relaxed">
                Resguardo local sin infraestructura en nube. Ideal para ambientes de soporte técnico cerrado.
              </p>
              <div className="space-y-2">
                <button
                  onClick={exportJSON}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg border border-slate-200 transition-all cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Copia de Respaldo (JSON)</span>
                </button>
                <button
                  onClick={resetToSeed}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-605 text-xs font-semibold rounded-lg border border-slate-200 hover:border-rose-100 transition-all cursor-pointer"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Restaurar Base de Datos Semilla</span>
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <AssetList
              assets={assets}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>

      <footer className="w-full bg-slate-900 border-t border-slate-800 text-xs text-slate-500 py-6 px-4 text-center mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <span>
            Prototipo de Integración - Carrera de <strong>Mantenimiento de Sistemas Informáticos</strong>
          </span>
          <span className="text-slate-400">
            Soporte Práctico & Lógica React • Junio de 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
