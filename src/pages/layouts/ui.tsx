import { Link, NavLink, Outlet } from 'react-router-dom';

import PermissionControl from '~features/permission/ui';
import { ThemeButton } from '~features/theme-button';
import { RIcon } from '~shared/ui/icon';
import { RouterPaths } from '~shared/constants/router-path';
import { basePermissions } from '~shared/constants/base-permissions';

import s from './styles.module.scss';

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
      <aside className={s.sidebar}>
        <div>
          <div className={s.logoWrapper}>
            <Link to={RouterPaths.root} className={s.logo}>ReBo.</Link>
            <span>BETA V1</span>
          </div>

          <ul className={s.links}>
            {LINKS.map((link) => (
              <PermissionControl key={link.text} level={link.permissionLevel}>
                <li >
                  <NavLink to={link.path} className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`} end={false}>
                    <RIcon name={link.icon} />
                    {link.text}
                  </NavLink>
                </li>
              </PermissionControl>
            ))}
            <li>
            </li>
          </ul>
        </div>

        <div className={s.bottomWrapper}>
          <ThemeButton />
          <NavLink className={s.link} to={RouterPaths.auth.login}>
            <RIcon name='exit' />
            Chiqish
          </NavLink>
        </div>
      </aside>
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutPage