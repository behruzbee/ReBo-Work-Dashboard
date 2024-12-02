
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { type SortingState } from '@tanstack/react-table'

import { RTable } from '~shared/ui/table'
import { RButton } from '~shared/ui/button'

import s from './styles.module.scss'

interface SearchableTableProps {
    title: string
    createPath: string
    data: any[]
    columns: any[]
    inputs?: ReactNode[]
    filters?: { [key: string]: any }
    sorting?: SortingState
}

const SearchableTable = ({ data, inputs, title, columns, sorting, createPath, filters }: SearchableTableProps) => {
    const navigate = useNavigate()

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <h2 className={s.title}>
                    {title}
                </h2>
                <div className={s.headerButtons}>
                    <RButton type='button' onClick={() => navigate(createPath)} color='blue'>Qo'shish</RButton>
                </div>
            </div>
            <div className={s.inputWrapper}>
                {inputs}
            </div>
            <RTable data={data} columns={columns} filters={filters} sorting={sorting} />
        </div>
    )
}

export default SearchableTable