import { Outlet } from 'react-router-dom';

import { RouterPaths } from '~shared/constants/router-path';
import { basePermissions } from '~shared/constants/base-permissions';

import s from './styles.module.scss';
import { Sidebar } from './components/sidebar';

const LINKS = [
  { path: RouterPaths.workers.root, icon: 'male', text: "Ishchilar", permissionLevel: basePermissions.worker.readWorkers },
  { path: RouterPaths.histories.root, icon: 'history', text: "Tarix", permissionLevel: basePermissions.history.readHistories },
  { path: RouterPaths.penalties.root, icon: 'money-withdraw ', text: "Jarimalar", permissionLevel: basePermissions.penalty.read },
  { path: RouterPaths.bonuses.root, icon: 'money', text: "Bonuslar", permissionLevel: basePermissions.bonus.read },
  { path: RouterPaths.accounts.root, icon: 'user', text: "Akkauntlar", permissionLevel: basePermissions.users.read },
]

const LayoutPage = () => {
  return (
    <div className={s.wrapper}>
      <Sidebar links={LINKS} />
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutPage