import { HTMLProps } from "react"

import s from './styles.module.scss'

interface RButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'type' | "size"> {
    color: 'blue' | 'green' | 'red' | 'white'
    type?: 'submit' | 'button'
    size?: 'sm' | 'md' | 'lg'
}

const RButton = ({ color, className, size = 'md', ...props }: RButtonProps) => {
    return (
        <button className={`${s.button} ${s[color]} ${s[size]} ${className}`} {...props} />
    )
}

export default RButton