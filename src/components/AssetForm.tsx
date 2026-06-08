import { useState, useEffect, FormEvent } from 'react';
import { Plus, X, Pencil, ShieldAlert } from 'lucide-react';
import { Asset, EquipmentType, AssetStatus } from '../types';

interface AssetFormProps {
  onSave: (asset: Omit<Asset, 'id' | 'lastUpdated'> & { id?: string }) => void;
  editingAsset: Asset | null;
  onCancelEdit: () => void;
}

const emptyForm = {
  deviceName: '',
  equipmentType: 'PC' as EquipmentType,
  ipAddress: '',
  status: 'Activo' as AssetStatus,
  location: '',
  notes: ''
};

export default function AssetForm({ onSave, editingAsset, onCancelEdit }: AssetFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Partial<typeof emptyForm>>({});

  useEffect(() => {
    if (editingAsset) {
      setForm({
        deviceName: editingAsset.deviceName,
        equipmentType: editingAsset.equipmentType,
        ipAddress: editingAsset.ipAddress,
        status: editingAsset.status,
        location: editingAsset.location || '',
        notes: editingAsset.notes || ''
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editingAsset]);

  // TODO: agregar validación IPv6
  const isValidIP = (ip: string) => {
    const lower = ip.toLowerCase();
    if (lower === 'dhcp' || lower === 'dinamica' || lower === 'dinámica') return true;
    return /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/.test(ip);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Partial<typeof emptyForm> = {};

    if (!form.deviceName.trim()) errs.deviceName = 'El nombre del equipo es obligatorio.';
    if (!form.ipAddress.trim()) {
      errs.ipAddress = 'La dirección IP es obligatoria (escribe DHCP si es dinámica).';
    } else if (!isValidIP(form.ipAddress.trim())) {
      errs.ipAddress = 'Formato inválido (ej: 192.168.1.50 o DHCP).';
    }

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    onSave({
      id: editingAsset?.id,
      deviceName: form.deviceName.trim(),
      equipmentType: form.equipmentType,
      ipAddress: form.ipAddress.trim(),
      status: form.status,
      location: form.location.trim(),
      notes: form.notes.trim()
    });

    setForm(emptyForm);
    setErrors({});
  };

  const field = (key: keyof typeof emptyForm) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }))
  });

  const inputClass = (errKey: keyof typeof emptyForm) =>
    `w-full px-3 py-2 border rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800/20 transition-all ${
      errors[errKey] ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200'
    }`;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          {editingAsset ? (
            <>
              <Pencil className="h-5 w-5 text-indigo-600" />
              Editar Equipo TI
            </>
          ) : (
            <>
              <Plus className="h-5 w-5 text-emerald-600" />
              Registrar Nuevo Equipo
            </>
          )}
        </h2>
        {editingAsset && (
          <button
            onClick={onCancelEdit}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Nombre del Equipo
          </label>
          <input
            type="text"
            placeholder="ej. PC-ADMINISTRACION, SRV-PLANILLAS"
            className={inputClass('deviceName')}
            {...field('deviceName')}
          />
          {errors.deviceName && (
            <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              {errors.deviceName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Tipo de Dispositivo
          </label>
          <select
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800/20 transition-all cursor-pointer"
            {...field('equipmentType')}
          >
            <option value="Servidor">Servidor</option>
            <option value="PC">PC de Escritorio</option>
            <option value="Laptop">Laptop / Portátil</option>
            <option value="Impresora">Impresora / Multifuncional</option>
            <option value="Switch">Switch / Router (Red)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Dirección IP
          </label>
          <input
            type="text"
            placeholder="ej. 192.168.1.50, DHCP, 10.0.0.5"
            className={inputClass('ipAddress')}
            {...field('ipAddress')}
          />
          <p className="text-slate-400 text-[11px] mt-1">Escribe DHCP si el direccionamiento es dinámico.</p>
          {errors.ipAddress && (
            <p className="text-rose-600 text-xs mt-1 flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              {errors.ipAddress}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Estado de Operación
          </label>
          <select
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800/20 transition-all cursor-pointer"
            {...field('status')}
          >
            <option value="Activo">Activo (Operativo)</option>
            <option value="Mantenimiento">En Mantenimiento</option>
            <option value="De baja">De Baja (Inactivo)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Ubicación Física (Opcional)
          </label>
          <input
            type="text"
            placeholder="ej. Oficina 204, Servidores Piso 1"
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800/20 transition-all"
            {...field('location')}
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
            Notas de Soporte / Diagnóstico (Opcional)
          </label>
          <textarea
            rows={3}
            placeholder="Detalles sobre el software, ram, procesador o fecha de último mantenimiento preventivo..."
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-slate-800/20 transition-all resize-none"
            {...field('notes')}
          />
        </div>

        <div className="flex gap-2 pt-2">
          {editingAsset && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className={`flex-1 px-4 py-2 text-white text-sm font-semibold rounded-lg transition-colors ${
              editingAsset ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-slate-800 hover:bg-slate-900'
            }`}
          >
            {editingAsset ? 'Guardar Cambios' : 'Agregar Equipo'}
          </button>
        </div>
      </form>
    </div>
  );
}
