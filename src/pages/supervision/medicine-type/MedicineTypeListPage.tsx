import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { DataGrid, DataGridColumnHeader, KeenIcon, useDataGrid } from '@/components';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { deleteMedicineTypeById, getAllMedicineTypes } from '@/service/medicineTypeService';
import { IMedicineType } from '@/types/medicineType';
import MedicineTypeModal from './MedicineTypeModal'; // Ajusta ruta si es necesario

const MedicineTypeListPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<IMedicineType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    () => localStorage.getItem('medicineType-filter') || ''
  );
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('medicineType-filter', searchTerm);
  }, [searchTerm]);

  const fetchMedicineTypes = async () => {
    setLoading(true);
    try {
      const medicineTypes = await getAllMedicineTypes();
      setData(medicineTypes);
    } catch {
      toast.error('Error al cargar tipos de medicina');
    } finally {
      setLoading(false);
    }
  };

  // Cargar datos inicialmente
  useEffect(() => {
    fetchMedicineTypes();
  }, []);

  type IColumnFilterProps<TData, TValue> = {
    column: {
      getFilterValue: () => unknown;
      setFilterValue: (value: unknown) => void;
    };
  };

  const ColumnInputFilter = <TData, TValue>({ column }: IColumnFilterProps<TData, TValue>) => (
    <Input
      placeholder="Filtrar..."
      value={(column.getFilterValue() as string) ?? ''}
      onChange={(event) => column.setFilterValue(event.target.value)}
      className="h-9 w-full max-w-40"
    />
  );

  const columns = useMemo<ColumnDef<IMedicineType>[]>(
    () => [
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Nombre"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        enableSorting: true,
        filterFn: (row, _columnId, filterValue) =>
          row.original.name.toLowerCase().includes((filterValue ?? '').toLowerCase()),
        cell: (info) => <span>{info.getValue() as string}</span>,
        meta: { headerClassName: 'w-[180px]', cellClassName: 'text-gray-700 font-normal' }
      },
      {
        accessorKey: 'risk_level',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Nivel de Riesgo"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        enableSorting: true,
        filterFn: (row, _columnId, filterValue) =>
          row.original.risk_level.toLowerCase().includes((filterValue ?? '').toLowerCase()),
        cell: (info) => {
          const risk = info.getValue() as string;
          const colorMap: Record<string, string> = {
            Ninguno: 'gray',
            Bajo: 'success',
            Medio: 'warning',
            Alto: 'danger'
          };
          const color = colorMap[risk] || 'gray';
          return (
            <span className={`badge badge-outline badge-${color} rounded-[30px]`}>{risk}</span>
          );
        },
        meta: { headerClassName: 'w-[180px]', cellClassName: 'text-gray-700 font-normal' }
      },
      {
        id: 'actions',
        header: () => 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex">
            <button
              className="btn btn-sm btn-icon btn-clear btn-danger"
              onClick={async () => {
                const swal = (await import('sweetalert2')).default;
                swal
                  .fire({
                    title: `<span style="font-size: 18px;">¿Estas seguro/a de eliminar a "${row.original.name}" de la agenda?</span>`,
                    html: '<p style="font-size: 14px;">Una vez eliminada no podrás recuperar sus datos</p>',
                    icon: 'error',
                    width: '400px',
                    showCancelButton: true,
                    cancelButtonColor: '#ACACAC',
                    confirmButtonColor: '#73AF00',
                    cancelButtonText: 'Cancelar',
                    confirmButtonText: 'Sí, eliminar'
                  })
                  .then(async (result) => {
                    if (result.isConfirmed) {
                      try {
                        await deleteMedicineTypeById(row.original.medicine_type_id);
                        setData((prev) =>
                          prev.filter(
                            (item) => item.medicine_type_id !== row.original.medicine_type_id
                          )
                        );
                        toast.success('Tipo de medicina eliminada correctamente', {
                          icon: <KeenIcon icon="check-circle" className="text-green-500" />
                        });
                      } catch (error) {
                        toast.error('Error al eliminar la agenda de farmacia');
                      }
                    }
                  });
              }}
            >
              <KeenIcon icon="trash" />
            </button>
          </div>
        ),
        meta: { headerClassName: 'w-[120px]' }
      }
    ],
    [navigate]
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.risk_level.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const handleRowSelection = (state: RowSelectionState) => {
    const selectedRowIds = Object.keys(state);
    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} seleccionados`, {
        description: `IDs: ${selectedRowIds.join(', ')}`,
        action: { label: 'Deshacer', onClick: () => console.log('Undo') }
      });
    }
  };

  const Toolbar = () => {
    const { table } = useDataGrid();

    return (
      <div className="card-header flex-wrap px-5 py-5 border-b-0">
        <div className="flex flex-wrap w-full items-center justify-between gap-2.5">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-xs">
              <KeenIcon
                icon="magnifier"
                className="leading-none text-md text-gray-500 absolute top-1/2 start-0 -translate-y-1/2 ms-3"
              />
              <input
                type="text"
                placeholder="Buscar tipo de medicina"
                className="input input-sm ps-8 w-full"
                value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-greenA text-white hover:[background-color:#7BCC2F] transition-colors flex items-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="ki-duotone ki-plus-squared"></i>
            Añadir Tipo de Medicina
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <DataGrid
        columns={columns}
        data={filteredData}
        rowSelection
        onRowSelectionChange={handleRowSelection}
        pagination={{ size: 5 }}
        sorting={[{ id: 'name', desc: true }]}
        toolbar={<Toolbar />}
        layout={{ card: true }}
      />
      <MedicineTypeModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={() => {
          setIsModalOpen(false);
          fetchMedicineTypes(); // Refresca la tabla al crear un nuevo tipo
          toast.success('Tipo de medicina creado correctamente');
        }}
      />
    </>
  );
};

export { MedicineTypeListPage };
