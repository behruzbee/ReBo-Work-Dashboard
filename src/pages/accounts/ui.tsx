import { useNavigate } from 'react-router-dom'

import PermissionControl from '~features/permission/ui'
import { useGetUsersQuery } from '~entities/user'
import { Spinner } from '~shared/ui/spinner'
import { RButton } from '~shared/ui/button'
import { RTable } from '~shared/ui/table'
import { RouterPaths } from '~shared/constants/router-path'
import { basePermissions } from '~shared/constants/base-permissions'

import s from './styles.module.scss'
import { useColumns } from './columns'

const AccountsPage = () => {
  const navigate = useNavigate()
  const columns = useColumns()
  const { data: users, isPending } = useGetUsersQuery()

  if (isPending || !users) {
    return (
      <div className={s.wrapper}>
        <Spinner />
      </div>
    )
  }
  return (
    <PermissionControl level={basePermissions.users.read}>
      <div className={s.header}>
        <h2 className={s.title}>
          Akkountlar ro'yxati
        </h2>
        <PermissionControl level={basePermissions.users.create}>
          <div className={s.headerButtons}>
            <RButton type='button' onClick={() => navigate(RouterPaths.accounts.create)} color='blue'>Qo'shish</RButton>
          </div>
        </PermissionControl>
      </div>
      <RTable
        data={users}
        columns={columns}
      />
    </PermissionControl>
  )
}

export default AccountsPage