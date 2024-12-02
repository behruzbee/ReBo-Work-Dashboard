import { Link, NavLink, Outlet } from 'react-router-dom';

import { RIcon } from '~shared/ui/icon';
import { RouterPaths } from '~shared/constants/router-path';

import s from './styles.module.scss';

const LINKS = [
  { path: RouterPaths.workers.root, icon: 'male', text: "Ishchilar" },
  { path: RouterPaths.histories.root, icon: 'history', text: "Tarix" },
  { path: RouterPaths.penalties.root, icon: 'money', text: "Jarimalar" },
]

const LayoutPage = () => {
  return (
    <div className={s.wrapper}>
      <aside className={s.sidebar}>
        <div className={s.logoWrapper}>
          <Link to={RouterPaths.root} className={s.logo}>ReBo.</Link>
          <span>BETA V1</span>
        </div>

        <ul className={s.links}>
          {LINKS.map((link) => (
            <li key={link.text}>
              <NavLink to={link.path} className={({ isActive }) => isActive ? s.active : ''} end={false}>
                <RIcon name={link.icon} />
                {link.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutPage