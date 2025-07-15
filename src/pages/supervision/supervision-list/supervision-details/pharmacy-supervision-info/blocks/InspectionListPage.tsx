import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { DataGrid, DataGridColumnHeader, KeenIcon, useDataGrid } from '@/components';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { getAllSupervisionPharmacy, deleteSupervisionPharmacyById } from '@/service/supervisionPharmacyService';
import { ISupervision } from '@/types/Supervision';

const InspectionListPage = () => {
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

  const [data, setData] = useState<ISupervision[]>([]);
  const [searchTerm, setSearchTerm] = useState(() => localStorage.getItem(storageFilterId) || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(storageFilterId, searchTerm);
  }, [searchTerm]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const supervisions = await getAllSupervisionPharmacy();
      // Map API response to ISupervision[]
      const mappedSupervisions = supervisions.map((s: any) => ({
        supervision_id: s.supervision_id,
        pharmacy_id: s.pharmacy_id,
        pharmacy_name: s.pharmacy_name ?? s.name ?? '',
        supervision_date: s.supervision_date ?? '',
        supervision_time: s.supervision_time ?? '',
        status: s.status ?? '',
        created_at: s.created_at ?? '', // Ensure created_at is present
      }));
      setData(mappedSupervisions);
    } catch (error) {
      toast.error('Error al cargar supervisiones');
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  const columns = useMemo<ColumnDef<ISupervision>[]>(
    () => [
      {
        accessorFn: (row) => row.pharmacy_name,
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
          const nameMatch = (row.original.pharmacy_name ?? '')
            .toLowerCase()
            .includes((filterValue ?? '').toLowerCase());
          return Boolean(nameMatch);
        },
        cell: (info) => (
          <div className="flex flex-col gap-2">
            <Link
              className="leading-none font-medium text-sm text-gray-900 hover:text-primary"
              to={`/pharmacy/list/pharmacy-detail/${info.row.original.pharmacy_id}`}
            >
              {info.row.original.pharmacy_name}
            </Link>
          </div>
        ),
        meta: {
          headerClassName: 'min-w-[250px]',
          cellClassName: 'text-gray-700 font-normal'
        }
            },
            {
        accessorFn: (row) =>
          row.created_at ? new Date(row.created_at).toLocaleDateString('es-DO') : '',
        id: 'createdAt',
        header: ({ column }) => <DataGridColumnHeader title="Fecha de Solicitud" column={column} />,
        cell: (info) => info.getValue(),
        meta: { headerClassName: 'w-[200px]', cellClassName: 'text-gray-700 font-normal' }
            },
            {
        accessorFn: (row) =>
          row.supervision_date ? <strong>{new Date(row.supervision_date).toLocaleDateString('es-DO')}</strong> : '',
        id: 'supervisionDate',
        header: ({ column }) => <DataGridColumnHeader title="Fecha de Supervisión" column={column} />,
        cell: (info) => info.getValue(),
        meta: { headerClassName: 'w-[200px]', cellClassName: 'text-gray-700 font-normal' }
            },
            {
        accessorFn: (row) => {
          if (!row.supervision_time) return '';
          const [hourStr, minuteStr] = row.supervision_time.split(':');
          let hour = parseInt(hourStr, 10);
          const minute = minuteStr ? parseInt(minuteStr, 10) : 0;
          const ampm = hour >= 12 ? 'PM' : 'AM';
            hour = hour % 12 || 12;
            return (
            <strong>
              {`${hour}:${minute.toString().padStart(2, '0')} ${ampm}`}
            </strong>
            );
        },
        id: 'supervisionTime',
        header: ({ column }) => <DataGridColumnHeader title="Hora de Supervisión" column={column} />,
        cell: (info) => info.getValue(),
        meta: { headerClassName: 'w-[180px]', cellClassName: 'text-gray-700 font-normal' }
        },
        {
        accessorFn: (row) => row.status,
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Estado" column={column} />,
        enableSorting: true,
        cell: (info) => {
          const color = info.row.original.status === 'Realizada' ? 'success' : 'warning';
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
        id: 'actions',
        header: () => 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">
                       <button
              className="btn btn-sm btn-icon btn-clear btn-blueA"
               onClick={() => navigate(`/supervision/list/supervision-detail/${row.original.supervision_id}`)}
            >
              <KeenIcon icon="cursor" />
            </button>
            <button
              className="btn btn-sm btn-icon btn-clear btn-success"
              onClick={() => navigate(`/supervision/edit/${row.original.supervision_id}`)}
            >
              <KeenIcon icon="notepad-edit" />
            </button>
            <button
              className="btn btn-sm btn-icon btn-clear btn-danger"
              onClick={async () => {
              const swal = (await import('sweetalert2')).default;
              swal.fire({
                title: `<span style="font-size: 18px;">¿Estas seguro/a de eliminar a "${row.original.pharmacy_name}" de la agenda?</span>`,
                html: '<p style="font-size: 14px;">Una vez eliminada no podrás recuperar sus datos</p>',
                icon: 'error',
                width: '400px',
                showCancelButton: true,
                cancelButtonColor: '#ACACAC',
                confirmButtonColor: '#73AF00',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, eliminar',
              }).then(async (result) => {
                if (result.isConfirmed) {
                try {
                  await deleteSupervisionPharmacyById(row.original.supervision_id);
                  setData((prev) =>
                  prev.filter(
                    (item) => item.supervision_id !== row.original.supervision_id
                  )
                  );
                  toast.success('Agenda de Farmacia eliminada correctamente', {
                  icon: <KeenIcon icon="check-circle" className="text-green-500" />,
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
      },
    ],
    [navigate]
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    return data.filter(
      (pharmacy) =>
        pharmacy.pharmacy_name.toLowerCase().includes(searchTerm.toLowerCase())
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
        onClick={() => navigate('/supervision/add-inspection')}
          >
        <i className="ki-duotone ki-plus-squared"></i>
          Realizar Inspección
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

export { InspectionListPage };
