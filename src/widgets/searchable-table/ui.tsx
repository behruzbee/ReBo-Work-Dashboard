
import { ReactNode, useState } from 'react'
import { type SortingState } from '@tanstack/react-table'

import { RTable } from '~shared/ui/table'

import s from './styles.module.scss'
import { RButton } from '~shared/ui/button'
import { RIcon } from '~shared/ui/icon'

interface SearchableTableProps {
    data: any[]
    columns: any[]
    inputs?: ReactNode[]
    filters?: { [key: string]: any }
    sorting?: SortingState
}

const SearchableTable = ({ data, inputs, columns, sorting, filters }: SearchableTableProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className={s.wrapper}>
            <RButton className={s.filterButton} color='blue' size='sm' onClick={() => setIsOpen(!isOpen)}>
                <RIcon name='filter-alt' />
                {' '}Filterlar
            </RButton>
            <div className={`${s.inputWrapper} ${isOpen ? s.open : s.close}`}>
                {inputs}
            </div>
            <RTable data={data} columns={columns} filters={filters} sorting={sorting} />
        </div>
    )
}

export default SearchableTable