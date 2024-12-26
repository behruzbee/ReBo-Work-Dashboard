import { useNavigate } from "react-router-dom"
import { createColumnHelper } from "@tanstack/react-table"

import { PermissionControl } from "~features/permission"
import { IUser, useDeleteUserQuery, useGetMe } from "~entities/user"
import { RButton } from "~shared/ui/button"
import { basePermissions, permissionStatus } from "~shared/constants/base-permissions"

import s from './styles.module.scss'

const columnHelper = createColumnHelper<IUser>()

export const useColumns = () => {
    const navigate = useNavigate()
    const { data: me } = useGetMe()
    const { mutate: deleteUser } = useDeleteUserQuery()

    const columns = [
        columnHelper.accessor('username', {
            header: 'Login',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('password', {
            header: 'Heshlangan Parol',
            cell: info => `${info.getValue().slice(0, 15)}...`
        }),
        columnHelper.accessor('status_index', {
            header: 'Status',
            cell: info => permissionStatus[info.getValue()]
        }),
        columnHelper.accessor('created_at', {
            header: 'Yaratilgan vaqt',
            cell: info => new Date(info.getValue()).toLocaleDateString()
        }),
        columnHelper.display({
            header: 'Harakatlar',
            cell: (info) => {
                const username = info.cell.row.original.username
                return (
                    <div className={s.buttonsWrapper}>
                        <PermissionControl level={basePermissions.worker.update} noAccessText="нет доступа!">
                            <RButton onClick={() => navigate('/accounts/update/' + username)} size='sm' color='green'>Tahrirlash</RButton>
                        </PermissionControl>
                        {me?.username !== username &&
                            <PermissionControl level={basePermissions.worker.delete}>
                                <RButton onClick={() => deleteUser(username)} size='sm' color='red'>O'chirish</RButton>
                            </PermissionControl>
                        }

                    </div>
                )
            }
        }),
    ]


    return columns
} 