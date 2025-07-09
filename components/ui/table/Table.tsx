'use client';

import { useTable, useFilters, useGlobalFilter, Column } from 'react-table';
import { Search, RefreshCw } from 'lucide-react';
import { useState } from 'react';

interface TableProps<T extends object> {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  error?: string | null;
}

const Table = <T extends object>({ columns, data, loading, error }: TableProps<T>) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { globalFilter },
    setGlobalFilter,
  } = useTable<T>({ columns, data }, useFilters, useGlobalFilter);

  const [isSearching, setIsSearching] = useState(false);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 500);
  };

  if (loading) {
    return (
      <div className="w-full px-5">
        <div className="flex items-center w-full md:max-w-[280px] h-[33px] border rounded-xl px-4 mb-4" style={{
          borderColor: 'var(--Colors-Neutral-300, #F1F2F9)',
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        }}>
          <input
            type="text"
            value={globalFilter || ''}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            className="flex-grow bg-transparent outline-none text-sm text-gray-500 placeholder:text-gray-400"
            aria-label="Search"
          />
          {isSearching ? (
            <RefreshCw className="w-4 h-4 text-black animate-spin ml-2" />
          ) : (
            <Search className="w-4 h-4 text-black ml-2" />
          )}
        </div>

        <div className="overflow-x-auto rounded-lg border border-[#F1F2F9]">
          <div className="px-1">
            <table className="w-full text-sm min-w-[600px] border-separate border-spacing-y-4">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} className="text-start">
                    {headerGroup.headers.map((column) => (
                      <th 
                        {...column.getHeaderProps()} 
                        className="px-4 py-2 text-start text-[#535353]"
                      >
                        {column.render('Header')}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="bg-white rounded-sm shadow-[0px_2px_16px_0px_#999BA81F] animate-pulse">
                    {columns.map((_, colIndex) => (
                      <td 
                        key={colIndex} 
                        className={`px-4 py-6 ${colIndex === 0 ? 'rounded-l-sm' : ''} ${colIndex === columns.length - 1 ? 'rounded-r-sm' : ''}`}
                      >
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-center items-center py-8">
          <div className="flex items-center gap-3 text-gray-600">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span className="text-sm font-medium">Loading data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-5">
        <div className="flex items-center w-full md:max-w-[280px] h-[33px] border rounded-xl px-4 mb-4" style={{
          borderColor: 'var(--Colors-Neutral-300, #F1F2F9)',
          boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
        }}>
          <input
            type="text"
            value={globalFilter || ''}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            className="flex-grow bg-transparent outline-none text-sm text-gray-500 placeholder:text-gray-400"
            aria-label="Search"
          />
          {isSearching ? (
            <RefreshCw className="w-4 h-4 text-black animate-spin ml-2" />
          ) : (
            <Search className="w-4 h-4 text-black ml-2" />
          )}
        </div>

        <div className="flex flex-col items-center justify-center py-16">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">Failed to load data</h3>
              <p className="text-sm text-gray-600 max-w-md">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-5">
      <div className="flex items-center w-full md:max-w-[280px] h-[33px] border rounded-xl px-4 mb-4" style={{
        borderColor: 'var(--Colors-Neutral-300, #F1F2F9)',
        boxShadow: '0px 1px 2px rgba(16, 24, 40, 0.05)',
      }}>
        <input
          type="text"
          value={globalFilter || ''}
          onChange={handleSearchInputChange}
          placeholder="Search..."
          className="flex-grow bg-transparent outline-none text-sm text-gray-500 placeholder:text-gray-400"
          aria-label="Search"
        />
        {isSearching ? (
          <RefreshCw className="w-4 h-4 text-black animate-spin ml-2" />
        ) : (
          <Search className="w-4 h-4 text-black ml-2" />
        )}
      </div>

      <div className="overflow-x-auto rounded-lg border border-[#F1F2F9]">
        <div className="px-1">
          <table {...getTableProps()} className="w-full text-sm min-w-[600px] border-separate border-spacing-y-4">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="text-start">
                  {headerGroup.headers.map((column) => (
                    <th 
                      {...column.getHeaderProps()} 
                      className="px-4 py-2 text-start text-[#535353]"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-4 py-8 text-center text-gray-500">
                    No data found
                  </td>
                </tr>
              ) : (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="bg-white rounded-sm shadow-[0px_2px_16px_0px_#999BA81F] hover:shadow-[0px_4px_20px_0px_#999BA81F] transition-shadow"
                    >
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          {...cell.getCellProps()}
                          className={`px-4 py-6 ${
                            cellIndex === 0 ? 'rounded-l-sm' : ''
                          } ${
                            cellIndex === row.cells.length - 1 ? 'rounded-r-sm' : ''
                          }`}
                        >
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;