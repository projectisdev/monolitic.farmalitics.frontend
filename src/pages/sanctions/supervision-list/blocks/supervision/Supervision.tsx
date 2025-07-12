
/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Column, ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { DataGrid, DataGridColumnHeader, DataGridColumnVisibility, DataGridRowSelect, DataGridRowSelectAll, KeenIcon, useDataGrid } from '@/components';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { SupervisionData, ISupervisionPharmacy } from '.';

interface IColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}

const Supervision = () => {
  const storageFilterId = 'pharmacys-filter';
  const navigate = useNavigate();
  const ColumnInputFilter = <TData, TValue>({ column }: IColumnFilterProps<TData, TValue>) => {
    return (
      <Input
        placeholder="Filter..."
        value={(column.getFilterValue() as string) ?? ''}
        onChange={(event) => column.setFilterValue(event.target.value)}
        className="h-9 w-full max-w-40"
      />
    );
  };

  const columns = useMemo<ColumnDef<ISupervisionPharmacy>[]>(
    () => [

      {
        accessorFn: (row) => row.pharmacyName,
        id: 'pharmacyName',
        header: ({ column }) => (
          <DataGridColumnHeader
            title="Farmacias"
            filter={<ColumnInputFilter column={column} />}
            column={column}
          />
        ),
        enableSorting: true,
        filterFn: (row, _filterValue) => {
          const pharmacyName = row.original.pharmacyName;
          return (pharmacyName ?? '').toLowerCase().includes((_filterValue ?? '').toLowerCase());
        },
        cell: (info) => (
          <div className="flex flex-col gap-2">
            {info.row.original.pharmacyName}
          </div>
        ),
        meta: {
          headerClassName: 'w-[300px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        accessorFn: (row) => row.technicalManager,
        id: 'technicalManager',
        header: ({ column }) => (
          <DataGridColumnHeader
        title="Encargado de Inspección"
        filter={<ColumnInputFilter column={column} />}
        column={column}
          />
        ),
        enableSorting: true,
        filterFn: (row, _filterValue) => {
          const manager = row.original.technicalManager;
          return (manager ?? '').toLowerCase().includes((_filterValue ?? '').toLowerCase());
        },
        cell: (info) => (
          <span className="text-gray-700">{info.row.original.technicalManager}</span>
        ),
        meta: {
          headerClassName: 'w-[100px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      
      {
        accessorFn: (row) => row.supervisionDate,
        id: 'supervisionDate',
        enableSorting: true,
        header: ({ column }) => <DataGridColumnHeader title='Fecha de supervisión' column={column} />,
        cell: (info) => info.getValue(),
        meta: {
          headerTitle: 'Date',
          headerClassName: 'w-[80px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        accessorFn: (row) => row.supervisionTime,
        id: 'supervisionTime',
        enableSorting: true,
        header: ({ column }) => <DataGridColumnHeader title='Hora de supervisión ' column={column} />,
        cell: (info) => info.getValue(),
         meta: {
          headerClassName: 'w-[80px]',
        },
      },
      {
        accessorFn: (row) => row.status,
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Estado" column={column}/>,  
        enableSorting: true,
        cell: (info) => {
          let color = '';
          let label = '';
          if (info.row.original.status === 'Pendiente') {
            color = 'warning';
            label = 'Pendiente';
          } else if (info.row.original.status === 'Realizado') {
            color = 'success';
            label = 'Realizado';
          } else {
            color = 'secondary';
            label = info.row.original.status;
          }
          return (
            <span className={`badge badge-${color} shrink-0 badge-outline rounded-[30px]`}>
              <span className={`size-1.5 rounded-full bg-${color} me-1.5`}></span>
              {label}
            </span>
          );
        },
        meta: {
          headerClassName: 'min-w-[80px]' 
        }
      },

      {
        id: 'actions',
        header: () => 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">

            <button
              className="btn btn-sm btn-icon btn-clear btn-success"
               onClick={() => navigate(`/supervision/list/supervision-detail/${row.original.supervisionId}`)}
            >
              <KeenIcon icon="cursor" />
            </button>

            <button
              className="btn btn-sm btn-icon btn-clear btn-danger"
              onClick={async () => {
              const swal = (await import('sweetalert2')).default;
              swal.fire({
                title: `<span style="font-size: 18px;">¿Estas seguro/a de eliminar a "${row.original.pharmacyName}" de la agenda?</span>`,
                html: '<p style="font-size: 14px;">Una vez eliminada no podrás recuperar sus datos</p>',
                icon: 'error',
                 width: '400px',
                showCancelButton: true,
                cancelButtonColor: '#ACACAC',
                confirmButtonColor: '#73AF00',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, eliminar',
              }).then((result) => {
                if (result.isConfirmed) {

                // TODO: Implementar la función borrado aquí

                toast.success('Agenda de Farmacia eliminada correctamente', {
                  icon: <KeenIcon icon="check-circle" className="text-green-500" />,
                });
                }
              });
              }}
            >
              <KeenIcon icon="trash" />
            
            </button>

            
          </div>
        ),
        meta: {
          headerClassName: 'w-[110px]',
        },
      },
    ],
    []
  );
  
  // Memoize the pharmacy data
  const data: ISupervisionPharmacy[] = useMemo(() => SupervisionData, []);

  // Initialize search term from localStorage if available
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem(storageFilterId) || '';
  });

  // Update localStorage whenever the search term changes
  useEffect(() => {
    localStorage.setItem(storageFilterId, searchTerm);
  }, [searchTerm]);

  // Filtered data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return data; // If no search term, return full data

    return data.filter(
      (pharmacy) =>
        pharmacy.pharmacyName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, data]);

  const handleRowSelection = (state: RowSelectionState) => {
    const selectedRowIds = Object.keys(state);

    if (selectedRowIds.length > 0) {
      toast(`Total ${selectedRowIds.length} are selected.`, {
        description: `Selected row IDs: ${selectedRowIds}`,
        action: {
          label: 'Undo',
          onClick: () => console.log('Undo')
        }
      });
    }
  };

  const Toolbar = () => {
    const { table } = useDataGrid();
    const navigate = useNavigate();

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
            onChange={(event) => table.getColumn('pharmacy')?.setFilterValue(event.target.value)}
          />
        </div>
          </div>
          <button
        type="button"
        className="btn btn-sm btn-greenA text-white hover:[background-color:#7BCC2F] transition-colors flex items-center gap-2"
        onClick={() => navigate('/supervision/list/add-supervision')}
          >
        <i className="ki-duotone ki-plus-squared"></i>
        Agendar Supervisión
          </button>
        </div>
      </div>
    );
  };

  return (
    <DataGrid 
      columns={columns} 
      data={filteredData} 
      rowSelection={true} 
      onRowSelectionChange={handleRowSelection}
      pagination={{ size: 5 }}
      sorting={[{ id: 'pharmacy', desc: false }]} 
      toolbar={<Toolbar />}
      layout={{ card: true }}
    />
  );
};

export { Supervision };