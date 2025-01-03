import { Link, useNavigate } from "react-router-dom"
import { createColumnHelper } from "@tanstack/react-table"

import { PermissionControl } from "~features/permission"
import { IWorker, useDeleteWorkerQuery } from "~entities/worker"
import { parseNumberWithSpaces } from "~shared/libs/number-parser"
import { RButton } from "~shared/ui/button"
import { basePermissions } from "~shared/constants/base-permissions"

import s from './styles.module.scss'

const columnHelper = createColumnHelper<IWorker>()

export const useColumns = () => {
    const navigate = useNavigate()
    const { mutate: deleteWorker } = useDeleteWorkerQuery()

    const columns = [
        columnHelper.accessor('id', {
            header: 'ID',
            cell: info => {
                const id = info.getValue()
                return (
                    <PermissionControl level={basePermissions.worker.readWorker} noAccessText="нет доступа!">
                        <Link to={`/worker/${id}`}>{id}</Link>
                    </PermissionControl>
                )
            }
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
            filterFn: (info, _, filteringValue) => {
                return info.original.status_working === filteringValue
            }
        }),
        columnHelper.accessor('position', {
            header: 'Lavozim',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('monthly_salary', {
            header: 'Oylik maoshi',
            cell: info => (
                <PermissionControl level={basePermissions.users.delete} noAccessText="нет доступа!">{parseNumberWithSpaces(Number(info.getValue()))} so'm</PermissionControl>
            )
        }),
        columnHelper.display({
            header: 'Harakatlar',
            cell: (info) => {
                const id = info.cell.row.original.id
                return (
                    <div className={s.buttonsWrapper}>
                        <PermissionControl level={basePermissions.worker.update} noAccessText="нет доступа!">
                            <RButton onClick={() => navigate('/workers/update/' + id)} size='sm' color='green'>Tahrirlash</RButton>
                        </PermissionControl>
                        <PermissionControl level={basePermissions.worker.delete}>
                            <RButton onClick={() => deleteWorker(id)} size='sm' color='red'>O'chirish</RButton>
                        </PermissionControl>
                    </div>
                )
            }
        }),
    ]


    return columns
} 