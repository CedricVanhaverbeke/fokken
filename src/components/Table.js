import React, { useMemo } from 'react';
import { useTable } from 'react-table';

import c from '@/utils/c';

const Table = ({
  columns,
  data,
  className,
  columnClassName,
  rowClassName,
  cellClassName,
  headerClassName,
}) => {
  const memoizedData = useMemo(() => data || Array(30).fill({}), [data]);
  const memoizedColumns = useMemo(
    () =>
      !!data
        ? columns
        : columns.map(({ Skeleton, ...columnProps }) => ({
            ...columnProps,
            Cell: Skeleton ? (
              <Skeleton />
            ) : (
              <div className="bg-gray-200 animate-pulse h-10 rounded items-center" />
            ),
          })),
    [columns, data],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: memoizedColumns,
    data: memoizedData,
  });

  return (
    <table className={className} {...getTableProps()}>
      <thead className="rounded-t-md">
        {headerGroups.map((headerGroup) => (
          <tr
            key={headerGroup}
            {...headerGroup.getHeaderGroupProps([
              { className: c(headerClassName, data || 'animate-pulse') },
            ])}
          >
            {headerGroup.headers.map((column) => (
              <th
                key={column}
                {...column.getHeaderProps([
                  {
                    className: columnClassName,
                  },
                ])}
              >
                <div className={c(data || 'invisible')}>
                  {column.render('Header')}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row} className={rowClassName} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  key={cell}
                  {...cell.getCellProps([{ className: cellClassName }])}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
