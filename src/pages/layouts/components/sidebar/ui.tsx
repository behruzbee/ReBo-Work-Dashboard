
import { Link, NavLink } from 'react-router-dom'

import { ThemeButton } from '~features/theme-button'
import { PermissionControl } from '~features/permission'
import { RIcon } from '~shared/ui/icon'
import { RouterPaths } from '~shared/constants/router-path'

import s from './styles.module.scss'
import { useState } from 'react'

interface SidebarProps {
    links: {
        path: string;
        icon: string;
        text: string;
        permissionLevel: number;
    }[]
}

const Sidebar = ({ links }: SidebarProps) => {
    const [open, setOpen] = useState(false)
    return (
        <aside className={`${s.sidebar} ${open ? s.opened : s.closed}`}>
            <div>
                <div className={s.logoWrapper}>
                    <Link to={RouterPaths.root} className={s.logo}>ReBo.</Link>
                    <span>BETA V1</span>
                </div>

                <ul className={s.links}>
                    {links.map((link) => (
                        <PermissionControl key={link.text} level={link.permissionLevel}>
                            <li >
                                <NavLink to={link.path} className={({ isActive }) => isActive ? `${s.link} ${s.active}` : `${s.link}`} end={false}>
                                    <RIcon name={link.icon} />
                                    {link.text}
                                </NavLink>
                            </li>
                        </PermissionControl>
                    ))}
                </ul>
            </div>

            <div className={s.bottomWrapper}>
                <ThemeButton />
                <NavLink className={s.link} to={RouterPaths.auth.login}>
                    <RIcon name='exit' />
                    Chiqish
                </NavLink>
            </div>

            <button onClick={() => setOpen(!open)} className={s.arrowButton}>
                <RIcon name={`${open ? 'chevron-left' : 'chevron-right'}`} />
            </button>
        </aside>
    )
}

export default Sidebar