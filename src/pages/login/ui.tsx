import { LoginForm } from '~features/login-form'
import { RIcon } from '~shared/ui/icon'
import s from './styles.module.scss'
import { useLogout } from '~shared/hooks/useLogout'
import { useEffect } from 'react'

const LoginPage = () => {
    const logout = useLogout()

    useEffect(() => {
        logout()
    }, [logout])

    return (
        <div className={s.wrapper}>
            <div className={s.iconWrapper}>
                <RIcon
                    name='user'
                    className={s.icon}
                />
                <h6 className={s.text}>ReBo</h6>
                <h6 className={s.text2}>Kirish</h6>
            </div>
            <LoginForm />
        </div>
    )
}

export default LoginPage