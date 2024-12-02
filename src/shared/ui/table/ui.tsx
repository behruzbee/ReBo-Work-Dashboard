
import { useEffect } from 'react';
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, type SortingState, useReactTable } from '@tanstack/react-table'
import { Link } from 'react-router-dom';

import s from './styles.module.scss'

interface RTableProps<T> {
    data: T[];
    columns: any[];
    filters?: { [key: string]: any }
    sorting?: SortingState
}

const RTable = <T,>({ data, columns, sorting, filters }: RTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        state: {
            sorting: sorting
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        enableColumnFilters: true,
    })

    useEffect(() => {
        filters && table.setColumnFilters(Object.entries(filters).filter(([_, value]) => value !== undefined).map(([id, value]) => ({ id, value })))
    }, [filters, table]);

    if (!data.length) {
        return <h1>Hech nima topilmadi 😲</h1>
    }

    return (
        <table className={s.table}>
            <thead>
                {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            cell.column.id === 'id'
                                ? (
                                    <td key={cell.id}>
                                        <Link to='/' className={`${s.link} ${cell.column.id}`}>
                                            #{flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Link>
                                    </td>
                                )
                                : (
                                    <td key={cell.id} className={cell.column.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                )
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default RTable