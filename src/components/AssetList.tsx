import { useState } from 'react';
import { Search, Server, Monitor, Laptop, Printer, Network, Trash2, Edit, Filter, MapPin, Clock, FileText } from 'lucide-react';
import { Asset, EquipmentType, AssetStatus } from '../types';

interface AssetListProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

const iconByType = (type: EquipmentType) => {
  const map = {
    Servidor: <Server className="h-4 w-4 text-indigo-500" />,
    PC: <Monitor className="h-4 w-4 text-blue-500" />,
    Laptop: <Laptop className="h-4 w-4 text-emerald-500" />,
    Impresora: <Printer className="h-4 w-4 text-cyan-500" />,
    Switch: <Network className="h-4 w-4 text-amber-500" />
  };
  return map[type];
};

const StatusBadge = ({ status }: { status: AssetStatus }) => {
  const styles: Record<AssetStatus, string> = {
    Activo: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Mantenimiento: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse',
    'De baja': 'bg-rose-50 text-rose-700 border-rose-200'
  };
  const dots: Record<AssetStatus, string> = {
    Activo: 'bg-emerald-500',
    Mantenimiento: 'bg-amber-500',
    'De baja': 'bg-rose-500'
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
      {status}
    </span>
  );
};

export default function AssetList({ assets, onEdit, onDelete }: AssetListProps) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('todos');
  const [statusFilter, setStatusFilter] = useState('todos');

  const filtered = assets.filter(a => {
    const q = search.toLowerCase();
    const matchSearch =
      a.deviceName.toLowerCase().includes(q) ||
      a.ipAddress.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q) ||
      a.notes.toLowerCase().includes(q);

    return matchSearch
      && (typeFilter === 'todos' || a.equipmentType === typeFilter)
      && (statusFilter === 'todos' || a.status === statusFilter);
  });

  const clearFilters = () => {
    setSearch('');
    setTypeFilter('todos');
    setStatusFilter('todos');
  };

  const hasActiveFilters = search || typeFilter !== 'todos' || statusFilter !== 'todos';

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 bg-slate-50/50 space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, IP, ubicación o notas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:border-slate-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-800/20 cursor-pointer min-w-[120px]"
            >
              <option value="todos">Todos los Tipos</option>
              <option value="Servidor">Servidores</option>
              <option value="PC">PCs de Escritorio</option>
              <option value="Laptop">Laptops</option>
              <option value="Impresora">Impresoras</option>
              <option value="Switch">Switches / Red</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-slate-800/20 cursor-pointer min-w-[140px]"
          >
            <option value="todos">Todos los Estados</option>
            <option value="Activo">Solo Activos</option>
            <option value="Mantenimiento">En Mantenimiento</option>
            <option value="De baja">Dados de Baja</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        {filtered.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-550 uppercase tracking-wider">
                <th className="py-3.5 px-5">Equipo / Nombre</th>
                <th className="py-3.5 px-4">Clase / Tipo</th>
                <th className="py-3.5 px-4">Dirección IP</th>
                <th className="py-3.5 px-4">Ubicación</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4">Registro</th>
                <th className="py-3.5 px-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(asset => (
                <tr key={asset.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:border-slate-200 transition-all shrink-0">
                        {iconByType(asset.equipmentType)}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-800 tracking-tight">
                          {asset.deviceName}
                        </div>
                        {asset.notes && (
                          <div
                            className="text-slate-400 text-xs truncate max-w-[180px] flex items-center gap-1 mt-0.5"
                            title={asset.notes}
                          >
                            <FileText className="h-3 w-3 inline shrink-0" />
                            {asset.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-sm font-medium text-slate-650">
                    {asset.equipmentType}
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded border border-slate-200/60 text-slate-700">
                      {asset.ipAddress}
                    </span>
                  </td>

                  <td className="py-4 px-4 text-sm text-slate-500">
                    {asset.location ? (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        {asset.location}
                      </span>
                    ) : (
                      <span className="text-slate-350 italic">No asignada</span>
                    )}
                  </td>

                  <td className="py-4 px-4">
                    <StatusBadge status={asset.status} />
                  </td>

                  <td className="py-4 px-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 shrink-0" />
                      {new Date(asset.lastUpdated).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="inline-flex gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => onEdit(asset)}
                        className="px-2.5 py-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 rounded-lg text-xs font-medium transition-all flex items-center gap-1"
                      >
                        <Edit className="h-3.5 w-3.5" />
                        Editar
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar el equipo ${asset.deviceName}?`)) onDelete(asset.id);
                        }}
                        className="px-2.5 py-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg text-xs font-medium transition-all flex items-center gap-1"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center">
            <p className="text-sm text-slate-400">
              No se encontraron equipos con los criterios seleccionados.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-3 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-350 px-3 py-1.5 rounded-lg bg-white transition-all shadow-sm"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        )}
      </div>

      <div className="bg-slate-50 border-t border-slate-100 px-5 py-3 flex justify-between items-center text-xs text-slate-400">
        <span>
          Mostrando <strong className="text-slate-600">{filtered.length}</strong> de{' '}
          <strong className="text-slate-600">{assets.length}</strong> equipos.
        </span>
        <span>Código de Módulos TI • React 19</span>
      </div>
    </div>
  );
}
