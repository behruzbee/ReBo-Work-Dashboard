import { createColumnHelper } from "@tanstack/react-table"

import { type IHistory } from "~entities/history"

import s from './styles.module.scss'

const columnHelper = createColumnHelper<IHistory>()

export const useColumns = () => {

    const columns = [
        columnHelper.accessor('work_place_name', {
            header: 'Skanerlangan joyi',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('scan_time', {
            header: 'Skanerlangan vaqt',
            cell: info => new Date(info.getValue()).toLocaleString()
        }),
        columnHelper.accessor('status_type', {
            header: 'Keldi/Ketti',
            cell: info => {
                const status_type = info.getValue()
                return status_type === 'enter'
                    ? <span className={s.statusWorking} data-status='enter'>Ishga keldi</span>
                    : <span className={s.statusWorking} data-status='exit'>Ishdan chiqdi</span>
            }
        })
    ]

    return columns
} 