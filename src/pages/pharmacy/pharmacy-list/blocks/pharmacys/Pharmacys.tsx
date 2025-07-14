import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { DataGrid, DataGridColumnHeader, KeenIcon, useDataGrid } from '@/components';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { getPharmacies, deletePharmacy, updatePharmacyStatus } from '@/service/pharmacyService';
import { IPharmacy } from '@/types/Pharmacy';

const Pharmacys = () => {
  const storageFilterId = 'pharmacys-filter';
  const navigate = useNavigate();

  type IColumnFilterProps<TData, TValue> = {
    column: {
      getFilterValue: () => unknown;
      setFilterValue: (value: unknown) => void;
    };
  };

  const ColumnInputFilter = <TData, TValue>({ column }: IColumnFilterProps<TData, TValue>) => (
    <Input
      placeholder="Filter..."
      value={(column.getFilterValue() as string) ?? ''}
      onChange={(event) => column.setFilterValue(event.target.value)}
      className="h-9 w-full max-w-40"
    />
  );

  const [data, setData] = useState<IPharmacy[]>([]);
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem(storageFilterId) || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(storageFilterId, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pharmacies = await getPharmacies('Activa'); // 👈 Aquí pasas el filtro que quieras
        setData(pharmacies);
      } catch (error) {
        toast.error('Error al cargar farmacias');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = useMemo<ColumnDef<IPharmacy>[]>(
    () => [
      {
        accessorFn: (row) => row.name,
        id: 'pharmacy',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Farmacias"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        enableSorting: true,
        filterFn: (row, _columnId, filterValue) => {
          const nameMatch = (row.original.name ?? '')
            .toLowerCase()
            .includes((filterValue ?? '').toLowerCase());
          const emailMatch = (row.original.email ?? '')
            .toLowerCase()
            .includes((filterValue ?? '').toLowerCase());
          return Boolean(nameMatch || emailMatch);
        },
        cell: (info) => (
          <div className="flex flex-col gap-2">
            <Link
              className="leading-none font-medium text-sm text-gray-900 hover:text-primary"
              to={`/pharmacy/list/pharmacy-detail/${info.row.original.pharmacy_id}`}
            >
              {info.row.original.name}
            </Link>
            <span className="text-2sm text-gray-700 font-normal leading-3">
              {info.row.original.email}
            </span>
          </div>
        ),
        meta: {
          headerClassName: 'min-w-[250px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        accessorFn: (row) => row.pharmacy_type,
        id: 'pharmacyType',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Tipo de Farmacia"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        enableSorting: true,
        filterFn: (row, _columnId, filterValue) =>
          row.original.pharmacy_type.toLowerCase().includes(filterValue.toLowerCase()),
        cell: (info) => (
          <div className="flex flex-col">
            <Link
              className="leading-none font-medium text-sm text-gray-500 hover:text-primary"
              to="#"
            >
              {info.row.original.pharmacy_type}
            </Link>
          </div>
        ),
        meta: { headerClassName: 'min-w-[100px]' }
      },
      {
        accessorFn: (row) => row.status,
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Estado" column={column} />,
        enableSorting: true,
        cell: (info) => {
          const color = info.row.original.status === 'Activa' ? 'success' : 'danger';
          return (
            <span className={`badge badge-${color} shrink-0 badge-outline rounded-[30px]`}>
              <span className={`size-1.5 rounded-full bg-${color} me-1.5`}></span>
              {info.row.original.status}
            </span>
          );
        },
        meta: { headerClassName: 'min-w-[100px]' }
      },
      {
        accessorFn: (row) =>
          row.opening_date ? new Date(row.opening_date).toLocaleDateString('es-DO') : '',
        id: 'lastModified',
        header: ({ column }) => <DataGridColumnHeader title="Fecha de Apertura" column={column} />,
        cell: (info) => info.getValue(),
        meta: { headerClassName: 'w-[200px]', cellClassName: 'text-gray-700 font-normal' }
      },

      {
        id: 'actions',
        header: () => 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-icon btn-clear btn-blueA"
              onClick={() => navigate(`/pharmacy/list/pharmacy-detail/${row.original.pharmacy_id}`)}
            >
              <KeenIcon icon="eye" />
            </button>
            <button
              className="btn btn-sm btn-icon btn-clear btn-success"
              onClick={() => navigate(`/pharmacy/edit/${row.original.pharmacy_id}`)}
            >
              <KeenIcon icon="notepad-edit" />
            </button>

            <button
              className="btn btn-sm btn-icon btn-clear btn-danger"
              onClick={async () => {
                const Swal = (await import('sweetalert2')).default;
                Swal.fire({
                  title: `<span style="font-size: 18px;">¿Estas seguro/a de eliminar a "${row.original.name}"?</span>`,
                  html: '<p style="font-size: 14px;">Una vez eliminada no podrás recuperar sus datos</p>',
                  icon: 'error',
                  width: '400px',
                  showCancelButton: true,
                  cancelButtonColor: '#ACACAC',
                  confirmButtonColor: '#73AF00',
                  cancelButtonText: 'Cancelar',
                  confirmButtonText: 'Sí, eliminar'
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    try {
                      await deletePharmacy(String(row.original.pharmacy_id));
                      toast.success('Farmacia eliminada correctamente', {
                        icon: <KeenIcon icon="check-circle" className="text-green-500" />
                      });
                      // Opcional: refrescar la lista después de eliminar
                      setData((prev) =>
                        prev.filter((p) => p.pharmacy_id !== row.original.pharmacy_id)
                      );
                    } catch (error) {
                      toast.error('Error al eliminar la farmacia');
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
      },
      {
        accessorKey: 'status',
        id: 'toggleStatus',
        header: ({ column }) => <DataGridColumnHeader title="Estado" column={column} />,
        enableSorting: false,
        cell: ({ row }) => {
          const isActive = row.original.status === 'Activa';
          const [loading, setLoading] = useState(false);

          const handleToggle = async () => {
            setLoading(true);
            const newStatus = isActive ? 'Inactiva' : 'Activa';
            try {
              await updatePharmacyStatus(String(row.original.pharmacy_id), newStatus);
              setData((prev) =>
                prev.map((pharmacy) =>
                  pharmacy.pharmacy_id === row.original.pharmacy_id
                    ? { ...pharmacy, status: newStatus }
                    : pharmacy
                )
              );
              toast.success(`Estado cambiado a ${newStatus}`, {
                icon: <KeenIcon icon="check-circle" className="text-green-500" />
              });
            } catch (error) {
              toast.error('Error al cambiar el estado');
            } finally {
              setLoading(false);
            }
          };

          return (
            <label className="flex items-center justify-center w-full cursor-pointer">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={isActive}
                onChange={handleToggle}
                disabled={loading}
                id={`switch-${row.original.pharmacy_id}`}
              />
              <div
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  isActive ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isActive ? 'translate-x-5' : ''
                  }`}
                />
              </div>
            </label>
          );
        },
        meta: { headerClassName: 'w-[100px]', cellClassName: 'text-gray-700 font-normal' }
      }
    ],
    [navigate]
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(
      (pharmacy) =>
        pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (pharmacy.email || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const handleRowSelection = (state: RowSelectionState) => {
    const selectedRowIds = Object.keys(state);
    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} seleccionadas`, {
        description: `IDs: ${selectedRowIds.join(', ')}`,
        action: { label: 'Undo', onClick: () => console.log('Undo') }
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
                placeholder="Buscar Farmacia"
                className="input input-sm ps-8 w-full"
                value={(table.getColumn('pharmacy')?.getFilterValue() as string) ?? ''}
                onChange={(event) =>
                  table.getColumn('pharmacy')?.setFilterValue(event.target.value)
                }
              />
            </div>
          </div>
          <button
            type="button"
            className="btn btn-sm btn-greenA text-white hover:[background-color:#7BCC2F] transition-colors flex items-center gap-2"
            onClick={() => navigate('/pharmacy/list/add-pharmacy')}
          >
            <i className="ki-duotone ki-plus-squared"></i>
            Añadir Farmacia
          </button>
        </div>
      </div>
    );
  };

  return (
    <DataGrid
      columns={columns}
      data={filteredData}
      rowSelection
      onRowSelectionChange={handleRowSelection}
      pagination={{ size: 5 }}
      sorting={[{ id: 'createdAt', desc: true }]}
      toolbar={<Toolbar />}
      layout={{ card: true }}
    />
  );
};

export { Pharmacys };
