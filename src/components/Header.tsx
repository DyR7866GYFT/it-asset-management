import { Database, Cpu, Activity, AlertCircle, Trash } from 'lucide-react';
import { Asset } from '../types';

interface HeaderProps {
  assets: Asset[];
}

export default function Header({ assets }: HeaderProps) {
  const total = assets.length;
  const active = assets.filter(a => a.status === 'Activo').length;
  const maintenance = assets.filter(a => a.status === 'Mantenimiento').length;
  const retired = assets.filter(a => a.status === 'De baja').length;

  const kpis = [
    { label: 'Total Equipos', value: total, color: 'text-slate-100', icon: <Cpu className="h-5 w-5" />, bg: 'bg-slate-800 text-slate-400' },
    { label: 'Activos', value: active, color: 'text-emerald-400', icon: <Activity className="h-5 w-5" />, bg: 'bg-emerald-950/50 text-emerald-400' },
    { label: 'Mantenimiento', value: maintenance, color: 'text-amber-500', icon: <AlertCircle className="h-5 w-5" />, bg: 'bg-amber-950/50 text-amber-400' },
    { label: 'De Baja', value: retired, color: 'text-rose-500', icon: <Trash className="h-5 w-5" />, bg: 'bg-rose-950/50 text-rose-400' }
  ];

  return (
    <header className="bg-slate-900 text-white rounded-2xl p-6 shadow-md mb-6 border border-slate-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-emerald-400" />
            <h1 className="text-2xl font-bold tracking-tight">SoportNet // Inventario TI</h1>
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Mantenimiento de Sistemas Informáticos - Gestión y Monitoreo de Equipos
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-slate-300">
          <Database className="h-4 w-4 text-emerald-400 animate-pulse" />
          <span>Base de Datos: <strong className="text-white">LocalStorage</strong> (Estado: Conectado)</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {kpis.map(({ label, value, color, icon, bg }) => (
          <div key={label} className="bg-slate-850 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{label}</p>
              <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
            </div>
            <div className={`p-2 rounded-lg ${bg}`}>{icon}</div>
          </div>
        ))}
      </div>
    </header>
  );
}
