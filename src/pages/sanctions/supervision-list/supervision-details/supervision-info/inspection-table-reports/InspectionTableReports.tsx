/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Column, ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { DataGrid, DataGridColumnHeader, DataGridColumnVisibility, DataGridRowSelect, DataGridRowSelectAll, KeenIcon, useDataGrid } from '@/components';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { PharmacyData, ITeamData } from '.';

interface IColumnFilterProps<TData, TValue> {
  column: Column<TData, TValue>;
}

const InspectionTableReports = () => {
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

  const columns = useMemo<ColumnDef<ITeamData>[]>(
    () => [
      
      {
        accessorFn: (row) => row.pharmacy.pharmacyName,
        id: 'pharmacy',
        header: ({ column }) => <DataGridColumnHeader title='Farmacias' filter={<ColumnInputFilter column={column} />} column={column} />,
        enableSorting: true,
        filterFn: (row, columnId, filterValue) => {
          const pharmacy = row.original.pharmacy;
          const nameMatch = pharmacy.pharmacyName?.toLowerCase().includes(filterValue.toLowerCase());
          const descriptionMatch = pharmacy.email?.toLowerCase().includes(filterValue.toLowerCase());
          return nameMatch || descriptionMatch;
        },
        cell: (info) => {
          return (
            <div className="flex flex-col gap-2">
              <Link
                className="leading-none font-medium text-sm text-gray-900 hover:text-primary"
                to={`/pharmacy/list/pharmacy-detail/${info.row.original.pharmacy.id}`}
              >
                {info.row.original.pharmacy.pharmacyName}
              </Link>
              <span className="text-2sm text-gray-700 font-normal leading-3">
                {info.row.original.pharmacy.email}
              </span>
            </div>
          );
        },
        meta: {
          headerClassName: 'min-w-[250px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
     
       {
        accessorFn: (row) => row.pharmacyType,
        id: 'telephone',
        header: ({ column }) => <DataGridColumnHeader title='Tipo de Farmacia' filter={<ColumnInputFilter column={column} />} column={column} />,
        enableSorting: true,
        filterFn: (row, columnId, filterValue) => {
          const pharmacyType = row.original.pharmacyType;
          const nameMatch = pharmacyType?.toLowerCase().includes(filterValue.toLowerCase());
          return nameMatch;
        },
        cell: (info) => {
          return (
            <div className="flex flex-col">
              <Link
                className="leading-none font-medium text-sm text-gray-500 hover:text-primary"
                to="#"
              >
                {info.row.original.pharmacyType}
              </Link>
            </div>
          );
        },
        meta: {
          headerClassName: 'min-w-[100px]' 
        }
      },
      {
        accessorFn: (row) => row.status,
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Estado" column={column}/>,  
        enableSorting: true,
        cell: (info) => {                    
          return (
            <span className={`badge badge-${info.row.original.status.color} shrink-0 badge-outline rounded-[30px]`}>
              <span className={`size-1.5 rounded-full bg-${info.row.original.status.color} me-1.5`}></span>
              {info.row.original.status.label}
            </span>
          );
        },
        meta: {
          headerClassName: 'min-w-[100px]' 
        }
      },
      {
        accessorFn: (row) => row.date,
        id: 'lastModified',
        enableSorting: true,
        header: ({ column }) => <DataGridColumnHeader title='Fecha' column={column} />,
        cell: (info) => info.getValue(),
        meta: {
          headerTitle: 'Date',
          headerClassName: 'w-[200px]',
          cellClassName: 'text-gray-700 font-normal'
        }
      },
      {
        id: 'actions',
        header: () => 'Acciones',
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex gap-2">

            <button 
              className="btn btn-sm btn-icon btn-clear btn-blueA" 
              onClick={() => navigate(`/pharmacy/list/pharmacy-detail/${row.original.pharmacy.id}`)}
            >
              <KeenIcon icon="eye" />
            </button>

            <button 
              className="btn btn-sm btn-icon btn-clear btn-success" 
              onClick={() => alert(`Clicked on edit for ${row.original.pharmacy.pharmacyName}`)}
            >
              <KeenIcon icon="notepad-edit" />
            </button>
            <button
              className="btn btn-sm btn-icon btn-clear btn-danger"
              onClick={async () => {
              const swal = (await import('sweetalert2')).default;
              swal.fire({
                title: `<span style="font-size: 18px;">¿Estas seguro/a de eliminar a "${row.original.pharmacy.pharmacyName}"?</span>`,
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

                toast.success('Farmacia eliminada correctamente', {
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
          headerClassName: 'w-[120px]',
        },
      },
    ],
    []
  );
  
  // Memoize the pharmacy data
  const data: ITeamData[] = useMemo(() => PharmacyData, []);

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
        pharmacy.pharmacy.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase())
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
      rowSelection={true} 
      onRowSelectionChange={handleRowSelection}
      pagination={{ size: 5 }}
      sorting={[{ id: 'pharmacy', desc: false }]} 
      toolbar={<Toolbar />}
      layout={{ card: true }}
    />
  );
};

export { InspectionTableReports };
