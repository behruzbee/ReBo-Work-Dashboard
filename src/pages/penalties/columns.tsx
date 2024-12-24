import { createColumnHelper } from "@tanstack/react-table"

import { type IPenalty } from "~entities/penalty"
import { PermissionControl } from "~features/permission"
import { useDeletePenaltyQuery } from "~entities/penalty/api"
import { useGetWorkersQuery } from "~entities/worker"
import { basePermissions } from "~shared/constants/base-permissions"
import { parseNumberWithSpaces } from "~shared/libs/number-parser"
import { RButton } from "~shared/ui/button"

const columnHelper = createColumnHelper<IPenalty>()

export const useColumns = () => {
    const { data: workers } = useGetWorkersQuery()
    const { mutate: deletePenalty } = useDeletePenaltyQuery()
    const columns = [
        columnHelper.accessor('worker_id', {
            header: 'Ism Familya',
            cell: info => {
                if (workers) {
                    const worker = workers.find(worker => worker.id === info.getValue())
                    if (worker) {
                        return `${worker.name} ${worker.lastName}`
                    }
                    return `${info.getValue()} O'chirilgan Xodim`
                }
            }
        }),
        columnHelper.accessor('description', {
            header: 'Sabab',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('amount', {
            header: 'Miqdor',
            cell: info => parseNumberWithSpaces(info.getValue()),
            filterFn: (row, columnId, filterValue) => {
                return parseNumberWithSpaces(row.getValue(columnId)) === filterValue;
            }
        }),
        columnHelper.accessor('time', {
            header: 'Vaqti',
            cell: info => new Date(info.getValue()).toLocaleString()
        }),
        columnHelper.display({
            header: 'Harakatlar',
            cell: (info) => {
                const id = info.cell.row.original.id
                return (
                    <PermissionControl level={basePermissions.penalty.delete} noAccessText="нет доступа!">
                        <RButton onClick={() => deletePenalty(id)} size='sm' color='red'>O'chirish</RButton>
                    </PermissionControl>
                )
            }
        }),
    ]

    return columns
} 