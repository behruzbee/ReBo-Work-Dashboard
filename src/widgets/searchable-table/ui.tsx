
import React, { useCallback, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'

import { IWorker } from '~entities/worker'

import { RTable } from '~shared/ui/table'
import { RInput } from '~shared/ui/input'
import { parseNumberWithSpaces } from '~shared/libs/number-parser'

import s from './styles.module.scss'
import { RButton } from '~shared/ui/button'
import { useNavigate } from 'react-router-dom'
import { RouterPaths } from '~shared/constants/router-path'

interface SearchableTableProps {
    title: string
    data: any[]
}

const columnHelper = createColumnHelper<IWorker>()

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('name', {
        header: 'Ism',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('age', {
        header: 'Yosh',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('is_working', {
        header: 'Ish Status',
        cell: info => info.getValue() ? 'ISHDA' : 'ISHDA EMAS'
    }),
    columnHelper.accessor('position', {
        header: 'Lavozim',
        cell: info => info.getValue()
    }),
    columnHelper.accessor('monthly_salary', {
        header: 'Oylik maoshi',
        cell: info => `${parseNumberWithSpaces(Number(info.getValue()))} so'm`
    }),
]

const SearchableTable = ({ data, title }: SearchableTableProps) => {
    const navigate = useNavigate()
    const [searchedUserId, setSearchedUserId] = useState<string>('')

    const handleSearchUserById = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchedUserId(e.target.value)
    }, [])

    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <h2 className={s.title}>
                    {title}
                </h2>
                <div className={s.headerButtons}>
                    <RButton type='button' onClick={() => navigate(RouterPaths.workers.create)} color='blue'>Qo'shish</RButton>
                </div>
            </div>
            <div className={s.inputWrapper}>
                <RInput
                    label='Ishchi ID'
                    placeholder='Ishchi ID ni kiriting'
                    value={searchedUserId}
                    onChange={handleSearchUserById}
                />
                <RInput
                    label='Ishchi Ism'
                    placeholder='Ishchi ismini kiriting'
                    value={searchedUserId}
                    onChange={handleSearchUserById}
                />
                <RInput
                    label='Yosh'
                    type='number'
                    placeholder='Ishchi yoshini ni kiriting'
                    value={searchedUserId}
                    onChange={handleSearchUserById}
                />
                <RInput
                    label='Oylik bilan qidiring'
                    type='number'
                    placeholder='Oylik maoshini kiriting'
                    value={searchedUserId}
                    onChange={handleSearchUserById}
                />
            </div>
            <RTable data={data} columns={columns} />
        </div>
    )
}

export default SearchableTable