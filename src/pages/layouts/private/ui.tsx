import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { Outlet } from 'react-router-dom'
import { useLogout } from '~shared/hooks/useLogout'

const PrivatePage = () => {
    const logout = useLogout()
    const token = Cookies.get("AUTH_TOKEN_FRONT")

    useEffect(() => {
        if (!token) {
            logout()
        }
    }, [token, logout])

    if(!token) return null

    return <Outlet />
}

export default PrivatePage