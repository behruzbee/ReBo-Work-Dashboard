import { Link, NavLink, Outlet } from 'react-router-dom';

import { RIcon } from '~shared/ui/icon';
import { RouterPaths } from '~shared/constants/router-path';

import s from './styles.module.scss';

const LINKS = [
  { path: RouterPaths.workers.root, icon: 'male', text: "Ishchilar" },
  { path: RouterPaths.histories.root, icon: 'history', text: "Tarix" },
  { path: RouterPaths.penalties.root, icon: 'money-withdraw ', text: "Jarimalar" },
  { path: RouterPaths.bonuses.root, icon: 'money', text: "Bonuslar" },
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
              <li key={link.text}>
                <NavLink to={link.path} className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`} end={false}>
                  <RIcon name={link.icon} />
                  {link.text}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <NavLink className={s.link} to={RouterPaths.auth.login}>
          <RIcon name='exit' />
          Chiqish
        </NavLink>
      </aside>
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default LayoutPage