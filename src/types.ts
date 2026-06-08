export type EquipmentType = 'Servidor' | 'PC' | 'Laptop' | 'Impresora' | 'Switch';
export type AssetStatus = 'Activo' | 'Mantenimiento' | 'De baja';

export interface Asset {
  id: string;
  deviceName: string;
  equipmentType: EquipmentType;
  ipAddress: string;
  status: AssetStatus;
  location: string;
  notes: string;
  lastUpdated: string;
}
