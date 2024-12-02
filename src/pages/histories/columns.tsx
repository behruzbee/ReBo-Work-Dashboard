import { createColumnHelper } from "@tanstack/react-table"

import { type IHistory } from "~entities/history"
import { useDeleteHistoryQuery } from "~entities/history/api/queries"
import { useGetWorkersQuery } from "~entities/worker"
import { RButton } from "~shared/ui/button"

import s from './styles.module.scss'

const columnHelper = createColumnHelper<IHistory>()

export const useColumns = () => {
    const { data: workers } = useGetWorkersQuery()
    const { mutate: deleteHistory } = useDeleteHistoryQuery()

    const columns = [
        columnHelper.accessor('worker_id', {
            header: 'Ism Familya',
            cell: info => {
                if (workers) {
                    const worker = workers.find(worker => worker.id === info.getValue())
                    if (worker) {
                        return `${worker.name} ${worker.lastName}`
                    }
                    return `${info.getValue()} O'chirilgan ishchi`
                }
            }
        }),
        columnHelper.accessor('work_place_name', {
            header: 'Skanerlangan joyi',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('scan_time', {
            header: 'Skanerlangan vaqt',
            cell: info => new Date(info.getValue()).toLocaleString()
        }),
        columnHelper.accessor('status_working', {
            header: 'Keldi/Ketti',
            cell: info => {
                const status_working = info.getValue()
                return status_working ? <span className={s.statusWorking} data-status='enter'>Ishga keldi</span> : <span className={s.statusWorking} data-status='exit'>Ishdan chiqdi</span>
            }
        }),
        columnHelper.display({
            header: 'Harakatlar',
            cell: (info) => {
                const id = info.cell.row.original.id
                return <RButton onClick={() => deleteHistory(id)} size='sm' color='red'>O'chirish</RButton>
            }
        }),
    ]

    return columns
} 