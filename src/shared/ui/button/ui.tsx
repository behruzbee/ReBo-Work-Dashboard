import { HTMLProps } from "react"

import s from './styles.module.scss'

interface RButtonProps extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
    color: 'blue' | 'green' | 'red' | 'white'
    type: 'submit' | 'button'
}

const RButton = ({ color, className, ...props }: RButtonProps) => {
    return (
        <button className={`${s.button} ${s[color]} ${className}`} {...props} />
    )
}

export default RButton