import { useEffect, useState } from 'react';
import { RButton } from '~shared/ui/button'
import { RIcon } from '~shared/ui/icon'

import s from './styles.module.scss'

const ThemeButton = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        if (savedTheme) {
            setTheme(savedTheme);
            document.documentElement.setAttribute('data-theme', savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <RButton
            color='blue'
            size='sm'
            className={s.button}
            onClick={toggleTheme}
        >
            <RIcon name={theme === 'light' ? 'moon' : 'sun'} />
        </RButton>
    )
}

export default ThemeButton