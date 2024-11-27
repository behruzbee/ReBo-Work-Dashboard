
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Link } from 'react-router-dom';

import s from './styles.module.scss'

interface RTableProps<T> {
    data: T[];
    columns: any[];
}


// I used tanstack table headless ui
const RTable = <T,>({ data, columns }: RTableProps<T>) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

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
                                        <Link to='/' className={s.link}>
                                            #{flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Link>
                                    </td>
                                )
                                : (
                                    <td key={cell.id} className={s.link}>
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