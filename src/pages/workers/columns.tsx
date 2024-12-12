import { useNavigate } from "react-router-dom"
import { createColumnHelper } from "@tanstack/react-table"

import { IWorker, useDeleteWorkerQuery } from "~entities/worker"
import { parseNumberWithSpaces } from "~shared/libs/number-parser"
import { RButton } from "~shared/ui/button"

import s from './styles.module.scss'

const columnHelper = createColumnHelper<IWorker>()

export const useColumns = () => {
    const navigate = useNavigate()
    const { mutate: deleteWorker } = useDeleteWorkerQuery()

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
        columnHelper.accessor('status_working', {
            header: 'Ish Status',
            cell: info => {
                const value = info.getValue()
                return <span data-status={value}>{value === 'working' ? 'Ishda' : 'Ishda Emas'}</span>
            },
        }),
        columnHelper.accessor('position', {
            header: 'Lavozim',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('monthly_salary', {
            header: 'Oylik maoshi',
            cell: info => `${parseNumberWithSpaces(Number(info.getValue()))} so'm`
        }),
        columnHelper.display({
            header: 'Harakatlar',
            cell: (info) => {
                const id = info.cell.row.original.id
                return (
                    <div className={s.buttonsWrapper}>
                        <RButton onClick={() => navigate('/workers/update/' + id)} size='sm' color='green'>O'zgartirish</RButton>
                        <RButton onClick={() => deleteWorker(id)} size='sm' color='red'>O'chirish</RButton>
                    </div>
                )
            }
        }),
    ]


    return columns
} 