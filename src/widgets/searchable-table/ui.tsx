
import { ReactNode } from 'react'
import { type SortingState } from '@tanstack/react-table'

import { RTable } from '~shared/ui/table'

import s from './styles.module.scss'

interface SearchableTableProps {
    data: any[]
    columns: any[]
    inputs?: ReactNode[]
    filters?: { [key: string]: any }
    sorting?: SortingState
}

const SearchableTable = ({ data, inputs, columns, sorting, filters }: SearchableTableProps) => {

    return (
        <div className={s.wrapper}>
            <div className={s.inputWrapper}>
                {inputs}
            </div>
            <RTable data={data} columns={columns} filters={filters} sorting={sorting} />
        </div>
    )
}

export default SearchableTable